import { HeroSection } from "@/components/home/hero-section"
import { HowItWorks } from "@/components/home/how-it-works"
import { FeaturedServices } from "@/components/home/featured-services"
import { Testimonials } from "@/components/home/testimonials"
import { PricingComparison } from "@/components/home/pricing-comparison"
import { FAQ } from "@/components/home/faq"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <HowItWorks />
        <FeaturedServices />
        <Testimonials />
        <PricingComparison />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
