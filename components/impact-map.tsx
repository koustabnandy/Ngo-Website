"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Users, Calendar, School, Heart, Home, Utensils, Activity } from "lucide-react"

interface ImpactLocation {
  id: string
  name: string
  coordinates: { lat: number; lng: number }
  category: "education" | "healthcare" | "food" | "shelter"
  beneficiaries: number
  description: string
  date: string
  image?: string
}

const impactLocations: ImpactLocation[] = [
  {
    id: "loc1",
    name: "Kalighat Education Center",
    coordinates: { lat: 22.5274, lng: 88.3435 },
    category: "education",
    beneficiaries: 120,
    description: "Providing education to underprivileged children in the Kalighat area.",
    date: "Since January 2021",
    image: "/Community-Kitchen.png",
  },
  {
    id: "loc2",
    name: "Haridevpur Medical Camp",
    coordinates: { lat: 22.4883, lng: 88.3406 },
    category: "healthcare",
    beneficiaries: 350,
    description: "Regular health check-ups and medical assistance for local residents.",
    date: "Since March 2022",
    image: "/Live-Conversation.png",
  },
  {
    id: "loc3",
    name: "Sealdah Food Distribution",
    coordinates: { lat: 22.5726, lng: 88.3639 },
    category: "food",
    beneficiaries: 500,
    description: "Daily meals for homeless and underprivileged individuals in the Sealdah area.",
    date: "Since October 2021",
    image: "/During-Durga-Puja.png",
  },
  {
    id: "loc4",
    name: "Rajnagar Community Center",
    coordinates: { lat: 22.4123, lng: 88.2965 },
    category: "shelter",
    beneficiaries: 75,
    description: "Temporary shelter and rehabilitation services for families affected by natural disasters.",
    date: "Since June 2022",
    image: "/Samparc-Foundation.jpg",
  },
  {
    id: "loc5",
    name: "Bakkhali Education Initiative",
    coordinates: { lat: 21.5671, lng: 88.2662 },
    category: "education",
    beneficiaries: 85,
    description: "Educational support and school supplies for children in coastal villages.",
    date: "Since August 2022",
    image: "/Dry-Food-Distribution.png",
  },
  {
    id: "loc6",
    name: "Shibrampur Healthcare Outreach",
    coordinates: { lat: 22.3845, lng: 88.3148 },
    category: "healthcare",
    beneficiaries: 230,
    description: "Mobile healthcare services for remote villages with limited access to medical facilities.",
    date: "Since April 2022",
    image: "/live-conversation-theatre.png",
  },
]

export default function ImpactMap() {
  const [selectedLocation, setSelectedLocation] = useState<ImpactLocation | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [mapLoaded, setMapLoaded] = useState(false)
  const mapRef = useRef<google.maps.Map | null>(null)
  const markersRef = useRef<google.maps.Marker[]>([])
  const mapContainerRef = useRef<HTMLDivElement>(null)
  
  const categoryIcons = {
    education: <School className="h-5 w-5" />,
    healthcare: <Activity className="h-5 w-5" />,
    food: <Utensils className="h-5 w-5" />,
    shelter: <Home className="h-5 w-5" />,
  }
  
  const categoryColors = {
    education: "bg-blue-500",
    healthcare: "bg-green-500",
    food: "bg-yellow-500",
    shelter: "bg-purple-500",
  }
  
  // Load Google Maps API
  useEffect(() => {
    const loadGoogleMapsAPI = () => {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`
      script.async = true
      script.defer = true
      script.onload = initMap
      document.head.appendChild(script)
    }
    
    // Initialize map
    const initMap = () => {
      if (!mapContainerRef.current) return
      
      const mapOptions = {
        center: { lat: 22.5726, lng: 88.3639 }, // Kolkata
        zoom: 10,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: [
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#e9e9e9" }, { lightness: 17 }],
          },
          {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [{ color: "#f5f5f5" }, { lightness: 20 }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [{ color: "#ffffff" }, { lightness: 17 }],
          },
          {
            featureType: "administrative",
            elementType: "geometry.fill",
            stylers: [{ color: "#fefefe" }, { lightness: 20 }],
          },
        ],
      }
      
      // Create map instance
      mapRef.current = new google.maps.Map(mapContainerRef.current, mapOptions)
      
      // Add markers
      addMarkers()
      
      setMapLoaded(true)
    }
    
    // For demo purposes, we'll simulate the map without actually loading the API
    // In a real implementation, you would use loadGoogleMapsAPI()
    setTimeout(() => {
      setMapLoaded(true)
    }, 1000)
    
    return () => {
      // Clean up markers
      if (markersRef.current) {
        markersRef.current.forEach((marker) => {
          if (marker) marker.setMap(null)
        })
      }
    }
  }, [])
  
  // Add markers to the map
  const addMarkers = () => {
    if (!mapRef.current) return
    
    // Clear existing markers
    markersRef.current.forEach((marker) => {
      if (marker) marker.setMap(null)
    })
    markersRef.current = []
    
    // Add new markers based on active category
    const locationsToShow = activeCategory === "all"
      ? impactLocations
      : impactLocations.filter((loc) => loc.category === activeCategory)
    
    locationsToShow.forEach((location) => {
      if (!mapRef.current) return
      
      const marker = new google.maps.Marker({
        position: location.coordinates,
        map: mapRef.current,
        title: location.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: getCategoryColor(location.category),
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: "#ffffff",
        },
      })
      
      marker.addListener("click", () => {
        setSelectedLocation(location)
      })
      
      markersRef.current.push(marker)
    })
  }
  
  // Update markers when category changes
  useEffect(() => {
    if (mapLoaded && mapRef.current) {
      addMarkers()
    }
  }, [activeCategory, mapLoaded])
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "education": return "#3b82f6"
      case "healthcare": return "#10b981"
      case "food": return "#f59e0b"
      case "shelter": return "#8b5cf6"
      default: return "#3b82f6"
    }
  }
  
  return (
    <section id="impact-map" className="py-16 bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 dark:text-blue-400 mb-3 relative inline-block">
            OUR <span className="text-yellow-500 dark:text-yellow-400">IMPACT</span>
            <span className="absolute -bottom-1 left-1/4 right-1/4 h-1 bg-gradient-to-r from-blue-500 to-yellow-500 rounded-full"></span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
            Explore the locations where we've made a difference in the community through our various initiatives.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="map" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 dark:bg-gray-800 h-10 rounded-full overflow-hidden border border-blue-100 dark:border-gray-700 p-1">
              <TabsTrigger 
                value="map" 
                className="text-sm rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-700 dark:data-[state=active]:text-white dark:text-gray-200 transition-all duration-300"
              >
                Impact Map
              </TabsTrigger>
              <TabsTrigger 
                value="list" 
                className="text-sm rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-700 dark:data-[state=active]:text-white dark:text-gray-200 transition-all duration-300"
              >
                Impact List
              </TabsTrigger>
            </TabsList>
            
            <div className="flex justify-center mb-6 gap-2 flex-wrap">
              <Button
                variant={activeCategory === "all" ? "default" : "outline"}
                className={`rounded-full text-xs px-4 ${activeCategory === "all" ? "bg-blue-600" : ""}`}
                onClick={() => setActiveCategory("all")}
              >
                All Categories
              </Button>
              <Button
                variant={activeCategory === "education" ? "default" : "outline"}
                className={`rounded-full text-xs px-4 flex items-center gap-1 ${activeCategory === "education" ? "bg-blue-600" : ""}`}
                onClick={() => setActiveCategory("education")}
              >
                <School className="h-3.5 w-3.5" /> Education
              </Button>
              <Button
                variant={activeCategory === "healthcare" ? "default" : "outline"}
                className={`rounded-full text-xs px-4 flex items-center gap-1 ${activeCategory === "healthcare" ? "bg-green-600" : ""}`}
                onClick={() => setActiveCategory("healthcare")}
              >
                <Activity className="h-3.5 w-3.5" /> Healthcare
              </Button>
              <Button
                variant={activeCategory === "food" ? "default" : "outline"}
                className={`rounded-full text-xs px-4 flex items-center gap-1 ${activeCategory === "food" ? "bg-yellow-600" : ""}`}
                onClick={() => setActiveCategory("food")}
              >
                <Utensils className="h-3.5 w-3.5" /> Food & Nutrition
              </Button>
              <Button
                variant={activeCategory === "shelter" ? "default" : "outline"}
                className={`rounded-full text-xs px-4 flex items-center gap-1 ${activeCategory === "shelter" ? "bg-purple-600" : ""}`}
                onClick={() => setActiveCategory("shelter")}
              >
                <Home className="h-3.5 w-3.5" /> Shelter
              </Button>
            </div>
            
            <TabsContent value="map" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="overflow-hidden border border-gray-100 dark:border-gray-700 shadow-md h-[500px]">
                    <CardContent className="p-0 h-full">
                      {mapLoaded ? (
                        <div className="relative h-full">
                          {/* This would be the actual Google Map in a real implementation */}
                          <div ref={mapContainerRef} className="w-full h-full bg-blue-50 dark:bg-gray-800 flex items-center justify-center">
                            <div className="text-center p-6">
                              <MapPin className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                Interactive Map Simulation
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400 max-w-md">
                                In a real implementation, this would be an interactive Google Map showing our impact locations.
                                For this demo, please use the list view to explore our impact areas.
                              </p>
                            </div>
                          </div>
                          
                          {/* Map Legend */}
                          <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
                            <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Legend</h4>
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                                <span className="text-xs text-gray-700 dark:text-gray-300">Education</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                <span className="text-xs text-gray-700 dark:text-gray-300">Healthcare</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                                <span className="text-xs text-gray-700 dark:text-gray-300">Food & Nutrition</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                                <span className="text-xs text-gray-700 dark:text-gray-300">Shelter</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-50 dark:bg-gray-800">
                          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
                
                <div className="lg:col-span-1">
                  <Card className="border border-gray-100 dark:border-gray-700 shadow-md h-[500px] overflow-hidden">
                    <CardContent className="p-4 h-full flex flex-col">
                      <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400 mb-4">
                        {selectedLocation ? "Location Details" : "Select a Location"}
                      </h3>
                      
                      {selectedLocation ? (
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={selectedLocation.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="flex-1 overflow-auto"
                          >
                            <div className="relative h-40 w-full mb-4 rounded-lg overflow-hidden">
                              {selectedLocation.image ? (
                                <img
                                  src={selectedLocation.image}
                                  alt={selectedLocation.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                  <MapPin className="h-10 w-10 text-blue-500" />
                                </div>
                              )}
                              <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium text-white shadow-sm" style={{
                                backgroundColor: getCategoryColor(selectedLocation.category)
                              }}>
                                {selectedLocation.category}
                              </div>
                            </div>
                            
                            <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                              {selectedLocation.name}
                            </h4>
                            
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                              {selectedLocation.description}
                            </p>
                            
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                                <span className="text-gray-700 dark:text-gray-300 text-sm">
                                  <strong>{selectedLocation.beneficiaries}</strong> beneficiaries
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                                <span className="text-gray-700 dark:text-gray-300 text-sm">
                                  {selectedLocation.date}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                                <span className="text-gray-700 dark:text-gray-300 text-sm">
                                  {selectedLocation.coordinates.lat.toFixed(4)}, {selectedLocation.coordinates.lng.toFixed(4)}
                                </span>
                              </div>
                            </div>
                            
                            <div className="mt-6">
                              <Button 
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
                                asChild
                              >
                                <a href="#donate">
                                  <Heart className="h-4 w-4 mr-2" /> Support This Initiative
                                </a>
                              </Button>
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center">
                          <MapPin className="h-12 w-12 text-blue-500 mb-4" />
                          <p className="text-gray-600 dark:text-gray-300 max-w-xs">
                            Select a location on the map to view details about our impact in that area.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="list" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {impactLocations
                  .filter(loc => activeCategory === "all" || loc.category === activeCategory)
                  .map((location, index) => (
                    <motion.div
                      key={location.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      onClick={() => setSelectedLocation(location)}
                    >
                      <Card className={`h-full overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 cursor-pointer ${selectedLocation?.id === location.id ? 'ring-2 ring-blue-500' : ''}`}>
                        <CardContent className="p-0">
                          <div className="relative h-40 w-full">
                            {location.image ? (
                              <img
                                src={location.image}
                                alt={location.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                <MapPin className="h-10 w-10 text-blue-500" />
                              </div>
                            )}
                            <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium text-white shadow-sm" style={{
                              backgroundColor: getCategoryColor(location.category)
                            }}>
                              {location.category}
                            </div>
                          </div>
                          
                          <div className="p-4">
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                              {location.name}
                            </h4>
                            
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                              {location.description}
                            </p>
                            
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                                <span className="text-gray-700 dark:text-gray-300 text-sm">
                                  <strong>{location.beneficiaries}</strong> beneficiaries
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                                <span className="text-gray-700 dark:text-gray-300 text-sm">
                                  {location.date}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}