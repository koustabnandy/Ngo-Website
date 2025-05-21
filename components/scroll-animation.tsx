// c:/Users/rajde/OneDrive/Desktop/Frontend/ngo/Ngo-Website/components/scroll-animation.tsx

"use client"

import { useEffect, useRef, ReactNode } from 'react'

interface ScrollAnimationProps {
  children: ReactNode
  className?: string
  animation: string
  threshold?: number
  delay?: number
}

export default function ScrollAnimation({ 
  children, 
  className = "", 
  animation, 
  threshold = 0.1,
  delay = 0 
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add(animation)
          }, delay)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px'
      }
    )
    
    if (ref.current) {
      observer.observe(ref.current)
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [animation, threshold, delay])
  
  return (
    <div 
      ref={ref} 
      className={`opacity-0 ${className}`}
    >
      {children}
    </div>
  )
}
