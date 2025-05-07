"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircle, Download } from "lucide-react"

export function TransactionHistory() {
  const [filter, setFilter] = useState("all")

  const transactions = [
    {
      id: "TRX-1234",
      date: "2023-05-01",
      amount: 25.0,
      method: "UPI",
      status: "approved",
    },
    {
      id: "TRX-1235",
      date: "2023-04-28",
      amount: 10.0,
      method: "Bitcoin",
      status: "pending",
    },
    {
      id: "TRX-1236",
      date: "2023-04-25",
      amount: 50.0,
      method: "USDT",
      status: "approved",
    },
    {
      id: "TRX-1237",
      date: "2023-04-20",
      amount: 15.0,
      method: "UPI",
      status: "rejected",
    },
  ]

  const filteredTransactions = filter === "all" ? transactions : transactions.filter((t) => t.status === filter)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950/50 dark:text-green-400 dark:border-green-900"
          >
            Approved
          </Badge>
        )
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950/50 dark:text-yellow-400 dark:border-yellow-900"
          >
            Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-400 dark:border-red-900"
          >
            Rejected
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>View your deposit history and transaction status</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={filter} onValueChange={setFilter}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>

            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>

          <TabsContent value={filter} className="m-0">
            {filteredTransactions.length > 0 ? (
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left text-sm font-medium">Transaction ID</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Amount</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Method</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions.map((transaction) => (
                        <tr key={transaction.id} className="border-t">
                          <td className="px-4 py-3 text-sm">{transaction.id}</td>
                          <td className="px-4 py-3 text-sm">{formatDate(transaction.date)}</td>
                          <td className="px-4 py-3 text-sm">${transaction.amount.toFixed(2)}</td>
                          <td className="px-4 py-3 text-sm">{transaction.method}</td>
                          <td className="px-4 py-3 text-sm">{getStatusBadge(transaction.status)}</td>
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
                <h3 className="text-lg font-semibold mb-2">No Transactions Found</h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                  {filter === "all"
                    ? "You haven't made any deposits yet. Add funds to get started."
                    : `You don't have any ${filter} transactions.`}
                </p>
                <Button>Make a Deposit</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
