"use client"

import { useRef, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  once?: boolean
  highlightWords?: string[]
  highlightColor?: string
  type?: 'words' | 'chars' | 'lines'
  staggerChildren?: number
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'bounce' | 'scale'
}

export default function AnimatedText({
  text,
  className = "",
  once = true,
  highlightWords = [],
  highlightColor = "text-blue-500",
  type = 'words',
  staggerChildren = 0.05,
  animation = 'fade'
}: AnimatedTextProps) {
  const [isInView, setIsInView] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  
  // Check for mobile device on component mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (once) {
            observer.unobserve(entry.target)
          }
        } else if (!once) {
          setIsInView(false)
        }
      },
      {
        threshold: 0.2,
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
  }, [once])
  
  // Define animation variants based on the selected animation type
  const getAnimationVariants = () => {
    // For mobile or reduced motion preference, use simpler animations
    if (isMobile || prefersReducedMotion) {
      return {
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { duration: 0.3 }
        }
      }
    }
    
    // Full animations for desktop
    switch (animation) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        }
      case 'slide-up':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 }
        }
      case 'slide-down':
        return {
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0 }
        }
      case 'slide-left':
        return {
          hidden: { opacity: 0, x: 20 },
          visible: { opacity: 1, x: 0 }
        }
      case 'slide-right':
        return {
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0 }
        }
      case 'bounce':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 10
            }
          }
        }
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 10
            }
          }
        }
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        }
    }
  }
  
  // Adjust stagger timing for mobile
  const getStaggerValue = () => {
    return isMobile || prefersReducedMotion ? staggerChildren * 0.5 : staggerChildren;
  };
  
  const variants = {
    container: {
      hidden: { opacity: 0 },
      visible: (i = 1) => ({
        opacity: 1,
        transition: { 
          staggerChildren: getStaggerValue(), 
          delayChildren: (isMobile || prefersReducedMotion) ? 0.05 * i : 0.1 * i 
        }
      })
    },
    item: getAnimationVariants()
  }
  
  // Split text based on type
  const renderText = () => {
    // For mobile with 'chars' type, switch to 'words' for better performance
    const effectiveType = (isMobile && type === 'chars') ? 'words' : type;
    
    if (effectiveType === 'chars') {
      return text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={variants.item}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))
    } else if (effectiveType === 'words') {
      return text.split(' ').map((word, index) => {
        const isHighlighted = highlightWords.includes(word)
        return (
          <motion.span
            key={index}
            className={`inline-block ${isHighlighted ? highlightColor : ''}`}
            variants={variants.item}
          >
            {word}
            {index !== text.split(' ').length - 1 && '\u00A0'}
          </motion.span>
        )
      })
    } else if (effectiveType === 'lines') {
      return text.split('\n').map((line, index) => (
        <motion.div
          key={index}
          className="block"
          variants={variants.item}
        >
          {line}
        </motion.div>
      ))
    }
  }
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants.container}
    >
      {renderText()}
    </motion.div>
  )
}