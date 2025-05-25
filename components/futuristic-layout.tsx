"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FuturisticLoader from './futuristic-loader-fixed'

interface FuturisticLayoutProps {
  children: React.ReactNode
}

export default function FuturisticLayout({ children }: FuturisticLayoutProps) {
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)
    
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <>
      <AnimatePresence>
        {isLoading && <FuturisticLoader minimumDisplayTime={2500} />}
      </AnimatePresence>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </>
  )
}