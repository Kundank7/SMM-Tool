import type { Metadata } from "next"
import { RegisterForm } from "@/components/auth/register-form"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Register | SocialBoost",
  description: "Create a new SocialBoost account",
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-6">
        <RegisterForm />
      </main>
      <Footer />
    </div>
  )
}
