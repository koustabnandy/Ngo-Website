"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Facebook, Instagram, Twitter, Youtube, ExternalLink, Heart, MessageCircle, Share2, Calendar, ChevronLeft, ChevronRight } from "lucide-react"

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

interface SocialPost {
  id: string
  platform: "facebook" | "instagram" | "twitter" | "youtube"
  content: string
  image?: string
  date: string
  likes: number
  comments: number
  shares: number
  url: string
}

interface SocialPostCardProps {
  post: SocialPost
  index: number
  getPlatformIcon: (platform: string, size?: number) => JSX.Element | null
  getPlatformName: (platform: string) => string
}

// Extracted card component for reuse
const SocialPostCard = ({ post, index, getPlatformIcon, getPlatformName }: SocialPostCardProps) => {
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
          {post.image && (
            <div className="relative h-48 w-full overflow-hidden">
              <motion.img
                src={post.image}
                alt={`Social media post from ${getPlatformName(post.platform)}`}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "tween", duration: 0.5 }}
              />
              <motion.div 
                className="absolute top-2 right-2 bg-white dark:bg-gray-800 p-1.5 rounded-full shadow-md"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.08 + 0.2, type: "spring", stiffness: 400 }}
              >
                {getPlatformIcon(post.platform)}
              </motion.div>
            </div>
          )}
          
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.08 + 0.1, type: "spring" }}
              >
                {getPlatformIcon(post.platform, 16)}
              </motion.div>
              <motion.span 
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 + 0.15 }}
              >
                {getPlatformName(post.platform)}
              </motion.span>
              <motion.span 
                className="text-xs text-gray-500 dark:text-gray-400 ml-auto flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.08 + 0.2 }}
              >
                <Calendar className="h-3 w-3 mr-1" /> {post.date}
              </motion.span>
            </div>
            
            <motion.p 
              className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 + 0.25 }}
            >
              {post.content}
            </motion.p>
            
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <motion.span 
                  className="text-xs text-gray-600 dark:text-gray-400 flex items-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.08 + 0.3 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Heart className="h-3.5 w-3.5 mr-1 text-red-500" /> {post.likes}
                </motion.span>
                <motion.span 
                  className="text-xs text-gray-600 dark:text-gray-400 flex items-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.08 + 0.35 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <MessageCircle className="h-3.5 w-3.5 mr-1 text-blue-500" /> {post.comments}
                </motion.span>
                <motion.span 
                  className="text-xs text-gray-600 dark:text-gray-400 flex items-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.08 + 0.4 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Share2 className="h-3.5 w-3.5 mr-1 text-green-500" /> {post.shares}
                </motion.span>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.08 + 0.45, type: "spring" }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-1 h-auto"
                  asChild
                >
                  <a 
                    href={post.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={`View on ${getPlatformName(post.platform)}`}
                  >
                    <ExternalLink className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const socialPosts: SocialPost[] = [
  {
    id: "fb-1",
    platform: "facebook",
    content: "NIRVRITI Foundation organized a community kitchen at Kalighat Temple premises, providing meals to those in need. Thank you to all our volunteers who made this possible! #CommunityKitchen #FeedingHope",
    image: "/Community-Kitchen.png",
    date: "April 15, 2023",
    likes: 124,
    comments: 32,
    shares: 45,
    url: "https://www.facebook.com/reachnirvrti/videos/community-kitchen-day-2destination-kalighat-temple-premisesnirvrti-organised-a-c/628386544509136/",
  },
  {
    id: "fb-2",
    platform: "facebook",
    content: "A live conversation with young talented musicians from Kolkata, discussing artforms during the pandemic. It was an inspiring session! #YoungTalent #MusicForChange",
    image: "/Live-Conversation.png",
    date: "March 10, 2023",
    likes: 98,
    comments: 24,
    shares: 18,
    url: "https://www.facebook.com/reachnirvrti/posts/nirvrti-presents-a-live-conversation-with-young-talented-musicians-from-kolkata-/246325410440291/",
  },
  {
    id: "ig-1",
    platform: "instagram",
    content: "Team NIRVRITI Foundation distributed food packets and new T-shirts to children of Dhakis during Durga Puja. The smiles on their faces made our day! ❤️ #DurgaPuja #Giving #ChildrenFirst",
    image: "/During-Durga-Puja.png",
    date: "October 12, 2021",
    likes: 215,
    comments: 42,
    shares: 37,
    url: "https://www.instagram.com/",
  },
  {
    id: "ig-2",
    platform: "instagram",
    content: "Team NIRVRITI Foundation visited the Srishti (Samparc) Foundation, engaging with children and distributing essential items. These moments of connection are what drive our mission forward. #ChildrenWelfare #CommunityOutreach",
    image: "/Samparc-Foundation.jpg",
    date: "August 20, 2021",
    likes: 187,
    comments: 29,
    shares: 22,
    url: "https://www.instagram.com/",
  },
  {
    id: "tw-1",
    platform: "twitter",
    content: "NIRVRITI Foundation conducted a dry food distribution drive across multiple locations in Kolkata to support those affected by the pandemic. Together, we can make a difference! #COVID19Relief #FoodSecurity",
    image: "/Dry-Food-Distribution.png",
    date: "July 10, 2021",
    likes: 76,
    comments: 14,
    shares: 31,
    url: "https://twitter.com/",
  },
  {
    id: "yt-1",
    platform: "youtube",
    content: "Watch our latest video documenting the impact of our education initiatives in rural West Bengal. Education is the most powerful tool we can use to change the world. #EducationForAll #RuralDevelopment",
    image: "/live-conversation-theatre.png",
    date: "March 15, 2023",
    likes: 143,
    comments: 27,
    shares: 19,
    url: "https://www.youtube.com/",
  },
]

export default function SocialMediaFeed() {
  const [activePlatform, setActivePlatform] = useState<string>("all")
  const [filteredPosts, setFilteredPosts] = useState<SocialPost[]>(socialPosts)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchPosition, setTouchPosition] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  
  // Update filtered posts when platform changes
  useEffect(() => {
    if (activePlatform === "all") {
      setFilteredPosts(socialPosts)
    } else {
      setFilteredPosts(socialPosts.filter((post) => post.platform === activePlatform))
    }
    // Reset current slide when changing platforms
    setCurrentSlide(0)
  }, [activePlatform])
  
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
    }, 5000)
  }, [clearTimers, isAutoPlaying, isMobile])
  
  // Handle slide change
  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
    clearTimers()
    startAutoPlay()
  }, [clearTimers, startAutoPlay])
  
  // Next slide function
  const nextSlide = useCallback(() => {
    const totalSlides = filteredPosts.length
    if (totalSlides <= 1) return
    
    goToSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1)
  }, [currentSlide, goToSlide, filteredPosts.length])
  
  // Previous slide function
  const prevSlide = useCallback(() => {
    const totalSlides = filteredPosts.length
    if (totalSlides <= 1) return
    
    goToSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1)
  }, [currentSlide, goToSlide, filteredPosts.length])
  
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
  }, [startAutoPlay, clearTimers, currentSlide, filteredPosts])
  
  const getPlatformIcon = (platform: string, size = 20) => {
    switch (platform) {
      case "facebook":
        return <Facebook size={size} className="text-blue-600" />
      case "instagram":
        return <Instagram size={size} className="text-pink-600" />
      case "twitter":
        return <Twitter size={size} className="text-blue-400" />
      case "youtube":
        return <Youtube size={size} className="text-red-600" />
      default:
        return null
    }
  }
  
  const getPlatformName = (platform: string) => {
    switch (platform) {
      case "facebook":
        return "Facebook"
      case "instagram":
        return "Instagram"
      case "twitter":
        return "Twitter"
      case "youtube":
        return "YouTube"
      default:
        return ""
    }
  }
  
  return (
    <section id="social-media" className="py-16 bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-900">
      {/* Add custom styles for scrollbar hiding */}
      <style dangerouslySetInnerHTML={{ __html: scrollbarHideStyles }} />
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 dark:text-blue-400 mb-3 relative inline-block">
            Social <span className="text-yellow-500 dark:text-yellow-400">Media</span>
            <span className="absolute -bottom-1 left-1/4 right-1/4 h-1 bg-gradient-to-r from-blue-500 to-yellow-500 rounded-full"></span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
            Follow us on social media to stay updated with our latest activities, events, and impact stories.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="all" onValueChange={setActivePlatform} className="w-full">
            <TabsList className="flex w-full max-w-md mx-auto justify-between mb-8 dark:bg-gray-800 h-12 rounded-full overflow-x-auto overflow-y-hidden border border-blue-100 dark:border-gray-700 p-1 scrollbar-hide">
              <TabsTrigger 
                value="all" 
                className="rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-700 dark:data-[state=active]:text-white dark:text-gray-200 transition-all duration-300 whitespace-nowrap flex-shrink-0"
              >
                All Platforms
              </TabsTrigger>
              <TabsTrigger 
                value="facebook" 
                className="rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-700 dark:data-[state=active]:text-white dark:text-gray-200 transition-all duration-300 whitespace-nowrap flex-shrink-0"
              >
                <Facebook className="h-4 w-4 mr-1" /> <span className="hidden sm:inline">Facebook</span>
              </TabsTrigger>
              <TabsTrigger 
                value="instagram" 
                className="rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-700 dark:data-[state=active]:text-white dark:text-gray-200 transition-all duration-300 whitespace-nowrap flex-shrink-0"
              >
                <Instagram className="h-4 w-4 mr-1" /> <span className="hidden sm:inline">Instagram</span>
              </TabsTrigger>
              <TabsTrigger 
                value="twitter" 
                className="rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-700 dark:data-[state=active]:text-white dark:text-gray-200 transition-all duration-300 whitespace-nowrap flex-shrink-0"
              >
                <Twitter className="h-4 w-4 mr-1" /> <span className="hidden sm:inline">Twitter</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={activePlatform} className="mt-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePlatform}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 30, 
                    mass: 0.8,
                    opacity: { duration: 0.4 }
                  }}
                >
                  {/* Mobile swipe indicator - only visible on small screens */}
                  {isMobile && filteredPosts.length > 1 && (
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
                          Swipe to navigate
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
                      {filteredPosts.map((post, index) => (
                        <SocialPostCard key={post.id} post={post} index={index} getPlatformIcon={getPlatformIcon} getPlatformName={getPlatformName} />
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
                          {filteredPosts.map((post, index) => (
                            <motion.div 
                              key={post.id} 
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
                              <SocialPostCard post={post} index={0} getPlatformIcon={getPlatformIcon} getPlatformName={getPlatformName} />
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                      
                      {/* Navigation buttons */}
                      {filteredPosts.length > 1 && (
                        <>
                          <motion.button
                            onClick={prevSlide}
                            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-700/90 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 z-10 border border-gray-200 dark:border-gray-600"
                            aria-label="Previous slide"
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
                            aria-label="Next slide"
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
                      {filteredPosts.length > 1 && (
                        <div className="flex justify-center mt-6 space-x-3">
                          {Array.from({ length: filteredPosts.length }).map((_, index) => (
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
                              aria-label={`Go to slide ${index + 1}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          </Tabs>
          
          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Follow Us on Social Media
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Stay connected with us to get the latest updates on our activities and impact.
            </p>
            <div className="flex justify-center space-x-4">
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full p-3 h-auto w-auto"
                asChild
              >
                <a 
                  href="https://www.facebook.com/reachnirvrti/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <Facebook className="h-6 w-6 text-blue-600" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full p-3 h-auto w-auto"
                asChild
              >
                <a 
                  href="https://www.instagram.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram className="h-6 w-6 text-pink-600" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full p-3 h-auto w-auto"
                asChild
              >
                <a 
                  href="https://twitter.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <Twitter className="h-6 w-6 text-blue-400" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full p-3 h-auto w-auto"
                asChild
              >
                <a 
                  href="https://www.youtube.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <Youtube className="h-6 w-6 text-red-600" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}