"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, CheckCircle, XCircle } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

export function DepositApprovals() {
  const [selectedDeposits, setSelectedDeposits] = useState<string[]>([])
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState("")
  const [balanceAmount, setBalanceAmount] = useState("")
  const { toast } = useToast()

  const deposits = [
    {
      id: "DEP-1234",
      user: "john_doe",
      userId: "USR-1234",
      amount: 25.0,
      method: "UPI",
      date: "2023-05-01",
      proofUrl: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "DEP-1235",
      user: "jane_smith",
      userId: "USR-1235",
      amount: 50.0,
      method: "Bitcoin",
      date: "2023-05-01",
      proofUrl: "/placeholder.svg?height=300&width=300",
    },
    {
      id: "DEP-1236",
      user: "mike_johnson",
      userId: "USR-1236",
      amount: 100.0,
      method: "USDT",
      date: "2023-05-01",
      proofUrl: "/placeholder.svg?height=300&width=300",
    },
  ]

  const handleSelectAll = () => {
    if (selectedDeposits.length === deposits.length) {
      setSelectedDeposits([])
    } else {
      setSelectedDeposits(deposits.map((d) => d.id))
    }
  }

  const handleSelect = (id: string) => {
    if (selectedDeposits.includes(id)) {
      setSelectedDeposits(selectedDeposits.filter((d) => d !== id))
    } else {
      setSelectedDeposits([...selectedDeposits, id])
    }
  }

  const handleApproveSelected = () => {
    toast({
      title: "Deposits Approved",
      description: `${selectedDeposits.length} deposits have been approved.`,
    })
    setSelectedDeposits([])
  }

  const handleRejectSelected = () => {
    toast({
      title: "Deposits Rejected",
      description: `${selectedDeposits.length} deposits have been rejected.`,
    })
    setSelectedDeposits([])
  }

  const handleViewProof = () => {
    setIsImageModalOpen(true)
  }

  const handleUpdateBalance = (user: string) => {
    setSelectedUser(user)
    setIsBalanceModalOpen(true)
  }

  const handleBalanceUpdate = () => {
    toast({
      title: "Balance Updated",
      description: `${selectedUser}'s balance has been updated by $${balanceAmount}.`,
    })
    setIsBalanceModalOpen(false)
    setBalanceAmount("")
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
        <CardTitle>Deposit Approvals</CardTitle>
        <CardDescription>Review and approve pending deposit requests</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="select-all"
              checked={selectedDeposits.length === deposits.length && deposits.length > 0}
              onCheckedChange={handleSelectAll}
            />
            <Label htmlFor="select-all">Select All</Label>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRejectSelected}
              disabled={selectedDeposits.length === 0}
              className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
            >
              <XCircle className="mr-2 h-4 w-4" />
              Reject Selected
            </Button>
            <Button
              size="sm"
              onClick={handleApproveSelected}
              disabled={selectedDeposits.length === 0}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve Selected
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="w-[40px] px-4 py-3 text-left">
                    <span className="sr-only">Select</span>
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium">User</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Method</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Proof</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {deposits.map((deposit) => (
                  <tr key={deposit.id} className="border-t">
                    <td className="px-4 py-3">
                      <Checkbox
                        checked={selectedDeposits.includes(deposit.id)}
                        onCheckedChange={() => handleSelect(deposit.id)}
                      />
                    </td>
                    <td className="px-4 py-3 text-sm">{deposit.user}</td>
                    <td className="px-4 py-3 text-sm">${deposit.amount.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm">{deposit.method}</td>
                    <td className="px-4 py-3 text-sm">{formatDate(deposit.date)}</td>
                    <td className="px-4 py-3 text-sm">
                      <Button variant="ghost" size="sm" onClick={handleViewProof}>
                        <Eye className="h-4 w-4 mr-1" /> View
                      </Button>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleUpdateBalance(deposit.user)}>
                          Update Balance
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Payment Proof</DialogTitle>
              <DialogDescription>Screenshot uploaded by the user</DialogDescription>
            </DialogHeader>
            <div className="flex justify-center p-4">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Payment Proof"
                width={300}
                height={300}
                className="rounded-md"
              />
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isBalanceModalOpen} onOpenChange={setIsBalanceModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Update User Balance</DialogTitle>
              <DialogDescription>Add or remove funds from {selectedUser}'s account</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="balance-amount">Amount (USD)</Label>
                <Input
                  id="balance-amount"
                  type="number"
                  placeholder="10.00"
                  value={balanceAmount}
                  onChange={(e) => setBalanceAmount(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">Use positive values to add funds, negative to remove.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="balance-note">Note (Optional)</Label>
                <Input id="balance-note" placeholder="Reason for balance adjustment" />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleBalanceUpdate}>Update Balance</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
