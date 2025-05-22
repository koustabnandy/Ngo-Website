"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Phone, Mail, MapPin, Send, Info } from "lucide-react"
import type React from "react"

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

      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    }, 1500)
  }

  return (
    <section id="contact" className="py-16 bg-blue-50 dark:bg-gray-900">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800 dark:text-blue-400">
          GET IN <span className="text-yellow-500 dark:text-yellow-400">Touch</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
          Have questions or want to get involved? Reach out to us and we'll get back to you as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 container mx-auto px-4">
        {/* Contact Form */}
        <Card className="p-6 border-blue-100 dark:border-blue-900 shadow-md dark:bg-gray-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 dark:text-gray-200">Your Name</Label>
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
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-200">Email Address</Label>
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
                <Label htmlFor="phone" className="text-gray-700 dark:text-gray-200">Phone Number</Label>
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
                <Label htmlFor="subject" className="text-gray-700 dark:text-gray-200">Subject</Label>
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
              <Label htmlFor="message" className="text-gray-700 dark:text-gray-200">Message</Label>
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
              className="w-full bg-yellow-600 hover:bg-yellow-500 text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              asChild
            >
              <a
                href="https://wa.me/919876543210?text=Hello%20NIRVRITI%20Foundation!%20I%20have%20a%20query."
                target="_blank"
                rel="noopener noreferrer"
              >
                Register for volunteer <Send size={16} />
              </a>
            </Button>

            {submitSuccess && (
              <div className="bg-blue-100 dark:bg-blue-900 text-yellow-700 dark:text-yellow-400 p-3 rounded-md text-center">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}
          </form>
        </Card>

        {/* Contact Details + Map + Registration */}
        <div className="space-y-6">
          {/* Contact Details */}
          <Card className="p-6 border-blue-100 dark:border-blue-900 bg-white/80 dark:bg-gray-800 shadow-md">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">Contact Details</h3>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>Registered Address:</strong><br />
                507, Ustad Amir Khan Sarani, K.K. Road, Kolkata – 700082
              </p>
              <p>
                <strong>Communication Address:</strong><br />
                331/257, Haridevpur Road, Kolkata - 700082
              </p>
              <p>
                <strong>Call:</strong> 7003459029 / 8910070750 / 9339924183<br />
                <strong>WhatsApp:</strong> 9674588750 / 9830461579
              </p>
              <p>
                <strong>Email:</strong> haridevpurnirvritifoundation20@gmail.com
              </p>
            </div>
          </Card>

          {/* Google Maps */}
          <Card className="p-0 overflow-hidden border-green-100 dark:border-green-900 shadow-md">
            <div className="relative w-full h-[300px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14745.037698914645!2d88.3405927!3d22.4883489!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027127f0c5b9e7%3A0xaa1e0d0f4aca5d52!2sHaridevpur%2C%20Kolkata%2C%20West%20Bengal%20700082!5e0!3m2!1sen!2sin!4v1718183264321!5m2!1sen!2sin"
                width="100%"
                height="300"
                className="border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="p-2 bg-blue-50 dark:bg-gray-700 text-center">
              <a 
                href="https://maps.app.goo.gl/tEAsQ6ExrZBWvWVp9" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 text-sm hover:underline flex items-center justify-center gap-1"
              >
                <MapPin size={14} /> Open NIRVRITI Foundation in Google Maps
              </a>
            </div>
          </Card>

          {/* Govt & Registration Info */}
          <Card className="p-6 border-yellow-100 dark:border-yellow-900 bg-white/80 dark:bg-gray-800 shadow-md">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">Govt. Registration Details</h3>
            <ul className="text-gray-700 dark:text-gray-300 space-y-2">
              <li><strong>Registration Number:</strong> SO023992 of 2021-2022</li>
              <li><strong>80G Details:</strong> AADAH9079EF2024101</li>
              <li><strong>NGO DARPAN Unique ID:</strong> WB/2023/0378038</li>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default ContactSection