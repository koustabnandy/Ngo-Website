"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Achievements", href: "#achievements" },
    { name: "Membership", href: "#membership" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <nav className="fixed w-full z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm transition-all duration-300">
  <div className="container mx-auto px-4">
    <div className="flex justify-between items-center py-3">
      <Link href="/" className="flex items-center space-x-3">
        <div className="relative h-12 w-12 rounded-full overflow-hidden">
          <Image
            src="/join.jpg?height=48&width=48"
            alt="Nirvrti Foundation Logo"
            fill
            className="object-cover"
          />
        </div>
        <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Nirvrti</span>
      </Link>

          {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 font-medium text-sm uppercase tracking-wide relative group"
          >
            {link.name}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}

            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="transition-all duration-300 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? (
                  <Sun size={20} className="text-yellow-400" />
                ) : (
                  <Moon size={20} className="text-gray-800" />
                )}
              </button>
            )}

            <a href="#donate">
  <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105">
    Donate Now
  </Button>
</a>


          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 dark:text-gray-200 hover:text-green-600 transition-colors">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
  <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-xl rounded-lg mt-2 p-6 absolute left-4 right-4 z-50 transition-all duration-300 animate-in slide-in-from-top">
    <div className="flex flex-col space-y-5">
      {navLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2 text-center font-medium text-lg"
          onClick={() => setIsOpen(false)}
        >
          {link.name}
        </Link>
      ))}

      <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white w-full py-6 rounded-full text-lg font-medium shadow-md" onClick={() => setIsOpen(false)}>
        Donate Now
      </Button>

              {mounted && (
                <button
                  onClick={() => {
                    setTheme(theme === "dark" ? "light" : "dark")
                    setIsOpen(false)
                  }}
                  className="transition-all duration-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 self-start"
                  aria-label="Toggle Theme"
                >
                  {theme === "dark" ? (
                    <Sun size={20} className="text-yellow-400" />
                  ) : (
                    <Moon size={20} className="text-gray-800" />
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
