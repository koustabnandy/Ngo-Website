"use client"

import { useEffect, useState, useRef } from 'react'
import { Users, Calendar, Award, Heart } from 'lucide-react'
import ScrollAnimation from './scroll-animation'

interface StatProps {
  icon: React.ReactNode
  value: number
  label: string
  suffix?: string
  duration?: number
}

const StatCounter = ({ icon, value, label, suffix = "", duration = 2000 }: StatProps) => {
  const [count, setCount] = useState(0)
  const countRef = useRef<HTMLSpanElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )
    
    if (countRef.current) {
      observer.observe(countRef.current)
    }
    
    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current)
      }
    }
  }, [])
  
  useEffect(() => {
    if (!isVisible) return
    
    let start = 0
    const end = value
    const increment = end / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      setCount(Math.min(Math.floor(start), end))
      if (start >= end) clearInterval(timer)
    }, 16)
    
    return () => clearInterval(timer)
  }, [isVisible, value, duration])
  
  return (
    <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex justify-center mb-4 text-blue-600 dark:text-blue-400">
        {icon}
      </div>
      <h3 className="text-4xl font-bold text-blue-700 dark:text-blue-400 mb-2">
        <span ref={countRef}>{count}</span>{suffix}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{label}</p>
    </div>
  )
}

const ImpactStats = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-900/30">
      <ScrollAnimation animation="animate-fade-in-up" className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-montserrat">
          <span className="text-blue-800 dark:text-blue-400">Our</span>
          <span className="text-yellow-500 dark:text-yellow-400"> Impact</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          The difference we've made together in our community
        </p>
        <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
      </ScrollAnimation>
      
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCounter 
          icon={<Users size={36} />} 
          value={1500} 
          label="People Helped" 
          suffix="+" 
        />
        <StatCounter 
          icon={<Calendar size={36} />} 
          value={45} 
          label="Events Organized" 
        />
        <StatCounter 
          icon={<Award size={36} />} 
          value={12} 
          label="Years of Service" 
        />
        <StatCounter 
          icon={<Heart size={36} />} 
          value={250} 
          label="Regular Donors" 
          suffix="+" 
        />
      </div>
    </section>
  )
}

export default ImpactStats
