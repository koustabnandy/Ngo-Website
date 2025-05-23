"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageIcon, FileText, ChevronLeft, ChevronRight, Play, Pause, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
];

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
];

const MediaSection = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<null | { src: string; alt: string; caption: string }>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progressWidth, setProgressWidth] = useState(0);
  
  // Refs
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Touch handling
  const [touchPosition, setTouchPosition] = useState<number | null>(null);
  
  // Clear all timers
  const clearTimers = useCallback(() => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
    
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
  }, []);
  
  // Start progress bar animation
  const startProgressBar = useCallback(() => {
    // Reset progress
    setProgressWidth(0);
    
    // Clear any existing progress timer
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
    }
    
    // Start new progress timer
    const duration = 5000; // 5 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    let currentStep = 0;
    
    progressTimerRef.current = setInterval(() => {
      currentStep++;
      const newWidth = (currentStep / steps) * 100;
      setProgressWidth(newWidth);
      
      if (currentStep >= steps) {
        clearInterval(progressTimerRef.current!);
      }
    }, interval);
  }, []);
  
  // Start autoplay
  const startAutoPlay = useCallback(() => {
    if (!isAutoPlaying) return;
    
    clearTimers();
    
    // Start progress bar
    startProgressBar();
    
    // Set timer for next slide
    autoPlayTimerRef.current = setTimeout(() => {
      setCurrentSlide((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
    }, 5000);
  }, [clearTimers, isAutoPlaying, startProgressBar, photos.length]);
  
  // Handle slide change
  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    clearTimers();
    startAutoPlay();
  }, [clearTimers, startAutoPlay]);
  
  // Next slide function
  const nextSlide = useCallback(() => {
    goToSlide(currentSlide === photos.length - 1 ? 0 : currentSlide + 1);
  }, [currentSlide, goToSlide, photos.length]);
  
  // Previous slide function
  const prevSlide = useCallback(() => {
    goToSlide(currentSlide === 0 ? photos.length - 1 : currentSlide - 1);
  }, [currentSlide, goToSlide, photos.length]);
  
  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    clearTimers(); // Pause autoplay during touch
    setTouchPosition(e.touches[0].clientX);
  };
  
  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchPosition === null) {
      return;
    }
    
    const currentPosition = e.touches[0].clientX;
    const diff = touchPosition - currentPosition;
    
    // Minimum swipe distance - reduced for better mobile responsiveness
    if (Math.abs(diff) > 30) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      
      setTouchPosition(null);
      startAutoPlay(); // Resume autoplay after swipe
    }
  };
  
  // Handle touch end
  const handleTouchEnd = () => {
    setTouchPosition(null);
    startAutoPlay(); // Resume autoplay after touch
  };

  // Initialize autoplay on mount
  useEffect(() => {
    startAutoPlay();
    
    return () => {
      clearTimers();
    };
  }, [startAutoPlay, clearTimers]);
  
  // Pause autoplay when tab is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearTimers();
      } else {
        startAutoPlay();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [clearTimers, startAutoPlay]);
  
  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [nextSlide, prevSlide]);
  
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
    <div id="media" className="py-16 bg-blue-50 dark:bg-gray-900 overflow-hidden">
      <motion.div 
        className="text-center mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center text-blue-800 dark:text-blue-400 mb-6 relative inline-block"
          variants={itemVariants}
        >
          Media <span className="text-yellow-500 dark:text-yellow-400">Gallery</span>
          <motion.span 
            className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-yellow-500 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          ></motion.span>
        </motion.h2>
        <motion.p 
          className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4"
          variants={itemVariants}
        >
          Explore our photos and blog stories showcasing our work and impact in the community.
        </motion.p>
      </motion.div>

      <motion.div
        variants={fadeInVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <Tabs defaultValue="photos" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 dark:bg-gray-800 h-12 rounded-full overflow-hidden border border-blue-100 dark:border-gray-700 p-1">
            <TabsTrigger
              value="photos"
              className="text-sm rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-700 dark:data-[state=active]:text-white dark:text-gray-200 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <ImageIcon size={16} />
              Photos
            </TabsTrigger>

            <TabsTrigger
              value="blog"
              className="text-sm rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-700 dark:data-[state=active]:text-white dark:text-gray-200 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FileText size={16} />
              Blog
            </TabsTrigger>
          </TabsList>

          {/* Photos Tab - Carousel */}
          <TabsContent value="photos" className="mt-0">
            <motion.div 
              className="relative" 
              ref={carouselRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Progress Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 z-10">
                <motion.div 
                  className="h-full bg-blue-600"
                  style={{ width: `${progressWidth}%` }}
                  transition={{ ease: "linear" }}
                ></motion.div>
              </div>
              
              {/* Slide Counter */}
              <motion.div 
                className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium z-10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {currentSlide + 1} / {photos.length}
              </motion.div>
              
              <div 
                className="overflow-hidden rounded-xl"
                onMouseEnter={() => {
                  setIsAutoPlaying(false);
                  clearTimers();
                }}
                onMouseLeave={() => {
                  setIsAutoPlaying(true);
                  startAutoPlay();
                }}
              >
                <AnimatePresence initial={false} mode="wait">
                  <motion.div 
                    key={currentSlide}
                    className="flex w-full h-full"
                    initial={{ opacity: 0.4, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.4, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    <div className="min-w-full px-4 flex-shrink-0">
                      <motion.div 
                        className="relative group cursor-pointer overflow-hidden rounded-lg mx-auto max-w-4xl shadow-lg hover:shadow-2xl transition-all duration-500"
                        onClick={() => setSelectedPhoto(photos[currentSlide])}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] w-full">
                          <Image
                            src={photos[currentSlide].src || "/placeholder.svg"}
                            alt={photos[currentSlide].alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                            priority={currentSlide === 0}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                          <h3 className="text-xl font-semibold">{photos[currentSlide].caption}</h3>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Carousel Controls */}
              <motion.div 
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full"
                  onClick={prevSlide}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft size={24} />
                </motion.button>
                
                <motion.button
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full"
                  onClick={nextSlide}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight size={24} />
                </motion.button>
              </motion.div>
              
              {/* Autoplay Control */}
              <motion.button
                className="absolute bottom-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full z-10"
                onClick={() => {
                  setIsAutoPlaying(!isAutoPlaying);
                  if (!isAutoPlaying) {
                    startAutoPlay();
                  } else {
                    clearTimers();
                  }
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isAutoPlaying ? <Pause size={20} /> : <Play size={20} />}
              </motion.button>
              
              {/* Thumbnail Navigation */}
              <motion.div 
                className="mt-4 px-4 hidden md:block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex justify-center gap-2 flex-wrap">
                  {photos.map((photo, index) => (
                    <motion.button
                      key={photo.id}
                      className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                        index === currentSlide ? "border-blue-500 scale-110" : "border-transparent opacity-70"
                      }`}
                      onClick={() => goToSlide(index)}
                      whileHover={{ scale: 1.05, opacity: 1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* Blog Tab */}
          <TabsContent value="blog" className="mt-0">
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {blogPosts.map((post, index) => (
                <motion.a
                  key={post.id}
                  href={post.slug}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-all duration-700 ease-out"
                      style={{ scale: 1.05 }}
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-blue-800 dark:text-blue-400 font-semibold text-lg">{post.title}</h3>
                      <motion.div 
                        className="text-blue-600 dark:text-blue-400"
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <ExternalLink size={16} />
                      </motion.div>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mb-3">{post.date}</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">{post.excerpt}</p>
                    <motion.div 
                      className="mt-4 text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center gap-1"
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ x: 5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      Read more <ChevronRight size={14} />
                    </motion.div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
            
            {/* Mobile Carousel for Blog Posts */}
            <div className="md:hidden mt-6 px-4">
              <p className="text-center text-sm text-blue-600 dark:text-blue-400 mb-2">Swipe to see more</p>
              <motion.div 
                className="flex overflow-x-auto pb-4 gap-4 snap-x snap-mandatory"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {blogPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    className="snap-start shrink-0 w-[85%] first:ml-4 last:mr-4"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <a 
                      href={post.slug} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md h-full"
                    >
                      <div className="relative h-32 w-full">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="text-blue-800 dark:text-blue-400 font-semibold text-sm mb-1">{post.title}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-xs mb-2">{post.date}</p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{post.excerpt}</p>
                      </div>
                    </a>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
      
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedPhoto(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="relative max-w-5xl w-full max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[80vh]">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
              </div>
              
              <motion.div 
                className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-white text-xl font-semibold">{selectedPhoto.caption}</h3>
              </motion.div>
              
              {/* Close button */}
              <motion.button
                className="absolute top-4 right-4 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center"
                onClick={() => setSelectedPhoto(null)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
              
              {/* Navigation buttons in modal */}
              <motion.div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 sm:px-8">
                <motion.button
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = photos.findIndex(p => p.src === selectedPhoto.src);
                    const prevIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
                    setSelectedPhoto(photos[prevIndex]);
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft size={24} />
                </motion.button>
                
                <motion.button
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    const currentIndex = photos.findIndex(p => p.src === selectedPhoto.src);
                    const nextIndex = currentIndex === photos.length - 1 ? 0 : currentIndex + 1;
                    setSelectedPhoto(photos[nextIndex]);
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight size={24} />
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MediaSection;