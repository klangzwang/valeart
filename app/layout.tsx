import type React from "react"
import type { Metadata } from "next";
import { Sansita_Swashed, Montserrat, Manrope, Inter } from "next/font/google"
import "./globals.css"

const sansita = Sansita_Swashed({
  subsets: ['latin'],
  variable: '--font-sansita',
  display: 'swap',
});

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
      <body className={`${sansita.variable} ${montserrat.variable} ${manrope.variable} ${inter.variable} font-sans antialiased`}>
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
