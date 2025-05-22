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
  return (
    <Link
      href={event.facebookUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block w-full h-full"
      aria-label={`View more about ${event.title}`}
    >
      <Card className="overflow-hidden transition-all duration-500 hover:shadow-lg border-transparent h-full flex flex-col cursor-pointer bg-white dark:bg-gray-800 rounded-lg transform hover:-translate-y-1 w-full max-w-[280px] mx-auto">
        <div className="relative h-40 w-full overflow-hidden">
          <Image 
            src={event.image} 
            alt={event.title} 
            fill 
            className="object-cover transition-transform duration-500 hover:scale-105" 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-2 right-2 bg-yellow-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
            {event.date}
          </div>
        </div>
        <CardHeader className="p-3 pb-0">
          <CardTitle className="text-blue-700 dark:text-blue-400 text-base line-clamp-1 group-hover:text-blue-500 transition-colors duration-300">
            {event.title}
          </CardTitle>
          <CardDescription className="flex flex-col gap-1 mt-1 text-gray-600 dark:text-gray-300 text-xs">
            <span className="flex items-center gap-1">
              <Calendar size={12} className="text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
              <span className="truncate">{event.date}</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} className="text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
              <span className="truncate">{event.time}</span>
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={12} className="text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
              <span className="truncate">{event.location}</span>
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow p-3 pt-2">
          <p className="text-gray-700 dark:text-gray-200 text-xs line-clamp-3">{event.description}</p>
        </CardContent>
        <CardFooter className="p-3 pt-1">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-xs py-1 h-8 transition-all duration-300 rounded-full transform hover:scale-105 active:scale-95">
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
  
  // Determine how many events to show based on screen size
  useEffect(() => {
    const handleResize = () => {
      const prevVisibleEvents = visibleEvents
      
      if (window.innerWidth < 640) {
        setVisibleEvents(1)
      } else if (window.innerWidth < 1024) {
        setVisibleEvents(2)
      } else if (window.innerWidth < 1280) {
        setVisibleEvents(3)
      } else {
        setVisibleEvents(3)
      }
      
      // Reset current slide when screen size changes to prevent empty slides
      if (prevVisibleEvents !== visibleEvents) {
        setCurrentSlide(0)
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [visibleEvents])
  
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
    }, 5000)
  }, [clearTimers, isAutoPlaying, startProgressBar, totalSlides])
  
  // Handle slide change
  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
    clearTimers()
    startAutoPlay()
  }, [clearTimers, startAutoPlay])
  
  // Next slide function
  const nextSlide = useCallback(() => {
    goToSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1)
  }, [currentSlide, goToSlide, totalSlides])
  
  // Previous slide function
  const prevSlide = useCallback(() => {
    goToSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1)
  }, [currentSlide, goToSlide, totalSlides])
  
  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    clearTimers() // Pause autoplay during touch
    setTouchPosition(e.touches[0].clientX)
  }
  
  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchPosition === null) {
      return
    }
    
    const currentPosition = e.touches[0].clientX
    const diff = touchPosition - currentPosition
    
    // Minimum swipe distance - reduced for better mobile responsiveness
    if (Math.abs(diff) > 30) {
      if (diff > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
      
      setTouchPosition(null)
      startAutoPlay() // Resume autoplay after swipe
    }
  }
  
  // Handle touch end
  const handleTouchEnd = () => {
    setTouchPosition(null)
    startAutoPlay() // Resume autoplay after touch
  }
  
  // Initialize autoplay on mount
  useEffect(() => {
    startAutoPlay()
    
    return () => {
      clearTimers()
    }
  }, [startAutoPlay, clearTimers])
  
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
  
  // Get current visible events
  const getCurrentEvents = () => {
    const startIndex = currentSlide * visibleEvents
    return pastEvents.slice(startIndex, startIndex + visibleEvents)
  }
  
  return (
    <section id="events" className="py-8 bg-blue-50 dark:bg-gray-900">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-800 dark:text-blue-400 mb-3">
          OUR <span className="text-yellow-500 dark:text-yellow-400">Events</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-xs md:text-sm px-4">
          Explore our initiatives and events focused on community support, cultural engagement,
          and social welfare that make a difference in our community.
        </p>
      </div>

      <Tabs defaultValue="past" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4 dark:bg-gray-800 h-9">
          <TabsTrigger value="upcoming" className="text-sm data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-400 dark:text-gray-200">
            Upcoming Events
          </TabsTrigger>
          <TabsTrigger value="past" className="text-sm data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-400 dark:text-gray-200">
            Past Events
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-0">
          <div className="text-center text-gray-600 dark:text-gray-300 py-10">
            <p>No upcoming events at the moment. Stay tuned!</p>
          </div>
        </TabsContent>

        <TabsContent value="past" className="mt-0">
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
              {currentSlide + 1} / {totalSlides}
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
                onTouchEnd={handleTouchEnd}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => {
                  const startIndex = slideIndex * visibleEvents
                  const slideEvents = pastEvents.slice(startIndex, startIndex + visibleEvents)
                  
                  return (
                    <div key={slideIndex} className="min-w-full flex-shrink-0 px-4">
                      <div className={`grid grid-cols-1 ${
                        visibleEvents === 2 ? 'sm:grid-cols-2' : 
                        visibleEvents === 3 ? 'sm:grid-cols-3' : 
                        visibleEvents === 4 ? 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : ''
                      } gap-6 justify-items-center`}>
                        {slideEvents.map((event) => (
                          <div 
                            key={event.id}
                            className="transform transition-all duration-500"
                            style={{
                              transform: currentSlide === slideIndex ? 'scale(1)' : 'scale(0.95)',
                              opacity: currentSlide === slideIndex ? 1 : 0.8,
                            }}
                          >
                            <EventCard event={event} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <button 
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-blue-600/70 hover:bg-blue-600/90 backdrop-blur-sm text-white p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 z-10 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>
            
            <button 
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600/70 hover:bg-blue-600/90 backdrop-blur-sm text-white p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 z-10 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              aria-label="Next slide"
            >
              <ChevronRight size={20} strokeWidth={2.5} />
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
              className="absolute bottom-2 right-2 bg-blue-600/70 hover:bg-blue-600/90 backdrop-blur-sm text-white p-2 rounded-full shadow-lg transition-all duration-300 z-10 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            
            {/* Dots Indicator */}
            <div className="flex justify-center mt-4 gap-1.5 overflow-x-auto pb-1 max-w-full px-4">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`flex flex-col items-center transition-all duration-300 ${
                    currentSlide === index 
                      ? "scale-105" 
                      : "opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <span className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full mb-0.5 transition-all duration-300 ${
                    currentSlide === index 
                      ? "bg-blue-600 shadow-md shadow-blue-400/50" 
                      : "bg-gray-400 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-400"
                  }`}></span>
                  <span className={`text-[6px] md:text-[8px] font-medium transition-all duration-300 ${
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
      </Tabs>
    </section>
  )
}

export default EventsSection
