"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface FuturisticLoaderProps {
  minimumDisplayTime?: number
}

export default function FuturisticLoader({ 
  minimumDisplayTime = 2000 
}: FuturisticLoaderProps) {
  // We don't need to manage loading state here anymore
  // as it's controlled by the parent component
  
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    // Set isClient to true when component mounts on client
    setIsClient(true)
    
    // Set initial window size
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
    
    // Update window size on resize
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  // Loader animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    exit: { 
      y: -20, 
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  }
  
  const progressVariants = {
    hidden: { width: "0%" },
    visible: { 
      width: "100%",
      transition: { 
        duration: minimumDisplayTime / 1000,
        ease: "easeInOut"
      }
    }
  }
  
  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-black z-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Logo or icon */}
      <motion.div 
        className="mb-8"
        variants={itemVariants}
      >
        <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center">
          <span className="text-white text-4xl font-bold">NIRVRITI</span>
        </div>
      </motion.div>
      
      {/* Loading text */}
      <motion.h2 
        className="text-white text-2xl font-light mb-8"
        variants={itemVariants}
      >
        <span className="animate-shimmer-text">Bliss in Helping others</span>
      </motion.h2>
      
      {/* Progress bar */}
      <motion.div 
        className="w-64 h-1 bg-blue-900 rounded-full overflow-hidden mb-4"
        variants={itemVariants}
      >
        <motion.div
          className="h-full bg-blue-400"
          variants={progressVariants}
        />
      </motion.div>
      
      {/* Loading percentage */}
      <motion.div 
        className="text-blue-300 text-sm"
        variants={itemVariants}
      >
        Please wait...
      </motion.div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-0 right-0 top-0 bottom-0" 
               style={{ 
                 backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(59, 130, 246, 0.3) 25%, rgba(59, 130, 246, 0.3) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.3) 75%, rgba(59, 130, 246, 0.3) 76%, transparent 77%, transparent)',
                 backgroundSize: '60px 60px',
                 animation: 'gradient-shift 3s linear infinite'
               }}
          />
          <div className="absolute left-0 right-0 top-0 bottom-0" 
               style={{ 
                 backgroundImage: 'linear-gradient(90deg, transparent 24%, rgba(59, 130, 246, 0.3) 25%, rgba(59, 130, 246, 0.3) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.3) 75%, rgba(59, 130, 246, 0.3) 76%, transparent 77%, transparent)',
                 backgroundSize: '60px 60px',
                 animation: 'gradient-shift 3s linear infinite'
               }}
          />
        </div>
        
        {/* Floating particles */}
        {isClient && [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-blue-400"
            initial={{ 
              x: Math.random() * windowSize.width, 
              y: Math.random() * windowSize.height,
              opacity: Math.random() * 0.5 + 0.3
            }}
            animate={{ 
              y: [null, Math.random() * -100, null],
              opacity: [null, Math.random() * 0.8 + 0.2, null]
            }}
            transition={{ 
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              filter: `blur(${Math.random() * 2}px)`
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}