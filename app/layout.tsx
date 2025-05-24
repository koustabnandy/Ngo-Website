import type React from "react"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import "./globals.css"
import { AppThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import BackgroundWrapper from "@/components/BackgroundWrapper"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const montserrat = Montserrat({ 
  subsets: ["latin"], 
  variable: "--font-montserrat",
  display: 'swap',
})

export const metadata: Metadata = {
  title: "NIRVRITI Foundation - Bliss in Helping Others",
  description:
    "NIRVRITI Foundation - Bliss in Helping Others is an NGO dedicated to making a difference in the lives of students and communities in Haridevpur, Kolkata.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${montserrat.variable} font-sans bg-white dark:bg-gray-900 transition-colors duration-500`}
        suppressHydrationWarning
      >
        <AppThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* 3D Background Animation */}
          <BackgroundWrapper />
          
          {/* Main Content */}
          <div className="relative z-10">
            {children}
          </div>
          <Toaster />
        </AppThemeProvider>
      </body>
    </html>
  )
}