"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, MapPin } from "lucide-react"

// Sample event data
const pastEvents = [
  {
    id: 1,
    title: "Education Drive",
    date: "March 15, 2023",
    time: "10:00 AM - 2:00 PM",
    location: "Haridevpur Public School",
    description: "Distributed educational materials to 100+ students from underprivileged backgrounds.",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 2,
    title: "Health Camp",
    date: "January 20, 2023",
    time: "9:00 AM - 4:00 PM",
    location: "Community Center, Kolkata",
    description: "Free health checkups and medicine distribution for local residents.",
    image: "/placeholder.svg?height=300&width=500",
  },
]

const presentEvents = [
  {
    id: 3,
    title: "Ongoing Tutoring Program",
    date: "April - June 2023",
    time: "Weekdays, 4:00 PM - 6:00 PM",
    location: "Nirvrti Foundation Center",
    description: "Daily tutoring sessions for students preparing for board examinations.",
    image: "/placeholder.svg?height=300&width=500",
  },
]

const upcomingEvents = [
  {
    id: 4,
    title: "Annual Charity Gala",
    date: "July 10, 2023",
    time: "6:00 PM - 10:00 PM",
    location: "Grand Hotel, Kolkata",
    description: "Join us for our annual fundraising event with dinner, entertainment, and auction.",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 5,
    title: "Summer Camp",
    date: "May 15 - June 15, 2023",
    time: "10:00 AM - 3:00 PM",
    location: "Nirvrti Foundation Campus",
    description: "Educational and recreational activities for children during summer vacation.",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: 6,
    title: "Career Counseling Workshop",
    date: "June 25, 2023",
    time: "11:00 AM - 2:00 PM",
    location: "Community Hall, Haridevpur",
    description: "Professional guidance for high school students about career options and opportunities.",
    image: "/placeholder.svg?height=300&width=500",
  },
]

interface EventCardProps {
  event: {
    id: number
    title: string
    date: string
    time: string
    location: string
    description: string
    image: string
  }
}

const EventCard = ({ event }: EventCardProps) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-green-100 h-full flex flex-col">
        <div className="relative h-48 w-full">
          <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
        </div>
        <CardHeader>
          <CardTitle className="text-green-700">{event.title}</CardTitle>
          <CardDescription className="flex flex-col gap-1 mt-2">
            <span className="flex items-center gap-2">
              <Calendar size={16} className="text-green-600" />
              {event.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} className="text-green-600" />
              {event.time}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={16} className="text-green-600" />
              {event.location}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-gray-700 line-clamp-3">{event.description}</p>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => setShowModal(true)}
            className="w-full bg-green-600 hover:bg-green-700 text-white transition-all duration-300 transform hover:scale-105"
          >
            More Info
          </Button>
        </CardFooter>
      </Card>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="relative h-64 w-full">
              <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-green-700 mb-2">{event.title}</h3>
              <div className="flex flex-col gap-2 mb-4">
                <span className="flex items-center gap-2">
                  <Calendar size={18} className="text-green-600" />
                  {event.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={18} className="text-green-600" />
                  {event.time}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={18} className="text-green-600" />
                  {event.location}
                </span>
              </div>
              <p className="text-gray-700 mb-6">{event.description}</p>
              <div className="flex justify-end">
                <Button
                  onClick={() => setShowModal(false)}
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const EventsSection = () => {
  return (
    <section id="events" className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">Our Events</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our past achievements, current initiatives, and upcoming events that make a difference in our
          community.
        </p>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="past" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
            Past Events
          </TabsTrigger>
          <TabsTrigger value="present" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
            Present Events
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
            Upcoming Events
          </TabsTrigger>
        </TabsList>

        <TabsContent value="past" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="present" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {presentEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}

export default EventsSection
