"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from 'next/image'
import SectionHeader from './section-header'
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface PledgeImage {
  src: string
  alt: string
}

const WePledge = () => {
  const pledgeImages: PledgeImage[] = [
    { src: '/Youth Pledge.jpg', alt: 'Youth Pledge' },
    { src: '/Road Safety Pledge.jpg', alt: 'Road Safety Pledge' },
    { src: '/Lifestyle for the Environment.jpg', alt: 'Lifestyle for the Environment' },
    { src: '/download5.jpg', alt: 'Pledge Image 5' },
    { src: '/download4.jpg', alt: 'Pledge Image 4' },
    { src: '/download3.jpg', alt: 'Pledge Image 3' },
    { src: '/download.jpg', alt: 'Pledge Image' },
    { src: '/download 2.jpg', alt: 'Pledge Image 2' },
    { src: '/download (2).jpg', alt: 'Pledge Image 2' },
    { src: '/download (1).jpg', alt: 'Pledge Image 1' },
  ]

  const [currentSlide, setCurrentSlide] = useState(0)
  const [visibleItems, setVisibleItems] = useState(5)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchPosition, setTouchPosition] = useState<number | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  // Refs
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  
  // Calculate total number of slides
  const totalSlides = Math.ceil(pledgeImages.length / visibleItems)
  
  // Clear all timers
  const clearTimers = useCallback(() => {
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current)
      autoPlayTimerRef.current = null
    }
  }, [])
  
  // Start autoplay
  const startAutoPlay = useCallback(() => {
    if (!isAutoPlaying || isHovered) return
    
    clearTimers()
    
    // Set timer for next slide
    autoPlayTimerRef.current = setTimeout(() => {
      setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
    }, 4000)
  }, [clearTimers, isAutoPlaying, totalSlides, isHovered])
  
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
      let newVisibleItems = 5 // Default for large screens
      
      if (window.innerWidth < 640) {
        newVisibleItems = 1
      } else if (window.innerWidth < 768) {
        newVisibleItems = 2
      } else if (window.innerWidth < 1024) {
        newVisibleItems = 3
      } else {
        newVisibleItems = 5
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
  }, [visibleItems])
  
  // Start autoplay on mount and when dependencies change
  useEffect(() => {
    startAutoPlay()
    
    return () => {
      clearTimers()
    }
  }, [startAutoPlay, clearTimers, currentSlide, visibleItems])
  
  // Get visible images for current slide
  const getVisibleImages = () => {
    const startIndex = currentSlide * visibleItems
    const endIndex = startIndex + visibleItems
    
    // Return the visible images for the current slide
    return pledgeImages.slice(startIndex, endIndex)
  }
  
  // Pad with empty slots if needed
  const visibleImages = getVisibleImages()
  const paddedImages = [...visibleImages]
  while (paddedImages.length < visibleItems) {
    paddedImages.push({ src: "", alt: "" })
  }

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="WE PLEDGE"
          description="Our commitment to various social causes and initiatives"
        />
        
        <div className="mt-10 relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false)
            startAutoPlay()
          }}
        >
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
                  <AnimatePresence mode="wait">
                    {paddedImages.map((image, index) => (
                      <motion.div
                        key={`${currentSlide}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: image.src ? 1 : 0, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        {image.src && (
                          <div 
                            className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-64"
                          >
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-10 transition-opacity duration-300 flex items-end">
                              <div className="p-4 text-white">
                                <h3 className="text-lg font-semibold">{image.alt}</h3>
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
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
      </div>
    </div>
  )
}

export default WePledge