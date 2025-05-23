"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const carouselItems = [
  {
    id: 1,
    image: "/3rd.png?height=800&width=1600",
    title: "Empowering Communities",
    description: "Making a difference in the lives of students and communities in Haridevpur, Kolkata",
    buttonText: "Get Started",
    buttonLink: "#membership",
  },
  {
    id: 2,
    image: "/2nd.jpg?height=800&width=1600",
    title: "New Clothes",
    description: "Providing essential educational resources to students of Sampark",
    buttonText: "Learn More",
    buttonLink: "#events",
  },
  {
    id: 3,
    image: "/1st.jpg?height=800&width=1600",
    title: "Join Our Mission",
    description: "Become a part of our journey to spread hope and create positive change",
    buttonText: "Donate Now",
    buttonLink: "/donate",
  },
  {
    id: 4,
    image: "/482222410_648874787530892_1556423695622188946_n.jpg?height=800&width=1600",
    title: "Community Impact",
    description: "Creating lasting change through collaborative community initiatives",
    buttonText: "Learn More",
    buttonLink: "#what-we-do",
  },
]

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchPosition, setTouchPosition] = useState<number | null>(null)
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1))
  }

  const startAutoPlay = () => {
    if (!isAutoPlaying) return
    
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current)
    }
    
    autoPlayTimerRef.current = setInterval(() => {
      nextSlide()
    }, 6000)
  }

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current)
    }
    setTouchPosition(e.touches[0].clientX)
  }
  
  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchPosition === null) {
      return
    }
    
    const currentPosition = e.touches[0].clientX
    const diff = touchPosition - currentPosition
    
    // Minimum swipe distance for better mobile responsiveness
    if (Math.abs(diff) > 30) {
      if (diff > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
      
      setTouchPosition(null)
      startAutoPlay()
    }
  }
  
  // Handle touch end
  const handleTouchEnd = () => {
    setTouchPosition(null)
    startAutoPlay()
  }

  // Initialize autoplay
  useEffect(() => {
    startAutoPlay()
    
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current)
      }
    }
  }, [isAutoPlaying])

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle keyboard events when the carousel is in viewport
      if (carouselRef.current) {
        const rect = carouselRef.current.getBoundingClientRect()
        const isInViewport = 
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        
        if (isInViewport) {
          if (e.key === 'ArrowLeft') {
            prevSlide()
          } else if (e.key === 'ArrowRight') {
            nextSlide()
          }
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 }
      }
    })
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    nextSlide();
  };

  const handlePrev = () => {
    setDirection(-1);
    prevSlide();
  };

  return (
    <div 
      className="relative h-screen w-full overflow-hidden" 
      ref={carouselRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-10" />
          <motion.div 
            className="relative h-full w-full"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6 }}
          >
            <Image
              src={carouselItems[currentSlide].image || "/placeholder.svg"}
              alt={carouselItems[currentSlide].title}
              fill
              className="object-cover"
              priority={true}
              quality={90}
            />
          </motion.div>
          <motion.div 
            className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white p-4"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg"
              variants={itemVariants}
            >
              {carouselItems[currentSlide].title}
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl max-w-2xl mb-8 drop-shadow-md"
              variants={itemVariants}
            >
              {carouselItems[currentSlide].description}
            </motion.p>
            <motion.div variants={itemVariants}>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                asChild
              >
                <a href={carouselItems[currentSlide].buttonLink}>{carouselItems[currentSlide].buttonText}</a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <motion.button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white p-3 rounded-full shadow-md"
        aria-label="Previous slide"
        whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.4)" }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <ChevronLeft size={20} />
      </motion.button>
      
      <motion.button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white p-3 rounded-full shadow-md"
        aria-label="Next slide"
        whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.4)" }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <ChevronRight size={20} />
      </motion.button>

      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        {carouselItems.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1);
              setCurrentSlide(index);
            }}
            className="relative flex items-center justify-center"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to slide ${index + 1}`}
          >
            <motion.span 
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
              animate={index === currentSlide ? 
                { scale: [1, 1.2, 1], backgroundColor: "#ffffff" } : 
                { scale: 1 }
              }
              transition={{ duration: 0.5 }}
            />
            {index === currentSlide && (
              <motion.span 
                className="absolute w-5 h-5 rounded-full border-2 border-white"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                layoutId="activeIndicator"
              />
            )}
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}

export default HeroCarousel
