import type React from "react"
interface AdminHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
}

export function AdminHeader({ heading, text, children }: AdminHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2 mb-6">
      <div className="grid gap-1">
        <h1 className="text-2xl font-bold tracking-wide">{heading}</h1>
        {text && <p className="text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  )
}
