"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import ScrollAnimation from "./scroll-animation"

interface GalleryImage {
  src: string
  alt: string
  caption?: string
}

const galleryImages: GalleryImage[] = [
  {
    src: "/Community-Kitchen.png",
    alt: "Community Kitchen",
    caption: "Serving meals to those in need at our community kitchen"
  },
  {
    src: "/Live-Conversation.png",
    alt: "Live Conversation",
    caption: "Engaging discussions with talented young musicians"
  },
  {
    src: "/During-Durga-Puja.png",
    alt: "Durga Puja Distribution",
    caption: "Distribution drive during Durga Puja celebrations"
  },
  {
    src: "/Samparc-Foundation.jpg",
    alt: "Samparc Foundation Visit",
    caption: "Visit to Srishti (Samparc) Foundation to support children"
  },
  {
    src: "/Dry-Food-Distribution.png",
    alt: "Dry Food Distribution",
    caption: "Distributing essential dry food supplies to communities"
  },
  {
    src: "/live-conversation-theatre.png",
    alt: "Theatre Workers Conversation",
    caption: "Conversations with young theatre workers and art practitioners"
  },
  {
    src: "/Distribution-Drive-Day_3.jpg",
    alt: "Distribution Drive",
    caption: "Day 3 of our distribution drive during festival season"
  },
  {
    src: "/Relief-Distribution-in-Rajnagar.jpg",
    alt: "Relief Distribution",
    caption: "Relief distribution in Rajnagar, Shibrampur, and Bakkhali"
  }
]

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const openLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image)
    setCurrentIndex(index)
  }
  
  const closeLightbox = () => {
    setSelectedImage(null)
  }
  
  const goToPrevious = () => {
    const newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length
    setSelectedImage(galleryImages[newIndex])
    setCurrentIndex(newIndex)
  }
  
  const goToNext = () => {
    const newIndex = (currentIndex + 1) % galleryImages.length
    setSelectedImage(galleryImages[newIndex])
    setCurrentIndex(newIndex)
  }
  
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox()
    if (e.key === "ArrowLeft") goToPrevious()
    if (e.key === "ArrowRight") goToNext()
  }
  
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <ScrollAnimation animation="animate-fade-in-up" className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-montserrat">
          <span className="text-blue-800 dark:text-blue-400">Our</span>
          <span className="text-yellow-500 dark:text-yellow-400"> Gallery</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
          A glimpse into our activities, events, and the impact we're making in the community
        </p>
        <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
      </ScrollAnimation>
      
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.map((image, index) => (
          <motion.div
            key={image.src}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative overflow-hidden rounded-lg aspect-square cursor-pointer group"
            onClick={() => openLightbox(image, index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <p className="text-white text-sm p-3">{image.caption || image.alt}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <button
              className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                closeLightbox()
              }}
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>
            
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                goToPrevious()
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="relative max-w-4xl max-h-[80vh] w-full" onClick={(e) => e.stopPropagation()}>
              <div className="relative w-full h-full">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  priority
                />
              </div>
              {selectedImage.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 text-center">
                  {selectedImage.caption}
                </div>
              )}
            </div>
            
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}