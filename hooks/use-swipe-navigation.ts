import { useState, useCallback, useRef, useEffect } from "react"

interface UseSwipeNavigationProps {
  totalItems: number
  initialIndex?: number
  autoPlay?: boolean
  autoPlayInterval?: number
  loop?: boolean
  onSlideChange?: (index: number, direction: number) => void
  pauseOnHover?: boolean
  pauseOnInteraction?: boolean
  resetProgressOnChange?: boolean
  keyboardNavigation?: boolean
  touchNavigation?: boolean
  mouseWheelNavigation?: boolean
}

/**
 * A custom hook for managing carousel/swipe navigation state with enhanced options
 * 
 * @param totalItems - Total number of items in the carousel
 * @param initialIndex - Initial active index (default: 0)
 * @param autoPlay - Whether to auto-play the carousel (default: false)
 * @param autoPlayInterval - Interval for auto-play in milliseconds (default: 5000)
 * @param loop - Whether to loop back to the first item after the last (default: true)
 * @param onSlideChange - Callback when slide changes, receives index and direction
 * @param pauseOnHover - Whether to pause autoplay on hover (default: true)
 * @param pauseOnInteraction - Whether to pause autoplay on user interaction (default: false)
 * @param resetProgressOnChange - Whether to reset progress bar on slide change (default: true)
 * @param keyboardNavigation - Whether to enable keyboard navigation (default: true)
 * @param touchNavigation - Whether to enable touch navigation (default: true)
 * @param mouseWheelNavigation - Whether to enable mouse wheel navigation (default: false)
 */
const useSwipeNavigation = ({
  totalItems,
  initialIndex = 0,
  autoPlay = false,
  autoPlayInterval = 5000,
  loop = true,
  onSlideChange,
  pauseOnHover = true,
  pauseOnInteraction = false,
  resetProgressOnChange = true,
  keyboardNavigation = true,
  touchNavigation = true,
  mouseWheelNavigation = false,
}: UseSwipeNavigationProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay)
  const [isPaused, setIsPaused] = useState(false)
  const [progressWidth, setProgressWidth] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  
  // Refs
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null)
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  
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
    // Reset progress if needed
    if (resetProgressOnChange) {
      setProgressWidth(0)
    }
    
    // Clear any existing progress timer
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current)
    }
    
    // Start new progress timer
    const interval = 50 // Update every 50ms
    const steps = autoPlayInterval / interval
    let currentStep = resetProgressOnChange ? 0 : (progressWidth / 100) * steps
    
    progressTimerRef.current = setInterval(() => {
      currentStep++
      const newWidth = (currentStep / steps) * 100
      setProgressWidth(newWidth)
      
      if (currentStep >= steps) {
        clearInterval(progressTimerRef.current!)
      }
    }, interval)
  }, [autoPlayInterval, progressWidth, resetProgressOnChange])
  
  // Start autoplay
  const startAutoPlay = useCallback(() => {
    if (!isAutoPlaying || isPaused) return
    
    clearTimers()
    
    // Start progress bar
    startProgressBar()
    
    // Set timer for next slide
    autoPlayTimerRef.current = setTimeout(() => {
      setDirection(1) // Set direction to forward
      goToIndex(currentIndex + 1)
    }, autoPlayInterval)
  }, [clearTimers, isAutoPlaying, isPaused, startProgressBar, autoPlayInterval, currentIndex])
  
  // Go to specific index with animation handling
  const goToIndex = useCallback((index: number, newDirection?: number) => {
    if (isAnimating) return // Prevent rapid changes during animation
    
    // Set animation direction if provided
    if (newDirection !== undefined) {
      setDirection(newDirection)
    }
    
    let newIndex = index
    
    // Handle loop behavior
    if (index < 0) {
      newIndex = loop ? totalItems - 1 : 0
    } else if (index >= totalItems) {
      newIndex = loop ? 0 : totalItems - 1
    }
    
    // Only update if the index is actually changing
    if (newIndex !== currentIndex) {
      setIsAnimating(true)
      setCurrentIndex(newIndex)
      
      // Call the onSlideChange callback with direction
      if (onSlideChange) onSlideChange(newIndex, direction)
      
      // Reset animation state after transition
      setTimeout(() => {
        setIsAnimating(false)
      }, 500) // Match this with your animation duration
    }
    
    clearTimers()
    
    // Only restart autoplay if not paused by interaction
    if (!pauseOnInteraction || !isPaused) {
      startAutoPlay()
    }
  }, [
    isAnimating, loop, totalItems, currentIndex, 
    direction, onSlideChange, clearTimers, 
    pauseOnInteraction, isPaused, startAutoPlay
  ])
  
  // Go to next slide
  const goToNext = useCallback(() => {
    setDirection(1)
    goToIndex(currentIndex + 1, 1)
  }, [currentIndex, goToIndex])
  
  // Go to previous slide
  const goToPrev = useCallback(() => {
    setDirection(-1)
    goToIndex(currentIndex - 1, -1)
  }, [currentIndex, goToIndex])
  
  // Toggle autoplay
  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying(prev => !prev)
    setIsPaused(false) // Reset pause state when toggling
  }, [])
  
  // Pause autoplay (for hover)
  const pauseAutoPlay = useCallback(() => {
    if (pauseOnHover && isAutoPlaying) {
      setIsPaused(true)
      clearTimers()
    }
  }, [pauseOnHover, isAutoPlaying, clearTimers])
  
  // Resume autoplay (for hover)
  const resumeAutoPlay = useCallback(() => {
    if (pauseOnHover && isAutoPlaying) {
      setIsPaused(false)
      startAutoPlay()
    }
  }, [pauseOnHover, isAutoPlaying, startAutoPlay])
  
  // Handle swipe start
  const handleSwipeStart = useCallback(() => {
    clearTimers()
    if (pauseOnInteraction) {
      setIsPaused(true)
    }
  }, [clearTimers, pauseOnInteraction])
  
  // Handle swipe end
  const handleSwipeEnd = useCallback(() => {
    if (isAutoPlaying && (!pauseOnInteraction || !isPaused)) {
      startAutoPlay()
    }
  }, [isAutoPlaying, pauseOnInteraction, isPaused, startAutoPlay])
  
  // Set container ref
  const setContainerRef = useCallback((ref: HTMLDivElement | null) => {
    containerRef.current = ref
  }, [])
  
  // Initialize autoplay on mount and when dependencies change
  useEffect(() => {
    if (isAutoPlaying && !isPaused) {
      startAutoPlay()
    }
    
    return () => {
      clearTimers()
    }
  }, [isAutoPlaying, isPaused, startAutoPlay, clearTimers, currentIndex, totalItems])
  
  // Handle visibility change (tab change)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearTimers()
      } else if (isAutoPlaying && !isPaused) {
        startAutoPlay()
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [clearTimers, startAutoPlay, isAutoPlaying, isPaused])
  
  // Handle keyboard navigation
  useEffect(() => {
    if (!keyboardNavigation) return
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle keyboard events when the carousel is in viewport
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const isInViewport = 
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        
        if (isInViewport) {
          if (e.key === 'ArrowLeft') {
            goToPrev()
            e.preventDefault()
          } else if (e.key === 'ArrowRight') {
            goToNext()
            e.preventDefault()
          } else if (e.key === 'Space') {
            toggleAutoPlay()
            e.preventDefault()
          }
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [keyboardNavigation, goToPrev, goToNext, toggleAutoPlay])
  
  // Handle mouse wheel navigation
  useEffect(() => {
    if (!mouseWheelNavigation || !containerRef.current) return
    
    const handleWheel = (e: WheelEvent) => {
      // Debounce wheel events
      if (isAnimating) return
      
      if (e.deltaY > 0) {
        goToNext()
      } else if (e.deltaY < 0) {
        goToPrev()
      }
      
      e.preventDefault()
    }
    
    const container = containerRef.current
    
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
      
      return () => {
        container.removeEventListener('wheel', handleWheel)
      }
    }
  }, [mouseWheelNavigation, isAnimating, goToNext, goToPrev])
  
  return {
    currentIndex,
    progressWidth,
    isAutoPlaying,
    isPaused,
    direction,
    goToIndex,
    goToNext,
    goToPrev,
    toggleAutoPlay,
    pauseAutoPlay,
    resumeAutoPlay,
    handleSwipeStart,
    handleSwipeEnd,
    setContainerRef,
  }
}

export default useSwipeNavigation