"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Heart, Users, Calendar, ChevronLeft, ChevronRight, MapPin, X } from "lucide-react"

// Custom CSS for hiding scrollbars while allowing scrolling
const scrollbarHideStyles = `
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;  /* Chrome, Safari and Opera */
  }
`

interface VolunteerReview {
  id: string
  name: string
  role: "volunteer"
  testimonial: string
  image?: string
  joinDate: string
  location: string
  rating: number
  volunteeredHours?: number
  favoriteActivity?: string
}

interface VolunteerReviewCardProps {
  review: VolunteerReview
  index: number
  getRoleIcon: (role: string, size?: number) => JSX.Element | null
  getRoleName: (role: string) => string
  getRoleColor: (role: string) => string
  onImageClick: (imageSrc: string, name: string) => void
}

// Extracted card component for reuse
const VolunteerReviewCard = ({ review, index, getRoleIcon, getRoleName, getRoleColor, onImageClick }: VolunteerReviewCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 25, 
        mass: 0.8, 
        delay: index * 0.08 
      }}
      whileHover={{ 
        y: -5,
        transition: { type: "spring", stiffness: 400, damping: 15 }
      }}
    >
      <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
        <CardContent className="p-0">
          {/* Header with profile image */}
          <div className="relative bg-gradient-to-r from-blue-50 to-yellow-50 dark:from-gray-700 dark:to-gray-800 p-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <motion.div
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-yellow-500 flex items-center justify-center text-white font-bold text-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.08 + 0.2, type: "spring", stiffness: 400 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (review.image) {
                      onImageClick(review.image, review.name);
                    }
                  }}
                >
                  {review.image ? (
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        // Fallback to generic volunteer image if specific image not found
                        const target = e.target as HTMLImageElement;
                        target.src = "/volenteer.jpg";
                        target.onerror = () => {
                          // If even fallback fails, hide image and show initial
                          target.style.display = 'none';
                          if (target.parentElement) {
                            target.parentElement.innerHTML = review.name.charAt(0).toUpperCase();
                          }
                        };
                      }}
                    />
                  ) : (
                    review.name.charAt(0).toUpperCase()
                  )}
                </motion.div>
                <motion.div 
                  className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-800 p-1 rounded-full shadow-md"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.08 + 0.3, type: "spring", stiffness: 400 }}
                >
                  {getRoleIcon(review.role, 16)}
                </motion.div>
              </div>
              
              <div className="flex-1">
                <motion.h3 
                  className="text-lg font-semibold text-gray-800 dark:text-gray-200"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 + 0.15 }}
                >
                  {review.name}
                </motion.h3>
                <motion.div 
                  className="flex items-center gap-2 mt-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 + 0.2 }}
                >
                  <span className={`px-2 py-1 text-xs rounded-full ${getRoleColor(review.role)} font-medium`}>
                    {getRoleName(review.role)}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <MapPin className="h-3 w-3 mr-1" /> {review.location}
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {/* Rating */}
            <motion.div 
              className="flex items-center gap-2 mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.08 + 0.25 }}
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, rotate: -45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    transition={{ delay: index * 0.08 + 0.3 + (i * 0.05), type: "spring", stiffness: 400 }}
                  >
                    <Star 
                      className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                    />
                  </motion.div>
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {review.rating}/5
              </span>
            </motion.div>
            
            {/* Testimonial */}
            <motion.blockquote 
              className="text-gray-700 dark:text-gray-300 text-sm mb-4 italic leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 + 0.35 }}
            >
              "{review.testimonial}"
            </motion.blockquote>
            
            {/* Additional Info */}
            <div className="space-y-2">
              <motion.div 
                className="flex items-center text-xs text-gray-600 dark:text-gray-400"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 + 0.4 }}
              >
                <Calendar className="h-3 w-3 mr-2" />
                Joined: {review.joinDate}
              </motion.div>
              
              {review.volunteeredHours && (
                <motion.div 
                  className="flex items-center text-xs text-gray-600 dark:text-gray-400"
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 + 0.45 }}
                >
                  <Heart className="h-3 w-3 mr-2 text-red-500" />
                  {review.volunteeredHours} hours volunteered
                </motion.div>
              )}
              
              {review.favoriteActivity && (
                <motion.div 
                  className="flex items-center text-xs text-gray-600 dark:text-gray-400"
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 + 0.5 }}
                >
                  <Users className="h-3 w-3 mr-2 text-blue-500" />
                  Favorite: {review.favoriteActivity}
                </motion.div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Sample volunteer reviews data with correct image paths
const volunteerReviews: VolunteerReview[] = [
  {
    id: "vol-1",
    name: "SOMDUTTA",
    role: "volunteer",
    testimonial: "My journey with Nirvriti started in 2023, when I began serving as a volunteer. The mission of helping needy people by providing clothes and raising funds for them is truly meaningful. During the Bengal's biggest festival, Durga Puja, I had the wonderful experience of distributing clothes and food packets to children. Seeing their bright smiles filled my heart with happiness and made my efforts feel truly rewarding. Visiting the orphanage and spending time with the little children there was also a deeply touching experience for me. Their smiles brought me immense joy. I will always be thankful to the entire team of Nirvriti to give me this chance. I look forward to continuing my journey with Nirvriti and supporting its wonderful work.",
    image: "/volunteers/somdutta.jpg",
    joinDate: "2023",
    location: "Kolkata, West Bengal",
    rating: 5,
    
    favoriteActivity: "Durga Puja Distribution & Orphanage Visits"
  },
  {
    id: "vol-2",
    name: "ANUSHWA",
    role: "volunteer",
    testimonial: "My internship with Nivriti took me to some truly eye opening places, but the day we did the Durga Panchami distribution really sticks out. We spent the day going around Kolkata, handing out food and packets and clothes to people in different areas. It was a whirlwind, seeing so many different situations and knowing that even a small gesture could bring some comfort. But the sheer scale of things at Sealdah station later that day was something else. There were just so many people, and we had this huge amount of supplies to give out. It was intense, but also moving to see the immediate need and the gratitude on people's faces. You could see how much even a simple meal or a piece of clothing meant to them. It was a really powerful day that made me feel like the work Nivriti does is so important and that I was a part of something meaningful, even as a volunteer.",
    image: "/volunteers/anushwa.jpg",
    joinDate: "2023",
    location: "Kolkata, West Bengal",
    rating: 5,
    favoriteActivity: "Durga Panchami Distribution at Sealdah Station"
  },
  {
    id: "vol-3",
    name: "RISIKA",
    role: "volunteer",
    testimonial: "For few months, I have had the privilege of working with Nirvriti. I am truly grateful to be a part of this organization and the initiatives they have taken for children who often go unnoticed in our busy world. Although my role at the NGO was not on the field, working behind the screen has been a meaningful and memorable experience. The sessions which taught me so much, and I feel truly overwhelmed to be a part of Nirvriti.",
    image: "/volunteers/risika.jpg",
    joinDate: "2022",
    location: "Kolkata, West Bengal",
    rating: 5,
    favoriteActivity: "Behind-the-scenes support & Training Sessions"
  },
  {
    id: "vol-4",
    name: "MOUPIA",
    role: "volunteer",
    testimonial: "Working with nirvriti has been, exceptionally the best. Understanding core root societal issues with how implementations can be enforced. Working so closely with the team was not one of my first initiatives but also a step closer to my academics understanding.",
    image: "/volunteers/moupia.jpg",
    joinDate: "2023",
    location: "Kolkata, West Bengal",
    rating: 5,
    
    favoriteActivity: "Societal Issue Analysis & Implementation"
  }
]

export default function VolunteerReviews() {
  const [filteredReviews, setFilteredReviews] = useState<VolunteerReview[]>(volunteerReviews)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchPosition, setTouchPosition] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; name: string } | null>(null)
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  
  // Set all reviews as filtered reviews since we only have volunteers now
  useEffect(() => {
    setFilteredReviews(volunteerReviews)
  }, [])
  
  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Initial check
    checkIfMobile()
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])
  
  // Clear all timers
  const clearTimers = useCallback(() => {
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current)
      autoPlayTimerRef.current = null
    }
  }, [])
  
  // Start autoplay
  const startAutoPlay = useCallback(() => {
    if (!isAutoPlaying || !isMobile) return
    
    clearTimers()
    
    // Set timer for next slide
    autoPlayTimerRef.current = setTimeout(() => {
      nextSlide()
    }, 6000) // Slightly longer for testimonials
  }, [clearTimers, isAutoPlaying, isMobile])
  
  // Handle slide change
  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
    clearTimers()
    startAutoPlay()
  }, [clearTimers, startAutoPlay])
  
  // Next slide function
  const nextSlide = useCallback(() => {
    const totalSlides = filteredReviews.length
    if (totalSlides <= 1) return
    
    goToSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1)
  }, [currentSlide, goToSlide, filteredReviews.length])
  
  // Previous slide function
  const prevSlide = useCallback(() => {
    const totalSlides = filteredReviews.length
    if (totalSlides <= 1) return
    
    goToSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1)
  }, [currentSlide, goToSlide, filteredReviews.length])
  
  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    clearTimers()
    setTouchPosition(e.touches[0].clientX)
  }
  
  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchPosition === null) return
    
    const currentPosition = e.touches[0].clientX
    const diff = touchPosition - currentPosition
    
    // Minimum swipe distance
    if (Math.abs(diff) > 10) {
      if (diff > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
      setTouchPosition(null)
    }
  }
  
  // Handle touch end
  const handleTouchEnd = () => {
    setTouchPosition(null)
    // Delay starting autoplay to prevent immediate slide change after user interaction
    setTimeout(() => {
      startAutoPlay()
    }, 1000)
  }
  
  // Start autoplay on mount and when dependencies change
  useEffect(() => {
    startAutoPlay()
    
    return () => {
      clearTimers()
    }
  }, [startAutoPlay, clearTimers, currentSlide, filteredReviews])
  
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedImage) {
        setSelectedImage(null)
      }
    }
    
    document.addEventListener('keydown', handleEscKey)
    return () => document.removeEventListener('keydown', handleEscKey)
  }, [selectedImage])
  
  // Handle image click
  const handleImageClick = (imageSrc: string, name: string) => {
    setSelectedImage({ src: imageSrc, alt: name, name })
  }
  
  // Handle close modal
  const handleCloseModal = () => {
    setSelectedImage(null)
  }
  
  const getRoleIcon = (role: string, size = 20) => {
    return <Heart size={size} className="text-red-500" />
  }
  
  const getRoleName = (role: string) => {
    return "Volunteer"
  }
  
  const getRoleColor = (role: string) => {
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
  }
  
  return (
    <section id="volunteer-reviews" className="py-16 bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-900">
      {/* Add custom styles for scrollbar hiding */}
      <style dangerouslySetInnerHTML={{ __html: scrollbarHideStyles }} />
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 dark:text-blue-400 mb-3 relative inline-block">
            Behind the Scenes: <span className="text-yellow-500 dark:text-yellow-400">Volunteer Insights</span>
            <span className="absolute -bottom-1 left-1/4 right-1/4 h-1 bg-gradient-to-r from-blue-500 to-yellow-500 rounded-full"></span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
            Hear from our amazing volunteers about their meaningful experiences and journey with Nirvriti Foundation.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 30, 
              mass: 0.8,
              opacity: { duration: 0.4 }
            }}
          >
            {/* Mobile swipe indicator - only visible on small screens */}
            {isMobile && filteredReviews.length > 1 && (
              <div className="md:hidden flex justify-center mb-4">
                <motion.div 
                  className="flex items-center text-blue-600 dark:text-blue-400 text-sm bg-blue-50 dark:bg-gray-700 px-3 py-1.5 rounded-full shadow-sm"
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ 
                    opacity: [0, 1, 1, 0.8, 0.6, 0.8, 1], 
                    y: 0,
                    scale: [0.9, 1.05, 1]
                  }}
                  transition={{ 
                    opacity: { 
                      times: [0, 0.2, 0.4, 0.5, 0.6, 0.8, 1],
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    },
                    scale: { 
                      times: [0, 0.5, 1],
                      duration: 1.5,
                      type: "spring",
                      stiffness: 200
                    },
                    y: { duration: 0.5, type: "spring" }
                  }}
                >
                  <motion.div
                    animate={{ 
                      x: [0, 8, 0],
                      opacity: [1, 0.7, 1]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 1.2,
                      repeatType: "mirror",
                      ease: "easeInOut"
                    }}
                  >
                    <ChevronLeft className="h-4 w-4 inline mr-1" />
                  </motion.div>
                  <motion.span
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2,
                      repeatType: "mirror"
                    }}
                  >
                    Swipe to read more
                  </motion.span>
                  <motion.div
                    animate={{ 
                      x: [0, -8, 0],
                      opacity: [1, 0.7, 1]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 1.2,
                      repeatType: "mirror",
                      ease: "easeInOut",
                      delay: 0.3
                    }}
                  >
                    <ChevronRight className="h-4 w-4 inline ml-1" />
                  </motion.div>
                </motion.div>
              </div>
            )}
            
            {/* Desktop grid view */}
            {!isMobile && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReviews.map((review, index) => (
                  <VolunteerReviewCard 
                    key={review.id} 
                    review={review} 
                    index={index} 
                    getRoleIcon={getRoleIcon} 
                    getRoleName={getRoleName} 
                    getRoleColor={getRoleColor}
                    onImageClick={handleImageClick}
                  />
                ))}
              </div>
            )}
            
            {/* Mobile carousel view */}
            {isMobile && (
              <div className="relative px-4 sm:px-0">
                <div 
                  ref={carouselRef}
                  className="overflow-hidden touch-pan-y"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <motion.div 
                    className="flex"
                    initial={{ x: 0 }}
                    animate={{ 
                      x: `-${currentSlide * 100}%` 
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 280,
                      damping: 26,
                      mass: 0.9,
                      restDelta: 0.001,
                      restSpeed: 0.001
                    }}
                  >
                    {filteredReviews.map((review, index) => (
                      <motion.div 
                        key={review.id} 
                        className="min-w-full px-1"
                        initial={{ opacity: 0.5, scale: 0.95 }}
                        animate={{ 
                          opacity: currentSlide === index ? 1 : 0.7,
                          scale: currentSlide === index ? 1 : 0.95,
                          filter: currentSlide === index ? "blur(0px)" : "blur(1px)"
                        }}
                        transition={{
                          opacity: { duration: 0.4 },
                          scale: { type: "spring", stiffness: 300, damping: 20 },
                          filter: { duration: 0.3 }
                        }}
                      >
                        <VolunteerReviewCard 
                          review={review} 
                          index={0} 
                          getRoleIcon={getRoleIcon} 
                          getRoleName={getRoleName} 
                          getRoleColor={getRoleColor}
                          onImageClick={handleImageClick}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
                
                {/* Navigation buttons */}
                {filteredReviews.length > 1 && (
                  <>
                    <motion.button
                      onClick={prevSlide}
                      className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-700/90 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 z-10 border border-gray-200 dark:border-gray-600"
                      aria-label="Previous review"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ 
                        scale: 1.15, 
                        x: -5,
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                      }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 500, 
                        damping: 20,
                        mass: 0.8
                      }}
                    >
                      <motion.div
                        animate={{ x: [0, -3, 0] }}
                        transition={{ 
                          repeat: Infinity, 
                          repeatType: "reverse", 
                          duration: 1.5,
                          ease: "easeInOut"
                        }}
                      >
                        <ChevronLeft className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </motion.div>
                    </motion.button>
                    
                    <motion.button
                      onClick={nextSlide}
                      className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-700/90 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 z-10 border border-gray-200 dark:border-gray-600"
                      aria-label="Next review"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ 
                        scale: 1.15, 
                        x: 5,
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                      }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 500, 
                        damping: 20,
                        mass: 0.8
                      }}
                    >
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ 
                          repeat: Infinity, 
                          repeatType: "reverse", 
                          duration: 1.5,
                          ease: "easeInOut"
                        }}
                      >
                        <ChevronRight className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </motion.div>
                    </motion.button>
                  </>
                )}
                
                {/* Dots navigation */}
                {filteredReviews.length > 1 && (
                  <div className="flex justify-center mt-6 space-x-3">
                    {Array.from({ length: filteredReviews.length }).map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-3 rounded-full ${
                          currentSlide === index 
                            ? "w-8 bg-blue-600 dark:bg-blue-400" 
                            : "w-3 bg-gray-300 dark:bg-gray-600"
                        }`}
                        whileHover={{ 
                          scale: 1.3,
                          y: -2,
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                        }}
                        whileTap={{ scale: 0.8, y: 1 }}
                        animate={{ 
                          scale: currentSlide === index ? [1, 1.15, 1.1] : 1,
                          opacity: currentSlide === index ? 1 : 0.7,
                          width: currentSlide === index ? "2rem" : "0.75rem",
                          backgroundColor: currentSlide === index 
                            ? ["#2563eb", "#3b82f6", "#2563eb"] // Subtle pulse effect for active dot
                            : undefined
                        }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 500, 
                          damping: 25,
                          mass: 0.8,
                          backgroundColor: {
                            repeat: Infinity,
                            duration: 2,
                            repeatType: "reverse"
                          },
                          scale: {
                            repeat: currentSlide === index ? Infinity : 0,
                            duration: 2,
                            repeatType: "reverse"
                          },
                          width: { type: "spring", stiffness: 500, damping: 30 }
                        }}
                        aria-label={`Go to review ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
          
          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Join Our Community
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Want to share your experience with us? Join our volunteer community and make a difference!
            </p>
            <div className="flex justify-center space-x-4">
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full"
                asChild
              >
                <a href="#volunteer-registration">
                  <Heart className="h-5 w-5 mr-2" />
                  Become a Volunteer
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full"
                asChild
              >
                <a href="#contact-section">
                  <Users className="h-5 w-5 mr-2" />
                  Contact Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 25,
                opacity: { duration: 0.3 }
              }}
              className="relative max-w-4xl max-h-[90vh] w-full h-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.1 }}
                onClick={handleCloseModal}
                className="absolute -top-12 right-0 bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-opacity-30 transition-all duration-200 z-10"
                aria-label="Close image"
              >
                <X className="h-6 w-6" />
              </motion.button>
              
              {/* Image container */}
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-full object-contain max-h-[80vh]"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/volenteer.jpg";
                  }}
                />
                
                {/* Image info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-6 text-white">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl font-bold mb-2"
                  >
                    {selectedImage.name}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-sm opacity-90"
                  >
                    Volunteer at Nirvriti Foundation
                  </motion.p>
                </div>
              </div>
              
              {/* Click to close hint */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center text-white text-sm mt-4 opacity-75"
              >
                Click anywhere outside the image or press ESC to close
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}