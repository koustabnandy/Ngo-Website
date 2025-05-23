"use client"

import { useState, useEffect, useRef } from "react"
import { useInView } from "framer-motion"

interface CounterAnimationProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

export default function CounterAnimation({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  className = "text-3xl font-bold text-blue-600 dark:text-blue-400"
}: CounterAnimationProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [hasAnimated, setHasAnimated] = useState(false)
  
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
      
      let startTime: number
      let animationFrame: number
      
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        
        setCount(Math.floor(progress * end))
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(step)
        }
      }
      
      animationFrame = requestAnimationFrame(step)
      
      return () => {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isInView, end, duration, hasAnimated])
  
  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}