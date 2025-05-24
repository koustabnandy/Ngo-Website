# Swipe Navigation Components

This directory contains reusable components for implementing smooth swipe navigation in carousels and slideshows.

## Components

### 1. SwipeContainer

A wrapper component that adds swipe gesture detection to any content.

```tsx
import SwipeContainer from "@/components/ui/swipe-container";

<SwipeContainer
  onSwipeLeft={() => console.log("Swiped left")}
  onSwipeRight={() => console.log("Swiped right")}
  onSwipeStart={() => console.log("Swipe started")}
  onSwipeEnd={() => console.log("Swipe ended")}
  threshold={10} // Minimum swipe distance
>
  {/* Your content here */}
</SwipeContainer>;
```

### 2. useSwipeNavigation Hook

A custom hook for managing carousel/swipe navigation state.

```tsx
import useSwipeNavigation from "@/hooks/use-swipe-navigation";

const {
  currentIndex,
  progressWidth,
  isAutoPlaying,
  goToIndex,
  goToNext,
  goToPrev,
  toggleAutoPlay,
  handleSwipeStart,
  handleSwipeEnd,
} = useSwipeNavigation({
  totalItems: items.length,
  initialIndex: 0,
  autoPlay: true,
  autoPlayInterval: 5000,
  loop: true,
  onSlideChange: (index) => console.log(`Slide changed to ${index}`),
});
```

### 3. SwipeExample

A complete example component that demonstrates how to use SwipeContainer and useSwipeNavigation together.

```tsx
import SwipeExample from "@/components/ui/swipe-example"

const items = [
  <div key="1">Slide 1</div>,
  <div key="2">Slide 2</div>,
  <div key="3">Slide 3</div>,
]

<SwipeExample
  items={items}
  autoPlay={true}
  showControls={true}
  showIndicators={true}
  className="h-64"
/>
```

## Implementation in Existing Components

The swipe navigation has been implemented in the following components:

1. **Carousel Component**: The base carousel component now uses SwipeContainer for touch navigation.

2. **Social Media Feed**: Uses the swipe navigation for mobile carousel view.

3. **Hero Carousel**: Implements touch-based navigation with smooth transitions.

4. **Image Gallery**: Uses swipe gestures for navigating through the gallery.

5. **Events Section**: Implements swipe navigation for event cards.

6. **Media Section**: Uses swipe gestures for photo navigation.

## How to Add Swipe Navigation to a New Component

1. Import the SwipeContainer component:

   ```tsx
   import SwipeContainer from "@/components/ui/swipe-container";
   ```

2. Wrap your content with SwipeContainer and provide the necessary callbacks:

   ```tsx
   <SwipeContainer
     onSwipeLeft={nextSlide}
     onSwipeRight={prevSlide}
     onSwipeStart={() => clearAutoPlay()}
     onSwipeEnd={() => startAutoPlay()}
   >
     {/* Your carousel/slider content */}
   </SwipeContainer>
   ```

3. For more complex state management, use the useSwipeNavigation hook:

   ```tsx
   import useSwipeNavigation from "@/hooks/use-swipe-navigation";

   const {
     currentIndex,
     goToNext,
     goToPrev,
     // ... other utilities
   } = useSwipeNavigation({
     totalItems: items.length,
     autoPlay: true,
   });
   ```

4. Use the SwipeExample component as a reference for implementing a complete carousel with swipe navigation.
