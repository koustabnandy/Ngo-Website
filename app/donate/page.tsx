"use client"
import React, { useState, FormEvent } from "react"
import Image from "next/image"
import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function DonationPage() {
  const [donationAmount, setDonationAmount] = useState(1000)
  const [customAmount, setCustomAmount] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("education")
  const [showDonateModal, setShowDonateModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [transactionId, setTransactionId] = useState("")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    category: "education",
    amount: 1000,
  })
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
    if (/^\d*$/.test(value)) {
      setCustomAmount(value)
      setDonationAmount(Number(value))
    }
  }
  const validateForm = () => {
    if (!formData.fullName || !formData.email || !formData.phoneNumber) {
      toast({
        title: "Missing Fields",
        description: "Please fill out all fields before proceeding.",
        variant: "destructive",
      })
      return false
    }
    return true
  }
  const handleSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault()
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
      date: new Date().toISOString(),
    }
    try {
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
      toast({
        title: "Donation Recorded",
        description: "Your donation has been submitted successfully.",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your donation.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
      setShowDonateModal(false)
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
    }
  }
  return (
    <>
      <Navbar />
      <div className="pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">
        <div className="container mx-auto max-w-2xl px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 font-montserrat">
            <span className="text-blue-800 dark:text-blue-400">Make a</span>
            <span className="text-yellow-500 dark:text-yellow-400"> Donation</span>
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-12 rounded-full"></div>
          
          <Card className="p-6 shadow-lg border-0 dark:bg-gray-800">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName" className="text-gray-700 dark:text-gray-200">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="Your Name"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-200">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber" className="text-gray-700 dark:text-gray-200">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="1234567890"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-gray-700 dark:text-gray-200">Category</Label>
                  <RadioGroup
                    defaultValue="education"
                    onValueChange={(val) => {
                      setFormData({ ...formData, category: val })
                      setSelectedCategory(val)
                    }}
                    className="flex flex-col space-y-2 mt-1"
                  >
                    {donationCategories.map((cat) => (
                      <div key={cat.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={cat.value} id={cat.value} />
                        <Label htmlFor={cat.value} className="text-gray-700 dark:text-gray-200">{cat.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
              <div>
                <Label className="text-gray-700 dark:text-gray-200">Select Donation Amount</Label>
                <div className="flex gap-4 mt-2 flex-wrap">
                  {donationAmounts.map((amount) => (
                    <Card
                      key={amount}
                      className={`cursor-pointer p-4 border-2 ${
                        donationAmount === amount && !customAmount
                          ? "border-yellow-300 dark:border-yellow-500"
                          : "border-gray-200 dark:border-gray-700"
                      } hover:border-blue-300 dark:hover:border-blue-500 transition-colors`}
                      onClick={() => handleAmountChange(amount)}
                    >
                      <span className="text-gray-800 dark:text-gray-200">₹{amount}</span>
                    </Card>
                  ))}
                  <Input
                    type="text"
                    placeholder="Custom Amount"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className="w-40"
                  />
                </div>
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-6 rounded-full text-lg font-medium shadow-md transition-all duration-300 transform hover:scale-105"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                  </>
                ) : (
                  "Donate Now"
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
      
      <Dialog open={showDonateModal} onOpenChange={setShowDonateModal}>
        <DialogContent className="sm:max-w-md">
          <h2 className="text-xl font-semibold mb-4 text-center text-blue-700 dark:text-blue-400">Scan to Donate</h2>
          <div className="bg-white p-4 rounded-lg mx-auto w-fit">
            <Image
              src="/NIRVRITI_QR.jpg"
              alt="QR Code"
              width={200}
              height={200}
              className="mx-auto"
            />
          </div>
          <div className="mt-4">
            <Label htmlFor="transactionId" className="text-gray-700 dark:text-gray-200">Transaction ID</Label>
            <Input
              id="transactionId"
              placeholder="Enter transaction ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <Button
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white mt-4 py-5 rounded-full transition-all duration-300"
            onClick={submitToGoogleSheets}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Confirm Donation"
            )}
          </Button>
        </DialogContent>
      </Dialog>
      <Footer />
    </>
  )
}