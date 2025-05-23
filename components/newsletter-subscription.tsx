"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { Loader2, Mail, CheckCircle2, Bell, Sparkles, Star } from "lucide-react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"

export default function NewsletterSubscription() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [interests, setInterests] = useState({
    events: true,
    updates: true,
    volunteer: false,
    donation: false,
  })
  
  // Animation controls
  const controls = useAnimation()
  const bellControls = useAnimation()
  
  // Animate bell icon on mount and periodically
  useEffect(() => {
    const animateBell = async () => {
      await bellControls.start({
        rotate: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.6 }
      })
    }
    
    animateBell()
    const interval = setInterval(animateBell, 5000)
    return () => clearInterval(interval)
  }, [bellControls])
  
  // Animate container on mount
  useEffect(() => {
    controls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" }
    })
  }, [controls])
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to subscribe.",
        variant: "destructive",
      })
      return
    }
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubscribed(true)
      
      toast({
        title: "Subscription Successful!",
        description: "Thank you for subscribing to our newsletter.",
      })
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setEmail("")
        setIsSubscribed(false)
      }, 3000)
    }, 1500)
  }
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  }
  
  const checkItemVariants = {
    hidden: { opacity: 0, scale: 0.8, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { 
        delay: i * 0.15,
        duration: 0.4,
        type: "spring",
        stiffness: 100
      }
    })
  }
  
  const formFieldVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    },
    focus: { 
      scale: 1.02,
      boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
      transition: { duration: 0.2 }
    }
  }
  
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.3,
        duration: 0.5,
        type: "spring",
        stiffness: 120
      }
    },
    hover: { 
      scale: 1.03,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  }
  
  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 120
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  }
  
  const checkboxVariants = {
    unchecked: { scale: 1 },
    checked: { scale: [1, 1.2, 1], transition: { duration: 0.3 } }
  }
  
  // Background decoration elements
  const Decorations = () => (
    <>
      <motion.div 
        className="absolute top-5 right-5 text-blue-300 dark:text-blue-600 opacity-50"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles className="h-8 w-8" />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-10 left-10 text-blue-300 dark:text-blue-600 opacity-30"
        initial={{ scale: 0.8 }}
        animate={{ scale: [0.8, 1.1, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Star className="h-6 w-6" />
      </motion.div>
      
      <motion.div 
        className="absolute top-1/2 left-0 w-2 h-20 bg-gradient-to-b from-blue-400 to-blue-600 rounded-r-full opacity-40"
        initial={{ y: -40 }}
        animate={{ y: 40 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      
      <motion.div 
        className="absolute top-20 right-0 w-2 h-16 bg-gradient-to-b from-blue-600 to-blue-400 rounded-l-full opacity-40"
        initial={{ y: 0 }}
        animate={{ y: 30 }}
        transition={{ duration: 2.5, delay: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
    </>
  )
  
  return (
    <motion.section 
      className="py-12 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-800 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Decorations />
      
      <motion.div 
        className="container mx-auto px-4"
        initial={{ y: 30, opacity: 0 }}
        animate={controls}
      >
        <motion.div 
          className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden relative"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ 
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            transition: { duration: 0.3 }
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-5">
            <div className="md:col-span-2 bg-blue-50 dark:bg-gray-700 p-8 flex flex-col justify-center relative overflow-hidden">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  animate={bellControls}
                  className="relative"
                >
                  <Bell className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
                  <motion.div 
                    className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ delay: 1, duration: 0.5 }}
                  />
                </motion.div>
                
                <motion.h3 
                  className="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-2"
                  variants={itemVariants}
                >
                  Stay Updated
                </motion.h3>
                
                <motion.p 
                  className="text-gray-600 dark:text-gray-300 mb-6"
                  variants={itemVariants}
                >
                  Subscribe to our newsletter to receive updates on our activities, events, and ways you can contribute to our mission.
                </motion.p>
                
                <div className="space-y-3">
                  {[
                    "Latest news and updates",
                    "Upcoming events and activities",
                    "Volunteer opportunities",
                    "Impact stories and testimonials"
                  ].map((text, i) => (
                    <motion.div 
                      key={i}
                      className="flex items-center gap-2"
                      custom={i}
                      variants={checkItemVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + (i * 0.1), duration: 0.3 }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </motion.div>
                      <span className="text-gray-700 dark:text-gray-300">{text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Animated background elements */}
              <motion.div 
                className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-blue-200 dark:bg-blue-900/20 opacity-30"
                initial={{ scale: 0.8 }}
                animate={{ scale: [0.8, 1, 0.8] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-blue-300 dark:bg-blue-800/20 opacity-20"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 6, delay: 1, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            
            <div className="md:col-span-3 p-8 relative">
              <AnimatePresence mode="wait">
                {isSubscribed ? (
                  <motion.div
                    key="success"
                    variants={successVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="h-full flex flex-col items-center justify-center text-center"
                  >
                    <motion.div 
                      className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, duration: 0.3, type: "spring" }}
                      >
                        <CheckCircle2 className="h-8 w-8 text-green-500" />
                      </motion.div>
                    </motion.div>
                    
                    <motion.h3 
                      className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                    >
                      Thank You for Subscribing!
                    </motion.h3>
                    
                    <motion.p 
                      className="text-gray-600 dark:text-gray-300 max-w-md"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                    >
                      You've been added to our newsletter. We'll keep you updated on our latest news, events, and initiatives.
                    </motion.p>
                    
                    {/* Animated success confetti */}
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-full pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={`absolute w-2 h-2 rounded-full ${
                            i % 3 === 0 ? 'bg-green-400' : i % 3 === 1 ? 'bg-blue-400' : 'bg-yellow-400'
                          }`}
                          initial={{ 
                            x: '50%', 
                            y: '50%',
                            scale: 0
                          }}
                          animate={{ 
                            x: `${50 + (Math.random() * 80 - 40)}%`, 
                            y: `${50 + (Math.random() * 80 - 40)}%`,
                            scale: [0, 1.5, 0],
                            opacity: [0, 1, 0]
                          }}
                          transition={{ 
                            duration: 1.5 + Math.random(),
                            delay: 0.2 + (i * 0.05),
                            ease: "easeOut"
                          }}
                        />
                      ))}
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >

                    
                    <motion.p 
                      className="text-gray-600 dark:text-gray-300 mb-6"
                      variants={itemVariants}
                    >
                      Join our community and stay informed about our work and impact. Enter your email below to subscribe.
                    </motion.p>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <motion.div
                        variants={formFieldVariants}
                        animate={focusedField === 'email' ? 'focus' : 'visible'}
                      >
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <motion.div
                            initial={{ rotate: 0 }}
                            animate={focusedField === 'email' ? { rotate: [0, -10, 10, 0] } : { rotate: 0 }}
                            transition={{ duration: 0.4 }}
                          >
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                          </motion.div>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </motion.div>
                      
                      <motion.div variants={formFieldVariants}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          I'm interested in (optional)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            { id: 'events', label: 'Events & Activities' },
                            { id: 'updates', label: 'News & Updates' },
                            { id: 'volunteer', label: 'Volunteer Opportunities' },
                            { id: 'donation', label: 'Donation Campaigns' }
                          ].map((item, i) => (
                            <motion.div 
                              key={item.id}
                              className="flex items-center space-x-2"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + (i * 0.1), duration: 0.3 }}
                              whileHover={{ x: 3, transition: { duration: 0.2 } }}
                            >
                              <motion.div
                                variants={checkboxVariants}
                                animate={interests[item.id as keyof typeof interests] ? 'checked' : 'unchecked'}
                              >
                                <Checkbox
                                  id={item.id}
                                  checked={interests[item.id as keyof typeof interests]}
                                  onCheckedChange={(checked) => 
                                    setInterests({ ...interests, [item.id]: checked as boolean })
                                  }
                                />
                              </motion.div>
                              <label
                                htmlFor={item.id}
                                className="text-sm text-gray-700 dark:text-gray-300"
                              >
                                {item.label}
                              </label>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                      
                      <motion.div
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-6 rounded-lg text-lg font-medium shadow-md"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Subscribing...
                            </>
                          ) : (
                            <>
                              <motion.span
                                initial={{ opacity: 1 }}
                                whileHover={{ 
                                  opacity: [1, 0.8, 1], 
                                  scale: [1, 1.03, 1],
                                  transition: { duration: 0.3, repeat: Infinity, repeatType: "reverse" }
                                }}
                              >
                                Subscribe Now
                              </motion.span>
                            </>
                          )}
                        </Button>
                      </motion.div>
                      
                      <motion.p 
                        className="text-xs text-gray-500 dark:text-gray-400 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        By subscribing, you agree to receive emails from NIRVRITI Foundation.
                        We respect your privacy and will never share your information.
                      </motion.p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}