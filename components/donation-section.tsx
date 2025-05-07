"use client"

import type React from "react"

import { useState, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Heart, BookOpen, Utensils, Home, Users, Gift, Loader2 } from "lucide-react"
import Image from "next/image"
import { toast } from "@/components/ui/use-toast" // You'll need to add this component if you don't have it

const donationCategories = [
  { id: "education", name: "Education", icon: BookOpen, description: "Support educational programs and resources" },
  { id: "food", name: "Food & Nutrition", icon: Utensils, description: "Provide meals to those in need" },
  { id: "shelter", name: "Shelter", icon: Home, description: "Help provide safe housing solutions" },
  { id: "community", name: "Community Development", icon: Users, description: "Support local community initiatives" },
]

const donationAmounts = [500, 1000, 2000, 5000]

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  category: string;
  amount: number;
}

const DonationSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("education")
  const [donationAmount, setDonationAmount] = useState(1000)
  const [customAmount, setCustomAmount] = useState("")
  const [showDonateModal, setShowDonateModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({})
  
  // Form state
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    category: "education",
    amount: 1000
  })

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value)
    setDonationAmount(0) // Reset predefined amounts when custom amount is entered
    
    // Update form data
    setFormData({
      ...formData,
      amount: Number(e.target.value) || 0
    })
  }

  const handleAmountSelection = (amount: number) => {
    setDonationAmount(amount)
    setCustomAmount("") // Reset custom amount when predefined amount is selected
    
    // Update form data
    setFormData({
      ...formData,
      amount: amount
    })
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    
    // Update form data
    setFormData({
      ...formData,
      category: category
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    
    setFormData({
      ...formData,
      [id]: value
    })
    
    // Clear error when user types
    if (formErrors[id as keyof FormData]) {
      setFormErrors({
        ...formErrors,
        [id]: undefined
      })
    }
  }

  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {}
    
    if (!formData.fullName.trim()) {
      errors.fullName = "Name is required"
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Invalid email format"
    }
    
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required"
    }
    
    if (formData.amount <= 0) {
      errors.amount = "Please select or enter a valid amount"
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }
  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    const finalAmount = customAmount ? Number.parseInt(customAmount) : donationAmount
    
    setIsSubmitting(true)
    
    try {
      // Prepare data for Google Sheets
      const formDataToSubmit = {
        name: formData.fullName,         // Changed from fullName to name
        email: formData.email,
        phone: formData.phoneNumber,     // Changed from phoneNumber to phone
        category: selectedCategory,
        amount: finalAmount,
        date: new Date().toISOString()
      }
      
      // Log the form data for debugging
      console.log("Submitting form data:", formDataToSubmit);
      
      // Submit data to Google Sheets via the Apps Script web app
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwAfC1eWtBLEv8lnQ3MkqkHSj0WEvLcyS24AHEFx3rbgcow8WANlSHQkrFHz4uOQRJQ/exec",
        {
          method: "POST",
          mode: "no-cors", // Important for CORS issues with Google Scripts
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataToSubmit),
        }
      )
      
      // Show donation modal with QR code
      setShowDonateModal(true)
      
      // You can add toast notification here
      // toast({
      //   title: "Form submitted successfully",
      //   description: "Your donation details have been recorded.",
      // })
    } catch (error) {
      console.error("Error submitting form:", error)
      // toast({
      //   title: "Error",
      //   description: "There was an error submitting your donation. Please try again.",
      //   variant: "destructive"
      // })
    } finally {
      setIsSubmitting(false)
    }
  }

  const finalAmount = customAmount ? Number.parseInt(customAmount) : donationAmount

  return (
    <section id="donate" className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">Make a Donation</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Your contribution helps us continue our mission of serving the community and creating positive change.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-md border border-green-100">
          <h3 className="text-xl font-semibold text-green-700 mb-6">How Your Donation Helps</h3>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Heart size={24} className="text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-1">Transform Lives</h4>
                <p className="text-gray-600">
                  Your donation directly impacts the lives of those in need, providing essential resources and support.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <BookOpen size={24} className="text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-1">Empower Through Education</h4>
                <p className="text-gray-600">
                  Help provide educational materials, scholarships, and learning opportunities to underprivileged
                  students.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Gift size={24} className="text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-1">Create Sustainable Change</h4>
                <p className="text-gray-600">
                  Your contribution helps us develop and implement long-term solutions to community challenges.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-100">
            <p className="text-sm text-gray-600">
              Nirvrti Foundation is a registered NGO (Registration Number: 5012992). All donations are tax-deductible
              under Section 80G of the Income Tax Act.
            </p>
          </div>
        </div>

        <Card className="border-green-100 shadow-md">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-2xl text-green-700">Donation Form</CardTitle>
              <CardDescription>Choose a category and amount to make your contribution</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3">Select Donation Category</h4>
                <RadioGroup
                  value={selectedCategory}
                  onValueChange={handleCategoryChange}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {donationCategories.map((category) => {
                    const Icon = category.icon
                    return (
                      <div key={category.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={category.id} id={category.id} className="text-green-600" />
                        <Label htmlFor={category.id} className="flex items-center gap-2 cursor-pointer">
                          <Icon size={18} className="text-green-600" />
                          <span>{category.name}</span>
                        </Label>
                      </div>
                    )
                  })}
                </RadioGroup>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3">Select Amount (₹)</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {donationAmounts.map((amount) => (
                    <Button
                      key={amount}
                      type="button"
                      variant={donationAmount === amount ? "default" : "outline"}
                      className={`border-green-200 ${
                        donationAmount === amount
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "text-green-700 hover:bg-green-50"
                      }`}
                      onClick={() => handleAmountSelection(amount)}
                    >
                      ₹{amount}
                    </Button>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <Label htmlFor="customAmount" className="whitespace-nowrap">
                    Custom Amount:
                  </Label>
                  <div className="w-full">
                    <Input
                      id="customAmount"
                      type="number"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      className="border-green-200 focus-visible:ring-green-500"
                    />
                    {formErrors.amount && <p className="text-red-500 text-sm mt-1">{formErrors.amount}</p>}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your name"
                    className={`border-green-200 focus-visible:ring-green-500 ${formErrors.fullName ? "border-red-500" : ""}`}
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                  {formErrors.fullName && <p className="text-red-500 text-sm mt-1">{formErrors.fullName}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className={`border-green-200 focus-visible:ring-green-500 ${formErrors.email ? "border-red-500" : ""}`}
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    placeholder="Enter your phone number"
                    className={`border-green-200 focus-visible:ring-green-500 ${formErrors.phoneNumber ? "border-red-500" : ""}`}
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                  {formErrors.phoneNumber && <p className="text-red-500 text-sm mt-1">{formErrors.phoneNumber}</p>}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white transition-all duration-300 transform hover:scale-105"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                  </>
                ) : (
                  <>Donate ₹{finalAmount}</>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
      {showDonateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="relative h-64 w-full">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Donation QR Code"
                fill
                className="object-contain"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-green-700 mb-4">Complete Your Donation</h3>
              <p className="text-gray-700 mb-6">
                Scan the QR code above or use the details below to complete your donation of ₹{finalAmount}.
              </p>
              <div className="bg-green-50 p-4 rounded-lg mb-6">
                <h4 className="font-medium text-green-700 mb-2">Bank Details:</h4>
                <p className="text-gray-700">Account Name: HARIDEVPUR NIRVRITI FOUNDATION</p>
                <p className="text-gray-700">Account Number: 41449951224</p>
                <p className="text-gray-700">Bank: STATE BANK OF INDIA</p>
                <p className="text-gray-700">Location: JEEVANDEEP (KOLKATA)</p>
                <p className="text-gray-700">IFSC Code: SBIN0003762</p>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => setShowDonateModal(false)}
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50 mr-2"
                >
                  Close
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => {
                    setShowDonateModal(false)
                    // Reset form after successful donation
                    setFormData({
                      fullName: "",
                      email: "",
                      phoneNumber: "",
                      category: "education",
                      amount: 1000
                    })
                    setDonationAmount(1000)
                    setCustomAmount("")
                  }}
                >
                  Confirm Donation
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default DonationSection