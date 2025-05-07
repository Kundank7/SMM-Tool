"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const faqItems = [
    {
      question: "How long do deliveries take?",
      answer:
        "Most orders start within 30 minutes of placing your order. Delivery time depends on the service and quantity ordered. Small orders typically complete within 24 hours, while larger orders may take 2-3 days. You can check the estimated delivery time on each service page.",
    },
    {
      question: "Is there a refund policy?",
      answer:
        "Yes, we offer a 30-day money-back guarantee if we fail to deliver your order. If you're not satisfied with the quality of our service, please contact our support team within 7 days of delivery for a partial refund or replacement.",
    },
    {
      question: "Are the followers real?",
      answer:
        "We provide high-quality followers that look natural on your profile. Our followers have profile pictures and posts. While they may not all actively engage with your content, they help boost your social proof and credibility.",
    },
    {
      question: "Is it safe to use your services?",
      answer:
        "Yes, our services are completely safe. We never ask for your password or sensitive information. We use only legitimate methods that comply with the terms of service of each platform. Thousands of customers use our services daily without any issues.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and various cryptocurrencies including Bitcoin, Ethereum, and USDT. All payments are processed securely, and we don't store your payment information.",
    },
    {
      question: "Can I get banned for using your services?",
      answer:
        "Our services are designed to appear natural and comply with platform guidelines. We use gradual delivery methods to ensure your account safety. In our years of operation, we've had an excellent safety record with no reported bans related to our services.",
    },
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900" ref={ref}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Frequently Asked Questions</h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Find answers to the most common questions about our services
        </p>

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300">
            Still have questions?{" "}
            <a href="/contact" className="text-purple-600 dark:text-purple-400 font-medium hover:underline">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
