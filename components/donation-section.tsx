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
    <div className="container py-23 bg-blue-50 max-w-2xl">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-12">
          Make a <span className="text-yellow-500">Donation</span>
        </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="Your Name"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="1234567890"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Label>Category</Label>
            <RadioGroup
              defaultValue="education"
              onValueChange={(val) => {
                setFormData({ ...formData, category: val })
                setSelectedCategory(val)
              }}
              className="flex flex-col space-y-2 "
            >
              {donationCategories.map((cat) => (
                <div key={cat.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={cat.value} id={cat.value} />
                  <Label htmlFor={cat.value}>{cat.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        <div>
          <Label>Select Donation Amount</Label>
          <div className="flex gap-4 mt-2 flex-wrap">
            {donationAmounts.map((amount) => (
              <Card
                key={amount}
                className={`cursor-pointer p-4 border-2 ${
                  donationAmount === amount && !customAmount
                    ? "border-yellow-300"
                    : ""
                }`}
                onClick={() => handleAmountChange(amount)}
              >
                ₹{amount}
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

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
            </>
          ) : (
            "Donate Now"
          )}
        </Button>
      </form>

      <Dialog open={showDonateModal} onOpenChange={setShowDonateModal}>
        <DialogContent>
          <h2 className="text-xl font-semibold mb-4">Scan to Donate</h2>
          <Image
            src="/qr-code.png"
            alt="QR Code"
            width={200}
            height={200}
            className="mx-auto"
          />
          <div className="mt-4">
            <Label htmlFor="transactionId">Transaction ID</Label>
            <Input
              id="transactionId"
              placeholder="Enter transaction ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              required
            />
          </div>
          <Button
            className="bg-blue-600 hover:bg-yellow-300 text-white mt-4 w-full"
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
    </div>
  )
}
