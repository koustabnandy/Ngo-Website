"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

// Past Events
const pastEvents = [
  {
    id: 1,
    title: "Community Kitchen at Kalighat Temple",
    date: "April 15, 2023",
    time: "12:00 PM - 3:00 PM",
    location: "Kalighat Temple, Kolkata",
    description:
      "NIRVRITI Foundation organized a community kitchen at Kalighat Temple premises, providing meals to those in need.",
    image: "/Community-Kitchen.png",
    facebookUrl:
      "https://www.facebook.com/reachnirvrti/videos/community-kitchen-day-2destination-kalighat-temple-premisesnirvrti-organised-a-c/628386544509136/",
  },
  {
    id: 2,
    title: "Live Conversation with Young Musicians",
    date: "March 10, 2023",
    time: "5:00 PM - 6:30 PM",
    location: "Online Event",
    description:
      "A live conversation with young talented musicians from Kolkata, discussing artforms during the pandemic.",
    image: "/Live-Conversation.png",
    facebookUrl:
      "https://www.facebook.com/reachnirvrti/posts/nirvrti-presents-a-live-conversation-with-young-talented-musicians-from-kolkata-/246325410440291/",
  },
  {
    id: 3,
    title: "Distribution During Durga Puja",
    date: "October 12, 2021",
    time: "10:00 AM - 1:00 PM",
    location: "Sealdah, Kolkata",
    description:
      "Team NIRVRITI Foundation distributed food packets and new T-shirts to children of Dhakis during Durga Puja.",
    image: "/During-Durga-Puja.png",
    facebookUrl:
      "https://www.facebook.com/reachnirvrti/videos/distribution-1this-panchami-during-durga-puja-team-nirvriti-distributed-100-food/710833004409783/",
  },
  {
    id: 4,
    title: "Visit to Srishti (Samparc) Foundation",
    date: "August 20, 2021",
    time: "11:00 AM - 2:00 PM",
    location: "Srishti Foundation, Kolkata",
    description:
      "Team NIRVRITI Foundation visited the Srishti (Samparc) Foundation, engaging with children and distributing essential items.",
    image: "/Samparc-Foundation.jpg",
    facebookUrl:
      "https://www.facebook.com/reachnirvrti/videos/visit-to-srishti-samparc-foundation-by-team-nirvrti/2862829360669918/",
  },
  {
    id: 5,
    title: "Dry Food Distribution Drive",
    date: "July 10, 2021",
    time: "10:00 AM - 1:00 PM",
    location: "Various Locations, Kolkata",
    description:
      "NIRVRITI Foundation conducted a dry food distribution drive across multiple locations in Kolkata to support those affected by the pandemic.",
    image: "/Dry-Food-Distribution.png",
    facebookUrl: "https://www.facebook.com/reachnirvrti/videos/nirvrti/579113946400469/",
  },
  {
    id: 6,
    title: "Live Conversation with Young Talented Theatre Workers and Art Practitioners",
    date: "March 15, 2023",
    time: "5:00 PM - 6:30 PM",
    location: "Online Event",
    description:
      "A live conversation with young talented theatre workers and art practitioners from Kolkata, discussing artforms during the pandemic.",
    image: "/live-conversation-theatre.png",
    facebookUrl:
      "https://www.facebook.com/reachnirvrti/videos/nirvrti-presents-a-live-conversation-with-young-talented-theatre-workers-and-art/679821979378375/",
  },
  {
    id: 7,
    title: "Durga Puja Distribution Drive - Day 3",
    date: "October 12, 2021",
    time: "10:00 AM - 1:00 PM",
    location: "Various Locations, Kolkata",
    description:
      "On Saptami, Team NIRVRITI Foundation distributed special items to those in need during Durga Puja celebrations.",
    image: "/Distribution-Drive-Day_3.jpg",
    facebookUrl:
      "https://www.facebook.com/reachnirvrti/posts/%E0%A6%A6%E0%A7%81%E0%A6%B0%E0%A7%8D%E0%A6%97%E0%A6%A4%E0%A6%BF%E0%A6%A8%E0%A6%BE%E0%A6%B6%E0%A6%BF%E0%A6%A8%E0%A7%80-%E0%A7%A8day-312102021saptamiour-team-debaaditya-mukhopadhyay-uday-gupta-a/431410255265138/",
  },
  {
    id: 8,
    title: "Relief Distribution in Rajnagar, Shibrampur, and Bakkhali",
    date: "June 15, 2020",
    time: "9:00 AM - 5:00 PM",
    location: "Rajnagar, Shibrampur, and Bakkhali, West Bengal",
    description:
      "Team NIRVRITI Foundation, with support from WTF Withthefilms, distributed sanitary napkins to 150 people in various villages.",
    image: "/Relief-Distribution-in-Rajnagar.jpg",
    facebookUrl:
      "https://www.facebook.com/withthefilms/posts/the-entire-team-of-wtf-withthefilms-is-happy-to-stand-by-nirvrti-to-help-the-amp/275680717144430/",
  },
  {
    id: 9,
    title: "Collection Drive Across Kolkata",
    date: "August 10, 2021",
    time: "10:00 AM - 4:00 PM",
    location: "Various Locations, Kolkata",
    description:
      "NIRVRITI Foundation visited different places in and around Kolkata to collect donated items from friends and well-wishers.",
    image: "/collection-drive.jpg",
    facebookUrl:
      "https://www.facebook.com/reachnirvrti/posts/hello-everyone-today-nirvrti-went-to-different-places-in-and-around-kolkata-to-c/348428590229972/",
  },
  {
    id: 10,
    title: "Educational Support Program",
    date: "May 5, 2022",
    time: "9:00 AM - 12:00 PM",
    location: "Local School, Kolkata",
    description:
      "NIRVRITI Foundation provided educational materials and support to underprivileged students at a local school in Kolkata.",
    image: "/Community-Kitchen.png",
    facebookUrl:
      "https://www.facebook.com/reachnirvrti/",
  },
  {
    id: 11,
    title: "Health Awareness Camp",
    date: "February 20, 2022",
    time: "10:00 AM - 4:00 PM",
    location: "Community Center, Kolkata",
    description:
      "A health awareness camp organized by NIRVRITI Foundation providing free health check-ups and consultations to community members.",
    image: "/Live-Conversation.png",
    facebookUrl:
      "https://www.facebook.com/reachnirvrti/",
  },
  {
    id: 12,
    title: "Winter Clothing Distribution",
    date: "December 15, 2021",
    time: "11:00 AM - 3:00 PM",
    location: "Various Locations, Kolkata",
    description:
      "NIRVRITI Foundation distributed warm clothing and blankets to homeless individuals during the winter season.",
    image: "/During-Durga-Puja.png",
    facebookUrl:
      "https://www.facebook.com/reachnirvrti/",
  },
  {
    id: 13,
    title: "Women's Empowerment Workshop",
    date: "March 8, 2022",
    time: "2:00 PM - 5:00 PM",
    location: "Community Hall, Kolkata",
    description:
      "A workshop focused on empowering women through skill development and entrepreneurship training, organized on International Women's Day.",
    image: "/Samparc-Foundation.jpg",
    facebookUrl:
      "https://www.facebook.com/reachnirvrti/",
  },
  {
    id: 14,
    title: "Environmental Awareness Drive",
    date: "June 5, 2022",
    time: "8:00 AM - 12:00 PM",
    location: "Local Park, Kolkata",
    description:
      "An environmental awareness and clean-up drive organized on World Environment Day to promote sustainability and conservation.",
    image: "/Dry-Food-Distribution.png",
    facebookUrl:
      "https://www.facebook.com/reachnirvrti/",
  },
  {
    id: 15,
    title: "COVID-19 Relief Distribution",
    date: "May 20, 2021",
    time: "9:00 AM - 5:00 PM",
    location: "Multiple Areas, Kolkata",
    description:
      "Distribution of essential supplies, masks, and sanitizers to communities severely affected by the COVID-19 pandemic.",
    image: "/live-conversation-theatre.png",
    facebookUrl:
      "https://www.facebook.com/reachnirvrti/",
  }
]

interface EventCardProps {
  event: {
    id: number
    title: string
    date: string
    time: string
    location: string
    description: string
    image: string
    facebookUrl: string
  }
}

const EventCard = ({ event }: EventCardProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      href={event.facebookUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block w-full h-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
      aria-label={`View more about ${event.title}`}
    >
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700 h-full flex flex-col cursor-pointer bg-white dark:bg-gray-800 rounded-lg transform hover:-translate-y-1 w-full max-w-[280px] mx-auto">
        <div className="relative h-44 w-full overflow-hidden group">
          {!imageError ? (
            <Image 
              src={event.image} 
              alt={event.title} 
              fill 
              className="object-cover transition-transform duration-500 group-hover:scale-105" 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={event.id <= 3} // Only prioritize first 3 images
              onError={() => setImageError(true)}
              loading={event.id <= 3 ? "eager" : "lazy"}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
              <span className="text-gray-500 dark:text-gray-400 text-sm">Image unavailable</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-2 right-2 bg-yellow-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
            {event.date}
          </div>
        </div>
        <CardHeader className="p-3 pb-0">
          <CardTitle className="text-blue-700 dark:text-blue-400 text-base line-clamp-1 group-hover:text-blue-500 transition-colors duration-300 font-semibold">
            {event.title}
          </CardTitle>
          <CardDescription className="flex flex-col gap-1.5 mt-2 text-gray-600 dark:text-gray-300 text-xs">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} className="text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
              <span className="truncate">{event.date}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} className="text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
              <span className="truncate">{event.time}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={12} className="text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
              <span className="truncate">{event.location}</span>
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow p-3 pt-2">
          <p className="text-gray-700 dark:text-gray-200 text-xs line-clamp-3">{event.description}</p>
        </CardContent>
        <CardFooter className="p-3 pt-1">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-xs py-1 h-8 transition-all duration-300 rounded-full transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md">
            More Info
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}

const EventsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [progressWidth, setProgressWidth] = useState(0)
  const [visibleEvents, setVisibleEvents] = useState(3)
  const [touchPosition, setTouchPosition] = useState<number | null>(null)
  
  // Refs
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null)
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  
  // Calculate total number of slides
  const totalSlides = Math.ceil(pastEvents.length / visibleEvents)
  
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
      setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
      startAutoPlay()
    }, 5000)
  }, [clearTimers, isAutoPlaying, startProgressBar, totalSlides])
  
  // Handle window resize
  useEffect(() => {
    // Debounce function
    const debounce = (func: Function, wait: number) => {
      let timeout: NodeJS.Timeout | null = null
      return function executedFunction(...args: any[]) {
        const later = () => {
          timeout = null
          func(...args);
        }
        if (timeout) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(later, wait);
      };
    };
    
    const handleResize = debounce(() => {
      let newVisibleEvents = 3
      
      if (window.innerWidth < 640) {
        newVisibleEvents = 1
      } else if (window.innerWidth < 1024) {
        newVisibleEvents = 2
      } else {
        newVisibleEvents = 3
      }
      
      // Only update if the number of visible events has changed
      if (newVisibleEvents !== visibleEvents) {
        setVisibleEvents(newVisibleEvents);
        
        // Calculate the first event index in the current slide
        const currentFirstEventIndex = currentSlide * visibleEvents;
        
        // Calculate which slide should show this event with the new visible events count
        const newSlideIndex = Math.floor(currentFirstEventIndex / newVisibleEvents);
        setCurrentSlide(Math.min(newSlideIndex, Math.ceil(pastEvents.length / newVisibleEvents) - 1));
        
        // Reset autoplay
        clearTimers();
        setTimeout(() => {
          startAutoPlay();
        }, 100);
      }
    }, 200);
    
    // Initial call
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimers();
    };
  }, [clearTimers, currentSlide, startAutoPlay, visibleEvents]);
  
  // Go to specific slide
  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
    clearTimers()
    startAutoPlay()
  }, [clearTimers, startAutoPlay])
  
  // Next slide
  const nextSlide = useCallback(() => {
    goToSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1)
  }, [currentSlide, goToSlide, totalSlides])
  
  // Previous slide
  const prevSlide = useCallback(() => {
    goToSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1)
  }, [currentSlide, goToSlide, totalSlides])
  
  // Handle touch start
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    clearTimers() // Pause autoplay during touch
    setTouchPosition(e.touches[0].clientX)
  }, [clearTimers])
  
  // Handle touch move
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (touchPosition === null) {
      return
    }
    
    const currentPosition = e.touches[0].clientX
    const diff = touchPosition - currentPosition
    
    // Minimum swipe distance for better mobile responsiveness
    if (Math.abs(diff) > 20) {
      if (diff > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
      
      setTouchPosition(null)
    }
  }, [nextSlide, prevSlide, touchPosition])
  
  // Handle touch end
  const handleTouchEnd = useCallback(() => {
    setTouchPosition(null)
    startAutoPlay() // Resume autoplay after touch
  }, [startAutoPlay])
  
  // Start autoplay on mount
  useEffect(() => {
    startAutoPlay()
    
    return () => {
      clearTimers()
    }
  }, [clearTimers, startAutoPlay])
  
  // Handle visibility change (tab change)
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
      // Only handle keyboard events when the carousel is in viewport
      if (carouselRef.current) {
        const rect = carouselRef.current.getBoundingClientRect();
        const isInViewport = (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        
        if (isInViewport) {
          if (e.key === 'ArrowLeft') {
            prevSlide();
            e.preventDefault();
          } else if (e.key === 'ArrowRight') {
            nextSlide();
            e.preventDefault();
          } else if (e.key === 'Space') {
            setIsAutoPlaying(!isAutoPlaying);
            if (isAutoPlaying) {
              clearTimers();
            } else {
              startAutoPlay();
            }
            e.preventDefault();
          }
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [clearTimers, isAutoPlaying, nextSlide, prevSlide, startAutoPlay]);
  
  const getCurrentEvents = () => {
    const startIndex = currentSlide * visibleEvents
    return pastEvents.slice(startIndex, startIndex + visibleEvents)
  }
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 12
      }
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div id="events" className="py-12 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-center text-blue-800 dark:text-blue-400 mb-3 relative inline-block"
            variants={itemVariants}
          >
            OUR <span className="text-yellow-500 dark:text-yellow-400">Events</span>
            <motion.span 
              className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-yellow-500 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
            ></motion.span>
          </motion.h2>
          <motion.p 
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-xs md:text-sm px-4 mt-4"
            variants={itemVariants}
          >
            Explore our initiatives and events focused on community support, cultural engagement,
            and social welfare that make a difference in our community.
          </motion.p>
        </motion.div>

        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <Tabs defaultValue="past" className="w-full max-w-6xl mx-auto">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6 dark:bg-gray-800 h-12 rounded-full overflow-hidden border border-blue-100 dark:border-gray-700 p-1">
              <TabsTrigger 
                value="upcoming" 
                className="text-sm rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-700 dark:data-[state=active]:text-white dark:text-gray-200 transition-all duration-300 flex items-center justify-center"
              >
                <motion.span whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  Upcoming Events
                </motion.span>
              </TabsTrigger>
              <TabsTrigger 
                value="past" 
                className="text-sm rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-700 dark:data-[state=active]:text-white dark:text-gray-200 transition-all duration-300 flex items-center justify-center"
              >
                <motion.span whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  Past Events
                </motion.span>
              </TabsTrigger>
            </TabsList>

          <TabsContent value="upcoming" className="mt-0">
            <div className="text-center text-gray-600 dark:text-gray-300 py-16 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
              <div className="animate-pulse">
                <Calendar size={48} className="mx-auto text-blue-400 mb-4" />
                <p className="text-lg font-medium">No upcoming events at the moment.</p>
                <p className="text-sm mt-2">Stay tuned for our future initiatives!</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="past" className="mt-0">
            <motion.div 
              className="relative rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800" 
              ref={carouselRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Progress Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 z-10">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-600 to-yellow-500"
                  style={{ width: `${progressWidth}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
              
              {/* Slide Counter */}
              <motion.div 
                className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium z-10 shadow-md"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {currentSlide + 1} / {totalSlides}
              </motion.div>
              
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
                <AnimatePresence initial={false} mode="wait">
                  <motion.div 
                    key={currentSlide}
                    className="flex w-full h-full"
                    initial={{ opacity: 0.4, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0.4, x: -100 }}
                    transition={{ duration: 0.5 }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    <div className="min-w-full px-4 flex-shrink-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 py-8">
                        {getCurrentEvents().map((event, index) => (
                          <motion.div 
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ 
                              scale: 1.03, 
                              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" 
                            }}
                          >
                            <EventCard event={event} />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Navigation Buttons */}
              <motion.button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-blue-600/70 hover:bg-blue-600/90 backdrop-blur-sm text-white p-3 rounded-full shadow-xl z-10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                aria-label="Previous slide"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
              </motion.button>
              
              <motion.button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-600/70 hover:bg-blue-600/90 backdrop-blur-sm text-white p-3 rounded-full shadow-xl z-10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                aria-label="Next slide"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight size={20} strokeWidth={2.5} />
              </motion.button>
              
              {/* Play/Pause Button */}
              <motion.button 
                onClick={() => {
                  setIsAutoPlaying(!isAutoPlaying)
                  if (!isAutoPlaying) {
                    startAutoPlay()
                  } else {
                    clearTimers()
                  }
                }}
                className="absolute bottom-4 right-4 bg-blue-600/70 hover:bg-blue-600/90 backdrop-blur-sm text-white p-2 rounded-full shadow-xl z-10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
              </motion.button>
              
              {/* Dots Indicator */}
              <div className="flex justify-center mt-4 mb-4 gap-2 overflow-x-auto pb-2 max-w-full px-4">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`flex flex-col items-center ${
                      currentSlide === index 
                        ? "" 
                        : "opacity-70 hover:opacity-100"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    animate={currentSlide === index ? { scale: 1.1 } : { scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <motion.span 
                      className={`w-2 h-2 md:w-3 md:h-3 rounded-full mb-1 ${
                        currentSlide === index 
                          ? "bg-blue-600 shadow-lg shadow-blue-400/50" 
                          : "bg-gray-400 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-400"
                      }`}
                      animate={currentSlide === index ? 
                        { scale: [1, 1.2, 1], backgroundColor: "#2563eb" } : 
                        { scale: 1 }
                      }
                      transition={{ duration: 0.5 }}
                    />
                    <motion.span 
                      className={`text-[8px] md:text-xs font-medium ${
                        currentSlide === index 
                          ? "text-blue-600 dark:text-blue-400" 
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {index + 1}
                    </motion.span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
        </motion.div>
      </div>
    </div>
  )
}

export default EventsSection