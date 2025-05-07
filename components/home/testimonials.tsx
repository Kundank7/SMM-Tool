"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { Star, BadgeCheck } from "lucide-react"

export function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      verified: true,
      text: "Received my followers within 2 hours. Amazing service! Will definitely use again for my business account.",
    },
    {
      id: 2,
      name: "Michael Chen",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      verified: true,
      text: "The YouTube views came in gradually and looked completely natural. My video started ranking higher almost immediately.",
    },
    {
      id: 3,
      name: "Jessica Williams",
      image: "/placeholder.svg?height=80&width=80",
      rating: 4,
      verified: true,
      text: "Great value for money. My TikTok engagement increased dramatically after using their services.",
    },
    {
      id: 4,
      name: "David Rodriguez",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      verified: true,
      text: "Customer support was incredibly helpful when I had questions. The results exceeded my expectations!",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star key={index} className={`w-4 h-4 ${index < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
    ))
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900" ref={ref}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Customers Say</h2>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1, x: `-${activeIndex * 100}%` } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="min-w-full px-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
                    <div className="flex items-center mb-4">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                      <div className="ml-4">
                        <div className="flex items-center">
                          <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                          {testimonial.verified && (
                            <div className="ml-2 flex items-center text-green-500">
                              <BadgeCheck size={16} />
                              <span className="text-xs ml-1">Verified</span>
                            </div>
                          )}
                        </div>
                        <div className="flex mt-1">{renderStars(testimonial.rating)}</div>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.text}"</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 mx-1 rounded-full ${
                  activeIndex === index ? "bg-purple-600" : "bg-gray-300 dark:bg-gray-600"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
