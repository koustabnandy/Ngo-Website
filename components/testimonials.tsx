"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Quote } from "lucide-react"
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"
import ScrollAnimation from "./scroll-animation"

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Community Member",
    quote: "The work NIRVRITI Foundation does for our community is incredible. Their education support program has helped my children access resources we couldn't afford.",
    image: "/testimonial1.jpg" // Replace with actual image path
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    role: "Volunteer",
    quote: "I've been volunteering with NIRVRITI Foundation for 3 years now. The dedication of the team and the impact we make together is truly inspiring.",
    image: "/testimonial2.jpg" // Replace with actual image path
  },
  {
    id: 3,
    name: "Ananya Das",
    role: "Donor",
    quote: "Supporting NIRVRITI Foundation has been one of the most rewarding decisions I've made. I can see exactly how my contributions help the local community.",
    image: "/testimonial3.jpg" // Replace with actual image path
  }
]

const TestimonialsSection = () => {
  const [api, setApi] = useState<any>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return
    
    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }
    
    api.on("select", handleSelect)
    
    return () => {
      api.off("select", handleSelect)
    }
  }, [api])

  return (
    <section className="py-20 bg-blue-50 dark:bg-gray-900">
      <ScrollAnimation animation="animate-fade-in-up" className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-montserrat">
          <span className="text-blue-800 dark:text-blue-400">What People</span>
          <span className="text-yellow-500 dark:text-yellow-400"> Say</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Hear from the community members, volunteers, and donors who make our work possible
        </p>
        <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
      </ScrollAnimation>
      
      <div className="max-w-5xl mx-auto px-4">
        <Carousel 
          setApi={setApi}
          className="w-full"
          opts={{
            loop: true,
            align: "center",
          }}
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-4/5 lg:basis-3/4">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-10 mx-2">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
                      <div className="absolute -top-2 -left-2 text-blue-500 dark:text-blue-400">
                        <Quote size={24} />
                      </div>
                      <div className="rounded-full overflow-hidden border-4 border-blue-100 dark:border-blue-900">
                        <Image 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          width={96}
                          height={96}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <p className="text-gray-700 dark:text-gray-200 text-lg italic mb-4">"{testimonial.quote}"</p>
                      <div>
                        <h4 className="font-semibold text-blue-700 dark:text-blue-400">{testimonial.name}</h4>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === current ? "bg-blue-600 scale-125" : "bg-gray-300 dark:bg-gray-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <CarouselPrevious className="hidden md:flex -left-12 border-blue-200 dark:border-blue-800 bg-white/80 dark:bg-gray-800/80" />
          <CarouselNext className="hidden md:flex -right-12 border-blue-200 dark:border-blue-800 bg-white/80 dark:bg-gray-800/80" />
        </Carousel>
      </div>
    </section>
  )
}

export default TestimonialsSection
