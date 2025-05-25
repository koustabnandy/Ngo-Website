"use client"

import React, { useState, useCallback, ReactNode, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { slideVariants, swipeHintVariants } from "@/lib/animation-variants"

interface SwipeContainerProps {
  children: ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeStart?: () => void
  onSwipeEnd?: () => void
  threshold?: number
  className?: string
  style?: React.CSSProperties
  showSwipeHint?: boolean
  animationVariant?: keyof typeof slideVariants
  showFeedback?: boolean
  disableSwipeAfterAction?: boolean
  swipeDirection?: "horizontal" | "vertical" | "both"
  enableMouseDrag?: boolean
}

/**
 * SwipeContainer - A reusable component that adds swipe navigation to any content
 * 
 * @param children - The content to be rendered inside the swipe container
 * @param onSwipeLeft - Callback function when user swipes left (next)
 * @param onSwipeRight - Callback function when user swipes right (previous)
 * @param onSwipeStart - Callback function when swipe starts
 * @param onSwipeEnd - Callback function when swipe ends
 * @param threshold - Minimum distance required to trigger a swipe (default: 10)
 * @param className - Additional CSS classes
 * @param style - Additional inline styles
 * @param showSwipeHint - Whether to show a swipe hint animation on first render
 * @param animationVariant - Animation variant to use for transitions
 * @param showFeedback - Whether to show visual feedback during swipe
 * @param disableSwipeAfterAction - Whether to disable swiping temporarily after an action
 * @param swipeDirection - Direction of swipe to detect (horizontal, vertical, or both)
 * @param enableMouseDrag - Whether to enable mouse drag for desktop users
 */
const SwipeContainer: React.FC<SwipeContainerProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeStart,
  onSwipeEnd,
  threshold = 10,
  className = "",
  style = {},
  showSwipeHint = false,
  animationVariant = "default",
  showFeedback = true,
  disableSwipeAfterAction = false,
  swipeDirection = "horizontal",
  enableMouseDrag = false,
}) => {
  const [touchPosition, setTouchPosition] = useState<{ x: number; y: number } | null>(null)
  const [swipeDistance, setSwipeDistance] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [showHint, setShowHint] = useState(showSwipeHint)
  const [swipeDisabled, setSwipeDisabled] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  
  // Hide swipe hint after 3 seconds
  useEffect(() => {
    if (showHint) {
      const timer = setTimeout(() => {
        setShowHint(false)
      }, 3000)
      
      return () => clearTimeout(timer)
    }
  }, [showHint])
  
  // Re-enable swiping after a delay
  useEffect(() => {
    if (swipeDisabled) {
      const timer = setTimeout(() => {
        setSwipeDisabled(false)
      }, 500)
      
      return () => clearTimeout(timer)
    }
  }, [swipeDisabled])
  
  // Handle touch start
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (swipeDisabled) return
    
    setTouchPosition({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    })
    
    if (onSwipeStart) onSwipeStart()
    setShowHint(false)
  }, [onSwipeStart, swipeDisabled])
  
  // Handle mouse down for desktop drag
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!enableMouseDrag || swipeDisabled) return
    
    setTouchPosition({
      x: e.clientX,
      y: e.clientY
    })
    
    setIsDragging(true)
    
    if (onSwipeStart) onSwipeStart()
    setShowHint(false)
    
    // Prevent text selection during drag
    e.preventDefault()
  }, [enableMouseDrag, onSwipeStart, swipeDisabled])
  
  // Handle touch move
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (touchPosition === null || swipeDisabled) return
    
    const currentPosition = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }
    
    const diff = {
      x: touchPosition.x - currentPosition.x,
      y: touchPosition.y - currentPosition.y
    }
    
    // Update swipe distance for visual feedback
    if (showFeedback) {
      setSwipeDistance({
        x: -diff.x * 0.5, // Scale down the movement for subtle effect
        y: -diff.y * 0.5
      })
    }
    
    // Determine swipe direction based on settings
    const isHorizontalSwipe = swipeDirection !== "vertical" && Math.abs(diff.x) > Math.abs(diff.y) * 1.5
    const isVerticalSwipe = swipeDirection !== "horizontal" && Math.abs(diff.y) > Math.abs(diff.x) * 1.5
    
    // Check if swipe distance exceeds threshold
    if (isHorizontalSwipe && Math.abs(diff.x) > threshold) {
      if (diff.x > 0 && onSwipeLeft) {
        onSwipeLeft()
        if (disableSwipeAfterAction) setSwipeDisabled(true)
      } else if (diff.x < 0 && onSwipeRight) {
        onSwipeRight()
        if (disableSwipeAfterAction) setSwipeDisabled(true)
      }
      
      // Reset touch position after swipe is detected
      setTouchPosition(null)
      setSwipeDistance({ x: 0, y: 0 })
    } else if (isVerticalSwipe && Math.abs(diff.y) > threshold) {
      // Handle vertical swipes if needed in the future
      
      // Reset touch position after swipe is detected
      setTouchPosition(null)
      setSwipeDistance({ x: 0, y: 0 })
    }
  }, [touchPosition, threshold, onSwipeLeft, onSwipeRight, swipeDirection, showFeedback, swipeDisabled, disableSwipeAfterAction])
  
  // Handle mouse move for desktop drag
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!enableMouseDrag || !isDragging || touchPosition === null || swipeDisabled) return
    
    const currentPosition = {
      x: e.clientX,
      y: e.clientY
    }
    
    const diff = {
      x: touchPosition.x - currentPosition.x,
      y: touchPosition.y - currentPosition.y
    }
    
    // Update swipe distance for visual feedback
    if (showFeedback) {
      setSwipeDistance({
        x: -diff.x * 0.5,
        y: -diff.y * 0.5
      })
    }
    
    // Determine swipe direction based on settings
    const isHorizontalSwipe = swipeDirection !== "vertical" && Math.abs(diff.x) > Math.abs(diff.y) * 1.5
    
    // Check if swipe distance exceeds threshold
    if (isHorizontalSwipe && Math.abs(diff.x) > threshold) {
      if (diff.x > 0 && onSwipeLeft) {
        onSwipeLeft()
        if (disableSwipeAfterAction) setSwipeDisabled(true)
      } else if (diff.x < 0 && onSwipeRight) {
        onSwipeRight()
        if (disableSwipeAfterAction) setSwipeDisabled(true)
      }
      
      // Reset after swipe is detected
      setTouchPosition(null)
      setSwipeDistance({ x: 0, y: 0 })
      setIsDragging(false)
    }
  }, [enableMouseDrag, isDragging, touchPosition, threshold, onSwipeLeft, onSwipeRight, swipeDirection, showFeedback, swipeDisabled, disableSwipeAfterAction])
  
  // Handle touch end
  const handleTouchEnd = useCallback(() => {
    setTouchPosition(null)
    setSwipeDistance({ x: 0, y: 0 })
    if (onSwipeEnd) onSwipeEnd()
  }, [onSwipeEnd])
  
  // Handle mouse up for desktop drag
  const handleMouseUp = useCallback(() => {
    if (!enableMouseDrag) return
    
    setTouchPosition(null)
    setSwipeDistance({ x: 0, y: 0 })
    setIsDragging(false)
    if (onSwipeEnd) onSwipeEnd()
  }, [enableMouseDrag, onSwipeEnd])
  
  // Add and remove mouse event listeners
  useEffect(() => {
    if (enableMouseDrag) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [enableMouseDrag, handleMouseMove, handleMouseUp])
  
  return (
    <div
      ref={containerRef}
      className={`relative touch-pan-y ${className}`}
      style={{ 
        ...style,
        cursor: isDragging ? 'grabbing' : (enableMouseDrag ? 'grab' : 'default'),
        perspective: '1000px', // For 3D effects
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
    >
      {/* Content with transform for visual feedback */}
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
        }}
        animate={{
          x: swipeDistance.x,
          y: swipeDistance.y,
          transition: { type: 'spring', stiffness: 300, damping: 30 }
        }}
      >
        {children}
      </motion.div>
      
      {/* Swipe hint animation */}
      {showHint && (
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 text-white px-4 py-2 rounded-full z-50 flex items-center gap-2 pointer-events-none"
          variants={swipeHintVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <ChevronLeft size={16} />
          <span className="text-sm font-medium">Swipe to navigate</span>
          <ChevronRight size={16} />
        </motion.div>
      )}
    </div>
  )
}

export default SwipeContainer