import type React from "react"
import { AdminNav } from "@/components/admin/admin-nav"

interface AdminShellProps {
  children: React.ReactNode
}

export function AdminShell({ children }: AdminShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="ml-auto flex items-center space-x-4">
            <span className="font-medium">Admin</span>
          </div>
        </div>
      </div>
      <div className="grid flex-1 md:grid-cols-[220px_1fr]">
        <aside className="hidden border-r md:block">
          <AdminNav />
        </aside>
        <main className="flex flex-col gap-8 p-6">{children}</main>
      </div>
    </div>
  )
}
