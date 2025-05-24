"use client"

import React, { useState, FormEvent, useEffect } from "react"
import Image from "next/image"
import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Loader2, Heart, CreditCard, Check, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"

export default function DonationSection() {
  const [donationAmount, setDonationAmount] = useState(1000)
  const [customAmount, setCustomAmount] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("education")
  const [showDonateModal, setShowDonateModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [transactionId, setTransactionId] = useState("")
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [formErrors, setFormErrors] = useState({
    fullName: false,
    email: false,
    phoneNumber: false,
  })

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    category: "education",
    amount: 1000,
  })
  
  // Reset form errors when user types in a field
  useEffect(() => {
    if (formData.fullName) setFormErrors(prev => ({ ...prev, fullName: false }))
  }, [formData.fullName])
  
  useEffect(() => {
    if (formData.email) setFormErrors(prev => ({ ...prev, email: false }))
  }, [formData.email])
  
  useEffect(() => {
    if (formData.phoneNumber) setFormErrors(prev => ({ ...prev, phoneNumber: false }))
  }, [formData.phoneNumber])

  const donationCategories = [
    { label: "Education", value: "education" },
    { label: "Healthcare", value: "healthcare" },
    { label: "Food & Nutrition", value: "food" },
  ]

  const donationAmounts = [1000, 2000, 5000, 10000]

  const handleAmountChange = (amount: number) => {
    setDonationAmount(amount)
    setCustomAmount("")
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    
    // Only allow digits
    if (/^\d*$/.test(value)) {
      setCustomAmount(value)
      
      // Only update donation amount if there's a value
      if (value) {
        setDonationAmount(Number(value))
      } else {
        // If custom amount is cleared, default to the first predefined amount
        setDonationAmount(donationAmounts[0])
      }
    }
  }
  
  // Format the amount with commas for display
  const formatAmount = (amount: number) => {
    return amount.toLocaleString('en-IN')
  }

  const validateForm = () => {
    let isValid = true
    const errors = {
      fullName: false,
      email: false,
      phoneNumber: false
    }
    
    if (!formData.fullName) {
      errors.fullName = true
      isValid = false
    }
    
    if (!formData.email) {
      errors.email = true
      isValid = false
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = true
      isValid = false
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
    }
    
    if (!formData.phoneNumber) {
      errors.phoneNumber = true
      isValid = false
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = true
      isValid = false
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number.",
        variant: "destructive",
      })
    }
    
    if (!isValid) {
      setFormErrors(errors)
      
      if (!formData.fullName || !formData.email || !formData.phoneNumber) {
        toast({
          title: "Missing Fields",
          description: "Please fill out all required fields before proceeding.",
          variant: "destructive",
        })
      }
    }
    
    return isValid
  }

  const handleSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault()
    
    // Validate amount
    if (customAmount && parseInt(customAmount) < 10) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a donation amount of at least ₹10.",
        variant: "destructive",
      })
      return
    }
    
    if (!validateForm()) return
    setShowDonateModal(true)
  }

  const submitToGoogleSheets = async () => {
    if (!transactionId.trim()) {
      toast({
        title: "Transaction ID Required",
        description: "Please enter your transaction ID before confirming donation.",
        variant: "destructive",
      })
      return
    }

    const finalAmount = customAmount ? parseInt(customAmount) : donationAmount
    setIsSubmitting(true)

    const formDataToSubmit = {
      name: formData.fullName,
      email: formData.email,
      phone: formData.phoneNumber,
      category: selectedCategory,
      amount: finalAmount,
      transactionId: transactionId.trim(),
      date: new Date().toISOString(),
    }

    try {
      // Add a slight delay to show the loading animation (can be removed in production)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      await fetch(
        "https://script.google.com/macros/s/AKfycbwAfC1eWtBLEv8lnQ3MkqkHSj0WEvLcyS24AHEFx3rbgcow8WANlSHQkrFHz4uOQRJQ/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataToSubmit),
        }
      )

      // Show success message
      setShowSuccessMessage(true)
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 3000)
      
      toast({
        title: "Thank You for Your Donation!",
        description: `Your donation of ₹${formatAmount(finalAmount)} has been recorded successfully.`,
        variant: "default",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Submission Failed",
        description: "There was an error processing your donation. Please try again or contact support.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
      setShowDonateModal(false)
      
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        category: "education",
        amount: 1000,
      })
      setDonationAmount(1000)
      setCustomAmount("")
      setTransactionId("")
      setFormErrors({
        fullName: false,
        email: false,
        phoneNumber: false,
      })
    }
  }

  return (
    <div id="donate" className="container py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-sm max-w-3xl mx-auto my-8 sm:my-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6 sm:mb-10"
      >
        <div className="inline-flex items-center justify-center p-1.5 sm:p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-3 sm:mb-4">
          <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" fill="currentColor" />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-blue-800 dark:text-blue-400 mb-2">
          Support <span className="text-yellow-500">our NGO</span>
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-md mx-auto px-2">
          Your contribution helps us create lasting impact in our communities
        </p>
      </motion.div>

      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-6 sm:space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
          <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="fullName" className="text-gray-700 dark:text-gray-200 font-medium text-sm sm:text-base">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  placeholder="Your Name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className={`border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all h-9 sm:h-10 text-sm sm:text-base ${
                    formErrors.fullName ? "border-red-500 dark:border-red-500" : ""
                  }`}
                  required
                />
                {formErrors.fullName && (
                  <p className="text-red-500 text-[10px] sm:text-xs mt-0.5 sm:mt-1">Please enter your full name</p>
                )}
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-200 font-medium text-sm sm:text-base">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all h-9 sm:h-10 text-sm sm:text-base ${
                    formErrors.email ? "border-red-500 dark:border-red-500" : ""
                  }`}
                  required
                />
                {formErrors.email && (
                  <p className="text-red-500 text-[10px] sm:text-xs mt-0.5 sm:mt-1">Please enter a valid email address</p>
                )}
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="phoneNumber" className="text-gray-700 dark:text-gray-200 font-medium text-sm sm:text-base">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="1234567890"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  className={`border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all h-9 sm:h-10 text-sm sm:text-base ${
                    formErrors.phoneNumber ? "border-red-500 dark:border-red-500" : ""
                  }`}
                  required
                />
                {formErrors.phoneNumber && (
                  <p className="text-red-500 text-[10px] sm:text-xs mt-0.5 sm:mt-1">Please enter a valid 10-digit phone number</p>
                )}
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <Label className="text-gray-700 dark:text-gray-200 font-medium text-sm sm:text-base">Donation Category</Label>
                <RadioGroup
                  defaultValue="education"
                  onValueChange={(val) => {
                    setFormData({ ...formData, category: val })
                    setSelectedCategory(val)
                  }}
                  className="flex flex-col space-y-2"
                >
                  {donationCategories.map((cat) => (
                    <div key={cat.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={cat.value} id={cat.value} className="text-blue-600 dark:text-blue-400 h-4 w-4 sm:h-5 sm:w-5" />
                      <Label htmlFor={cat.value} className="text-gray-700 dark:text-gray-200 cursor-pointer text-sm sm:text-base">{cat.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="bg-blue-50 dark:bg-gray-800 p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400 mr-2" />
              <h3 className="font-medium text-sm sm:text-base text-gray-800 dark:text-gray-200">Select Donation Amount</h3>
            </div>
          </div>
          <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4">
              {donationAmounts.map((amount) => (
                <motion.div
                  key={amount}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`cursor-pointer p-2 sm:p-4 text-center border-2 transition-all duration-200 ${
                      donationAmount === amount && !customAmount
                        ? "border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30"
                        : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
                    } dark:bg-gray-800`}
                    onClick={() => handleAmountChange(amount)}
                  >
                    <span className={`text-sm sm:text-base font-medium ${
                      donationAmount === amount && !customAmount
                        ? "text-blue-700 dark:text-blue-300"
                        : "text-gray-800 dark:text-gray-200"
                    }`}>
                      ₹{formatAmount(amount)}
                    </span>
                    {donationAmount === amount && !customAmount && (
                      <div className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 bg-blue-500 text-white p-0.5 sm:p-1 rounded-full">
                        <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <div className="relative mt-2 sm:mt-3">
              <Input
                type="text"
                placeholder="Enter custom amount"
                value={customAmount}
                onChange={handleCustomAmountChange}
                className={`pl-8 border-2 h-10 sm:h-12 text-sm sm:text-base ${
                  customAmount 
                    ? "border-blue-500 dark:border-blue-400" 
                    : "border-gray-200 dark:border-gray-700"
                } focus:ring-2 focus:ring-blue-500 transition-all`}
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm sm:text-base">₹</span>
              <div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1 ml-1">
                Enter any amount above ₹10
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center mt-6 sm:mt-8">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto"
          >
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-base sm:text-lg rounded-full shadow-lg transition-all duration-300"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" /> Processing...
                </>
              ) : (
                <>
                  <Heart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Donate Now
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </motion.form>

      <Dialog open={showDonateModal} onOpenChange={setShowDonateModal}>
        <DialogContent className="sm:max-w-md max-w-[95vw] p-4 sm:p-6">
          <DialogHeader className="space-y-2 sm:space-y-3">
            <DialogTitle className="text-lg sm:text-xl font-semibold text-center text-blue-700 dark:text-blue-400 flex items-center justify-center gap-1 sm:gap-2">
              <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
              Complete Your Donation
            </DialogTitle>
            <DialogDescription className="text-center text-sm sm:text-base text-gray-600 dark:text-gray-300">
              Scan the QR code below to make your payment of ₹{customAmount ? formatAmount(parseInt(customAmount)) : formatAmount(donationAmount)}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-2 sm:p-4 rounded-lg shadow-md mx-auto w-fit mb-3 sm:mb-4"
            >
              <div className="relative">
                <Image
                  src="/NIRVRITI_QR.jpg"
                  alt="QR Code"
                  width={180}
                  height={180}
                  className="mx-auto rounded-md w-[180px] h-[180px] sm:w-[220px] sm:h-[220px]"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-md pointer-events-none"></div>
              </div>
            </motion.div>
            
            <div className="bg-blue-50 dark:bg-gray-800 p-2 sm:p-3 rounded-lg text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 flex items-start">
              <Info className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-500 mr-1.5 sm:mr-2 mt-0.5 flex-shrink-0" />
              <p>After completing the payment, please enter the transaction ID or reference number provided by your payment app.</p>
            </div>
            
            <div className="w-full space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
              <Label htmlFor="transactionId" className="text-sm sm:text-base text-gray-700 dark:text-gray-200 font-medium">Transaction ID</Label>
              <Input
                id="transactionId"
                placeholder="Enter transaction ID or reference number"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base h-9 sm:h-10"
                required
              />
            </div>
            
            <motion.div 
              className="w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white w-full py-4 sm:py-6 rounded-lg shadow-md transition-all duration-300 text-sm sm:text-base"
                onClick={submitToGoogleSheets}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                    Processing Donation...
                  </>
                ) : (
                  <>
                    <Check className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Confirm Donation
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Loading animation */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white dark:bg-gray-800 p-5 sm:p-8 rounded-xl shadow-2xl max-w-[90vw] sm:max-w-md"
            >
              <Loader2 className="h-12 w-12 sm:h-16 sm:w-16 text-blue-600 dark:text-blue-400 animate-spin mx-auto" />
              <p className="text-center mt-4 text-sm sm:text-base text-gray-700 dark:text-gray-200 font-medium">Processing your donation...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Success animation */}
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white dark:bg-gray-800 p-5 sm:p-8 rounded-xl shadow-2xl max-w-[90vw] sm:max-w-md"
            >
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                  delay: 0.1
                }}
                className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-3 sm:mb-4"
              >
                <Check className="h-8 w-8 sm:h-10 sm:w-10 text-green-600 dark:text-green-400" />
              </motion.div>
              <motion.h3 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg sm:text-xl font-bold text-center text-gray-800 dark:text-gray-100 mb-2"
              >
                Thank You for Your Donation!
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center text-sm sm:text-base text-gray-600 dark:text-gray-300"
              >
                Your contribution will help us make a difference in our community.
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}