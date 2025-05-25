# Swipe Navigation Components

This directory contains reusable components for implementing smooth swipe navigation in carousels and slideshows with advanced animation options.

## Components

### 1. SwipeContainer

A wrapper component that adds swipe gesture detection to any content with enhanced animation capabilities.

```tsx
import SwipeContainer from "@/components/ui/swipe-container";
import { slideVariants } from "@/lib/animation-variants";

<SwipeContainer
  onSwipeLeft={() => console.log("Swiped left")}
  onSwipeRight={() => console.log("Swiped right")}
  onSwipeStart={() => console.log("Swipe started")}
  onSwipeEnd={() => console.log("Swipe ended")}
  threshold={5} // Minimum swipe distance
  showSwipeHint={true} // Show swipe hint animation on first render
  animationVariant="cube" // Animation style from slideVariants
  showFeedback={true} // Show visual feedback during swipe
  enableMouseDrag={true} // Enable mouse drag for desktop users
  swipeDirection="horizontal" // Direction of swipe to detect
>
  {/* Your content here */}
</SwipeContainer>;
```

### 2. useSwipeNavigation Hook

A custom hook for managing carousel/swipe navigation state with enhanced options.

```tsx
import useSwipeNavigation from "@/hooks/use-swipe-navigation";

const {
  currentIndex,
  progressWidth,
  isAutoPlaying,
  isPaused,
  direction,
  goToIndex,
  goToNext,
  goToPrev,
  toggleAutoPlay,
  pauseAutoPlay,
  resumeAutoPlay,
  handleSwipeStart,
  handleSwipeEnd,
  setContainerRef,
} = useSwipeNavigation({
  totalItems: items.length,
  initialIndex: 0,
  autoPlay: true,
  autoPlayInterval: 5000,
  loop: true,
  onSlideChange: (index, direction) =>
    console.log(`Slide changed to ${index} in direction ${direction}`),
  pauseOnHover: true,
  pauseOnInteraction: false,
  resetProgressOnChange: true,
  keyboardNavigation: true,
  touchNavigation: true,
  mouseWheelNavigation: false,
});
```

### 3. SwipeExample

A complete example component that demonstrates how to use SwipeContainer and useSwipeNavigation together with animation options.

```tsx
import SwipeExample from "@/components/ui/swipe-example";
import { slideVariants } from "@/lib/animation-variants";

const items = [
  <div key="1">Slide 1</div>,
  <div key="2">Slide 2</div>,
  <div key="3">Slide 3</div>,
];

<SwipeExample
  items={items}
  autoPlay={true}
  showControls={true}
  showIndicators={true}
  className="h-64"
  animationVariant="slideRotate" // Animation style from slideVariants
  showSwipeHint={true}
  enableMouseDrag={true}
  controlsStyle="floating" // "minimal", "default", "floating", or "hidden"
  indicatorStyle="lines" // "dots", "lines", "numbers", "thumbnails", or "hidden"
  progressBarStyle="top" // "top", "bottom", or "hidden"
  autoPlayInterval={5000}
/>;
```

## Animation Variants

The library includes a variety of animation variants for different transition effects:

### Slide Transitions

- **default**: Basic slide transition with opacity
- **fade**: Simple fade transition
- **zoom**: Zoom in/out transition
- **flip**: 3D flip transition
- **cube**: 3D cube rotation transition
- **crossfade**: Smooth crossfade with slight scaling
- **slideRotate**: Slide with rotation effect
- **slideVertical**: Vertical slide transition

### Content Animations

- **staggered**: Staggered fade-in for content elements
- **item**: Animation for individual items in staggered content
- **caption**: Fade-in animation for captions
- **button**: Button hover and tap animations
- **indicator**: Indicator active/inactive animations

### Progress and Navigation

- **progressVariants**: Progress bar animation
- **navButtonVariants**: Navigation button animations
- **swipeHintVariants**: Swipe hint animation

## Implementation in Existing Components

The swipe navigation has been implemented in the following components:

1. **Carousel Component**: The base carousel component now uses SwipeContainer for touch navigation.

2. **Social Media Feed**: Uses the swipe navigation for mobile carousel view.

3. **Hero Carousel**: Implements touch-based navigation with smooth transitions.

4. **Image Gallery**: Uses swipe gestures for navigating through the gallery.

5. **Events Section**: Implements swipe navigation for event cards.

6. **Media Section**: Uses swipe gestures for photo navigation.

## How to Add Swipe Navigation to a New Component

1. Import the SwipeContainer component and animation variants:

   ```tsx
   import SwipeContainer from "@/components/ui/swipe-container";
   import { slideVariants, contentVariants } from "@/lib/animation-variants";
   import { motion, AnimatePresence } from "framer-motion";
   ```

2. Wrap your content with SwipeContainer and provide the necessary callbacks:

   ```tsx
   <SwipeContainer
     onSwipeLeft={nextSlide}
     onSwipeRight={prevSlide}
     onSwipeStart={() => clearAutoPlay()}
     onSwipeEnd={() => startAutoPlay()}
     animationVariant="cube"
     showSwipeHint={true}
     enableMouseDrag={true}
   >
     <AnimatePresence initial={false} mode="wait" custom={direction}>
       <motion.div
         key={currentIndex}
         custom={direction}
         variants={slideVariants.cube}
         initial="enter"
         animate="center"
         exit="exit"
       >
         {/* Your carousel/slider content */}
       </motion.div>
     </AnimatePresence>
   </SwipeContainer>
   ```

3. For more complex state management, use the useSwipeNavigation hook:

   ```tsx
   import useSwipeNavigation from "@/hooks/use-swipe-navigation";

   const {
     currentIndex,
     direction,
     goToNext,
     goToPrev,
     // ... other utilities
   } = useSwipeNavigation({
     totalItems: items.length,
     autoPlay: true,
     keyboardNavigation: true,
     mouseWheelNavigation: true,
   });
   ```

4. Add staggered content animations for a more engaging experience:

   ```tsx
   <motion.div
     variants={contentVariants.staggered}
     initial="hidden"
     animate="visible"
   >
     <motion.h2 variants={contentVariants.item}>Animated Heading</motion.h2>
     <motion.p variants={contentVariants.item}>
       Animated paragraph with delay
     </motion.p>
     <motion.button variants={contentVariants.item}>
       Animated Button
     </motion.button>
   </motion.div>
   ```

5. Use the SwipeExample component as a reference for implementing a complete carousel with swipe navigation and animations.

## Example Pages

Check out these example pages to see the swipe navigation and animations in action:

1. `/examples/swipe-navigation` - Basic swipe navigation examples
2. `/examples/animation-showcase` - Advanced animation showcase with interactive demos
