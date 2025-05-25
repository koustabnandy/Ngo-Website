"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Play, Pause, Settings } from "lucide-react"
import SwipeContainer from "./swipe-container"
import useSwipeNavigation from "@/hooks/use-swipe-navigation"
import { slideVariants, navButtonVariants, progressVariants } from "@/lib/animation-variants"

interface SwipeExampleProps {
  items: React.ReactNode[]
  autoPlay?: boolean
  showControls?: boolean
  showIndicators?: boolean
  className?: string
  animationVariant?: keyof typeof slideVariants
  showSwipeHint?: boolean
  enableMouseDrag?: boolean
  controlsStyle?: "minimal" | "default" | "floating" | "hidden"
  indicatorStyle?: "dots" | "lines" | "numbers" | "thumbnails" | "hidden"
  progressBarStyle?: "top" | "bottom" | "hidden"
  autoPlayInterval?: number
}

/**
 * SwipeExample - A carousel component with swipe navigation and animation options
 * 
 * @param items - Array of React nodes to display in the carousel
 * @param autoPlay - Whether to auto-play the carousel (default: false)
 * @param showControls - Whether to show navigation controls (default: true)
 * @param showIndicators - Whether to show slide indicators (default: true)
 * @param className - Additional CSS classes
 * @param animationVariant - Animation variant to use for transitions
 * @param showSwipeHint - Whether to show a swipe hint animation on first render
 * @param enableMouseDrag - Whether to enable mouse drag for desktop users
 * @param controlsStyle - Style of navigation controls
 * @param indicatorStyle - Style of slide indicators
 * @param progressBarStyle - Style of progress bar
 * @param autoPlayInterval - Interval for auto-play in milliseconds
 */
const SwipeExample = ({
  items,
  autoPlay = false,
  showControls = true,
  showIndicators = true,
  className = "",
  animationVariant = "default",
  showSwipeHint = true,
  enableMouseDrag = true,
  controlsStyle = "default",
  indicatorStyle = "dots",
  progressBarStyle = "top",
  autoPlayInterval = 5000,
}: SwipeExampleProps) => {
  const [direction, setDirection] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<keyof typeof slideVariants>(animationVariant);
  
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
    autoPlayInterval,
    loop: true,
  });

  // Handle next slide with direction
  const handleNext = () => {
    setDirection(1);
    goToNext();
  };

  // Handle previous slide with direction
  const handlePrev = () => {
    setDirection(-1);
    goToPrev();
  };

  // Get control button classes based on style
  const getControlClasses = () => {
    switch (controlsStyle) {
      case "minimal":
        return "bg-transparent text-white/90 hover:text-white p-1";
      case "floating":
        return "bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg backdrop-blur-sm";
      case "hidden":
        return "hidden";
      default:
        return "bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md";
    }
  };

  // Get indicator classes based on style
  const getIndicatorClasses = (isActive: boolean) => {
    switch (indicatorStyle) {
      case "lines":
        return `h-1 ${isActive ? "w-8 bg-blue-600" : "w-4 bg-gray-400 dark:bg-gray-600"}`;
      case "numbers":
        return `w-6 h-6 flex items-center justify-center text-xs font-medium ${
          isActive 
            ? "bg-blue-600 text-white" 
            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
        }`;
      case "hidden":
        return "hidden";
      default: // dots
        return `w-2 h-2 rounded-full transition-all ${
          isActive 
            ? "bg-blue-600 w-4" 
            : "bg-gray-400 dark:bg-gray-600"
        }`;
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Progress Bar */}
      {isAutoPlaying && progressBarStyle !== "hidden" && (
        <div className={`absolute ${progressBarStyle === "bottom" ? "bottom-0" : "top-0"} left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 z-10`}>
          <motion.div 
            className="h-full bg-blue-600"
            style={{ width: `${progressWidth}%` }}
            variants={progressVariants}
            initial="start"
            animate="end"
            key={currentIndex}
            transition={{ duration: autoPlayInterval / 1000, ease: "linear" }}
          />
        </div>
      )}
      
      <SwipeContainer
        onSwipeLeft={handleNext}
        onSwipeRight={handlePrev}
        onSwipeStart={handleSwipeStart}
        onSwipeEnd={handleSwipeEnd}
        threshold={5}
        showSwipeHint={showSwipeHint}
        animationVariant={selectedVariant}
        showFeedback={true}
        enableMouseDrag={enableMouseDrag}
      >
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div 
            key={currentIndex}
            custom={direction}
            variants={slideVariants[selectedVariant]}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full"
          >
            {items[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </SwipeContainer>
      
      {/* Navigation Controls */}
      {showControls && items.length > 1 && controlsStyle !== "hidden" && (
        <>
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 ${getControlClasses()}`}
            aria-label="Previous slide"
            variants={navButtonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-200" />
          </motion.button>
          
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 ${getControlClasses()}`}
            aria-label="Next slide"
            variants={navButtonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-200" />
          </motion.button>
        </>
      )}
      
      {/* Indicators */}
      {showIndicators && items.length > 1 && indicatorStyle !== "hidden" && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          {items.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                goToIndex(index);
              }}
              className={`rounded-full transition-all ${getIndicatorClasses(currentIndex === index)}`}
              aria-label={`Go to slide ${index + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {indicatorStyle === "numbers" && (index + 1)}
            </motion.button>
          ))}
        </div>
      )}
      
      {/* Controls */}
      <div className="absolute bottom-4 right-4 flex gap-2 z-10">
        {/* Auto-play Toggle */}
        {autoPlay && (
          <motion.button
            onClick={toggleAutoPlay}
            className="bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md backdrop-blur-sm"
            aria-label={isAutoPlaying ? "Pause" : "Play"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
          </motion.button>
        )}
        
        {/* Animation Settings */}
        <motion.button
          onClick={() => setShowSettings(!showSettings)}
          className="bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md backdrop-blur-sm"
          aria-label="Animation settings"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Settings size={16} />
        </motion.button>
      </div>
      
      {/* Animation Settings Panel */}
      {showSettings && (
        <motion.div
          className="absolute bottom-16 right-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg z-20 w-48"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          <h4 className="text-sm font-medium mb-2">Animation Style</h4>
          <div className="space-y-1">
            {Object.keys(slideVariants).map((variant) => (
              <button
                key={variant}
                onClick={() => setSelectedVariant(variant as keyof typeof slideVariants)}
                className={`text-xs px-2 py-1 rounded w-full text-left ${
                  selectedVariant === variant 
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200" 
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default SwipeExample