import { useState, useCallback, useRef, useEffect } from "react"

interface UseSwipeNavigationProps {
  totalItems: number
  initialIndex?: number
  autoPlay?: boolean
  autoPlayInterval?: number
  loop?: boolean
  onSlideChange?: (index: number) => void
}

/**
 * A custom hook for managing carousel/swipe navigation state
 * 
 * @param totalItems - Total number of items in the carousel
 * @param initialIndex - Initial active index (default: 0)
 * @param autoPlay - Whether to auto-play the carousel (default: false)
 * @param autoPlayInterval - Interval for auto-play in milliseconds (default: 5000)
 * @param loop - Whether to loop back to the first item after the last (default: true)
 * @param onSlideChange - Callback when slide changes
 */
const useSwipeNavigation = ({
  totalItems,
  initialIndex = 0,
  autoPlay = false,
  autoPlayInterval = 5000,
  loop = true,
  onSlideChange,
}: UseSwipeNavigationProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay)
  const [progressWidth, setProgressWidth] = useState(0)
  
  // Refs
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null)
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null)
  
  // Clear all timers
  const clearTimers = useCallback(() => {
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current)
      autoPlayTimerRef.current = null
    }
    
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current)
      progressTimerRef.current = null
    }
  }, [])
  
  // Start progress bar animation
  const startProgressBar = useCallback(() => {
    // Reset progress
    setProgressWidth(0)
    
    // Clear any existing progress timer
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current)
    }
    
    // Start new progress timer
    const interval = 50 // Update every 50ms
    const steps = autoPlayInterval / interval
    let currentStep = 0
    
    progressTimerRef.current = setInterval(() => {
      currentStep++
      const newWidth = (currentStep / steps) * 100
      setProgressWidth(newWidth)
      
      if (currentStep >= steps) {
        clearInterval(progressTimerRef.current!)
      }
    }, interval)
  }, [autoPlayInterval])
  
  // Start autoplay
  const startAutoPlay = useCallback(() => {
    if (!isAutoPlaying) return
    
    clearTimers()
    
    // Start progress bar
    startProgressBar()
    
    // Set timer for next slide
    autoPlayTimerRef.current = setTimeout(() => {
      goToNext()
    }, autoPlayInterval)
  }, [clearTimers, isAutoPlaying, startProgressBar, autoPlayInterval])
  
  // Go to specific index
  const goToIndex = useCallback((index: number) => {
    let newIndex = index
    
    // Handle loop behavior
    if (index < 0) {
      newIndex = loop ? totalItems - 1 : 0
    } else if (index >= totalItems) {
      newIndex = loop ? 0 : totalItems - 1
    }
    
    setCurrentIndex(newIndex)
    if (onSlideChange) onSlideChange(newIndex)
    
    clearTimers()
    startAutoPlay()
  }, [totalItems, loop, clearTimers, startAutoPlay, onSlideChange])
  
  // Go to next slide
  const goToNext = useCallback(() => {
    goToIndex(currentIndex + 1)
  }, [currentIndex, goToIndex])
  
  // Go to previous slide
  const goToPrev = useCallback(() => {
    goToIndex(currentIndex - 1)
  }, [currentIndex, goToIndex])
  
  // Toggle autoplay
  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying(prev => !prev)
  }, [])
  
  // Handle swipe start
  const handleSwipeStart = useCallback(() => {
    clearTimers()
  }, [clearTimers])
  
  // Handle swipe end
  const handleSwipeEnd = useCallback(() => {
    if (isAutoPlaying) {
      startAutoPlay()
    }
  }, [isAutoPlaying, startAutoPlay])
  
  // Initialize autoplay on mount and when dependencies change
  useEffect(() => {
    if (isAutoPlaying) {
      startAutoPlay()
    }
    
    return () => {
      clearTimers()
    }
  }, [isAutoPlaying, startAutoPlay, clearTimers, currentIndex, totalItems])
  
  // Handle visibility change (tab change)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearTimers()
      } else if (isAutoPlaying) {
        startAutoPlay()
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [clearTimers, startAutoPlay, isAutoPlaying])
  
  return {
    currentIndex,
    progressWidth,
    isAutoPlaying,
    goToIndex,
    goToNext,
    goToPrev,
    toggleAutoPlay,
    handleSwipeStart,
    handleSwipeEnd,
  }
}

export default useSwipeNavigation