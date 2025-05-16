import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AppThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nirvrti Foundation - Empowering Communities",
  description:
    "Nirvrti Foundation is an NGO dedicated to making a difference in the lives of students and communities in Haridevpur, Kolkata.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Added bg-white dark:bg-gray-900 and transition for smooth color switch */}
      <body
        className={`${inter.className} bg-white dark:bg-gray-900 transition-colors duration-500`}
      >
        <AppThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </AppThemeProvider>
      </body>
    </html>
  )
}
