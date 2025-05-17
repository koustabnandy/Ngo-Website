"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const pastEvents = [
  {
    id: 1,
    title: "Menstrual Health Awareness Camp",
    date: "March 15, 2023",
    time: "10:00 AM - 2:00 PM",
    location: "Haridevpur Public School, Kolkata",
    description:
      "Conducted awareness sessions on menstrual health and hygiene for adolescent girls. Distributed sanitary products to 100+ students from underprivileged backgrounds.",
    image: "https://www.facebook.com/reachnirvrti/photos/1",
    facebookUrl: "https://www.facebook.com/events/1",
  },
  {
    id: 2,
    title: "Mental Wellbeing Workshop",
    date: "January 20, 2023",
    time: "9:00 AM - 4:00 PM",
    location: "507, Ustad Amir Khan Sarani, Haridevpur, Kolkata",
    description:
      "Free mental health counseling sessions and awareness program for local residents focusing on stress management and emotional wellbeing.",
    image: "https://www.facebook.com/reachnirvrti/photos/2",
    facebookUrl: "https://www.facebook.com/events/2",
  },
]

const upcomingEvents = [
  {
    id: 4,
    title: "Women Empowerment Workshop Series",
    date: "July 10, 2023",
    time: "6:00 PM - 8:00 PM",
    location: "Community Hall, Haridevpur, Kolkata",
    description:
      "Join us for our workshop series focusing on skill development, financial literacy, and entrepreneurship opportunities for women.",
    image: "https://www.facebook.com/reachnirvrti/photos/4",
    facebookUrl: "https://www.facebook.com/events/4",
  },
  {
    id: 5,
    title: "Menstrual Health & Hygiene Awareness Camp",
    date: "May 15 - June 15, 2023",
    time: "10:00 AM - 3:00 PM",
    location: "Various Schools in Haridevpur, Kolkata",
    description:
      "A series of awareness programs on menstrual health & hygiene for adolescent girls in local schools, including distribution of sanitary products.",
    image: "https://www.facebook.com/reachnirvrti/photos/5",
    facebookUrl: "https://www.facebook.com/events/5",
  },
  {
    id: 6,
    title: "Mental Wellbeing Counseling Sessions",
    date: "June 25, 2023",
    time: "11:00 AM - 2:00 PM",
    location: "507, Ustad Amir Khan Sarani, Haridevpur, Kolkata",
    description:
      "Free counseling sessions with professional mental health experts focusing on stress management, anxiety, and depression.",
    image: "https://www.facebook.com/reachnirvrti/photos/6",
    facebookUrl: "https://www.facebook.com/events/6",
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
    facebookUrl: string
  }
}

const EventCard = ({ event }: EventCardProps) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Link href={event.facebookUrl} target="_blank" rel="noopener noreferrer" className="inline-block">
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-blue-100 h-full flex flex-col cursor-pointer">
          <div className="relative h-48 w-full">
            <Image src={event.image} alt={event.title} fill className="object-cover" />
          </div>
          <CardHeader>
            <CardTitle className="text-blue-700">{event.title}</CardTitle>
            <CardDescription className="flex flex-col gap-1 mt-2">
              <span className="flex items-center gap-2">
                <Calendar size={16} className="text-blue-600" />
                {event.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} className="text-blue-600" />
                {event.time}
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={16} className="text-blue-600" />
                {event.location}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-gray-700 line-clamp-3">{event.description}</p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={(e) => {
                e.preventDefault()
                setShowModal(true)
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105"
            >
              More Info
            </Button>
          </CardFooter>
        </Card>
      </Link>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="relative h-64 w-full">
              <Image src={event.image} alt={event.title} fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-green-700 mb-2">{event.title}</h3>
              <div className="flex flex-col gap-2 mb-4">
                <span className="flex items-center gap-2">
                  <Calendar size={18} className="text-blue-600" />
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
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
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
    <section id="events" className="py-16 bg-blue-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-12">
          OUR <span className="text-yellow-500">Events</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our initiatives and events focused on menstrual health & hygiene, mental wellbeing, and educational
          opportunities that make a difference in our community.
        </p>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="past" className="data-[state=active]:bg-yellow-100 data-[state=active]:text-yellow-700">
            Past Events
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-yellow-100 data-[state=active]:text-yellow-700">
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
