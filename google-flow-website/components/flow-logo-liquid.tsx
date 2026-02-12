import Image from "next/image"

export function FlowLogoLiquid() {
  return (
    <div className="relative mx-auto w-[min(72vw,34rem)] aspect-[1613/679]">
      <Image
        src="/flow-logo.svg"
        alt="Logotipo Isabella Devecchi"
        fill
        priority
        className="object-contain"
      />
    </div>
  )
}
