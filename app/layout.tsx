import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/contexts/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SocialBoost - Grow Your Social Media Presence",
  description: "Get real followers, likes, and views at unbeatable prices",
  openGraph: {
    title: "SocialBoost - Grow Your Social Media Presence",
    description: "Get real followers, likes, and views at unbeatable prices",
    url: "https://socialboost.vercel.app",
    siteName: "SocialBoost",
    images: [
      {
        url: "https://socialboost.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SocialBoost",
      },
    ],
    locale: "en_US",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
