"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import SwipeContainer from "./swipe-container"
import useSwipeNavigation from "@/hooks/use-swipe-navigation"

interface SwipeExampleProps {
  items: React.ReactNode[]
  autoPlay?: boolean
  showControls?: boolean
  showIndicators?: boolean
  className?: string
}

/**
 * SwipeExample - A simple carousel component with swipe navigation
 * 
 * @param items - Array of React nodes to display in the carousel
 * @param autoPlay - Whether to auto-play the carousel (default: false)
 * @param showControls - Whether to show navigation controls (default: true)
 * @param showIndicators - Whether to show slide indicators (default: true)
 * @param className - Additional CSS classes
 */
const SwipeExample = ({
  items,
  autoPlay = false,
  showControls = true,
  showIndicators = true,
  className = "",
}: SwipeExampleProps) => {
  const {
    currentIndex,
    progressWidth,
    isAutoPlaying,
    goToIndex,
    goToNext,
    goToPrev,
    toggleAutoPlay,
    handleSwipeStart,
    handleSwipeEnd,
  } = useSwipeNavigation({
    totalItems: items.length,
    autoPlay,
    autoPlayInterval: 5000,
    loop: true,
  })

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Progress Bar (only visible when auto-playing) */}
      {isAutoPlaying && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 z-10">
          <motion.div 
            className="h-full bg-blue-600"
            style={{ width: `${progressWidth}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
      )}
      
      <SwipeContainer
        onSwipeLeft={goToNext}
        onSwipeRight={goToPrev}
        onSwipeStart={handleSwipeStart}
        onSwipeEnd={handleSwipeEnd}
        threshold={5} // Lower threshold for easier swiping
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              opacity: { duration: 0.3 }
            }}
            className="w-full"
          >
            {items[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </SwipeContainer>
      
      {/* Navigation Controls */}
      {showControls && items.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation()
              goToPrev()
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-200" />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-200" />
          </button>
        </>
      )}
      
      {/* Indicators */}
      {showIndicators && items.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 z-10">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === index 
                  ? "bg-blue-600 w-4" 
                  : "bg-gray-400 dark:bg-gray-600"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
      
      {/* Auto-play Toggle */}
      {autoPlay && (
        <button
          onClick={toggleAutoPlay}
          className="absolute bottom-2 right-2 bg-white/80 dark:bg-gray-800/80 p-1 rounded-full text-xs z-10"
          aria-label={isAutoPlaying ? "Pause" : "Play"}
        >
          {isAutoPlaying ? "Pause" : "Play"}
        </button>
      )}
    </div>
  )
}

export default SwipeExample