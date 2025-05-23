"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, Users, Heart, Award } from "lucide-react"
import { motion } from "framer-motion"

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
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 dark:text-blue-400 mb-3 relative inline-block">
            BECOME A <span className="text-yellow-500 dark:text-yellow-400">VOLUNTEER</span>
            <span className="absolute -bottom-1 left-1/4 right-1/4 h-1 bg-gradient-to-r from-blue-500 to-yellow-500 rounded-full"></span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
            Join our team of dedicated volunteers and make a difference in the lives of those in need.
            Your time and skills can create a lasting impact in our community.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="opportunities" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 dark:bg-gray-800 h-10 rounded-full overflow-hidden border border-blue-100 dark:border-gray-700 p-1">
              <TabsTrigger 
                value="opportunities" 
                className="text-sm rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-700 dark:data-[state=active]:text-white dark:text-gray-200 transition-all duration-300"
              >
                Opportunities
              </TabsTrigger>
              <TabsTrigger 
                value="register" 
                className="text-sm rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-700 dark:data-[state=active]:text-white dark:text-gray-200 transition-all duration-300"
              >
                Register
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="opportunities" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {volunteerOpportunities.map((opportunity, index) => (
                  <motion.div
                    key={opportunity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                            {opportunity.icon}
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-2">
                              {opportunity.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                              {opportunity.description}
                            </p>
                            
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                                <span className="text-gray-700 dark:text-gray-300">{opportunity.commitment}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                                <span className="text-gray-700 dark:text-gray-300">{opportunity.location}</span>
                              </div>
                            </div>
                            
                            <div className="mt-4 flex flex-wrap gap-2">
                              {opportunity.skills.map((skill) => (
                                <span 
                                  key={skill} 
                                  className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Button 
                  onClick={() => window.open("https://forms.gle/Cnh9qKxuzM8ACqhJ8", "_blank")}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-6 rounded-lg text-lg font-medium shadow-md"
                >
                  Apply Now
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="register" className="mt-0">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-xl text-center">
                <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4">
                  Apply to Volunteer with Us
                </h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
                  Thank you for your interest in volunteering with us! Please click the button below to fill out our volunteer application form.
                </p>
                <Button 
                  onClick={() => window.open("https://forms.gle/Cnh9qKxuzM8ACqhJ8", "_blank")}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-6 rounded-lg text-lg font-medium shadow-md"
                >
                  Apply Now
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}