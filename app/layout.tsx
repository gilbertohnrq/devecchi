import React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"

import "./globals.css"

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Isabella Devecchi | Arquitetura e Design",
  description:
    "Arquitetura, interiores e direção de design com assinatura de Isabella Devecchi, reunindo projetos reais e curadoria visual autoral.",
}

export const viewport: Viewport = {
  themeColor: "#121212",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={_inter.variable}>
      <body className="font-sans antialiased bg-[#121212] text-[#f2f2f2]">
        {children}
      </body>
    </html>
  )
}
