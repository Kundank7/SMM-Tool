"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Wallet, Copy, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function DepositForm() {
  const [amount, setAmount] = useState("")
  const [inrAmount, setInrAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const { toast } = useToast()

  // Update INR amount when USD amount changes (1 USD = 83 INR)
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAmount(value)

    if (value) {
      const inr = Number.parseFloat(value) * 83
      setInrAmount(inr.toFixed(2))
    } else {
      setInrAmount("")
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "The address has been copied to your clipboard.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deposit Funds</CardTitle>
        <CardDescription>Add funds to your account using your preferred payment method</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="payment">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="payment">Payment Method</TabsTrigger>
            <TabsTrigger value="proof">Payment Proof</TabsTrigger>
          </TabsList>

          <TabsContent value="payment">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (USD)</Label>
                  <Input
                    id="amount"
                    type="number"
                    min="1"
                    placeholder="10.00"
                    value={amount}
                    onChange={handleAmountChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inr-amount">Amount (INR)</Label>
                  <Input
                    id="inr-amount"
                    type="text"
                    readOnly
                    value={inrAmount ? `₹${inrAmount}` : ""}
                    placeholder="₹830.00"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Payment Method</Label>
                <RadioGroup
                  defaultValue="upi"
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  <div>
                    <RadioGroupItem value="upi" id="upi" className="peer sr-only" />
                    <Label
                      htmlFor="upi"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <CreditCard className="mb-3 h-6 w-6" />
                      UPI / PayTM
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem value="bitcoin" id="bitcoin" className="peer sr-only" />
                    <Label
                      htmlFor="bitcoin"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <svg className="mb-3 h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.17-1.06-.25l.53-2.127-1.32-.33-.54 2.165c-.285-.065-.565-.13-.84-.2l-1.815-.45-.35 1.407s.975.225.955.238c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.415-.614.32.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.54-2.17c.36.1.705.19 1.05.273l-.53 2.14 1.32.33.54-2.18c2.24.427 3.93.255 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.52 2.75 2.084v.006z"
                          fill="currentColor"
                        />
                      </svg>
                      Bitcoin
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem value="usdt" id="usdt" className="peer sr-only" />
                    <Label
                      htmlFor="usdt"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Wallet className="mb-3 h-6 w-6" />
                      USDT (TRC20)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {paymentMethod === "upi" && (
                <div className="mt-6 space-y-4">
                  <div className="flex flex-col items-center justify-center p-6 border rounded-lg">
                    <div className="mb-4 bg-white p-2 rounded">
                      <Image
                        src="/placeholder.svg?height=200&width=200"
                        alt="UPI QR Code"
                        width={200}
                        height={200}
                        className="mx-auto"
                      />
                    </div>
                    <p className="text-center mb-2">Scan QR code or pay to UPI ID</p>
                    <div className="flex items-center gap-2 bg-muted p-2 rounded">
                      <code>payment@socialboost</code>
                      <Button variant="ghost" size="icon" onClick={() => handleCopy("payment@socialboost")}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "bitcoin" && (
                <div className="mt-6 space-y-4">
                  <div className="flex flex-col items-center justify-center p-6 border rounded-lg">
                    <div className="mb-4 bg-white p-2 rounded">
                      <Image
                        src="/placeholder.svg?height=200&width=200"
                        alt="Bitcoin QR Code"
                        width={200}
                        height={200}
                        className="mx-auto"
                      />
                    </div>
                    <p className="text-center mb-2">Send Bitcoin to this address</p>
                    <div className="flex items-center gap-2 bg-muted p-2 rounded w-full overflow-auto">
                      <code className="text-xs">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</code>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCopy("bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "usdt" && (
                <div className="mt-6 space-y-4">
                  <div className="flex flex-col items-center justify-center p-6 border rounded-lg">
                    <div className="mb-4 bg-white p-2 rounded">
                      <Image
                        src="/placeholder.svg?height=200&width=200"
                        alt="USDT QR Code"
                        width={200}
                        height={200}
                        className="mx-auto"
                      />
                    </div>
                    <p className="text-center mb-2">Send USDT (TRC20) to this address</p>
                    <div className="flex items-center gap-2 bg-muted p-2 rounded w-full overflow-auto">
                      <code className="text-xs">TJYeasdfghjkl7890QWERTYUIOP</code>
                      <Button variant="ghost" size="icon" onClick={() => handleCopy("TJYeasdfghjkl7890QWERTYUIOP")}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900/50 rounded-lg p-4 text-yellow-800 dark:text-yellow-200">
                <p className="text-sm">
                  Funds will be added to your account within 30 minutes after payment confirmation.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="proof">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="transaction-id">Transaction ID / Reference Number</Label>
                <Input id="transaction-id" placeholder="Enter transaction ID" />
              </div>

              <div className="space-y-2">
                <Label>Upload Payment Screenshot</Label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <div className="flex flex-col items-center">
                    <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                    <p className="mb-2 text-sm font-semibold">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground mb-4">PNG, JPG or PDF (max. 5MB)</p>
                    <Input
                      id="payment-proof"
                      type="file"
                      className="hidden"
                      accept="image/png,image/jpeg,application/pdf"
                    />
                    <Button variant="outline" onClick={() => document.getElementById("payment-proof")?.click()}>
                      Select File
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <textarea
                  id="notes"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Any additional information about your payment"
                />
              </div>

              <Button className="w-full">Submit Payment Proof</Button>

              <div className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900/50 rounded-lg p-4 text-yellow-800 dark:text-yellow-200">
                <p className="text-sm">
                  Please make sure to upload a clear screenshot of your payment. This helps us verify your transaction
                  faster.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
