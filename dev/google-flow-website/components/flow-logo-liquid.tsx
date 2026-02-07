"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

type FlowTarget = {
  framebuffer: WebGLFramebuffer
  texture: WebGLTexture
  width: number
  height: number
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

const vertexShaderSource = `
attribute vec2 aPosition;
varying vec2 vUv;

void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

const flowFragmentShaderSource = `
precision highp float;

varying vec2 vUv;
uniform sampler2D uPrev;
uniform vec2 uMouse;
uniform vec2 uVelocity;
uniform float uAspect;
uniform float uFalloff;
uniform float uDissipation;
uniform float uActive;

void main() {
  vec2 base = texture2D(uPrev, vUv).rg;
  base = mix(vec2(0.5), base, uDissipation);

  vec2 delta = vUv - uMouse;
  delta.x *= uAspect;

  float stamp = exp(-dot(delta, delta) / max(uFalloff, 0.0001));
  vec2 flow = base + (uVelocity * stamp * uActive);

  gl_FragColor = vec4(clamp(flow, 0.0, 1.0), 0.0, 1.0);
}
`

const renderFragmentShaderSource = `
precision highp float;

varying vec2 vUv;
uniform sampler2D uLogo;
uniform sampler2D uFlow;
uniform float uStrength;
uniform float uRgbShift;
uniform vec2 uTexel;

void main() {
  vec2 flow = texture2D(uFlow, vUv).rg - 0.5;
  vec2 distortion = flow * uStrength;
  vec2 uv = clamp(vUv + distortion, 0.001, 0.999);

  float r = texture2D(uLogo, clamp(uv + distortion * uRgbShift, 0.001, 0.999)).r;
  float g = texture2D(uLogo, uv).g;
  float b = texture2D(uLogo, clamp(uv - distortion * uRgbShift, 0.001, 0.999)).b;
  float a = texture2D(uLogo, uv).a;

  float flowAmount = length(flow);
  float blurMix = smoothstep(0.16, 0.48, flowAmount);

  vec2 dir = normalize(distortion + vec2(1e-6));
  vec2 blurStep = uTexel * (0.25 + flowAmount * 2.0);

  vec4 blurA = texture2D(uLogo, clamp(uv + dir * blurStep, 0.001, 0.999));
  vec4 blurB = texture2D(uLogo, clamp(uv - dir * blurStep, 0.001, 0.999));
  vec4 blurC = texture2D(uLogo, clamp(uv + vec2(blurStep.y, -blurStep.x) * 0.8, 0.001, 0.999));
  vec4 blurD = texture2D(uLogo, clamp(uv - vec2(blurStep.y, -blurStep.x) * 0.8, 0.001, 0.999));
  vec4 blurColor = (texture2D(uLogo, uv) + blurA + blurB + blurC + blurD) / 5.0;

  vec3 baseColor = vec3(r, g, b);
  vec3 mixedColor = mix(baseColor, blurColor.rgb, blurMix * 0.08);
  float alpha = a;

  gl_FragColor = vec4(mixedColor * alpha, alpha);
}
`

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type)

  if (!shader) {
    throw new Error("Unable to create shader")
  }

  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader) ?? "Unknown shader compile error"
    gl.deleteShader(shader)
    throw new Error(info)
  }

  return shader
}

function createProgram(gl: WebGLRenderingContext, vertexSource: string, fragmentSource: string): WebGLProgram {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource)
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource)
  const program = gl.createProgram()

  if (!program) {
    gl.deleteShader(vertexShader)
    gl.deleteShader(fragmentShader)
    throw new Error("Unable to create program")
  }

  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.bindAttribLocation(program, 0, "aPosition")
  gl.linkProgram(program)

  gl.deleteShader(vertexShader)
  gl.deleteShader(fragmentShader)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program) ?? "Unknown program link error"
    gl.deleteProgram(program)
    throw new Error(info)
  }

  return program
}

function requireUniform(program: WebGLProgram, gl: WebGLRenderingContext, name: string): WebGLUniformLocation {
  const uniform = gl.getUniformLocation(program, name)

  if (!uniform) {
    throw new Error(`Missing uniform: ${name}`)
  }

  return uniform
}

function createFlowTarget(gl: WebGLRenderingContext, width: number, height: number): FlowTarget {
  const texture = gl.createTexture()
  const framebuffer = gl.createFramebuffer()

  if (!texture || !framebuffer) {
    throw new Error("Unable to create flow target")
  }

  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)

  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)

  if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
    gl.deleteFramebuffer(framebuffer)
    gl.deleteTexture(texture)
    throw new Error("Flow framebuffer is incomplete")
  }

  gl.viewport(0, 0, width, height)
  gl.clearColor(0.5, 0.5, 0.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)

  return { framebuffer, texture, width, height }
}

function deleteFlowTarget(gl: WebGLRenderingContext, target: FlowTarget | null) {
  if (!target) {
    return
  }

  gl.deleteFramebuffer(target.framebuffer)
  gl.deleteTexture(target.texture)
}

export function FlowLogoLiquid() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [webglReady, setWebglReady] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current

    if (!container || !canvas) {
      return
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (reduceMotion) {
      return
    }

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
    })

    if (!gl) {
      return
    }

    try {
      let disposed = false
      let animationFrame = 0
      let effectOpacity = 0

      let flowRead: FlowTarget | null = null
      let flowWrite: FlowTarget | null = null

      const pointer = {
        x: 0.5,
        y: 0.5,
        lastX: 0.5,
        lastY: 0.5,
        vx: 0,
        vy: 0,
        targetVx: 0,
        targetVy: 0,
        hasInput: false,
        movedAt: 0,
      }

      const programFlow = createProgram(gl, vertexShaderSource, flowFragmentShaderSource)
      const programRender = createProgram(gl, vertexShaderSource, renderFragmentShaderSource)

      const uniformsFlow = {
        prev: requireUniform(programFlow, gl, "uPrev"),
        mouse: requireUniform(programFlow, gl, "uMouse"),
        velocity: requireUniform(programFlow, gl, "uVelocity"),
        aspect: requireUniform(programFlow, gl, "uAspect"),
        falloff: requireUniform(programFlow, gl, "uFalloff"),
        dissipation: requireUniform(programFlow, gl, "uDissipation"),
        active: requireUniform(programFlow, gl, "uActive"),
      }

      const uniformsRender = {
        logo: requireUniform(programRender, gl, "uLogo"),
        flow: requireUniform(programRender, gl, "uFlow"),
        strength: requireUniform(programRender, gl, "uStrength"),
        rgbShift: requireUniform(programRender, gl, "uRgbShift"),
        texel: requireUniform(programRender, gl, "uTexel"),
      }

      const quadBuffer = gl.createBuffer()

      if (!quadBuffer) {
        gl.deleteProgram(programFlow)
        gl.deleteProgram(programRender)
        return
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

      const logoTexture = gl.createTexture()

      if (!logoTexture) {
        gl.deleteBuffer(quadBuffer)
        gl.deleteProgram(programFlow)
        gl.deleteProgram(programRender)
        return
      }

      gl.bindTexture(gl.TEXTURE_2D, logoTexture)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        1,
        1,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        new Uint8Array([0, 0, 0, 0])
      )

      const drawQuad = () => {
        gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer)
        gl.enableVertexAttribArray(0)
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      }

      const resizeTargets = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 3)
        const { width: cssWidth, height: cssHeight } = container.getBoundingClientRect()
        const width = Math.max(1, Math.round(cssWidth * dpr))
        const height = Math.max(1, Math.round(cssHeight * dpr))

        if (canvas.width === width && canvas.height === height) {
          return
        }

        canvas.width = width
        canvas.height = height

        deleteFlowTarget(gl, flowRead)
        deleteFlowTarget(gl, flowWrite)
        flowRead = createFlowTarget(gl, width, height)
        flowWrite = createFlowTarget(gl, width, height)
      }

      const logoImage = new window.Image()
      let logoTextureReady = false
      logoImage.src = "/flow-logo.svg"
      logoImage.decoding = "async"
      logoImage.onload = () => {
        if (disposed) {
          return
        }

        gl.bindTexture(gl.TEXTURE_2D, logoTexture)
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, logoImage)
        logoTextureReady = true
        setWebglReady(true)
      }

      const updatePointer = (clientX: number, clientY: number) => {
        const rect = container.getBoundingClientRect()
        if (rect.width <= 0 || rect.height <= 0) {
          return
        }

        const x = clamp((clientX - rect.left) / rect.width, -0.35, 1.35)
        const y = clamp(1 - (clientY - rect.top) / rect.height, -0.35, 1.35)

        if (!pointer.hasInput) {
          pointer.lastX = x
          pointer.lastY = y
          pointer.hasInput = true
        }

        const dx = x - pointer.lastX
        const dy = y - pointer.lastY

        pointer.targetVx = clamp(dx * 10, -1.25, 1.25)
        pointer.targetVy = clamp(dy * 10, -1.25, 1.25)

        if (Math.abs(dx) < 0.0008) {
          pointer.targetVx = 0
        }
        if (Math.abs(dy) < 0.0008) {
          pointer.targetVy = 0
        }

        pointer.lastX = x
        pointer.lastY = y
        pointer.x = x
        pointer.y = y
        pointer.movedAt = performance.now()
      }

      const onPointerMove = (event: PointerEvent) => {
        updatePointer(event.clientX, event.clientY)
      }

      const onTouchMove = (event: TouchEvent) => {
        const touch = event.touches[0]
        if (!touch) {
          return
        }
        updatePointer(touch.clientX, touch.clientY)
      }

      window.addEventListener("pointermove", onPointerMove, { passive: true })
      window.addEventListener("touchmove", onTouchMove, { passive: true })

      const render = () => {
        if (disposed) {
          return
        }

        resizeTargets()

        if (!flowRead || !flowWrite) {
          animationFrame = window.requestAnimationFrame(render)
          return
        }

        if (!logoTextureReady) {
          animationFrame = window.requestAnimationFrame(render)
          return
        }

        pointer.vx += (pointer.targetVx - pointer.vx) * 0.16
        pointer.vy += (pointer.targetVy - pointer.vy) * 0.16

        const idle = performance.now() - pointer.movedAt
        const decay = idle < 180 ? 0.9 : 0.82
        pointer.targetVx *= decay
        pointer.targetVy *= decay

        const speed = Math.hypot(pointer.vx, pointer.vy)
        const targetOpacity = speed > 0.002 ? 1 : 0
        effectOpacity += (targetOpacity - effectOpacity) * 0.12

        if (canvas.style.opacity !== effectOpacity.toFixed(3)) {
          canvas.style.opacity = effectOpacity.toFixed(3)
        }

        gl.useProgram(programFlow)
        gl.bindFramebuffer(gl.FRAMEBUFFER, flowWrite.framebuffer)
        gl.viewport(0, 0, flowWrite.width, flowWrite.height)
        gl.disable(gl.BLEND)

        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, flowRead.texture)
        gl.uniform1i(uniformsFlow.prev, 0)
        gl.uniform2f(uniformsFlow.mouse, pointer.x, pointer.y)
        gl.uniform2f(uniformsFlow.velocity, pointer.vx * 0.065, pointer.vy * 0.065)
        gl.uniform1f(uniformsFlow.aspect, flowWrite.width / flowWrite.height)
        gl.uniform1f(uniformsFlow.falloff, 0.05)
        gl.uniform1f(uniformsFlow.dissipation, 0.972)
        gl.uniform1f(uniformsFlow.active, 1)
        drawQuad()

        gl.useProgram(programRender)
        gl.bindFramebuffer(gl.FRAMEBUFFER, null)
        gl.viewport(0, 0, canvas.width, canvas.height)
        gl.clearColor(0, 0, 0, 0)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.enable(gl.BLEND)
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, logoTexture)
        gl.uniform1i(uniformsRender.logo, 0)

        gl.activeTexture(gl.TEXTURE1)
        gl.bindTexture(gl.TEXTURE_2D, flowWrite.texture)
        gl.uniform1i(uniformsRender.flow, 1)

        gl.uniform1f(uniformsRender.strength, Math.min(speed * 0.035, 0.04))
        gl.uniform1f(uniformsRender.rgbShift, 0.06)
        gl.uniform2f(uniformsRender.texel, 1 / canvas.width, 1 / canvas.height)
        drawQuad()

        const nextRead = flowWrite
        flowWrite = flowRead
        flowRead = nextRead

        animationFrame = window.requestAnimationFrame(render)
      }

      render()

      return () => {
        disposed = true
        window.cancelAnimationFrame(animationFrame)

        window.removeEventListener("pointermove", onPointerMove)
        window.removeEventListener("touchmove", onTouchMove)

        logoImage.onload = null

        deleteFlowTarget(gl, flowRead)
        deleteFlowTarget(gl, flowWrite)

        gl.deleteTexture(logoTexture)
        gl.deleteBuffer(quadBuffer)
        gl.deleteProgram(programFlow)
        gl.deleteProgram(programRender)
      }
    } catch (error) {
      console.error("Failed to initialize the logo liquid effect", error)
      return
    }
  }, [])

  return (
    <div ref={containerRef} className="relative mx-auto w-[min(92vw,1060px)] aspect-[1613/679]">
      <Image
        src="/flow-logo.svg"
        alt="Logotipo Isabella Devecchi"
        fill
        priority
        className="object-contain"
      />
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-150"
        style={{ opacity: webglReady ? 0 : 0 }}
      />
    </div>
  )
}
