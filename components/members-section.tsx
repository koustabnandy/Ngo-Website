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
  const [gridGap, setGridGap] = useState("1.5rem")
  
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
    // Pause autoplay when user starts touching
    clearTimers()
    setTouchPosition(e.touches[0].clientX)
  }
  
  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchPosition === null) return
    
    const currentPosition = e.touches[0].clientX
    const diff = touchPosition - currentPosition
    
    // Reduced minimum swipe distance for better mobile responsiveness
    if (Math.abs(diff) > 10) { // Even more sensitive for mobile
      if (diff > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
      setTouchPosition(null)
    }
  }
  
  // Handle touch end
  const handleTouchEnd = () => {
    setTouchPosition(null)
    // Delay starting autoplay to prevent immediate slide change after user interaction
    setTimeout(() => {
      startAutoPlay()
    }, 1000)
  }
  
  // Debounce function to prevent too many resize events
  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout | null = null;
    
    return function executedFunction(...args: any[]) {
      const later = () => {
        timeout = null;
        func(...args);
      };
      
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(later, wait);
    };
  };
  
  // Determine how many items to show based on screen size
  useEffect(() => {
    const handleResize = debounce(() => {
      let newVisibleItems = itemsToShow
      
      // Set grid gap based on screen size
      if (window.innerWidth < 640) {
        // Always show 1 item on mobile for better carousel experience
        newVisibleItems = 1
        setGridGap("1rem")
      } else if (window.innerWidth < 768) {
        newVisibleItems = 2
        setGridGap("1.25rem")
      } else if (window.innerWidth < 1024) {
        newVisibleItems = 3
        setGridGap("1.5rem")
      } else {
        newVisibleItems = itemsToShow
        setGridGap("1.5rem")
      }
      
      if (newVisibleItems !== visibleItems) {
        setVisibleItems(newVisibleItems)
        
        // Calculate the first member index in the current slide
        const currentFirstMemberIndex = currentSlide * visibleItems;
        
        // Calculate which slide should show this member with the new visible items count
        const newSlideIndex = Math.floor(currentFirstMemberIndex / newVisibleItems);
        
        // Set the new slide index, ensuring it doesn't exceed the maximum
        setCurrentSlide(Math.min(newSlideIndex, Math.ceil(members.length / newVisibleItems) - 1));
      }
    }, 200);
    
    // Initial call
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [itemsToShow, visibleItems, currentSlide, members.length])
  
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
    <div className="relative px-4 sm:px-0">
      {/* Mobile swipe indicator - only visible on small screens */}
      <div className="md:hidden flex justify-center mb-4">
        <motion.div 
          className="flex items-center text-blue-600 dark:text-blue-400 text-sm bg-blue-50 dark:bg-gray-700 px-3 py-1.5 rounded-full shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5,
              repeatType: "loop",
              ease: "easeInOut"
            }}
          >
            <ChevronLeft className="h-4 w-4 inline mr-1" />
          </motion.div>
          Swipe to navigate
          <motion.div
            animate={{ x: [0, -10, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5,
              repeatType: "loop",
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            <ChevronRight className="h-4 w-4 inline ml-1" />
          </motion.div>
        </motion.div>
      </div>
      
      <div 
        ref={carouselRef}
        className="overflow-hidden touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div 
          className="flex"
          initial={{ x: 0 }}
          animate={{ 
            x: `-${currentSlide * 100}%` 
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.5
          }}
        >
          <div className="flex w-full">
            <div className={`grid grid-cols-${visibleItems} w-full`} style={{
              display: "grid",
              gridTemplateColumns: `repeat(${visibleItems}, minmax(0, 1fr))`,
              gap: gridGap
            }}>
              {paddedMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ 
                    opacity: member.name ? 1 : 0, 
                    y: 0,
                    scale: 1
                  }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 200
                  }}
                  className="px-1 sm:px-0" // Add padding on mobile for better spacing
                >
                  {member.name && <MemberCard member={member} />}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Navigation buttons */}
      {totalSlides > 1 && (
        <>
          <motion.button
            onClick={prevSlide}
            className="absolute left-0 sm:left-0 top-1/2 -translate-y-1/2 sm:-translate-x-1/2 bg-white/90 dark:bg-gray-700/90 rounded-full p-2 sm:p-3 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 z-10 border border-gray-200 dark:border-gray-600"
            aria-label="Previous slide"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
          </motion.button>
          
          <motion.button
            onClick={nextSlide}
            className="absolute right-0 sm:right-0 top-1/2 -translate-y-1/2 sm:translate-x-1/2 bg-white/90 dark:bg-gray-700/90 rounded-full p-2 sm:p-3 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 z-10 border border-gray-200 dark:border-gray-600"
            aria-label="Next slide"
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
          </motion.button>
        </>
      )}
      
      {/* Dots navigation */}
      {totalSlides > 1 && (
        <div className="flex justify-center mt-8 space-x-3">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 sm:h-2 rounded-full ${
                currentSlide === index 
                  ? "w-8 sm:w-6 bg-blue-600 dark:bg-blue-400" 
                  : "w-3 sm:w-2 bg-gray-300 dark:bg-gray-600"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              animate={{ 
                scale: currentSlide === index ? 1.1 : 1,
                opacity: currentSlide === index ? 1 : 0.7
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20 
              }}
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
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
    >
      <Card className="overflow-hidden dark:bg-gray-700 h-full shadow-md hover:shadow-xl border-2 border-transparent hover:border-blue-300 dark:hover:border-blue-500">
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={`/placeholder.svg?height=300&width=300&text=${encodeURIComponent(member.name)}`}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-500 hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <motion.div 
          className="p-3 sm:p-4 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-bold text-blue-700 dark:text-blue-300 text-sm sm:text-base">{member.name}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mt-1">{member.role}</p>
        </motion.div>
      </Card>
    </motion.div>
  )
}
