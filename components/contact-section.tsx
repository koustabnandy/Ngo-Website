"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Phone, Mail, MapPin, Send } from "lucide-react"

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    }, 1500)
  }

  return (
    <section id="contact" className="py-16 bg-blue-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-12">
          Contact <span className="text-yellow-500">Us</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Have questions or want to get involved? Reach out to us and we'll get back to you as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 border-blue-100 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border-blue-200 focus-visible:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-blue-200 focus-visible:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border-blue-200 focus-visible:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Enter subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="border-blue-200 focus-visible:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Enter your message"
                value={formData.message}
                onChange={handleChange}
                required
                className="min-h-[120px] border-blue-200 focus-visible:ring-blue-500"
              />
            </div>

            <Button
  className="w-full bg-yellow-600 hover:bg-yellow text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
  asChild
>
  <a
    href="https://wa.me/919876543210?text=Hello%20Nirvrti!"
    target="_blank"
    rel="noopener noreferrer"
  >
    Send Message <Send size={16} />
  </a>
</Button>


            {submitSuccess && (
              <div className="bg-blue-100 text-yellow-700 p-3 rounded-md text-center">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}
          </form>
        </Card>

        <div className="space-y-8">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md border border-blue-100">
            <h3 className="text-xl font-semibold text-blue-700 mb-6">Get in Touch</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Phone size={20} className="text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Phone</h4>
                  <p className="text-gray-600">+91 70034 59029</p>
                  <p className="text-gray-600">+91 96745 88750</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Mail size={20} className="text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Email</h4>
                  <p className="text-gray-600">haridevpurnirvritifoundation20@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <MapPin size={20} className="text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Location</h4>
                  <p className="text-gray-600">507, Ustad Amir Khan Sarani, Kolkata, Haridevpur - 700082</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-md border border-green-100">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">Office Hours</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-600">Monday - Friday:</span>
                <span className="font-medium">9:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Saturday:</span>
                <span className="font-medium">10:00 AM - 4:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Sunday:</span>
                <span className="font-medium">Closed</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
