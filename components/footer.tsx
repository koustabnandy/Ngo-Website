import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Heart } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-green-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold text-green-700 mb-4">Nirvrti Foundation</h3>
            <p className="text-gray-600 mb-4">
              A registered NGO dedicated to making a difference in the lives of students and communities in Haridevpur,
              Kolkata.
            </p>
            <p className="text-gray-600">Registration Number: 5012992</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-green-700 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-green-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-600 hover:text-green-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#events" className="text-gray-600 hover:text-green-600 transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="#donate" className="text-gray-600 hover:text-green-600 transition-colors">
                  Donate
                </Link>
              </li>
              <li>
                <Link href="#blog" className="text-gray-600 hover:text-green-600 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-600 hover:text-green-600 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-green-700 mb-4">Contact Info</h3>
            <address className="not-italic text-gray-600 space-y-2">
              <p>507, Ustad Amir Khan Sarani</p>
              <p>Kolkata, Haridevpur - 700082</p>
              <p>Phone: +91 70034 59029</p>
              <p>Email: haridevpurnirvritifoundation20@gmail.com</p>
            </address>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-green-700 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/reachnirvrti"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-2 rounded-full text-green-600 hover:text-green-700 hover:bg-green-50 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com/nirvrti_bliss"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-2 rounded-full text-green-600 hover:text-green-700 hover:bg-green-50 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-2 rounded-full text-green-600 hover:text-green-700 hover:bg-green-50 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://www.youtube.com/@nirvritifoundation9701"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-2 rounded-full text-green-600 hover:text-green-700 hover:bg-green-50 transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
            <div className="mt-6">
              <h4 className="text-sm font-medium text-green-700 mb-2">Subscribe to Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 border border-green-200 rounded-l-md focus:outline-none focus:ring-1 focus:ring-green-500 flex-grow"
                />
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-md transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-green-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Nirvrti Foundation. All rights reserved.
            </p>
            <div className="flex items-center text-sm text-gray-600">
              <span className="flex items-center">
                Made with <Heart size={14} className="text-red-500 mx-1" /> in Kolkata, India
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
