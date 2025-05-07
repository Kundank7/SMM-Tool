import type { Metadata } from "next"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminShell } from "@/components/admin/admin-shell"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { DepositApprovals } from "@/components/admin/deposit-approvals"
import { UserManagement } from "@/components/admin/user-management"

export const metadata: Metadata = {
  title: "Admin Dashboard | SocialBoost",
  description: "Manage your SocialBoost platform",
}

export default function AdminPage() {
  return (
    <AdminShell>
      <AdminHeader heading="Admin Dashboard" text="Manage your SocialBoost platform" />
      <div className="space-y-8">
        <AdminDashboard />
        <DepositApprovals />
        <UserManagement />
      </div>
    </AdminShell>
  )
}
