"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Heart, Users, Target, TrendingUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import CountUp from "react-countup"

interface CampaignProps {
  id: string
  title: string
  goal: number
  raised: number
  donors: number
  daysLeft: number
  description: string
  category: string
}

const campaigns: CampaignProps[] = [
  {
    id: "education-2024",
    title: "Education for All",
    goal: 500000,
    raised: 325000,
    donors: 142,
    daysLeft: 45,
    description: "Help us provide quality education to underprivileged children in rural areas.",
    category: "education",
  },
  {
    id: "healthcare-2024",
    title: "Healthcare Initiative",
    goal: 750000,
    raised: 410000,
    donors: 98,
    daysLeft: 60,
    description: "Support our healthcare camps and medical assistance programs for those in need.",
    category: "healthcare",
  },
  {
    id: "food-2024",
    title: "Food & Nutrition Drive",
    goal: 300000,
    raised: 215000,
    donors: 76,
    daysLeft: 30,
    description: "Help us provide nutritious meals to hungry children and families in crisis.",
    category: "food",
  },
]

export default function DonationTracker() {
  const [activeCampaign, setActiveCampaign] = useState<string>(campaigns[0].id)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById("donation-tracker")
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  const currentCampaign = campaigns.find((c) => c.id === activeCampaign) || campaigns[0]
  const percentRaised = Math.round((currentCampaign.raised / currentCampaign.goal) * 100)

  return (
    <div id="donation-tracker" className="py-12 bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-800 dark:text-blue-400 mb-3 relative inline-block">
            DONATION <span className="text-yellow-500 dark:text-yellow-400">TRACKER</span>
            <span className="absolute -bottom-1 left-1/4 right-1/4 h-1 bg-gradient-to-r from-blue-500 to-yellow-500 rounded-full"></span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm md:text-base px-4 mt-4">
            Track our ongoing campaigns and see the impact of your donations in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="lg:col-span-1">
            <div className="space-y-3">
              {campaigns.map((campaign) => (
                <button
                  key={campaign.id}
                  onClick={() => setActiveCampaign(campaign.id)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                    activeCampaign === campaign.id
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{campaign.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      campaign.category === "education" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" :
                      campaign.category === "healthcare" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
                      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    }`}>
                      {campaign.category}
                    </span>
                  </div>
                  <div className="mt-2">
                    <Progress value={Math.round((campaign.raised / campaign.goal) * 100)} className="h-2" />
                  </div>
                  <div className="flex justify-between mt-2 text-xs">
                    <span>₹{campaign.raised.toLocaleString()}</span>
                    <span>₹{campaign.goal.toLocaleString()}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCampaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                <div className="p-6">
                  <h3 className="text-xl md:text-2xl font-bold text-blue-700 dark:text-blue-400 mb-2">
                    {currentCampaign.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {currentCampaign.description}
                  </p>

                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        ₹{isVisible ? (
                          <CountUp 
                            end={currentCampaign.raised} 
                            separator="," 
                            duration={2.5} 
                          />
                        ) : currentCampaign.raised.toLocaleString()} raised
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">
                        Goal: ₹{currentCampaign.goal.toLocaleString()}
                      </span>
                    </div>
                    <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentRaised}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-400"
                      />
                    </div>
                    <div className="mt-1 text-right">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">
                        {percentRaised}% Complete
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg text-center">
                      <Users className="h-6 w-6 text-blue-500 dark:text-blue-400 mx-auto mb-2" />
                      <div className="text-xl font-bold text-gray-800 dark:text-gray-200">
                        {isVisible ? (
                          <CountUp 
                            end={currentCampaign.donors} 
                            duration={2} 
                          />
                        ) : currentCampaign.donors}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Donors</div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg text-center">
                      <Target className="h-6 w-6 text-blue-500 dark:text-blue-400 mx-auto mb-2" />
                      <div className="text-xl font-bold text-gray-800 dark:text-gray-200">
                        {isVisible ? (
                          <CountUp 
                            end={currentCampaign.daysLeft} 
                            duration={1.5} 
                          />
                        ) : currentCampaign.daysLeft}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Days Left</div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg text-center">
                      <TrendingUp className="h-6 w-6 text-blue-500 dark:text-blue-400 mx-auto mb-2" />
                      <div className="text-xl font-bold text-gray-800 dark:text-gray-200">
                        {isVisible ? (
                          <CountUp 
                            end={Math.round((currentCampaign.raised / currentCampaign.goal) * 100)} 
                            suffix="%" 
                            duration={2} 
                          />
                        ) : `${Math.round((currentCampaign.raised / currentCampaign.goal) * 100)}%`}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Progress</div>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-6 rounded-lg text-lg font-medium shadow-md flex items-center justify-center gap-2 transform transition-transform hover:scale-[1.02]"
                    asChild
                  >
                    <a href="#donate">
                      <Heart className="h-5 w-5" /> Donate Now
                    </a>
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}