"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Users, Heart, Award } from "lucide-react"

const volunteerOpportunities = [
  {
    id: "teaching",
    title: "Teaching Assistant",
    commitment: "Event-based",
    location: "Various Schools, West Bengal",
    skills: ["Teaching", "Patience", "Communication"],
    description: "Help children with their studies and assist teachers in classroom activities.",
    icon: <Users className="h-10 w-10 text-blue-500" />,
  },
  {
    id: "fundraising",
    title: "Fundraising Volunteer",
    commitment: "Flexible hours",
    location: "Remote & On-site",
    skills: ["Communication", "Networking", "Social Media"],
    description: "Help organize fundraising events and campaigns to support our initiatives.",
    icon: <Heart className="h-10 w-10 text-red-500" />,
  },
  {
    id: "event",
    title: "Event Coordinator",
    commitment: "Event-based",
    location: "Various Locations, West Bengal",
    skills: ["Organization", "Leadership", "Time Management"],
    description: "Coordinate and manage community events, workshops, and awareness programs.",
    icon: <Calendar className="h-10 w-10 text-green-500" />,
  },
  {
    id: "healthcare",
    title: "Healthcare Assistant",
    commitment: "Event-based",
    location: "Medical Camps, West Bengal",
    skills: ["Basic Medical Knowledge", "Empathy", "Organization"],
    description: "Assist healthcare professionals during medical camps and health awareness programs.",
    icon: <Award className="h-10 w-10 text-purple-500" />,
  },
]

export default function VolunteerRegistration() {
  return (
    <section id="volunteer" className="py-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-blue-800 dark:text-blue-400 mb-4 relative inline-block">
            BECOME A <span className="text-yellow-500 dark:text-yellow-400">VOLUNTEER</span>
            <span className="absolute -bottom-2 left-1/4 right-1/4 h-1.5 bg-gradient-to-r from-blue-500 to-yellow-500 rounded-full"></span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-6 text-lg">
            Join our team of dedicated volunteers and make a difference in the lives of those in need.
            Your time and skills can create a lasting impact in our community.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {volunteerOpportunities.map((opportunity, index) => (
                <div key={opportunity.id}>
                  <Card className="h-full overflow-hidden border border-gray-100 dark:border-gray-700 rounded-xl">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl shadow-md">
                          {opportunity.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-3 text-left">
                            {opportunity.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-5 text-base text-left">
                            {opportunity.description}
                          </p>
                          
                          <div className="space-y-3 text-sm mb-5">
                            <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-lg">
                              <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                              <span className="text-gray-700 dark:text-gray-300 font-medium">{opportunity.commitment}</span>
                            </div>
                            <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-lg">
                              <MapPin className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                              <span className="text-gray-700 dark:text-gray-300 font-medium">{opportunity.location}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex flex-wrap gap-2">
                            {opportunity.skills.map((skill) => (
                              <span 
                                key={skill} 
                                className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-3 py-1.5 rounded-full font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-16 mb-8">
              <div className="glass-effect inline-block p-1 rounded-xl">
                
              </div>
              <p className="text-gray-500 dark:text-gray-400 mt-4">
                Make a difference today by joining our volunteer team
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Volunteer benefits section */}
      <div className="max-w-6xl mx-auto mt-16 px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 neo-card">
          <h3 className="text-2xl font-bold text-center text-blue-700 dark:text-blue-400 mb-8">
            Benefits of Volunteering With Us
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 dark:bg-gray-700/50 p-6 rounded-xl">
              <div className="text-blue-600 dark:text-blue-400 mb-3 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-center">Skill Development</h4>
              <p className="text-gray-600 dark:text-gray-300 text-center">Gain valuable experience and develop new skills that can enhance your personal and professional growth.</p>
            </div>
            
            <div className="bg-blue-50 dark:bg-gray-700/50 p-6 rounded-xl">
              <div className="text-blue-600 dark:text-blue-400 mb-3 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-center">Community Connection</h4>
              <p className="text-gray-600 dark:text-gray-300 text-center">Meet like-minded individuals and build meaningful relationships while serving the community together.</p>
            </div>
            
            <div className="bg-blue-50 dark:bg-gray-700/50 p-6 rounded-xl">
              <div className="text-blue-600 dark:text-blue-400 mb-3 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-center">Make an Impact</h4>
              <p className="text-gray-600 dark:text-gray-300 text-center">Directly contribute to positive change in your community and see the difference your efforts make.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to action */}
      <div className="max-w-4xl mx-auto mt-16 px-4 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-10 shadow-xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center">Ready to Make a Difference?</h3>
          <p className="text-blue-100 mb-8 text-lg text-center">
            Fill out our volunteer application form and join our team today!
          </p>
        </div>
      </div>
    </section>
  )
}