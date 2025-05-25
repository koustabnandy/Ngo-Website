"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  glareEffect?: boolean
  perspective?: number
  scale?: number
  speed?: number
  max?: number
}

export default function TiltCard({
  children,
  className = "",
  glareEffect = true,
  perspective = 1000,
  scale = 1.05,
  speed = 500,
  max = 15,
}: TiltCardProps) {
  const [isHovering, setIsHovering] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Motion values for tracking mouse position
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  // Add spring physics for smoother animation
  const springConfig = { damping: 25, stiffness: 120, mass: 1.2 } // Adjusted for smoother motion
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), springConfig)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), springConfig)
  
  // Glare effect values
  const glareX = useTransform(x, [-0.5, 0.5], [0, 100])
  const glareY = useTransform(y, [-0.5, 0.5], [0, 100])
  const glareOpacity = useTransform(
    [rotateX, rotateY],
    ([latestX, latestY]) => {
      const xAbs = Math.abs(latestX as number)
      const yAbs = Math.abs(latestY as number)
      return Math.min(1, (xAbs + yAbs) / (max * 1.5))
    }
  )
  
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    
    // Calculate normalized mouse position (-0.5 to 0.5)
    const normalizedX = (e.clientX - rect.left) / width - 0.5
    const normalizedY = (e.clientY - rect.top) / height - 0.5
    
    x.set(normalizedX)
    y.set(normalizedY)
  }
  
  function handleMouseEnter() {
    setIsHovering(true)
  }
  
  function handleMouseLeave() {
    setIsHovering(false)
    // Reset to neutral position
    x.set(0)
    y.set(0)
  }
  
  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: perspective,
        transformStyle: "preserve-3d",
      }}
      animate={{ scale: isHovering ? scale : 1 }}
      transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      <motion.div
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d",
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 120,
          mass: 1.2,
          duration: speed / 1000,
        }}
      >
        {children}
        
        {/* Glare effect */}
        {glareEffect && isHovering && (
          <motion.div
            className="absolute inset-0 w-full h-full pointer-events-none rounded-[inherit] overflow-hidden"
            style={{
              background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 80%)`,
              opacity: glareOpacity,
              mixBlendMode: "overlay",
            }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}