import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { env } from "@/lib/env"

interface RateLimitConfig {
  max: number
  windowMs: number
}

// In-memory store for rate limiting
// In production, you'd use Redis or another distributed store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export function rateLimit(
  request: NextRequest,
  config: RateLimitConfig = {
    max: env.RATE_LIMIT_MAX,
    windowMs: env.RATE_LIMIT_WINDOW_MS,
  },
) {
  // Get IP address from request
  const ip = request.ip || "anonymous"

  // Get current timestamp
  const now = Date.now()

  // Get or create rate limit data for this IP
  const rateLimitData = rateLimitStore.get(ip) || {
    count: 0,
    resetTime: now + config.windowMs,
  }

  // If the reset time has passed, reset the counter
  if (now > rateLimitData.resetTime) {
    rateLimitData.count = 0
    rateLimitData.resetTime = now + config.windowMs
  }

  // Increment the counter
  rateLimitData.count++

  // Update the store
  rateLimitStore.set(ip, rateLimitData)

  // Check if the rate limit has been exceeded
  const isRateLimited = rateLimitData.count > config.max

  // Calculate remaining requests and time until reset
  const remaining = Math.max(0, config.max - rateLimitData.count)
  const reset = Math.ceil((rateLimitData.resetTime - now) / 1000)

  return {
    isRateLimited,
    headers: {
      "X-RateLimit-Limit": config.max.toString(),
      "X-RateLimit-Remaining": remaining.toString(),
      "X-RateLimit-Reset": reset.toString(),
    },
  }
}

// Middleware function for rate limiting API routes
export function withRateLimit(handler: (req: NextRequest) => Promise<NextResponse> | NextResponse) {
  return async (req: NextRequest) => {
    const { isRateLimited, headers } = rateLimit(req)

    if (isRateLimited) {
      return NextResponse.json(
        { error: "Too many requests, please try again later" },
        {
          status: 429,
          headers: {
            ...headers,
            "Retry-After": headers["X-RateLimit-Reset"],
          },
        },
      )
    }

    const response = await handler(req)

    // Add rate limit headers to the response
    Object.entries(headers).forEach(([key, value]) => {
      response.headers.set(key, value)
    })

    return response
  }
}
