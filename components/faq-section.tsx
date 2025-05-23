"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, HelpCircle, Info, Users, Heart, Calendar, FileText } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface FAQ {
  id: string
  question: string
  answer: string
  category: "general" | "donation" | "volunteer" | "events" | "organization"
}

const faqs: FAQ[] = [
  {
    id: "faq-1",
    question: "What is NIRVRITI Foundation?",
    answer: "NIRVRITI Foundation is a non-profit organization dedicated to improving the lives of underprivileged communities through education, healthcare, food security, and shelter initiatives. We work primarily in Kolkata and surrounding areas to create sustainable impact and empower communities.",
    category: "general",
  },
  {
    id: "faq-2",
    question: "How can I donate to NIRVRITI Foundation?",
    answer: "You can donate to NIRVRITI Foundation through our website by visiting the 'Donate' section. We accept various payment methods including UPI, bank transfers, and online payments. All donations are eligible for tax benefits under 80G.",
    category: "donation",
  },
  {
    id: "faq-3",
    question: "How can I volunteer with NIRVRITI Foundation?",
    answer: "You can volunteer with NIRVRITI Foundation by registering through our 'Volunteer' section on the website. We offer various volunteering opportunities including teaching, event coordination, fundraising, and healthcare assistance. Once registered, our team will contact you with suitable opportunities based on your skills and interests.",
    category: "volunteer",
  },
  {
    id: "faq-4",
    question: "Where does my donation go?",
    answer: "Your donations directly support our programs in education, healthcare, food security, and shelter. We maintain complete transparency in our financial operations, and you can specify which program you'd like your donation to support. Administrative costs are kept to a minimum to ensure maximum impact.",
    category: "donation",
  },
  {
    id: "faq-5",
    question: "How can I attend NIRVRITI Foundation events?",
    answer: "Information about our upcoming events is regularly updated on our website and social media channels. Most of our events are open to the public, and you can register your interest through the event pages. For exclusive events, you may need to be a registered volunteer or donor.",
    category: "events",
  },
  {
    id: "faq-6",
    question: "Is NIRVRITI Foundation a registered NGO?",
    answer: "Yes, NIRVRITI Foundation is a registered non-profit organization with Registration Number SO023992 of 2021-2022. We are also registered under 80G (AADAH9079EF2024101) and have an NGO DARPAN Unique ID: WB/2023/0378038.",
    category: "organization",
  },
  {
    id: "faq-7",
    question: "Can I get a tax benefit for my donation?",
    answer: "Yes, all donations to NIRVRITI Foundation are eligible for tax benefits under Section 80G of the Income Tax Act. We provide an official receipt and 80G certificate for all donations received.",
    category: "donation",
  },
  {
    id: "faq-8",
    question: "What are the minimum requirements to volunteer?",
    answer: "To volunteer with NIRVRITI Foundation, you must be at least 18 years old. Depending on the role, we may require specific skills or experience. All volunteers must commit to our code of conduct and values. Background checks may be required for roles involving direct interaction with children or vulnerable populations.",
    category: "volunteer",
  },
  {
    id: "faq-9",
    question: "How can I partner with NIRVRITI Foundation?",
    answer: "We welcome partnerships with organizations, businesses, and institutions that share our vision and values. You can reach out to us through the 'Contact' section on our website or email us directly at haridevpurnirvritifoundation20@gmail.com to discuss potential collaboration opportunities.",
    category: "organization",
  },
  {
    id: "faq-10",
    question: "How can I stay updated about NIRVRITI Foundation's activities?",
    answer: "You can stay updated about our activities by subscribing to our newsletter, following us on social media platforms, or regularly visiting our website. We share updates about our programs, events, success stories, and opportunities to get involved.",
    category: "general",
  },
  {
    id: "faq-11",
    question: "Does NIRVRITI Foundation accept in-kind donations?",
    answer: "Yes, we accept in-kind donations such as clothes, books, food items, medical supplies, and other essentials. Please contact us before making in-kind donations to ensure we can effectively utilize and distribute the items based on current needs.",
    category: "donation",
  },
  {
    id: "faq-12",
    question: "How can I suggest a new initiative or project?",
    answer: "We welcome suggestions for new initiatives or projects that align with our mission. You can share your ideas through the 'Contact' section on our website or email us directly. Our team reviews all suggestions and may reach out for further discussion if the idea aligns with our strategic priorities.",
    category: "general",
  },
]

export default function FAQSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredFAQs, setFilteredFAQs] = useState<FAQ[]>(faqs)
  const [activeCategory, setActiveCategory] = useState<string>("all")
  
  useEffect(() => {
    let results = faqs
    
    // Filter by category
    if (activeCategory !== "all") {
      results = results.filter((faq) => faq.category === activeCategory)
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query)
      )
    }
    
    setFilteredFAQs(results)
  }, [searchQuery, activeCategory])
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "general":
        return <Info className="h-4 w-4" />
      case "donation":
        return <Heart className="h-4 w-4" />
      case "volunteer":
        return <Users className="h-4 w-4" />
      case "events":
        return <Calendar className="h-4 w-4" />
      case "organization":
        return <FileText className="h-4 w-4" />
      default:
        return <HelpCircle className="h-4 w-4" />
    }
  }
  
  return (
    <section id="faq" className="py-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 dark:text-blue-400 mb-3 relative inline-block">
            Frequently <span className="text-yellow-500 dark:text-yellow-400">Asked Questions</span>
            <span className="absolute -bottom-1 left-1/4 right-1/4 h-1 bg-gradient-to-r from-blue-500 to-yellow-500 rounded-full"></span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
            Find answers to common questions about NIRVRITI Foundation, our work, and how you can get involved.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for questions or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-6 text-base"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                  onClick={() => setSearchQuery("")}
                >
                  ✕
                </Button>
              )}
            </div>
          </div>
          
          <Tabs defaultValue="all" onValueChange={setActiveCategory} className="w-full">
            <TabsList className="flex w-full overflow-x-auto pb-2 mb-6 justify-start space-x-2">
              <TabsTrigger 
                value="all" 
                className="rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-700 dark:data-[state=active]:text-white dark:text-gray-200 transition-all duration-300"
              >
                All Questions
              </TabsTrigger>
              <TabsTrigger 
                value="general" 
                className="rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-700 dark:data-[state=active]:text-white dark:text-gray-200 transition-all duration-300 flex items-center gap-1"
              >
                <Info className="h-4 w-4" /> General
              </TabsTrigger>
              <TabsTrigger 
                value="donation" 
                className="rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-700 dark:data-[state=active]:text-white dark:text-gray-200 transition-all duration-300 flex items-center gap-1"
              >
                <Heart className="h-4 w-4" /> Donation
              </TabsTrigger>
              <TabsTrigger 
                value="volunteer" 
                className="rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-700 dark:data-[state=active]:text-white dark:text-gray-200 transition-all duration-300 flex items-center gap-1"
              >
                <Users className="h-4 w-4" /> Volunteer
              </TabsTrigger>
              <TabsTrigger 
                value="events" 
                className="rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-700 dark:data-[state=active]:text-white dark:text-gray-200 transition-all duration-300 flex items-center gap-1"
              >
                <Calendar className="h-4 w-4" /> Events
              </TabsTrigger>
              <TabsTrigger 
                value="organization" 
                className="rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-700 dark:data-[state=active]:text-white dark:text-gray-200 transition-all duration-300 flex items-center gap-1"
              >
                <FileText className="h-4 w-4" /> Organization
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeCategory} className="mt-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory + searchQuery}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {filteredFAQs.length > 0 ? (
                    <Accordion type="single" collapsible className="w-full space-y-4">
                      {filteredFAQs.map((faq, index) => (
                        <motion.div
                          key={faq.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <AccordionItem 
                            value={faq.id}
                            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm"
                          >
                            <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 text-left">
                              <div className="flex items-start gap-3">
                                <div className="p-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mt-0.5">
                                  {getCategoryIcon(faq.category)}
                                </div>
                                <span className="font-medium text-gray-800 dark:text-gray-200">
                                  {faq.question}
                                </span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-4 pt-0 text-gray-600 dark:text-gray-300">
                              <div className="pl-9">
                                {faq.answer}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </motion.div>
                      ))}
                    </Accordion>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                      <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                        No matching questions found
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                        Try adjusting your search or category filter to find what you're looking for.
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => {
                          setSearchQuery("")
                          setActiveCategory("all")
                        }}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          </Tabs>
          
          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Still have questions?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              If you couldn't find the answer to your question, feel free to contact us directly.
            </p>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-6 rounded-lg text-lg font-medium shadow-md"
              asChild
            >
              <a href="#contact">
                Contact Us
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}