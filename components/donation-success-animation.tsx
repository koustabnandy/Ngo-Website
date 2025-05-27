"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, ArrowLeft } from "lucide-react"

interface CheckmarkProps {
  size?: number
  strokeWidth?: number
  color?: string
  className?: string
}

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        delay: i * 0.2,
        type: "spring",
        duration: 1.5,
        bounce: 0.2,
        ease: "easeInOut",
      },
      opacity: { delay: i * 0.2, duration: 0.2 },
    },
  }),
}

export function Checkmark({ size = 100, strokeWidth = 2, color = "currentColor", className = "" }: CheckmarkProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      initial="hidden"
      animate="visible"
      className={className}
    >
      <title>Animated Checkmark</title>
      <motion.circle
        cx="50"
        cy="50"
        r="40"
        stroke={color}
        variants={draw}
        custom={0}
        style={{
          strokeWidth,
          strokeLinecap: "round",
          fill: "transparent",
        }}
      />
      <motion.path
        d="M30 50L45 65L70 35"
        stroke={color}
        variants={draw}
        custom={1}
        style={{
          strokeWidth,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          fill: "transparent",
        }}
      />
    </motion.svg>
  )
}

interface DonationSuccessAnimationProps {
  amount: number
  onReset: () => void
}

export default function DonationSuccessAnimation({ amount, onReset }: DonationSuccessAnimationProps) {
  const formatAmount = (amount: number) => {
    return amount.toLocaleString("en-IN")
  }

  return (
    <Card className="w-full max-w-lg mx-auto p-6 min-h-[400px] flex flex-col justify-center bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800 backdrop-blur-sm">
      <CardContent className="space-y-6 flex flex-col items-center justify-center">
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1],
            scale: {
              type: "spring",
              damping: 15,
              stiffness: 200,
            },
          }}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 blur-xl bg-emerald-500/20 dark:bg-emerald-500/30 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.2,
                duration: 0.8,
                ease: "easeOut",
              }}
            />
            <Checkmark
              size={100}
              strokeWidth={4}
              color="rgb(16 185 129)"
              className="relative z-10 dark:drop-shadow-[0_0_10px_rgba(0,0,0,0.1)]"
            />
          </div>
        </motion.div>

        <motion.div
          className="space-y-4 text-center w-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <motion.h2
            className="text-2xl font-bold text-green-700 dark:text-green-400 tracking-tight"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.4 }}
          >
            Donation Successful!
          </motion.h2>

          <motion.div
            className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-4 border border-green-200 dark:border-green-700 backdrop-blur-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 1.2,
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" fill="currentColor" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Thank you for your generous contribution
                </span>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">₹{formatAmount(amount)}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Your donation will help make a difference
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="space-y-2 text-sm text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.4 }}
          >
            <p>🎉 Your donation has been successfully processed</p>
            <p>📧 A confirmation email will be sent to you shortly</p>
            <p>🤝 Together, we can create lasting change</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.4 }}
            className="pt-4"
          >
            <Button onClick={onReset} variant="outline" className="flex items-center gap-2 mx-auto">
              <ArrowLeft className="h-4 w-4" />
              Make Another Donation
            </Button>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  )
}
