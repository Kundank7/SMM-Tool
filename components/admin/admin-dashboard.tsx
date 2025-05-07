"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, CreditCard, DollarSign } from "lucide-react"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartTooltipItem,
  ChartLegend,
  ChartLegendItem,
} from "@/components/ui/chart"
import { Area, Bar } from "recharts"

export function AdminDashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "2,543",
      icon: Users,
      change: "+12.5%",
      changeType: "positive",
    },
    {
      title: "Pending Deposits",
      value: "12",
      icon: CreditCard,
      change: "-2.5%",
      changeType: "negative",
    },
    {
      title: "Monthly Revenue",
      value: "$12,543",
      icon: DollarSign,
      change: "+18.2%",
      changeType: "positive",
    },
  ]

  const revenueData = [
    { name: "Jan", revenue: 4000 },
    { name: "Feb", revenue: 5000 },
    { name: "Mar", revenue: 3000 },
    { name: "Apr", revenue: 7000 },
    { name: "May", revenue: 5000 },
    { name: "Jun", revenue: 8000 },
    { name: "Jul", revenue: 10000 },
  ]

  const ordersData = [
    { name: "Mon", instagram: 40, youtube: 24, tiktok: 18 },
    { name: "Tue", instagram: 30, youtube: 28, tiktok: 20 },
    { name: "Wed", instagram: 45, youtube: 30, tiktok: 25 },
    { name: "Thu", instagram: 50, youtube: 35, tiktok: 30 },
    { name: "Fri", instagram: 60, youtube: 40, tiktok: 35 },
    { name: "Sat", instagram: 75, youtube: 50, tiktok: 40 },
    { name: "Sun", instagram: 65, youtube: 45, tiktok: 35 },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className={`mt-4 text-sm ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                {stat.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue for the current year</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[300px]">
              <Chart>
                <Area
                  type="monotone"
                  dataKey="revenue"
                  data={revenueData}
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.2}
                />
                <ChartTooltip>
                  <ChartTooltipContent>
                    <ChartTooltipItem />
                  </ChartTooltipContent>
                </ChartTooltip>
              </Chart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orders by Platform</CardTitle>
            <CardDescription>Weekly order distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[300px]">
              <Chart>
                <Bar dataKey="instagram" data={ordersData} fill="#E1306C" name="Instagram" />
                <Bar dataKey="youtube" data={ordersData} fill="#FF0000" name="YouTube" />
                <Bar dataKey="tiktok" data={ordersData} fill="#000000" name="TikTok" />
                <ChartTooltip>
                  <ChartTooltipContent />
                </ChartTooltip>
                <ChartLegend>
                  <ChartLegendItem />
                </ChartLegend>
              </Chart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
