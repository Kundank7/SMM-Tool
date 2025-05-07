import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { BalanceOverview } from "@/components/dashboard/balance-overview"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { ActiveOrders } from "@/components/dashboard/active-orders"
import { ServiceCatalog } from "@/components/dashboard/service-catalog"

export const metadata: Metadata = {
  title: "Dashboard | SocialBoost",
  description: "Manage your social media boosting services",
}

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Manage your social media boosting services" />
      <div className="grid gap-6 md:grid-cols-2">
        <BalanceOverview />
        <QuickActions />
      </div>
      <div className="mt-6">
        <ActiveOrders />
      </div>
      <div className="mt-6">
        <ServiceCatalog />
      </div>
    </DashboardShell>
  )
}
