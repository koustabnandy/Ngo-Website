"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Facebook, Instagram, Twitter, Youtube, ExternalLink, Heart, MessageCircle, Share2, Calendar } from "lucide-react"

interface SocialPost {
  id: string
  platform: "facebook" | "instagram" | "twitter" | "youtube"
  content: string
  image?: string
  date: string
  likes: number
  comments: number
  shares: number
  url: string
}

const socialPosts: SocialPost[] = [
  {
    id: "fb-1",
    platform: "facebook",
    content: "NIRVRITI Foundation organized a community kitchen at Kalighat Temple premises, providing meals to those in need. Thank you to all our volunteers who made this possible! #CommunityKitchen #FeedingHope",
    image: "/Community-Kitchen.png",
    date: "April 15, 2023",
    likes: 124,
    comments: 32,
    shares: 45,
    url: "https://www.facebook.com/reachnirvrti/videos/community-kitchen-day-2destination-kalighat-temple-premisesnirvrti-organised-a-c/628386544509136/",
  },
  {
    id: "fb-2",
    platform: "facebook",
    content: "A live conversation with young talented musicians from Kolkata, discussing artforms during the pandemic. It was an inspiring session! #YoungTalent #MusicForChange",
    image: "/Live-Conversation.png",
    date: "March 10, 2023",
    likes: 98,
    comments: 24,
    shares: 18,
    url: "https://www.facebook.com/reachnirvrti/posts/nirvrti-presents-a-live-conversation-with-young-talented-musicians-from-kolkata-/246325410440291/",
  },
  {
    id: "ig-1",
    platform: "instagram",
    content: "Team NIRVRITI Foundation distributed food packets and new T-shirts to children of Dhakis during Durga Puja. The smiles on their faces made our day! ❤️ #DurgaPuja #Giving #ChildrenFirst",
    image: "/During-Durga-Puja.png",
    date: "October 12, 2021",
    likes: 215,
    comments: 42,
    shares: 37,
    url: "https://www.instagram.com/",
  },
  {
    id: "ig-2",
    platform: "instagram",
    content: "Team NIRVRITI Foundation visited the Srishti (Samparc) Foundation, engaging with children and distributing essential items. These moments of connection are what drive our mission forward. #ChildrenWelfare #CommunityOutreach",
    image: "/Samparc-Foundation.jpg",
    date: "August 20, 2021",
    likes: 187,
    comments: 29,
    shares: 22,
    url: "https://www.instagram.com/",
  },
  {
    id: "tw-1",
    platform: "twitter",
    content: "NIRVRITI Foundation conducted a dry food distribution drive across multiple locations in Kolkata to support those affected by the pandemic. Together, we can make a difference! #COVID19Relief #FoodSecurity",
    image: "/Dry-Food-Distribution.png",
    date: "July 10, 2021",
    likes: 76,
    comments: 14,
    shares: 31,
    url: "https://twitter.com/",
  },
  {
    id: "yt-1",
    platform: "youtube",
    content: "Watch our latest video documenting the impact of our education initiatives in rural West Bengal. Education is the most powerful tool we can use to change the world. #EducationForAll #RuralDevelopment",
    image: "/live-conversation-theatre.png",
    date: "March 15, 2023",
    likes: 143,
    comments: 27,
    shares: 19,
    url: "https://www.youtube.com/",
  },
]

export default function SocialMediaFeed() {
  const [activePlatform, setActivePlatform] = useState<string>("all")
  const [filteredPosts, setFilteredPosts] = useState<SocialPost[]>(socialPosts)
  
  useEffect(() => {
    if (activePlatform === "all") {
      setFilteredPosts(socialPosts)
    } else {
      setFilteredPosts(socialPosts.filter((post) => post.platform === activePlatform))
    }
  }, [activePlatform])
  
  const getPlatformIcon = (platform: string, size = 20) => {
    switch (platform) {
      case "facebook":
        return <Facebook size={size} className="text-blue-600" />
      case "instagram":
        return <Instagram size={size} className="text-pink-600" />
      case "twitter":
        return <Twitter size={size} className="text-blue-400" />
      case "youtube":
        return <Youtube size={size} className="text-red-600" />
      default:
        return null
    }
  }
  
  const getPlatformName = (platform: string) => {
    switch (platform) {
      case "facebook":
        return "Facebook"
      case "instagram":
        return "Instagram"
      case "twitter":
        return "Twitter"
      case "youtube":
        return "YouTube"
      default:
        return ""
    }
  }
  
  return (
    <section id="social-media" className="py-16 bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 dark:text-blue-400 mb-3 relative inline-block">
            Social <span className="text-yellow-500 dark:text-yellow-400">Media</span>
            <span className="absolute -bottom-1 left-1/4 right-1/4 h-1 bg-gradient-to-r from-blue-500 to-yellow-500 rounded-full"></span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
            Follow us on social media to stay updated with our latest activities, events, and impact stories.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="all" onValueChange={setActivePlatform} className="w-full">
            <TabsList className="flex w-full max-w-md mx-auto justify-between mb-8 dark:bg-gray-800 h-12 rounded-full overflow-hidden border border-blue-100 dark:border-gray-700 p-1">
              <TabsTrigger 
                value="all" 
                className="rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-700 dark:data-[state=active]:text-white dark:text-gray-200 transition-all duration-300"
              >
                All Platforms
              </TabsTrigger>
              <TabsTrigger 
                value="facebook" 
                className="rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-700 dark:data-[state=active]:text-white dark:text-gray-200 transition-all duration-300"
              >
                <Facebook className="h-4 w-4 mr-1" /> Facebook
              </TabsTrigger>
              <TabsTrigger 
                value="instagram" 
                className="rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-700 dark:data-[state=active]:text-white dark:text-gray-200 transition-all duration-300"
              >
                <Instagram className="h-4 w-4 mr-1" /> Instagram
              </TabsTrigger>
              <TabsTrigger 
                value="twitter" 
                className="rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-700 dark:data-[state=active]:text-white dark:text-gray-200 transition-all duration-300"
              >
                <Twitter className="h-4 w-4 mr-1" /> Twitter
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={activePlatform} className="mt-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePlatform}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
                          <CardContent className="p-0">
                            {post.image && (
                              <div className="relative h-48 w-full">
                                <img
                                  src={post.image}
                                  alt={`Social media post from ${getPlatformName(post.platform)}`}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 p-1.5 rounded-full shadow-md">
                                  {getPlatformIcon(post.platform)}
                                </div>
                              </div>
                            )}
                            
                            <div className="p-4">
                              <div className="flex items-center gap-2 mb-3">
                                {getPlatformIcon(post.platform, 16)}
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  {getPlatformName(post.platform)}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" /> {post.date}
                                </span>
                              </div>
                              
                              <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-4">
                                {post.content}
                              </p>
                              
                              <div className="flex justify-between items-center">
                                <div className="flex space-x-4">
                                  <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                                    <Heart className="h-3.5 w-3.5 mr-1 text-red-500" /> {post.likes}
                                  </span>
                                  <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                                    <MessageCircle className="h-3.5 w-3.5 mr-1 text-blue-500" /> {post.comments}
                                  </span>
                                  <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                                    <Share2 className="h-3.5 w-3.5 mr-1 text-green-500" /> {post.shares}
                                  </span>
                                </div>
                                
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="p-1 h-auto"
                                  asChild
                                >
                                  <a 
                                    href={post.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    aria-label={`View on ${getPlatformName(post.platform)}`}
                                  >
                                    <ExternalLink className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                  </a>
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          </Tabs>
          
          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Follow Us on Social Media
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Stay connected with us to get the latest updates on our activities and impact.
            </p>
            <div className="flex justify-center space-x-4">
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full p-3 h-auto w-auto"
                asChild
              >
                <a 
                  href="https://www.facebook.com/reachnirvrti/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <Facebook className="h-6 w-6 text-blue-600" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full p-3 h-auto w-auto"
                asChild
              >
                <a 
                  href="https://www.instagram.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram className="h-6 w-6 text-pink-600" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full p-3 h-auto w-auto"
                asChild
              >
                <a 
                  href="https://twitter.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <Twitter className="h-6 w-6 text-blue-400" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full p-3 h-auto w-auto"
                asChild
              >
                <a 
                  href="https://www.youtube.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <Youtube className="h-6 w-6 text-red-600" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}