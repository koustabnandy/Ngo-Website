"use client"

import { Book, Heart, Users, Lightbulb } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: <Book className="h-10 w-10 text-blue-600" />,
    title: "Education Support",
    description: "Providing educational resources and support to underprivileged students in Haridevpur, Kolkata."
  },
  {
    icon: <Heart className="h-10 w-10 text-red-500" />,
    title: "Community Welfare",
    description: "Organizing food distribution drives and community kitchens for those in need."
  },
  {
    icon: <Users className="h-10 w-10 text-green-500" />,
    title: "Cultural Engagement",
    description: "Promoting local art, music, and cultural activities through events and conversations."
  },
  {
    icon: <Lightbulb className="h-10 w-10 text-yellow-500" />,
    title: "Skill Development",
    description: "Empowering communities through skill development workshops and training programs."
  }
]

const WhatWeDo = () => {
  return (
    <section id="what-we-do" className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          <span className="text-blue-800 dark:text-blue-400">What We</span>
          <span className="text-yellow-500 dark:text-yellow-400"> Do</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
          Our mission is to create positive change through these key focus areas
        </p>
        <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 text-center"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 mb-6">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-400">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WhatWeDo
