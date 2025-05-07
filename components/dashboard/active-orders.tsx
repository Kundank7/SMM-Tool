"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Clock, CheckCircle } from "lucide-react"

export function ActiveOrders() {
  const [activeTab, setActiveTab] = useState("active")

  const orders = [
    {
      id: "ORD-1234",
      service: "Instagram Followers",
      quantity: 1000,
      status: "processing",
      eta: "2 hours",
      date: "2023-05-01",
    },
    {
      id: "ORD-1235",
      service: "YouTube Views",
      quantity: 5000,
      status: "processing",
      eta: "12 hours",
      date: "2023-05-01",
    },
    {
      id: "ORD-1236",
      service: "TikTok Likes",
      quantity: 2000,
      status: "completed",
      eta: "0 hours",
      date: "2023-04-29",
    },
    {
      id: "ORD-1237",
      service: "Instagram Comments",
      quantity: 50,
      status: "completed",
      eta: "0 hours",
      date: "2023-04-28",
    },
  ]

  const activeOrders = orders.filter((order) => order.status === "processing")
  const completedOrders = orders.filter((order) => order.status === "completed")

  const displayOrders = activeTab === "active" ? activeOrders : completedOrders

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processing":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950/50 dark:text-yellow-400 dark:border-yellow-900"
          >
            <Clock className="mr-1 h-3 w-3" /> Processing
          </Badge>
        )
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950/50 dark:text-green-400 dark:border-green-900"
          >
            <CheckCircle className="mr-1 h-3 w-3" /> Completed
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Orders</CardTitle>
        <CardDescription>Track your active and completed orders</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="active">Active Orders</TabsTrigger>
            <TabsTrigger value="completed">Completed Orders</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="m-0">
            {activeOrders.length > 0 ? (
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left text-sm font-medium">Order ID</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Service</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Quantity</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">ETA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeOrders.map((order) => (
                        <tr key={order.id} className="border-t">
                          <td className="px-4 py-3 text-sm">{order.id}</td>
                          <td className="px-4 py-3 text-sm">{order.service}</td>
                          <td className="px-4 py-3 text-sm">{order.quantity.toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm">{getStatusBadge(order.status)}</td>
                          <td className="px-4 py-3 text-sm">{order.eta}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <AlertCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No Active Orders</h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                  You don't have any active orders at the moment. Place a new order to get started.
                </p>
                <Button>Place New Order</Button>
              </div>
            )}
          </TabsContent>
          <TabsContent value="completed" className="m-0">
            {completedOrders.length > 0 ? (
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left text-sm font-medium">Order ID</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Service</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Quantity</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {completedOrders.map((order) => (
                        <tr key={order.id} className="border-t">
                          <td className="px-4 py-3 text-sm">{order.id}</td>
                          <td className="px-4 py-3 text-sm">{order.service}</td>
                          <td className="px-4 py-3 text-sm">{order.quantity.toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm">{getStatusBadge(order.status)}</td>
                          <td className="px-4 py-3 text-sm">{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <AlertCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No Completed Orders</h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                  You don't have any completed orders yet. Orders will appear here once they're finished.
                </p>
                <Button>View All Services</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
