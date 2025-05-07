"use client"

import { CheckSquare, Wallet, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

export function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const steps = [
    {
      icon: CheckSquare,
      title: "Choose Service",
      description: "Select from our wide range of social media boosting services",
    },
    {
      icon: Wallet,
      title: "Make Payment",
      description: "Secure payment with multiple options including crypto",
    },
    {
      icon: TrendingUp,
      title: "Watch Growth",
      description: "See your social media presence grow in real-time",
    },
  ]

  const [counters, setCounters] = useState({ orders: 0, support: 0 })

  useEffect(() => {
    if (isInView) {
      const ordersInterval = setInterval(() => {
        setCounters((prev) => {
          const newOrders = prev.orders + 10000
          if (newOrders >= 1000000) {
            clearInterval(ordersInterval)
            return { ...prev, orders: 1000000 }
          }
          return { ...prev, orders: newOrders }
        })
      }, 20)

      const supportInterval = setInterval(() => {
        setCounters((prev) => {
          const newSupport = prev.support + 1
          if (newSupport >= 24) {
            clearInterval(supportInterval)
            return { ...prev, support: 24 }
          }
          return { ...prev, support: newSupport }
        })
      }, 100)

      return () => {
        clearInterval(ordersInterval)
        clearInterval(supportInterval)
      }
    }
  }, [isInView])

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900" ref={ref}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center shadow-lg"
              variants={item}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300">
                <step.icon size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-24">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-4xl md:text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {formatNumber(counters.orders)}+
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300">Orders Completed</p>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-4xl md:text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {counters.support}/7
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300">Support</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
