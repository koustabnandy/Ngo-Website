import { Variants } from "framer-motion";

/**
 * Animation variants for carousel/swipe transitions
 */

// Slide transition variants
export const slideVariants: Record<string, Variants> = {
  // Basic slide transition
  default: {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  },
  
  // Fade transition
  fade: {
    enter: {
      opacity: 0,
    },
    center: {
      opacity: 1,
      transition: {
        opacity: { duration: 0.5, ease: "easeOut" },
      },
    },
    exit: {
      opacity: 0,
      transition: {
        opacity: { duration: 0.3, ease: "easeIn" },
      },
    },
  },
  
  // Zoom transition
  zoom: {
    enter: {
      scale: 0.85,
      opacity: 0,
    },
    center: {
      scale: 1,
      opacity: 1,
      transition: {
        scale: { type: "spring", stiffness: 300, damping: 25 },
        opacity: { duration: 0.5 },
      },
    },
    exit: {
      scale: 0.85,
      opacity: 0,
      transition: {
        scale: { type: "spring", stiffness: 300, damping: 25 },
        opacity: { duration: 0.3 },
      },
    },
  },
  
  // 3D flip transition
  flip: {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
      z: -100,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      z: 0,
      transition: {
        rotateY: { type: "spring", stiffness: 300, damping: 25 },
        opacity: { duration: 0.5 },
        z: { duration: 0.5 },
      },
    },
    exit: (direction: number) => ({
      rotateY: direction < 0 ? 90 : -90,
      opacity: 0,
      z: -100,
      transition: {
        rotateY: { type: "spring", stiffness: 300, damping: 25 },
        opacity: { duration: 0.3 },
        z: { duration: 0.5 },
      },
    }),
  },
  
  // Cube transition
  cube: {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 90 : -90,
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      transformOrigin: direction > 0 ? "left center" : "right center",
    }),
    center: {
      rotateY: 0,
      x: 0,
      opacity: 1,
      transformOrigin: "center center",
      transition: {
        rotateY: { type: "spring", stiffness: 300, damping: 30 },
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
      },
    },
    exit: (direction: number) => ({
      rotateY: direction < 0 ? 90 : -90,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      transformOrigin: direction < 0 ? "left center" : "right center",
      transition: {
        rotateY: { type: "spring", stiffness: 300, damping: 30 },
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    }),
  },
  
  // Crossfade transition
  crossfade: {
    enter: {
      opacity: 0,
      scale: 1.05,
    },
    center: {
      opacity: 1,
      scale: 1,
      transition: {
        opacity: { duration: 0.7, ease: "easeOut" },
        scale: { duration: 0.7, ease: "easeOut" },
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        opacity: { duration: 0.5, ease: "easeIn" },
        scale: { duration: 0.5, ease: "easeIn" },
      },
    },
  },
  
  // Slide with rotation
  slideRotate: {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      rotate: direction > 0 ? 10 : -10,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      rotate: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        rotate: { type: "spring", stiffness: 200, damping: 20 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      rotate: direction < 0 ? 10 : -10,
      opacity: 0,
      scale: 0.9,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        rotate: { type: "spring", stiffness: 200, damping: 20 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    }),
  },
  
  // Vertical slide
  slideVertical: {
    enter: (direction: number) => ({
      y: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
      transition: {
        y: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
      },
    },
    exit: (direction: number) => ({
      y: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      transition: {
        y: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    }),
  },
};

// Content animation variants
export const contentVariants: Record<string, Variants> = {
  // Staggered fade in for content elements
  staggered: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  },
  
  // Item animation for staggered content
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300,
        damping: 20,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  },
  
  // Fade in for captions
  caption: {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.3,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  },
  
  // Button animation
  button: {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { 
      scale: 0.95,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    }
  },
  
  // Indicator animation
  indicator: {
    inactive: { scale: 1 },
    active: { 
      scale: 1.2,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    }
  }
};

// Progress bar animation
export const progressVariants: Variants = {
  start: { width: "0%" },
  end: { 
    width: "100%", 
    transition: { 
      duration: 5, // Default duration
      ease: "linear" 
    }
  }
};

// Navigation button animations
export const navButtonVariants: Variants = {
  initial: { 
    opacity: 0.7,
    scale: 1
  },
  hover: { 
    opacity: 1,
    scale: 1.1,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 10 
    }
  },
  tap: { 
    scale: 0.9,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 10 
    }
  }
};

// Swipe hint animation
export const swipeHintVariants: Variants = {
  initial: { 
    opacity: 0,
    x: 0
  },
  animate: {
    opacity: 1,
    x: [0, -10, 10, 0],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 1.5,
        ease: "easeInOut"
      },
      opacity: {
        duration: 0.5
      }
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};