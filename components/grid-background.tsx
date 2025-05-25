"use client"

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface GridBackgroundProps {
  className?: string
  gridSize?: number
  lineColor?: string
  dotColor?: string
  interactive?: boolean
}

export default function GridBackground({
  className = "",
  gridSize = 40,
  lineColor = "rgba(59, 130, 246, 0.1)",
  dotColor = "rgba(59, 130, 246, 0.3)",
  interactive = true
}: GridBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { scrollYProgress } = useScroll()
  
  // Parallax effect for grid
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, 100])
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const container = containerRef.current
    if (!container) return
    
    // Set canvas size to match container
    const resizeCanvas = () => {
      const { width, height } = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      
      canvas.width = width * dpr
      canvas.height = height * dpr
      
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      
      ctx.scale(dpr, dpr)
      
      drawGrid()
    }
    
    // Draw the grid
    const drawGrid = () => {
      if (!ctx || !canvas) return
      
      const { width, height } = canvas.getBoundingClientRect()
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height)
      
      // Calculate grid dimensions
      const cols = Math.ceil(width / gridSize) + 1
      const rows = Math.ceil(height / gridSize) + 1
      
      // Get scroll offset for parallax effect
      const scrollOffset = yOffset.get()
      const offsetY = scrollOffset % gridSize
      
      // Draw vertical lines
      ctx.beginPath()
      ctx.strokeStyle = lineColor
      ctx.lineWidth = 1
      
      for (let i = 0; i < cols; i++) {
        const x = i * gridSize
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
      }
      
      // Draw horizontal lines with parallax effect
      for (let i = 0; i < rows; i++) {
        const y = i * gridSize - offsetY
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
      }
      
      ctx.stroke()
      
      // Draw dots at intersections
      ctx.fillStyle = dotColor
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize
          const y = j * gridSize - offsetY
          
          ctx.beginPath()
          ctx.arc(x, y, 1.5, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }
    
    // Interactive effect - dots follow cursor
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive || !ctx || !canvas) return
      
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      // Redraw grid
      drawGrid()
      
      // Draw interactive dots that react to cursor
      const radius = 100 // Influence radius
      const cols = Math.ceil(rect.width / gridSize) + 1
      const rows = Math.ceil(rect.height / gridSize) + 1
      const scrollOffset = yOffset.get()
      const offsetY = scrollOffset % gridSize
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const dotX = i * gridSize
          const dotY = j * gridSize - offsetY
          
          const distX = x - dotX
          const distY = y - dotY
          const distance = Math.sqrt(distX * distX + distY * distY)
          
          if (distance < radius) {
            // Calculate dot size based on distance from cursor
            const size = 3 * (1 - distance / radius) + 1.5
            
            // Draw enlarged dot
            ctx.beginPath()
            ctx.fillStyle = `rgba(59, 130, 246, ${0.3 + 0.5 * (1 - distance / radius)})`
            ctx.arc(dotX, dotY, size, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }
    }
    
    // Initial draw
    resizeCanvas()
    
    // Add event listeners
    window.addEventListener('resize', resizeCanvas)
    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove)
    }
    
    // Update on scroll for parallax effect
    const unsubscribeY = yOffset.on('change', drawGrid)
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (interactive) {
        canvas?.removeEventListener('mousemove', handleMouseMove)
      }
      unsubscribeY()
    }
  }, [gridSize, lineColor, dotColor, interactive, yOffset])
  
  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 overflow-hidden ${className}`}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0"
      />
    </div>
  )
}