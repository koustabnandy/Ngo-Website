"use client"

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxSectionProps {
  children: React.ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  speed?: number
  overflow?: boolean
}

export default function ParallaxSection({
  children,
  className = "",
  direction = 'up',
  speed = 0.5,
  overflow = false,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
    smooth: 0.5 // Add smoothing to the scroll progress
  })
  
  // Calculate transform based on direction
  let transformProperty
  
  switch (direction) {
    case 'up':
      transformProperty = useTransform(scrollYProgress, [0, 1], ['0%', `-${speed * 100}%`])
      break
    case 'down':
      transformProperty = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`])
      break
    case 'left':
      transformProperty = useTransform(scrollYProgress, [0, 1], ['0%', `-${speed * 100}%`])
      break
    case 'right':
      transformProperty = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`])
      break
    default:
      transformProperty = useTransform(scrollYProgress, [0, 1], ['0%', `-${speed * 100}%`])
  }
  
  const style = direction === 'left' || direction === 'right'
    ? { x: transformProperty }
    : { y: transformProperty }
  
  return (
    <div 
      ref={ref} 
      className={`${className} ${overflow ? 'overflow-visible' : 'overflow-hidden'}`}
    >
      <motion.div 
        style={style}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 30,
          restDelta: 0.001
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}