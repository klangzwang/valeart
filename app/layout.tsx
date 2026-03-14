import type React from "react"
import type { Metadata } from "next";
import { Square_Peg, Montserrat, Manrope, Inter } from "next/font/google"
import "./globals.css"

const squarepeg = Square_Peg({
  subsets: ["latin"],
  variable: "--font-squarepeg",
  display: "swap",
  weight: "400",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "ValeArt",
  description: "",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${squarepeg.variable} ${montserrat.variable} ${manrope.variable} ${inter.variable} font-sans antialiased`}>
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
