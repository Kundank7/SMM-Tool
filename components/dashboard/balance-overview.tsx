"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet } from "lucide-react"

export function BalanceOverview() {
  const [isDepositOpen, setIsDepositOpen] = useState(false)
  const [amount, setAmount] = useState("")

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Balance Overview</CardTitle>
        <CardDescription>Your current account balance and deposit options</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Available Balance</p>
            <p className="text-3xl font-bold">$25.00</p>
          </div>
          <div className="rounded-full bg-primary/10 p-3">
            <Wallet className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-3">
        <Dialog open={isDepositOpen} onOpenChange={setIsDepositOpen}>
          <DialogTrigger asChild>
            <Button>Deposit Funds</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Deposit Funds</DialogTitle>
              <DialogDescription>Add funds to your account to place orders</DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="card" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="card">Credit Card</TabsTrigger>
                <TabsTrigger value="crypto">Cryptocurrency</TabsTrigger>
              </TabsList>
              <TabsContent value="card" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (USD)</Label>
                  <Input
                    id="amount"
                    type="number"
                    min="1"
                    placeholder="10.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input id="card-number" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="crypto" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="crypto-amount">Amount (USD)</Label>
                  <Input
                    id="crypto-amount"
                    type="number"
                    min="1"
                    placeholder="10.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="rounded-lg border p-4">
                  <div className="mb-2 text-sm font-medium">Bitcoin Address</div>
                  <div className="flex items-center justify-between">
                    <code className="rounded bg-muted px-2 py-1 text-xs">
                      bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                    </code>
                    <Button variant="ghost" size="sm">
                      Copy
                    </Button>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="mb-2 text-sm font-medium">USDT (TRC20)</div>
                  <div className="flex items-center justify-between">
                    <code className="rounded bg-muted px-2 py-1 text-xs">TJYeasdfghjkl7890QWERTYUIOP</code>
                    <Button variant="ghost" size="sm">
                      Copy
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button type="submit" onClick={() => setIsDepositOpen(false)}>
                Proceed to Payment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button variant="outline">
          <Link href="/dashboard/transactions">Transaction History</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function Link({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href}>{children}</a>
}
