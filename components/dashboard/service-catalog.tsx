"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Instagram, Youtube, TwitterIcon as TikTok, Search } from "lucide-react"

export function ServiceCatalog() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currency, setCurrency] = useState("usd")

  const services = {
    instagram: [
      { id: "ig-followers", name: "Instagram Followers", price: 2.0, unit: 1000 },
      { id: "ig-likes", name: "Instagram Likes", price: 1.5, unit: 1000 },
      { id: "ig-views", name: "Instagram Views", price: 0.8, unit: 1000 },
      { id: "ig-comments", name: "Instagram Comments", price: 10.0, unit: 100 },
    ],
    youtube: [
      { id: "yt-views", name: "YouTube Views", price: 1.5, unit: 1000 },
      { id: "yt-likes", name: "YouTube Likes", price: 3.0, unit: 100 },
      { id: "yt-subscribers", name: "YouTube Subscribers", price: 15.0, unit: 100 },
      { id: "yt-comments", name: "YouTube Comments", price: 12.0, unit: 50 },
    ],
    tiktok: [
      { id: "tt-followers", name: "TikTok Followers", price: 3.0, unit: 1000 },
      { id: "tt-likes", name: "TikTok Likes", price: 0.8, unit: 1000 },
      { id: "tt-views", name: "TikTok Views", price: 0.5, unit: 1000 },
      { id: "tt-comments", name: "TikTok Comments", price: 8.0, unit: 50 },
    ],
  }

  const filterServices = (platform: keyof typeof services) => {
    return services[platform].filter((service) => service.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }

  const formatPrice = (price: number) => {
    if (currency === "usd") {
      return `$${price.toFixed(2)}`
    } else {
      // Assuming 1 USD = 83 INR
      return `₹${(price * 83).toFixed(2)}`
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Service Catalog</CardTitle>
        <CardDescription>Browse our available services</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search services..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Currency:</span>
            <Tabs defaultValue="usd" value={currency} onValueChange={setCurrency}>
              <TabsList>
                <TabsTrigger value="usd">USD</TabsTrigger>
                <TabsTrigger value="inr">INR</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <Tabs defaultValue="instagram">
          <TabsList className="mb-4">
            <TabsTrigger value="instagram" className="flex items-center">
              <Instagram className="mr-2 h-4 w-4" />
              Instagram
            </TabsTrigger>
            <TabsTrigger value="youtube" className="flex items-center">
              <Youtube className="mr-2 h-4 w-4" />
              YouTube
            </TabsTrigger>
            <TabsTrigger value="tiktok" className="flex items-center">
              <TikTok className="mr-2 h-4 w-4" />
              TikTok
            </TabsTrigger>
          </TabsList>

          {(["instagram", "youtube", "tiktok"] as const).map((platform) => (
            <TabsContent key={platform} value={platform} className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filterServices(platform).map((service) => (
                  <Card key={service.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col h-full">
                        <h3 className="font-medium mb-2">{service.name}</h3>
                        <div className="flex items-baseline mb-4">
                          <span className="text-2xl font-bold">{formatPrice(service.price)}</span>
                          <span className="text-muted-foreground ml-1">/{service.unit}</span>
                        </div>
                        <div className="mt-auto pt-4">
                          <Button className="w-full">Order Now</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filterServices(platform).length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-semibold mb-2">No services found</h3>
                  <p className="text-muted-foreground">Try adjusting your search query</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
