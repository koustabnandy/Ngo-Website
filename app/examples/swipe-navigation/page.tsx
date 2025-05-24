"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import SwipeContainer from "@/components/ui/swipe-container"
import SwipeExample from "@/components/ui/swipe-example"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function SwipeNavigationExamplePage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const images = [
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
  ]
  
  const handleSwipeLeft = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }
  
  const handleSwipeRight = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }
  
  // Example items for SwipeExample component
  const exampleItems = images.map((image, index) => (
    <div key={index} className="relative h-64 w-full">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover rounded-lg"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
        <p className="text-white text-sm">{image.caption}</p>
      </div>
    </div>
  ))
  
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Swipe Navigation Examples</h1>
      
      {/* Example 1: Basic SwipeContainer */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Example 1: Basic SwipeContainer</h2>
        <p className="mb-4 text-gray-600">Swipe left or right to navigate through images.</p>
        
        <div className="relative max-w-lg mx-auto">
          <SwipeContainer
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
            className="relative h-64 rounded-lg overflow-hidden"
          >
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-full w-full"
            >
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <p className="text-white">{images[currentIndex].caption}</p>
              </div>
            </motion.div>
          </SwipeContainer>
          
          <div className="flex justify-between mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSwipeRight}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>
            <div className="flex gap-2 items-center">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full ${
                    currentIndex === index ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSwipeLeft}
              className="flex items-center gap-1"
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>Swipe indicator: Image {currentIndex + 1} of {images.length}</p>
          </div>
        </div>
      </section>
      
      {/* Example 2: SwipeExample Component */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Example 2: SwipeExample Component</h2>
        <p className="mb-4 text-gray-600">A complete carousel component with swipe navigation, auto-play, and indicators.</p>
        
        <div className="max-w-lg mx-auto">
          <SwipeExample
            items={exampleItems}
            autoPlay={true}
            showControls={true}
            showIndicators={true}
            className="rounded-lg overflow-hidden"
          />
          
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>This example uses the SwipeExample component with auto-play enabled.</p>
          </div>
        </div>
      </section>
      
      {/* Usage Instructions */}
      <section className="max-w-2xl mx-auto bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">How to Use</h2>
        <div className="prose dark:prose-invert">
          <p>
            To add swipe navigation to your components, you can use either the <code>SwipeContainer</code> component
            or the <code>useSwipeNavigation</code> hook.
          </p>
          
          <h3>Basic Usage</h3>
          <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded overflow-x-auto">
            {`import SwipeContainer from "@/components/ui/swipe-container"

<SwipeContainer
  onSwipeLeft={nextSlide}
  onSwipeRight={prevSlide}
>
  {/* Your content here */}
</SwipeContainer>`}
          </pre>
          
          <h3>Advanced Usage</h3>
          <p>
            For more complex carousels, use the <code>useSwipeNavigation</code> hook:
          </p>
          <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded overflow-x-auto">
            {`import useSwipeNavigation from "@/hooks/use-swipe-navigation"

const {
  currentIndex,
  goToNext,
  goToPrev,
  // ... other utilities
} = useSwipeNavigation({
  totalItems: items.length,
  autoPlay: true,
})`}
          </pre>
          
          <p>
            For more details, check the <code>SWIPE-NAVIGATION.md</code> file in the components/ui directory.
          </p>
        </div>
      </section>
    </div>
  )
}