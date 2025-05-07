import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DepositForm } from "@/components/deposit/deposit-form"
import { TransactionHistory } from "@/components/deposit/transaction-history"

export const metadata: Metadata = {
  title: "Deposit | SocialBoost",
  description: "Add funds to your SocialBoost account",
}

export default function DepositPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Deposit Funds" text="Add funds to your account to place orders" />
      <div className="grid gap-8">
        <DepositForm />
        <TransactionHistory />
      </div>
    </DashboardShell>
  )
}
