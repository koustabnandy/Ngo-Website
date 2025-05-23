"use client"

import { motion } from "framer-motion"

interface LoadingAnimationProps {
  size?: "small" | "medium" | "large"
  color?: "blue" | "yellow" | "green"
}

export default function LoadingAnimation({ 
  size = "medium", 
  color = "blue" 
}: LoadingAnimationProps) {
  const sizeMap = {
    small: "w-6 h-6",
    medium: "w-10 h-10",
    large: "w-16 h-16"
  }
  
  const colorMap = {
    blue: "border-blue-600 border-t-transparent",
    yellow: "border-yellow-500 border-t-transparent",
    green: "border-green-500 border-t-transparent"
  }
  
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizeMap[size]} border-4 ${colorMap[color]} rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  )
}