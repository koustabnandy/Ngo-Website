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
    { name: "Events", href: "#events" },
    { name: "Membership", href: "#membership" },
    { name: "Donate", href: "#donate" },
    { name: "Blog", href: "#blog" },
    { name: "Media", href: "#media" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-10 w-10 rounded-full overflow-hidden">
              <Image
                src="/join.jpg?height=40&width=40"
                alt="Nirvrti Foundation Logo"
                fill
                className="object-cover"
              />
            </div>
            <span className="font-bold text-xl text-green-700 dark:text-green-400">Nirvrti</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300 font-medium relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full"></span>
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

            <Button className="bg-green-600 hover:bg-green-700 text-white transition-all duration-300 transform hover:scale-105">
              Donate Now
            </Button>
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
          <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg rounded-lg mt-2 p-4 absolute left-4 right-4 z-50 transition-all duration-300">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors py-2 border-b border-gray-100 dark:border-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <Button className="bg-green-600 hover:bg-green-700 text-white w-full" onClick={() => setIsOpen(false)}>
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
