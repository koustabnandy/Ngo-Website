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
    <div className="fixed right-6 bottom-24 z-50">
      {isOpen ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 animate-in slide-in-from-right">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Accessibility Options</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              aria-label="Close accessibility menu"
            >
              <X size={18} />
            </Button>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Text Size</h4>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={decreaseFontSize}
                  disabled={fontSize <= 80}
                  aria-label="Decrease font size"
                >
                  <ZoomOut size={16} />
                </Button>
                <Button 
                  variant="outline" 
                  onClick={resetFontSize}
                  className="text-xs"
                  aria-label="Reset font size"
                >
                  Reset (100%)
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={increaseFontSize}
                  disabled={fontSize >= 150}
                  aria-label="Increase font size"
                >
                  <ZoomIn size={16} />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme</h4>
              <div className="flex gap-2">
                <Button 
                  variant={theme === "light" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("light")}
                  className="flex items-center gap-1"
                  aria-label="Switch to light theme"
                >
                  <Sun size={16} />
                  Light
                </Button>
                <Button 
                  variant={theme === "dark" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("dark")}
                  className="flex items-center gap-1"
                  aria-label="Switch to dark theme"
                >
                  <Moon size={16} />
                  Dark
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Button 
          className="rounded-full p-3 bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
          onClick={() => setIsOpen(true)}
          aria-label="Open accessibility options"
        >
          <Accessibility size={24} />
        </Button>
      )}
    </div>
  )
}

export default AccessibilityWidget
