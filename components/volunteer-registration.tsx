"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Users, Heart, Award } from "lucide-react"

const volunteerOpportunities = [
  {
    id: "teaching",
    title: "Teaching Assistant",
    commitment: "4-6 hours/week",
    location: "Various Schools, Kolkata",
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
    location: "Various Locations, Kolkata",
    skills: ["Organization", "Leadership", "Time Management"],
    description: "Coordinate and manage community events, workshops, and awareness programs.",
    icon: <Calendar className="h-10 w-10 text-green-500" />,
  },
  {
    id: "healthcare",
    title: "Healthcare Assistant",
    commitment: "8-10 hours/month",
    location: "Medical Camps, Kolkata",
    skills: ["Basic Medical Knowledge", "Empathy", "Organization"],
    description: "Assist healthcare professionals during medical camps and health awareness programs.",
    icon: <Award className="h-10 w-10 text-purple-500" />,
  },
]

export default function VolunteerRegistration() {
  return (
    <section id="volunteer" className="py-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold text-blue-800 dark:text-blue-400 mb-4 relative inline-block">
            BECOME A <span className="text-yellow-500 dark:text-yellow-400 animate-shimmer-text">VOLUNTEER</span>
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
                <div key={opportunity.id} className={`animate-fade-in-up animate-delay-${index * 100}`}>
                  <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 rounded-xl">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl shadow-md">
                          {opportunity.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-3">
                            {opportunity.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-5 text-base">
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
            
            <div className="text-center mt-16 mb-8 animate-fade-in-up animate-delay-400">
              <div className="glass-effect inline-block p-1 rounded-xl">
                <button 
                  onClick={() => window.open("https://forms.gle/Cnh9qKxuzM8ACqhJ8", "_blank")}
                  className="px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold text-lg rounded-lg transform transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/30"
                >
                  Apply as a Volunteer
                </button>
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
              <div className="text-blue-600 dark:text-blue-400 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">Skill Development</h4>
              <p className="text-gray-600 dark:text-gray-300">Gain valuable experience and develop new skills that can enhance your personal and professional growth.</p>
            </div>
            
            <div className="bg-blue-50 dark:bg-gray-700/50 p-6 rounded-xl">
              <div className="text-blue-600 dark:text-blue-400 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">Community Connection</h4>
              <p className="text-gray-600 dark:text-gray-300">Meet like-minded individuals and build meaningful relationships while serving the community together.</p>
            </div>
            
            <div className="bg-blue-50 dark:bg-gray-700/50 p-6 rounded-xl">
              <div className="text-blue-600 dark:text-blue-400 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">Make an Impact</h4>
              <p className="text-gray-600 dark:text-gray-300">Directly contribute to positive change in your community and see the difference your efforts make.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to action */}
      <div className="max-w-4xl mx-auto mt-16 px-4 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-10 shadow-xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Make a Difference?</h3>
          <p className="text-blue-100 mb-8 text-lg">
            Fill out our volunteer application form and join our team today!
          </p>
          <a 
            href="https://forms.gle/Cnh9qKxuzM8ACqhJ8" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-blue-700 font-bold px-8 py-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            APPLY NOW
          </a>
        </div>
      </div>
    </section>
  )
}