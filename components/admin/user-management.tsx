"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Search, Download, UserCog, Ban } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState("")
  const [balanceAmount, setBalanceAmount] = useState("")
  const { toast } = useToast()

  const users = [
    {
      id: "USR-1234",
      username: "john_doe",
      email: "john@example.com",
      balance: 25.0,
      status: "active",
      joinDate: "2023-01-15",
    },
    {
      id: "USR-1235",
      username: "jane_smith",
      email: "jane@example.com",
      balance: 50.0,
      status: "active",
      joinDate: "2023-02-20",
    },
    {
      id: "USR-1236",
      username: "mike_johnson",
      email: "mike@example.com",
      balance: 0.0,
      status: "suspended",
      joinDate: "2023-03-10",
    },
    {
      id: "USR-1237",
      username: "sarah_williams",
      email: "sarah@example.com",
      balance: 75.0,
      status: "active",
      joinDate: "2023-04-05",
    },
  ]

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleManageUser = (username: string) => {
    setSelectedUser(username)
    setIsUserModalOpen(true)
  }

  const handleUpdateUser = () => {
    toast({
      title: "User Updated",
      description: `${selectedUser}'s account has been updated.`,
    })
    setIsUserModalOpen(false)
    setBalanceAmount("")
  }

  const handleExportUsers = () => {
    toast({
      title: "Export Started",
      description: "Users data is being exported to CSV.",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950/50 dark:text-green-400 dark:border-green-900"
          >
            Active
          </Badge>
        )
      case "suspended":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-400 dark:border-red-900"
          >
            Suspended
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
        <CardTitle>User Management</CardTitle>
        <CardDescription>Manage user accounts and balances</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users by name, email or ID..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={handleExportUsers}>
            <Download className="mr-2 h-4 w-4" />
            Export to CSV
          </Button>
        </div>

        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium">User ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Username</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Balance</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Join Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-t">
                    <td className="px-4 py-3 text-sm">{user.id}</td>
                    <td className="px-4 py-3 text-sm">{user.username}</td>
                    <td className="px-4 py-3 text-sm">{user.email}</td>
                    <td className="px-4 py-3 text-sm">${user.balance.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm">{getStatusBadge(user.status)}</td>
                    <td className="px-4 py-3 text-sm">{formatDate(user.joinDate)}</td>
                    <td className="px-4 py-3 text-sm">
                      <Button variant="ghost" size="sm" onClick={() => handleManageUser(user.username)}>
                        <UserCog className="h-4 w-4 mr-1" /> Manage
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Dialog open={isUserModalOpen} onOpenChange={setIsUserModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Manage User: {selectedUser}</DialogTitle>
              <DialogDescription>Update user account settings and balance</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="adjust-balance">Adjust Balance (USD)</Label>
                <Input
                  id="adjust-balance"
                  type="number"
                  placeholder="10.00"
                  value={balanceAmount}
                  onChange={(e) => setBalanceAmount(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">Use positive values to add funds, negative to remove.</p>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  className="flex-1 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                >
                  <Ban className="mr-2 h-4 w-4" />
                  Suspend User
                </Button>
                <Button variant="outline" className="flex-1">
                  Reset Password
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleUpdateUser}>Update User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
