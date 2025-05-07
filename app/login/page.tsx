import type { Metadata } from "next"
import { LoginForm } from "@/components/auth/login-form"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Login | SocialBoost",
  description: "Login to your SocialBoost account",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-6">
        <LoginForm />
      </main>
      <Footer />
    </div>
  )
}
