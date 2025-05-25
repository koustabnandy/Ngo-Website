"use client"

import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorEffect() {
  const [isVisible, setIsVisible] = useState(false)
  const [isPointer, setIsPointer] = useState(false)
  
  // Mouse position
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Spring physics for smooth cursor movement
  const springConfig = { damping: 25, stiffness: 400 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)
  
  // Cursor dot (smaller, follows cursor exactly)
  const dotX = useSpring(mouseX, { damping: 50, stiffness: 800 })
  const dotY = useSpring(mouseY, { damping: 50, stiffness: 800 })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setIsVisible(true)
    }
    
    const handleMouseLeave = () => {
      setIsVisible(false)
    }
    
    const handleMouseEnter = () => {
      setIsVisible(true)
    }
    
    // Check if cursor is over clickable elements
    const handleElementChange = () => {
      const hoveredElement = document.elementFromPoint(
        mouseX.get(),
        mouseY.get()
      )
      
      if (hoveredElement) {
        const computedStyle = window.getComputedStyle(hoveredElement)
        setIsPointer(
          computedStyle.cursor === 'pointer' || 
          hoveredElement.tagName === 'A' || 
          hoveredElement.tagName === 'BUTTON' ||
          hoveredElement.classList.contains('cursor-pointer')
        )
      } else {
        setIsPointer(false)
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousemove', handleElementChange)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    
    // Disable on mobile/touch devices
    if ('ontouchstart' in window) {
      setIsVisible(false)
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousemove', handleElementChange)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [mouseX, mouseY])
  
  // Hide the default cursor when our custom one is visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.cursor = 'none'
    } else {
      document.body.style.cursor = 'auto'
    }
    
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [isVisible])
  
  if (!isVisible) return null
  
  return (
    <>
      {/* Main cursor circle */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: isPointer ? 'transparent' : 'white',
          border: isPointer ? '2px solid white' : 'none',
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
      
      {/* Cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  )
}