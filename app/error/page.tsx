"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import { ERROR_CODES } from "@/lib/env-config"

// Map error codes to user-friendly messages
const ERROR_MESSAGES: Record<number, { title: string; description: string }> = {
  [ERROR_CODES.MISSING_SUPABASE_URL]: {
    title: "Configuration Error",
    description: "The Supabase URL is missing. Please check your environment configuration.",
  },
  [ERROR_CODES.MISSING_SUPABASE_KEY]: {
    title: "Configuration Error",
    description: "The Supabase API key is missing. Please check your environment configuration.",
  },
  [ERROR_CODES.AUTH_INIT_FAILURE]: {
    title: "Authentication Error",
    description: "Failed to initialize authentication. Please try again later.",
  },
  [ERROR_CODES.SESSION_REFRESH_FAILURE]: {
    title: "Session Error",
    description: "Failed to refresh your session. Please try logging in again.",
  },
}

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const [errorCode, setErrorCode] = useState<number | null>(null)

  useEffect(() => {
    const code = searchParams.get("code")
    if (code) {
      setErrorCode(Number.parseInt(code, 10))
    }
  }, [searchParams])

  const errorInfo = errorCode
    ? ERROR_MESSAGES[errorCode]
    : {
        title: "Unknown Error",
        description: "An unknown error occurred. Please try again later.",
      }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <CardTitle>{errorInfo.title}</CardTitle>
          </div>
          <CardDescription>{errorInfo.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-500 dark:bg-red-950/50 dark:text-red-400">
            {errorCode && <div>Error Code: {errorCode}</div>}
            <div className="mt-2 text-xs">If this error persists, please contact support with this error code.</div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => (window.location.href = "/")}>
            Go Home
          </Button>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
