"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Calendar, Clock, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Past Events
const pastEvents = [
  {
    id: 1,
    title: "Community Kitchen at Kalighat Temple",
    date: "April 15, 2023",
    time: "12:00 PM - 3:00 PM",
    location: "Kalighat Temple, Kolkata",
    description:
      "NIRVRTI organized a community kitchen at Kalighat Temple premises, providing meals to those in need.",
    image: "/Community-Kitchen.png",
    facebookUrl:
      "https://www.facebook.com/reachnirvrti/videos/community-kitchen-day-2destination-kalighat-temple-premisesnirvrti-organised-a-c/628386544509136/",
  },
  {
    id: 2,
    title: "Live Conversation with Young Musicians",
    date: "March 10, 2023",
    time: "5:00 PM - 6:30 PM",
    location: "Online Event",
    description:
      "A live conversation with young talented musicians from Kolkata, discussing artforms during the pandemic.",
    image: "/Live-Conversation.png",
    facebookUrl:
      "https://www.facebook.com/reachnirvrti/posts/nirvrti-presents-a-live-conversation-with-young-talented-musicians-from-kolkata-/246325410440291/",
  },
  {
    id: 3,
    title: "Distribution During Durga Puja",
    date: "October 12, 2021",
    time: "10:00 AM - 1:00 PM",
    location: "Sealdah, Kolkata",
    description:
      "Team NIRVRTI distributed food packets and new T-shirts to children of Dhakis during Durga Puja.",
    image: "/During-Durga-Puja.png",
    facebookUrl:
      "https://www.facebook.com/reachnirvrti/videos/distribution-1this-panchami-during-durga-puja-team-nirvriti-distributed-100-food/710833004409783/",
  },
  {
    id: 4,
    title: "Visit to Srishti (Samparc) Foundation",
    date: "August 20, 2021",
    time: "11:00 AM - 2:00 PM",
    location: "Srishti Foundation, Kolkata",
    description:
      "Team NIRVRTI visited the Srishti (Samparc) Foundation, engaging with children and distributing essential items.",
    image: "/Samparc-Foundation.jpg",
    facebookUrl:
      "https://www.facebook.com/reachnirvrti/videos/visit-to-srishti-samparc-foundation-by-team-nirvrti/2862829360669918/",
  },
  {
    id: 5,
    title: "Dry Food Distribution Drive",
    date: "July 10, 2021",
    time: "10:00 AM - 1:00 PM",
    location: "Various Locations, Kolkata",
    description:
      "NIRVRTI conducted a dry food distribution drive across multiple locations in Kolkata to support those affected by the pandemic.",
    image: "/Dry-Food-Distribution.png",
    facebookUrl: "https://www.facebook.com/reachnirvrti/videos/nirvrti/579113946400469/",
  },
  {
    id: 6,
    title: "Live Conversation with Young Talented Theatre Workers and Art Practitioners",
    date: "March 15, 2023",
    time: "5:00 PM - 6:30 PM",
    location: "Online Event",
    description:
      "A live conversation with young talented theatre workers and art practitioners from Kolkata, discussing artforms during the pandemic.",
    image: "/live-conversation-theatre.png",
    facebookUrl:
      "https://www.facebook.com/reachnirvrti/videos/nirvrti-presents-a-live-conversation-with-young-talented-theatre-workers-and-art/679821979378375/",
  },
  {
    id: 7,
    title: "Durga Puja Distribution Drive – Day 3",
    date: "October 12, 2021",
    time: "10:00 AM - 1:00 PM",
    location: "Various Locations, Kolkata",
    description:
      "On Saptami, Team NIRVRTI distributed special items to those in need during Durga Puja celebrations.",
    image: "/Distribution-Drive–Day_3.jpg",
    facebookUrl:
      "https://www.facebook.com/reachnirvrti/posts/%E0%A6%A6%E0%A7%81%E0%A6%B0%E0%A7%8D%E0%A6%97%E0%A6%A4%E0%A6%BF%E0%A6%A8%E0%A6%BE%E0%A6%B6%E0%A6%BF%E0%A6%A8%E0%A7%80-%E0%A7%A8day-312102021saptamiour-team-debaaditya-mukhopadhyay-uday-gupta-a/431410255265138/",
  },
  {
    id: 8,
    title: "Relief Distribution in Rajnagar, Shibrampur, and Bakkhali",
    date: "June 15, 2020",
    time: "9:00 AM - 5:00 PM",
    location: "Rajnagar, Shibrampur, and Bakkhali, West Bengal",
    description:
      "Team NIRVRTI, with support from WTF Withthefilms, distributed sanitary napkins to 150 people in various villages.",
    image: "/Relief-Distribution-in-Rajnagar.jpg",
    facebookUrl:
      "https://www.facebook.com/withthefilms/posts/the-entire-team-of-wtf-withthefilms-is-happy-to-stand-by-nirvrti-to-help-the-amp/275680717144430/",
  },
  {
    id: 9,
    title: "Collection Drive Across Kolkata",
    date: "August 10, 2021",
    time: "10:00 AM - 4:00 PM",
    location: "Various Locations, Kolkata",
    description:
      "NIRVRTI visited different places in and around Kolkata to collect donated items from friends and well-wishers.",
    image: "/collection-drive.jpg",
    facebookUrl:
      "https://www.facebook.com/reachnirvrti/posts/hello-everyone-today-nirvrti-went-to-different-places-in-and-around-kolkata-to-c/348428590229972/",
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
  return (
    <Link
      href={event.facebookUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block w-full"
      aria-label={`View more about ${event.title}`}
    >
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl border-transparent h-full flex flex-col cursor-pointer bg-white dark:bg-gray-800 rounded-xl">
        <div className="relative h-56 w-full overflow-hidden">
          <Image 
            src={event.image} 
            alt={event.title} 
            fill 
            className="object-cover transition-transform duration-500 hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-blue-700 dark:text-blue-400 text-xl">{event.title}</CardTitle>
          <CardDescription className="flex flex-col gap-1 mt-2 text-gray-600 dark:text-gray-300">
            <span className="flex items-center gap-2">
              <Calendar size={16} className="text-yellow-600 dark:text-yellow-400" />
              {event.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} className="text-yellow-600 dark:text-yellow-400" />
              {event.time}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={16} className="text-yellow-600 dark:text-yellow-400" />
              {event.location}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow pb-4">
          <p className="text-gray-700 dark:text-gray-200 line-clamp-3">{event.description}</p>
        </CardContent>
        <CardFooter className="pt-0">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white transition-all duration-300 rounded-full">
            More Info
          </Button>
        </CardFooter>
      </Card>
    </Link>
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
          Explore our initiatives and events focused on community support, cultural engagement,
          and social welfare that make a difference in our community.
        </p>
      </div>

      <Tabs defaultValue="past" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
            Upcoming Events
          </TabsTrigger>
          <TabsTrigger value="past" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
            Past Events
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-0">
          <div className="text-center text-gray-600 py-10">
            <p>No upcoming events at the moment. Stay tuned!</p>
          </div>
        </TabsContent>

        <TabsContent value="past" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}

export default EventsSection
