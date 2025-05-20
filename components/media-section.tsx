"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageIcon, FileText } from "lucide-react"

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

const blogPosts = [
  {
    id: 1,
    title: "Annual Health Camp",
    excerpt:
      "A community-driven literacy program that impacted over 100 children in Haridevpur, fostering a culture of reading and learning.",
    date: "September 18, 2022",
    author: "Nirvrti Team",
    image: "/health.jpg",
    slug: "#", // Placeholder
  },
  {
    id: 2,
    title: "Clothes Donation Camp",
    excerpt:
      "This winter, our volunteers came together to distribute warm clothes and blankets to over 200 individuals in need.",
    date: "January 5, 2023",
    author: "Nirvrti Volunteers",
    image: "/clothes.jpg", // You mentioned to use this
    slug: "https://www.facebook.com/reachnirvrti/posts/pfbid0wJ",
  },
  {
    id: 3,
    title: "Community Meeting",
    excerpt:
      "A celebration filled with cultural programs, flag hoisting, and community meals to foster patriotism and unity.",
    date: "August 15, 2023",
    author: "Community Leaders",
    image: "/meeting.jpeg",
    slug: "https://www.facebook.com/reachnirvrti/posts/pfbid02k",
  },
  
 
  
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
          Explore our photos and blog stories showcasing our work and impact in the community.
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
            value="blog"
            className="data-[state=active]:bg-yellow-100 data-[state=active]:text-blue-700 flex items-center gap-2"
          >
            <FileText size={16} />
            Blog
          </TabsTrigger>
        </TabsList>

        {/* Photos Tab */}
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

        {/* Blog Tab */}
        <TabsContent value="blog" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <a
                key={post.id}
                href={post.slug}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-lg overflow-hidden bg-white shadow hover:shadow-lg transition"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-blue-800 font-semibold text-sm mb-1">{post.title}</h3>
                  <p className="text-gray-500 text-xs mb-2">{post.date}</p>
                  <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>
                </div>
              </a>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Photo Modal */}
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
