"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"

export function PricingComparison() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const pricingData = [
    {
      service: "1k IG Followers",
      ourPrice: 2.0,
      competitorPrice: 4.99,
    },
    {
      service: "1k IG Likes",
      ourPrice: 1.5,
      competitorPrice: 3.99,
    },
    {
      service: "1k YouTube Views",
      ourPrice: 1.5,
      competitorPrice: 4.5,
    },
    {
      service: "1k TikTok Followers",
      ourPrice: 3.0,
      competitorPrice: 7.99,
    },
    {
      service: "1k TikTok Likes",
      ourPrice: 0.8,
      competitorPrice: 2.99,
    },
  ]

  return (
    <section className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Pricing Comparison</h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          See how our prices compare to the competition
        </p>

        <motion.div
          className="max-w-3xl mx-auto overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-purple-100 dark:bg-purple-900">
                <th className="py-4 px-6 text-left font-semibold">Service</th>
                <th className="py-4 px-6 text-center font-semibold">Our Price</th>
                <th className="py-4 px-6 text-center font-semibold">Competitor Price</th>
                <th className="py-4 px-6 text-center font-semibold">You Save</th>
              </tr>
            </thead>
            <tbody>
              {pricingData.map((item, index) => {
                const savings = item.competitorPrice - item.ourPrice
                const savingsPercentage = Math.round((savings / item.competitorPrice) * 100)

                return (
                  <motion.tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700"
                    } border-b border-gray-200 dark:border-gray-700`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <td className="py-4 px-6">{item.service}</td>
                    <td className="py-4 px-6 text-center font-semibold text-purple-600 dark:text-purple-400">
                      ${item.ourPrice.toFixed(2)}
                    </td>
                    <td className="py-4 px-6 text-center text-gray-500 dark:text-gray-400">
                      ${item.competitorPrice.toFixed(2)}
                    </td>
                    <td className="py-4 px-6 text-center text-green-600 dark:text-green-400">
                      {savingsPercentage}% (${savings.toFixed(2)})
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  )
}
