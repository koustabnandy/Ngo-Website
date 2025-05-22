"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageIcon, FileText, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"

const photos = [
  {
    id: 1,
    src: "/Spreading Environmental Conciousness.jpg",
    alt: "Environmental Awareness",
    caption: "Spreading Environmental Conciousness",
  },
  {
    id: 2,
    src: "/Setting up Computer Learning Centres.jpg",
    alt: "Computer Learning",
    caption: "Setting up Computer Learning Centres",
  },
  {
    id: 3,
    src: "/Planting Trees - ONE at a TIME.jpg",
    alt: "Tree Planting",
    caption: "Planting Trees - ONE at a Time",
  },
  {
    id: 4,
    src: "/New Saree Distribution.jpg",
    alt: "Saree Distribution",
    caption: "New Saree Distribution",
  },
  {
    id: 5,
    src: "/NEW Clothes for the Less Fortunate.jpg",
    alt: "Clothes Distribution",
    caption: "NEW Clothes for the Less Fortunate",
  },
  {
    id: 6,
    src: "/Mental Health Awareness Camp.jpg",
    alt: "Mental Health Camp",
    caption: "Mental Health Awareness Camp",
  },
  {
    id: 7,
    src: "/Menstrual Health Awareness.jpg",
    alt: "Menstrual Health",
    caption: "Menstrual Health Awareness",
  },
  {
    id: 8,
    src: "/Donating Old Clothes.jpg",
    alt: "Old Clothes Donation",
    caption: "Donating Old Clothes",
  },
  {
    id: 9,
    src: "/Distribution of Old Books to Orphanages.jpg",
    alt: "Book Distribution",
    caption: "Distribution of Old Books to Orphanages",
  },
  {
    id: 10,
    src: "/Distribution of Education Kits.jpg",
    alt: "Education Kits",
    caption: "Distribution of Education Kits",
  },
  {
    id: 11,
    src: "/Community Kitchen Practice.jpg",
    alt: "Community Kitchen",
    caption: "Community Kitchen Practice",
  },
  {
    id: 12,
    src: "/Beach Cleaning Activity.jpg",
    alt: "Beach Cleaning",
    caption: "Beach Cleaning Activities",
  },
]

const blogPosts = [
  {
    id: 1,
    title: "Annual Health Camp",
    excerpt:
      "A community-driven literacy program that impacted over 100 children in Haridevpur, fostering a culture of reading and learning.",
    date: "September 18, 2022",
    author: "NIRVRITI Foundation Team",
    image: "/health.jpg",
    slug: "https://www.facebook.com/reachnirvrti/reels", // Placeholder
  },
  {
    id: 2,
    title: "Clothes Donation Camp",
    excerpt:
      "This winter, our volunteers came together to distribute warm clothes and blankets to over 200 individuals in need.",
    date: "January 5, 2023",
    author: "NIRVRITI Foundation Volunteers",
    image: "/clothes.jpg",
    slug: "https://www.facebook.com/reel/1060444942573390",
  },
  {
    id: 3,
    title: "Community Meeting",
    excerpt:
      "A celebration filled with cultural programs, flag hoisting, and community meals to foster patriotism and unity.",
    date: "August 15, 2023",
    author: "Community Leaders",
    image: "/meeting.jpeg",
    slug: "https://www.facebook.com/reachnirvrti/reels/",
  },
]

const MediaSection = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<null | { src: string; alt: string; caption: string }>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [progressWidth, setProgressWidth] = useState(0)
  
  // Refs
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null)
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  
  // Touch handling
  const [touchPosition, setTouchPosition] = useState<number | null>(null)
  
  // Clear all timers
  const clearTimers = useCallback(() => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current)
      autoPlayTimerRef.current = null
    }
    
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current)
      progressTimerRef.current = null
    }
  }, [])
  
  // Start progress bar animation
  const startProgressBar = useCallback(() => {
    // Reset progress
    setProgressWidth(0)
    
    // Clear any existing progress timer
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current)
    }
    
    // Start new progress timer
    const duration = 5000 // 5 seconds
    const interval = 50 // Update every 50ms
    const steps = duration / interval
    let currentStep = 0
    
    progressTimerRef.current = setInterval(() => {
      currentStep++
      const newWidth = (currentStep / steps) * 100
      setProgressWidth(newWidth)
      
      if (currentStep >= steps) {
        clearInterval(progressTimerRef.current!)
      }
    }, interval)
  }, [])
  
  // Start autoplay
  const startAutoPlay = useCallback(() => {
    if (!isAutoPlaying) return
    
    clearTimers()
    
    // Start progress bar
    startProgressBar()
    
    // Set timer for next slide
    autoPlayTimerRef.current = setTimeout(() => {
      setCurrentSlide((prev) => (prev === photos.length - 1 ? 0 : prev + 1))
    }, 5000)
  }, [clearTimers, isAutoPlaying, startProgressBar])
  
  // Handle slide change
  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
    clearTimers()
    startAutoPlay()
  }, [clearTimers, startAutoPlay])
  
  // Next slide function
  const nextSlide = useCallback(() => {
    goToSlide(currentSlide === photos.length - 1 ? 0 : currentSlide + 1)
  }, [currentSlide, goToSlide])
  
  // Previous slide function
  const prevSlide = useCallback(() => {
    goToSlide(currentSlide === 0 ? photos.length - 1 : currentSlide - 1)
  }, [currentSlide, goToSlide])
  
  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchPosition(e.touches[0].clientX)
  }
  
  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchPosition === null) {
      return
    }
    
    const currentPosition = e.touches[0].clientX
    const diff = touchPosition - currentPosition
    
    // Minimum swipe distance
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
      
      setTouchPosition(null)
    }
  }

  // Initialize autoplay on mount
  useEffect(() => {
    startAutoPlay()
    
    return () => {
      clearTimers()
    }
  }, [currentSlide, startAutoPlay, clearTimers])
  
  // Pause autoplay when tab is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearTimers()
      } else {
        startAutoPlay()
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [clearTimers, startAutoPlay])
  
  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide()
      } else if (e.key === 'ArrowRight') {
        nextSlide()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [nextSlide, prevSlide])
  
  return (
    <section id="media" className="py-16 bg-blue-50 dark:bg-gray-900">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 dark:text-blue-400 mb-12">
          Media <span className="text-yellow-500 dark:text-yellow-400">Gallery</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explore our photos and blog stories showcasing our work and impact in the community.
        </p>
      </div>

      <Tabs defaultValue="photos" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 dark:bg-gray-800">
          <TabsTrigger
            value="photos"
            className="data-[state=active]:bg-yellow-100 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-yellow-900 dark:data-[state=active]:text-blue-400 dark:text-gray-200 flex items-center gap-2"
          >
            <ImageIcon size={16} />
            Photos
          </TabsTrigger>

          <TabsTrigger
            value="blog"
            className="data-[state=active]:bg-yellow-100 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-yellow-900 dark:data-[state=active]:text-blue-400 dark:text-gray-200 flex items-center gap-2"
          >
            <FileText size={16} />
            Blog
          </TabsTrigger>
        </TabsList>

        {/* Photos Tab - Carousel */}
        <TabsContent value="photos" className="mt-0">
          <div className="relative" ref={carouselRef}>
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 z-10">
              <div 
                className="h-full bg-blue-600 transition-all duration-100 ease-linear"
                style={{ width: `${progressWidth}%` }}
              ></div>
            </div>
            
            {/* Slide Counter */}
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium z-10">
              {currentSlide + 1} / {photos.length}
            </div>
            
            <div 
              className="overflow-hidden"
              onMouseEnter={() => {
                setIsAutoPlaying(false)
                clearTimers()
              }}
              onMouseLeave={() => {
                setIsAutoPlaying(true)
                startAutoPlay()
              }}
            >
              <div 
                className="flex transition-transform duration-700 ease-out will-change-transform" 
                style={{ transform: `translateX(${-currentSlide * 100}%)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
              >
                {photos.map((photo, index) => (
                  <div
                    key={photo.id}
                    className="min-w-full px-4 flex-shrink-0"
                  >
                    <div 
                      className="relative group cursor-pointer overflow-hidden rounded-lg mx-auto max-w-4xl transform transition-all duration-500 hover:shadow-2xl"
                      onClick={() => setSelectedPhoto(photo)}
                      style={{
                        transform: currentSlide === index ? 'scale(1)' : 'scale(0.95)',
                        opacity: currentSlide === index ? 1 : 0.8,
                      }}
                    >
                      <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] w-full">
                        <Image
                          src={photo.src || "/placeholder.svg"}
                          alt={photo.alt}
                          fill
                          className="object-contain transition-all duration-500 group-hover:scale-105 filter group-hover:brightness-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                          priority={currentSlide === index}
                          style={{
                            transform: `translateY(${currentSlide === index ? '0' : '5px'})`,
                          }}
                        />
                      </div>
                      <div 
                        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 md:p-6 transform transition-transform duration-500 group-hover:translate-y-0"
                        style={{
                          transform: `translateY(${currentSlide === index ? '0' : '10px'})`,
                          opacity: currentSlide === index ? 1 : 0.9,
                        }}
                      >
                        <p className="text-white font-semibold text-base md:text-xl text-center drop-shadow-lg tracking-wide">
                          <span className="inline-block bg-blue-600/80 px-2 py-1 rounded-md backdrop-blur-sm">{photo.caption}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-blue-600/70 hover:bg-blue-600/90 backdrop-blur-sm text-white p-4 rounded-full shadow-xl transition-all duration-300 z-10 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              aria-label="Previous slide"
            >
              <ChevronLeft size={28} strokeWidth={2.5} />
            </button>
            
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-600/70 hover:bg-blue-600/90 backdrop-blur-sm text-white p-4 rounded-full shadow-xl transition-all duration-300 z-10 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              aria-label="Next slide"
            >
              <ChevronRight size={28} strokeWidth={2.5} />
            </button>
            
            {/* Play/Pause Button */}
            <button 
              onClick={() => {
                setIsAutoPlaying(!isAutoPlaying)
                if (!isAutoPlaying) {
                  startAutoPlay()
                } else {
                  clearTimers()
                }
              }}
              className="absolute bottom-4 right-4 bg-blue-600/70 hover:bg-blue-600/90 backdrop-blur-sm text-white p-3 rounded-full shadow-xl transition-all duration-300 z-10 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isAutoPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            
            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 gap-2 overflow-x-auto pb-2 max-w-full px-4">
              {photos.map((photo, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`flex flex-col items-center transition-all duration-500 ${
                    currentSlide === index 
                      ? "scale-110" 
                      : "opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <span className={`w-2 h-2 md:w-3 md:h-3 rounded-full mb-1 transition-all duration-500 ${
                    currentSlide === index 
                      ? "bg-blue-600 shadow-lg shadow-blue-400/50" 
                      : "bg-gray-400 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-400"
                  }`}></span>
                  <span className={`text-[8px] md:text-xs font-medium transition-all duration-300 ${
                    currentSlide === index 
                      ? "text-blue-600 dark:text-blue-400" 
                      : "text-gray-500 dark:text-gray-400"
                  }`}>
                    {index + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Blog Tab */}
        <TabsContent value="blog" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <a
                key={post.id}
                href={post.slug}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow hover:shadow-lg transition"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-blue-800 dark:text-blue-400 font-semibold text-sm mb-1">{post.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mb-2">{post.date}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">{post.excerpt}</p>
                </div>
              </a>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="max-w-4xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-[70vh] w-full">
              <Image
                src={selectedPhoto.src || "/placeholder.svg"}
                alt={selectedPhoto.alt}
                fill
                className="object-contain"
              />
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-b-lg">
              <p className="text-gray-800 dark:text-gray-200 font-medium">{selectedPhoto.caption}</p>
            </div>
          </div>
          <button
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full"
            onClick={() => setSelectedPhoto(null)}
          >
            ✕
          </button>
        </div>
      )}
    </section>
  )
}

export default MediaSection
