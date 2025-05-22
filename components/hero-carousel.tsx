"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const carouselItems = [
  {
    id: 1,
    image: "/3rd.png?height=800&width=1600",
    title: "Empowering Communities",
    description: "Making a difference in the lives of students and communities in Haridevpur, Kolkata",
    buttonText: "Get Started",
    buttonLink: "#membership",
  },
  {
    id: 2,
    image: "/2nd.jpg?height=800&width=1600",
    title: "New Clothes",
    description: "Providing essential educational resources to students of Sampark",
    buttonText: "Learn More",
    buttonLink: "#events",
  },
  {
    id: 3,
    image: "/1st.jpg?height=800&width=1600",
    title: "Join Our Mission",
    description: "Become a part of our journey to spread hope and create positive change",
    buttonText: "Donate Now",
    buttonLink: "/donate",
  },
  {
    id: 4,
    image: "/482222410_648874787530892_1556423695622188946_n.jpg?height=800&width=1600",
    title: "Community Impact",
    description: "Creating lasting change through collaborative community initiatives",
    buttonText: "Learn More",
    buttonLink: "#what-we-do",
  },
]

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {carouselItems.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="relative h-full w-full">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white p-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeIn">{item.title}</h1>
            <p className="text-lg md:text-xl max-w-2xl mb-8 animate-fadeIn animation-delay-200">{item.description}</p>
            <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-full transition-all duration-300 transform hover:scale-105 animate-fadeIn animation-delay-400 shadow-lg"
            asChild
          >
            <a href={item.buttonLink}>{item.buttonText}</a>
          </Button>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 shadow-md"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white scale-125" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroCarousel
