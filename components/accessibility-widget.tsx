// c:/Users/rajde/OneDrive/Desktop/Frontend/ngo/Ngo-Website/components/accessibility-widget.tsx

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Accessibility, 
  ZoomIn, 
  ZoomOut, 
  Sun, 
  Moon, 
  Type, 
  X 
} from "lucide-react"
import { useTheme } from "next-themes"

const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [fontSize, setFontSize] = useState(100)
  const { setTheme, theme } = useTheme()
  
  const increaseFontSize = () => {
    if (fontSize < 150) {
      const newSize = fontSize + 10
      setFontSize(newSize)
      document.documentElement.style.fontSize = `${newSize}%`
    }
  }
  
  const decreaseFontSize = () => {
    if (fontSize > 80) {
      const newSize = fontSize - 10
      setFontSize(newSize)
      document.documentElement.style.fontSize = `${newSize}%`
    }
  }
  
  const resetFontSize = () => {
    setFontSize(100)
    document.documentElement.style.fontSize = "100%"
  }
  
  return (
    <div className="fixed z-50 sm:right-6 sm:bottom-24 right-4 bottom-20">
      {isOpen ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-3 sm:p-4 animate-in slide-in-from-right max-w-[90vw] sm:max-w-xs">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">Accessibility Options</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              aria-label="Close accessibility menu"
              className="h-8 w-8"
            >
              <X size={16} />
            </Button>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            <div>
              <h4 className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Text Size</h4>
              <div className="flex items-center gap-1 sm:gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={decreaseFontSize}
                  disabled={fontSize <= 80}
                  aria-label="Decrease font size"
                  className="h-9 w-9 sm:h-10 sm:w-10 touch-manipulation"
                >
                  <ZoomOut size={16} />
                </Button>
                <Button 
                  variant="outline" 
                  onClick={resetFontSize}
                  className="text-xs h-9 sm:h-10 touch-manipulation"
                  aria-label="Reset font size"
                >
                  Reset
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={increaseFontSize}
                  disabled={fontSize >= 150}
                  aria-label="Increase font size"
                  className="h-9 w-9 sm:h-10 sm:w-10 touch-manipulation"
                >
                  <ZoomIn size={16} />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme</h4>
              <div className="flex gap-1 sm:gap-2">
                <Button 
                  variant={theme === "light" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("light")}
                  className="flex items-center gap-1 h-9 sm:h-10 touch-manipulation"
                  aria-label="Switch to light theme"
                >
                  <Sun size={16} />
                  <span className="sm:inline">Light</span>
                </Button>
                <Button 
                  variant={theme === "dark" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("dark")}
                  className="flex items-center gap-1 h-9 sm:h-10 touch-manipulation"
                  aria-label="Switch to dark theme"
                >
                  <Moon size={16} />
                  <span className="sm:inline">Dark</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Button 
          className="rounded-full p-2 sm:p-3 bg-blue-600 hover:bg-blue-700 text-white shadow-lg h-12 w-12 sm:h-14 sm:w-14 touch-manipulation"
          onClick={() => setIsOpen(true)}
          aria-label="Open accessibility options"
        >
          <Accessibility size={20} className="sm:hidden" />
          <Accessibility size={24} className="hidden sm:block" />
        </Button>
      )}
    </div>
  )
}

export default AccessibilityWidget
