"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, ImageIcon, Film } from "lucide-react"

// Sample media data
const photos = [
  {
    id: 1,
    src: "/cultural program.jpg?height=400&width=600",
    alt: "Education Drive",
    caption: "Education Drive at Haridevpur School",
  },
  { id: 2, src: "/health.jpg?height=400&width=600", alt: "Health Camp", caption: "Annual Health Camp" },
  { id: 3, src: "/meeting.jpeg?height=400&width=600", alt: "Community Meeting", caption: "Community Meeting" },
  {
    id: 4,
    src: "/volunteer_training.jpg?height=400&width=600",
    alt: "Volunteer Training",
    caption: "Volunteer Training Session",
  },
  { id: 5, src: "/food.jpg?height=400&width=600", alt: "Food Distribution", caption: "Food Distribution Drive" },
  {
    id: 6,
    src: "/cultural.jpg?height=400&width=600",
    alt: "Cultural Program",
    caption: "Cultural Program by Students",
  },
]

const reels = [
  { id: 1, thumbnail: "/placeholder.svg?height=400&width=600", title: "A Day at Nirvrti", views: "1.2K" },
  { id: 2, thumbnail: "/placeholder.svg?height=400&width=600", title: "Behind the Scenes", views: "850" },
  { id: 3, thumbnail: "/placeholder.svg?height=400&width=600", title: "Student Success Stories", views: "2.3K" },
  { id: 4, thumbnail: "/placeholder.svg?height=400&width=600", title: "Community Impact", views: "1.5K" },
]

const MediaSection = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<null | { src: string; alt: string; caption: string }>(null)

  return (
    <section id="media" className="py-16 bg-blue-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-12">
          Media <span className="text-yellow-500">Gallery</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our photos, videos, and reels showcasing our work and impact in the community.
        </p>
      </div>

      <Tabs defaultValue="photos" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger
            value="photos"
            className="data-[state=active]:bg-yellow-100 data-[state=active]:text-blue-700 flex items-center gap-2"
          >
            <ImageIcon size={16} />
            Photos
          </TabsTrigger>
          
          <TabsTrigger
            value="reels"
            className="data-[state=active]:bg-yellow-100 data-[state=active]:text-blue-700 flex items-center gap-2"
          >
            
            <Play size={16} />
            Blog
          </TabsTrigger>
          
        </TabsList>

        <TabsContent value="photos" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="relative group cursor-pointer overflow-hidden rounded-lg"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={photo.src || "/placeholder.svg"}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                  <div className="p-4 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-medium text-sm">{photo.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reels" className="mt-0">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {reels.map((reel) => (
              <div key={reel.id} className="group cursor-pointer">
                <div className="relative h-64 rounded-lg overflow-hidden mb-2">
                  <Image src={reel.thumbnail || "/placeholder.svg"} alt={reel.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full transition-transform duration-300 group-hover:scale-110">
                      <Play size={20} className="text-white" />
                    </div>
                  </div>
                </div>
                <h3 className="font-medium text-green-700 text-sm">{reel.title}</h3>
                <p className="text-gray-500 text-xs">{reel.views} views</p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="max-w-4xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-[70vh] w-full">
              <Image
                src={selectedPhoto.src || "/placeholder.svg"}
                alt={selectedPhoto.alt}
                fill
                className="object-contain"
              />
            </div>
            <div className="bg-white p-4 rounded-b-lg">
              <p className="text-gray-800 font-medium">{selectedPhoto.caption}</p>
            </div>
          </div>
          <button
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full"
            onClick={() => setSelectedPhoto(null)}
          >
            ✕
          </button>
        </div>
      )}
    </section>
  )
}

export default MediaSection
