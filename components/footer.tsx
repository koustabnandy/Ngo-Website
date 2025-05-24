"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Heart } from "lucide-react"

const Footer = () => {
  
  return (
    <footer className="bg-blue-900 dark:bg-gray-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="relative h-12 w-12 rounded-full overflow-hidden">
                <Image
                  src="/join.jpg?height=48&width=48"
                  alt="NIRVRITI Foundation Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl text-white">NIRVRITI</span>
                <span className="text-xs text-blue-200 italic">Bliss in Helping Others</span>
              </div>
            </Link>
            <p className="text-blue-200 dark:text-gray-300">
              Empowering communities through education, support, and sustainable development initiatives.
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="https://facebook.com/reachnirvrti" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-blue-800 hover:bg-blue-700 rounded-full transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://twitter.com/reachnirvrti" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-blue-800 hover:bg-blue-700 rounded-full transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="https://instagram.com/reachnirvrti" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-blue-800 hover:bg-blue-700 rounded-full transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://linkedin.com/company/reachnirvrti" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-blue-800 hover:bg-blue-700 rounded-full transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="https://youtube.com/c/reachnirvrti" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-blue-800 hover:bg-blue-700 rounded-full transition-colors duration-300"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-blue-800 pb-2">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "About Us", "Events", "Membership", "Donate", "Contact"].map((item) => (
                <li key={item}>
                  <Link 
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-blue-200 hover:text-white transition-colors duration-300 flex items-center"
                  >
                    <span className="mr-2">›</span> {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-blue-800 pb-2">Our Programs</h3>
            <ul className="space-y-3">
              {[
                "Education Support", 
                "Community Kitchen", 
                "Health Initiatives", 
                "Cultural Programs",
                "Skill Development",
                "Emergency Relief"
              ].map((item) => (
                <li key={item}>
                  <Link 
                    href="#"
                    className="text-blue-200 hover:text-white transition-colors duration-300 flex items-center"
                  >
                    <span className="mr-2">›</span> {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-200 dark:text-gray-300 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} NIRVRITI Foundation - Bliss in Helping Others. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-200 dark:text-gray-300">
              <Link href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors duration-300">Terms of Service</Link>
              <Link href="#" className="hover:text-white transition-colors duration-300">Cookie Policy</Link>
            </div>
          </div>
          <div className="text-center mt-6 text-blue-200 dark:text-gray-300 text-sm flex items-center justify-center">
            <span>Made with</span>
            <Heart size={14} className="mx-1 text-red-400" />
            <span>for the community</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
