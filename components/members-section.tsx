"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

type MemberType = {
  name: string
  role: string
}

export default function MembersSection() {
  const committeeMembers: MemberType[] = [
    { name: "PARTHA MUKHOPADHYAY", role: "President" },
    { name: "ANAMIKA GUPTA", role: "Treasurer" },
    { name: "SWARUP CHANRA CHANDA", role: "Secretary" },
    { name: "DEBAADITYA MUKHOPADHYAY", role: "Vice-President" },
    { name: "SUBHADEEP PAUL", role: "Assistant-Secretary" },
  ]

  const regularMembers: MemberType[] = [
    { name: "PRADIP PAUL", role: "Member" },
    { name: "SAYAN MUKHERJEE", role: "Member" },
    { name: "JAYATI MUKHERJEE", role: "Member" },
    { name: "DOLA ROYCHOWDHURY", role: "Member" },
    { name: "OINDRILA BANIK", role: "Member" },
    { name: "PRATICHI PANTI", role: "Member" },
    { name: "AYUSHI ROYCHOWDHURY", role: "Member" },
  ]

  return (
    <div id="members" className="py-16 bg-blue-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-800 dark:text-blue-400 mb-12">
          NIRVRITI <span className="text-yellow-500">COMMITTEE</span>
        </h1>

        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-center text-blue-700 dark:text-blue-300 mb-8">
            Committee Members
          </h2>
          <MemberCarousel members={committeeMembers} itemsToShow={5} />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-center text-blue-700 dark:text-blue-300 mb-8">Members</h2>
          <MemberCarousel members={regularMembers} itemsToShow={4} />
        </div>
      </div>
    </div>
  )
}

interface MemberCarouselProps {
  members: MemberType[]
  itemsToShow: number
}

function MemberCarousel({ members, itemsToShow }: MemberCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [visibleItems, setVisibleItems] = useState(itemsToShow)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [touchPosition, setTouchPosition] = useState<number | null>(null)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null)
  
  // Calculate total number of slides
  const totalSlides = Math.ceil(members.length / visibleItems)
  
  // Clear all timers
  const clearTimers = useCallback(() => {
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current)
      autoPlayTimerRef.current = null
    }
  }, [])
  
  // Start autoplay
  const startAutoPlay = useCallback(() => {
    if (!isAutoPlaying) return
    
    clearTimers()
    
    // Set timer for next slide
    autoPlayTimerRef.current = setTimeout(() => {
      setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
    }, 5000)
  }, [clearTimers, isAutoPlaying, totalSlides])
  
  // Handle slide change
  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
    clearTimers()
    startAutoPlay()
  }, [clearTimers, startAutoPlay])
  
  // Next slide function
  const nextSlide = useCallback(() => {
    goToSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1)
  }, [currentSlide, goToSlide, totalSlides])
  
  // Previous slide function
  const prevSlide = useCallback(() => {
    goToSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1)
  }, [currentSlide, goToSlide, totalSlides])
  
  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchPosition(e.touches[0].clientX)
  }
  
  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchPosition === null) return
    
    const diff = touchPosition - e.touches[0].clientX
    
    if (diff > 50) {
      nextSlide()
      setTouchPosition(null)
    } else if (diff < -50) {
      prevSlide()
      setTouchPosition(null)
    }
  }
  
  // Determine how many items to show based on screen size
  useEffect(() => {
    const handleResize = () => {
      let newVisibleItems = itemsToShow
      
      if (window.innerWidth < 640) {
        newVisibleItems = 1
      } else if (window.innerWidth < 768) {
        newVisibleItems = 2
      } else if (window.innerWidth < 1024) {
        newVisibleItems = 3
      } else {
        newVisibleItems = itemsToShow
      }
      
      if (newVisibleItems !== visibleItems) {
        setVisibleItems(newVisibleItems)
        
        // Reset current slide to prevent empty slides
        setCurrentSlide(0)
      }
    }
    
    // Initial call
    handleResize()
    
    // Add event listener
    window.addEventListener('resize', handleResize)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [itemsToShow, visibleItems])
  
  // Start autoplay on mount and when dependencies change
  useEffect(() => {
    startAutoPlay()
    
    return () => {
      clearTimers()
    }
  }, [startAutoPlay, clearTimers, currentSlide, visibleItems])
  
  // Get visible members for current slide
  const visibleMembers = members.slice(
    currentSlide * visibleItems,
    (currentSlide * visibleItems) + visibleItems
  )
  
  // Pad with empty slots if needed
  const paddedMembers = [...visibleMembers]
  while (paddedMembers.length < visibleItems) {
    paddedMembers.push({ name: "", role: "" })
  }
  
  return (
    <div className="relative">
      <div 
        ref={carouselRef}
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div className="flex transition-transform duration-500 ease-in-out">
          <div className="flex w-full">
            <div className={`grid grid-cols-${visibleItems} gap-6 w-full`} style={{
              display: "grid",
              gridTemplateColumns: `repeat(${visibleItems}, minmax(0, 1fr))`,
              gap: "1.5rem"
            }}>
              {paddedMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: member.name ? 1 : 0, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {member.name && <MemberCard member={member} />}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation buttons */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </button>
        </>
      )}
      
      {/* Dots navigation */}
      {totalSlides > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === index 
                  ? "w-6 bg-blue-600 dark:bg-blue-400" 
                  : "w-2 bg-gray-300 dark:bg-gray-600"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function MemberCard({ member }: { member: MemberType }) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg dark:bg-gray-700 h-full">
      <div className="aspect-square relative">
        <Image
          src={`/placeholder.svg?height=300&width=300&text=${encodeURIComponent(member.name)}`}
          alt={member.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="font-bold text-blue-700 dark:text-blue-300">{member.name}</h3>
        <p className="text-gray-600 dark:text-gray-300">{member.role}</p>
      </div>
    </Card>
  )
}
