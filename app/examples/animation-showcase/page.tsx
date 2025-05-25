"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import SwipeContainer from "@/components/ui/swipe-container"
import SwipeExample from "@/components/ui/swipe-example"
import { Button } from "@/components/ui/button"
import { slideVariants, contentVariants, navButtonVariants } from "@/lib/animation-variants"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"

export default function AnimationShowcasePage() {
  const [selectedVariant, setSelectedVariant] = useState<keyof typeof slideVariants>("default")
  const [isPlaying, setIsPlaying] = useState(false)
  
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
      <h1 className="text-3xl font-bold mb-8 text-center">Animation Showcase</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Animation Variants Showcase */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Animation Variants</h2>
          <p className="mb-4 text-gray-600">Select an animation style to preview:</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.keys(slideVariants).map((variant) => (
              <motion.button
                key={variant}
                onClick={() => setSelectedVariant(variant as keyof typeof slideVariants)}
                className={`px-3 py-1.5 rounded-full text-sm ${
                  selectedVariant === variant 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </motion.button>
            ))}
          </div>
          
          <div className="relative h-64 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <SwipeExample
              items={exampleItems}
              autoPlay={isPlaying}
              animationVariant={selectedVariant}
              showSwipeHint={true}
              enableMouseDrag={true}
              className="h-full"
            />
          </div>
          
          <div className="flex justify-center mt-4">
            <motion.button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? (
                <>
                  <Pause size={16} /> Pause Animation
                </>
              ) : (
                <>
                  <Play size={16} /> Auto-Play Animation
                </>
              )}
            </motion.button>
          </div>
        </section>
        
        {/* Content Animation Showcase */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Content Animations</h2>
          <p className="mb-4 text-gray-600">Staggered animations for content elements:</p>
          
          <div className="relative h-64 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-900 to-purple-900 p-6 flex items-center justify-center">
            <motion.div
              variants={contentVariants.staggered}
              initial="hidden"
              animate="visible"
              className="text-center text-white"
            >
              <motion.h3 
                variants={contentVariants.item}
                className="text-2xl font-bold mb-4"
              >
                Animated Content
              </motion.h3>
              
              <motion.p 
                variants={contentVariants.item}
                className="mb-6 max-w-md"
              >
                This example shows how to animate content elements with a staggered effect,
                creating a more engaging user experience.
              </motion.p>
              
              <motion.div variants={contentVariants.item}>
                <motion.button
                  className="bg-white text-blue-900 px-6 py-2 rounded-full font-medium"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.5)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Button Animations</h3>
            <div className="flex flex-wrap gap-4">
              <motion.button
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Scale Effect
              </motion.button>
              
              <motion.button
                className="bg-green-600 text-white px-4 py-2 rounded-md"
                whileHover={{ backgroundColor: "#166534", y: -2 }}
                whileTap={{ y: 0 }}
                transition={{ duration: 0.2 }}
              >
                Color & Position
              </motion.button>
              
              <motion.button
                className="bg-purple-600 text-white px-4 py-2 rounded-md overflow-hidden relative"
                whileHover="hover"
                whileTap="tap"
                variants={navButtonVariants}
              >
                <motion.span
                  className="absolute inset-0 bg-white"
                  initial={{ x: "-100%", opacity: 0.3 }}
                  whileHover={{ x: "100%", opacity: 0.3 }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10">Shine Effect</span>
              </motion.button>
            </div>
          </div>
        </section>
      </div>
      
      {/* Interactive Demo */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-center">Interactive Animation Demo</h2>
        <p className="mb-8 text-gray-600 text-center max-w-2xl mx-auto">
          This demo combines multiple animation techniques to create an engaging interactive experience.
          Try swiping, clicking the navigation buttons, or using keyboard arrows.
        </p>
        
        <div className="max-w-4xl mx-auto">
          <SwipeExample
            items={exampleItems}
            autoPlay={true}
            animationVariant={selectedVariant}
            showSwipeHint={true}
            enableMouseDrag={true}
            controlsStyle="floating"
            indicatorStyle="lines"
            className="h-80 rounded-lg overflow-hidden shadow-xl"
          />
        </div>
      </section>
      
      {/* Animation Code Examples */}
      <section className="max-w-3xl mx-auto bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Animation Code Examples</h2>
        
        <div className="prose dark:prose-invert max-w-none">
          <h3>Basic Slide Animation</h3>
          <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded overflow-x-auto text-sm">
            {`// Import animation variants
import { slideVariants } from "@/lib/animation-variants"

// Use with AnimatePresence and motion
<AnimatePresence initial={false} mode="wait" custom={direction}>
  <motion.div 
    key={currentIndex}
    custom={direction}
    variants={slideVariants.default}
    initial="enter"
    animate="center"
    exit="exit"
  >
    {/* Your content */}
  </motion.div>
</AnimatePresence>`}
          </pre>
          
          <h3 className="mt-6">Staggered Content Animation</h3>
          <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded overflow-x-auto text-sm">
            {`// Import content variants
import { contentVariants } from "@/lib/animation-variants"

// Parent container with staggered children
<motion.div
  variants={contentVariants.staggered}
  initial="hidden"
  animate="visible"
>
  <motion.h2 variants={contentVariants.item}>
    Animated Heading
  </motion.h2>
  
  <motion.p variants={contentVariants.item}>
    Animated paragraph with delay
  </motion.p>
  
  <motion.button variants={contentVariants.item}>
    Animated Button
  </motion.button>
</motion.div>`}
          </pre>
          
          <h3 className="mt-6">Using SwipeContainer</h3>
          <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded overflow-x-auto text-sm">
            {`// Import SwipeContainer
import SwipeContainer from "@/components/ui/swipe-container"

<SwipeContainer
  onSwipeLeft={handleNext}
  onSwipeRight={handlePrev}
  showSwipeHint={true}
  animationVariant="cube"
  enableMouseDrag={true}
>
  {/* Your swipeable content */}
</SwipeContainer>`}
          </pre>
          
          <p className="mt-6">
            For more examples and documentation, check the <code>SWIPE-NAVIGATION.md</code> file and 
            the animation variants in <code>lib/animation-variants.ts</code>.
          </p>
        </div>
      </section>
    </div>
  )
}