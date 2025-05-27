"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import type React from "react"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type MemberType = {
  name: string
  role: string
  image: string
}

export default function MembersSection() {
  const [fullscreenMember, setFullscreenMember] = useState<MemberType | null>(null);
  
  const committeeMembers: MemberType[] = [
    { name: "PARTHA MUKHOPADHYAY", role: "President", image: "mpartha.jpg" },
    { name: "ANAMIKA GUPTA", role: "Treasurer", image: "manamika.jpg" },
    { name: "SWARUP CHANRA CHANDA", role: "Secretary", image: "mswarup.jpg" },
    { name: "DEBAADITYA MUKHOPADHYAY", role: "Vice-President", image: "mDEBAADITYA.jpg" },
    { name: "SUBHADEEP PAUL", role: "Assistant-Secretary", image: "mSUBHADEEP.jpg" },
  ]

  const regularMembers: MemberType[] = [
    { name: "PRADIP PAUL", role: "Member", image: "mpradip.jpg" },
    { name: "SAYAN MUKHERJEE", role: "Member", image: "msayan.jpg" },
    { name: "JAYATI MUKHERJEE", role: "Member", image: "mjayati.jpg" },
    { name: "DOLA ROYCHOWDHURY", role: "Member", image: "mdola.jpg" },
    { name: "OINDRILA BANIK", role: "Member", image: "moindrilla.jpg" },
    { name: "PRATICHI PANTI", role: "Member", image: "mpratichi.jpg" },
    { name: "AYUSHI ROYCHOWDHURY", role: "Member", image: "mayushi.jpg" },
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
          <MemberCarousel 
            members={committeeMembers} 
            itemsToShow={5} 
            onMemberClick={(member) => setFullscreenMember(member)}
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-center text-blue-700 dark:text-blue-300 mb-8">Members</h2>
          <MemberCarousel 
            members={regularMembers} 
            itemsToShow={4} 
            onMemberClick={(member) => setFullscreenMember(member)}
          />
        </div>
      </div>
      
      {/* Fullscreen Member Modal */}
      <AnimatePresence>
        {fullscreenMember && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
            onClick={() => setFullscreenMember(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full h-full max-w-4xl max-h-[90vh] m-4 flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full max-w-md aspect-square">
                <Image
                  src={fullscreenMember.image}
                  alt={fullscreenMember.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="mt-6 text-center bg-black bg-opacity-50 py-4 px-6 rounded-lg">
                <h2 className="text-2xl font-bold text-white">{fullscreenMember.name}</h2>
                <p className="text-xl text-yellow-400 mt-2">{fullscreenMember.role}</p>
              </div>
              <button 
                className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setFullscreenMember(null)}
              >
                <X className="h-6 w-6 text-gray-800 dark:text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface MemberCarouselProps {
  members: MemberType[]
  itemsToShow: number
  onMemberClick: (member: MemberType) => void
}

function MemberCarousel({ members, itemsToShow, onMemberClick }: MemberCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [visibleItems, setVisibleItems] = useState(itemsToShow)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [touchPosition, setTouchPosition] = useState<number | null>(null)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null)
  const [gridGap, setGridGap] = useState("1.5rem")

  // Calculate total number of slides - ensure we show all members
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
    if (!isAutoPlaying || totalSlides <= 1) return

    clearTimers()

    // Set timer for next slide
    autoPlayTimerRef.current = setTimeout(() => {
      setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
    }, 5000)
  }, [clearTimers, isAutoPlaying, totalSlides])

  // Handle slide change
  const goToSlide = useCallback(
    (index: number) => {
      setCurrentSlide(index)
      clearTimers()
      startAutoPlay()
    },
    [clearTimers, startAutoPlay],
  )

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
    clearTimers()
    setTouchPosition(e.touches[0].clientX)
  }

  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchPosition === null) return

    const currentPosition = e.touches[0].clientX
    const diff = touchPosition - currentPosition

    if (Math.abs(diff) > 10) {
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
    setTimeout(() => {
      startAutoPlay()
    }, 1000)
  }

  // Debounce function to prevent too many resize events
  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout | null = null

    return function executedFunction(...args: any[]) {
      const later = () => {
        timeout = null
        func(...args)
      }

      if (timeout) {
        clearTimeout(timeout)
      }
      timeout = setTimeout(later, wait)
    }
  }

  // Determine how many items to show based on screen size
  useEffect(() => {
    const handleResize = debounce(() => {
      let newVisibleItems = itemsToShow

      if (window.innerWidth < 640) {
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

        const currentFirstMemberIndex = currentSlide * visibleItems
        const newSlideIndex = Math.floor(currentFirstMemberIndex / newVisibleItems)
        setCurrentSlide(Math.min(newSlideIndex, Math.ceil(members.length / newVisibleItems) - 1))
      }
    }, 200)

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
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
  const startIndex = currentSlide * visibleItems
  const endIndex = Math.min(startIndex + visibleItems, members.length)
  const visibleMembers = members.slice(startIndex, endIndex)

  // For display purposes, we'll show all members in a grid that adapts to the number of items
  const actualItemsToShow = totalSlides === 1 ? members.length : visibleItems

  return (
    <div className="relative px-4 sm:px-0">
      {/* Mobile swipe indicator - only visible on small screens */}
      {totalSlides > 1 && (
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
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.5,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            >
              <ChevronLeft className="h-4 w-4 inline mr-1" />
            </motion.div>
            Swipe to navigate
            <motion.div
              animate={{ x: [0, -10, 0] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.5,
                repeatType: "loop",
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <ChevronRight className="h-4 w-4 inline ml-1" />
            </motion.div>
          </motion.div>
        </div>
      )}

      <div
        ref={carouselRef}
        className="overflow-hidden touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {totalSlides === 1 ? (
          // Single slide - show all members in a responsive grid
          <div
            className="grid w-full"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
              gap: gridGap,
              justifyContent: "center",
            }}
          >
            {members.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
                className="px-1 sm:px-0"
              >
                <MemberCard member={member} onClick={() => onMemberClick(member)} />
              </motion.div>
            ))}
          </div>
        ) : (
          // Multiple slides - use carousel
          <motion.div
            className="flex"
            initial={{ x: 0 }}
            animate={{
              x: `-${currentSlide * 100}%`,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.5,
            }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => {
              const slideStartIndex = slideIndex * visibleItems
              const slideEndIndex = Math.min(slideStartIndex + visibleItems, members.length)
              const slideMembers = members.slice(slideStartIndex, slideEndIndex)

              return (
                <div key={slideIndex} className="flex-shrink-0 w-full">
                  <div
                    className="grid w-full"
                    style={{
                      display: "grid",
                      gridTemplateColumns: `repeat(${visibleItems}, minmax(0, 1fr))`,
                      gap: gridGap,
                    }}
                  >
                    {slideMembers.map((member, index) => (
                      <motion.div
                        key={`${slideIndex}-${index}`}
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1,
                          type: "spring",
                          stiffness: 200,
                        }}
                        className="px-1 sm:px-0"
                      >
                        <MemberCard member={member} onClick={() => onMemberClick(member)} />
                      </motion.div>
                    ))}
                    {/* Fill empty slots in the last slide */}
                    {Array.from({ length: visibleItems - slideMembers.length }).map((_, emptyIndex) => (
                      <div key={`empty-${slideIndex}-${emptyIndex}`} className="px-1 sm:px-0" />
                    ))}
                  </div>
                </div>
              )
            })}
          </motion.div>
        )}
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
                opacity: currentSlide === index ? 1 : 0.7,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function MemberCard({ member, onClick }: { member: MemberType; onClick: () => void }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
      onClick={onClick}
    >
      <Card className="overflow-hidden dark:bg-gray-700 h-full shadow-md hover:shadow-xl border-2 border-transparent hover:border-blue-300 dark:hover:border-blue-500 cursor-pointer">
        <div className="aspect-square relative overflow-hidden">
          {member.name && member.image && (
            <Image
              src={member.image || "/placeholder.svg"}
              alt={member.name}
              fill
              className="object-cover transition-transform duration-500 hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              priority
            />
          )}
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
