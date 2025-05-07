"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Instagram, Youtube, TwitterIcon as TikTok } from "lucide-react"

export function FeaturedServices() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const services = [
    {
      id: "instagram-followers",
      name: "Instagram Followers",
      price: 0.2,
      unit: 100,
      icon: Instagram,
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
    {
      id: "youtube-views",
      name: "Youtube Views",
      price: 1.5,
      unit: 1000,
      icon: Youtube,
      color: "bg-gradient-to-r from-red-500 to-red-600",
    },
    {
      id: "tiktok-likes",
      name: "TikTok Likes",
      price: 0.8,
      unit: 1000,
      icon: TikTok,
      color: "bg-gradient-to-r from-black to-gray-800",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Featured Services</h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Boost your social media presence with our most popular services at unbeatable prices
        </p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700"
              variants={item}
            >
              <div className={`h-24 flex items-center justify-center ${service.color}`}>
                <service.icon size={48} className="text-white" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-2xl font-bold">${service.price}</span>
                  <span className="text-gray-600 dark:text-gray-300 ml-1">/{service.unit}</span>
                </div>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    High Quality
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Fast Delivery
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    24/7 Support
                  </li>
                </ul>
                <Link href={`/services/${service.id}`}>
                  <Button className="w-full">View Details</Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Link href="/services">
            <Button variant="outline" size="lg">
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
