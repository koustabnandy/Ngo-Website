"use client"

import React, { useState, useCallback, ReactNode } from "react"

interface SwipeContainerProps {
  children: ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeStart?: () => void
  onSwipeEnd?: () => void
  threshold?: number
  className?: string
  style?: React.CSSProperties
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
}) => {
  const [touchPosition, setTouchPosition] = useState<number | null>(null)
  
  // Handle touch start
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchPosition(e.touches[0].clientX)
    if (onSwipeStart) onSwipeStart()
  }, [onSwipeStart])
  
  // Handle touch move
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (touchPosition === null) return
    
    const currentPosition = e.touches[0].clientX
    const diff = touchPosition - currentPosition
    
    // Check if swipe distance exceeds threshold
    if (Math.abs(diff) > threshold) {
      if (diff > 0 && onSwipeLeft) {
        onSwipeLeft()
      } else if (diff < 0 && onSwipeRight) {
        onSwipeRight()
      }
      
      // Reset touch position after swipe is detected
      setTouchPosition(null)
    }
  }, [touchPosition, threshold, onSwipeLeft, onSwipeRight])
  
  // Handle touch end
  const handleTouchEnd = useCallback(() => {
    setTouchPosition(null)
    if (onSwipeEnd) onSwipeEnd()
  }, [onSwipeEnd])
  
  return (
    <div
      className={`touch-pan-y ${className}`}
      style={{ ...style }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  )
}

export default SwipeContainer