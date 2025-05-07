import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { ENV, ERROR_CODES } from "@/lib/env-config"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  try {
    // Explicitly use our ENV configuration with fallbacks
    const supabaseUrl = ENV.SUPABASE_URL
    const supabaseKey = ENV.SUPABASE_ANON_KEY

    // Log Supabase configuration in development
    if (ENV.NODE_ENV !== "production") {
      console.log("Middleware using Supabase URL:", supabaseUrl)
    }

    // Create Supabase client with explicit credentials
    const supabase = createMiddlewareClient({
      req,
      res,
      options: {
        supabaseUrl,
        supabaseKey,
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true,
        },
      },
    })

    // Refresh session if expired - required for Server Components
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    if (sessionError) {
      console.error(`AUTH_ERROR (${ERROR_CODES.SESSION_REFRESH_FAILURE}): Session refresh failed`, sessionError)
      // Continue execution instead of redirecting to avoid breaking the app
    }

    // Protected routes
    const protectedPaths = ["/dashboard", "/deposit"]
    const adminPaths = ["/admin"]

    // Check if the request is for a protected route
    const isProtectedPath = protectedPaths.some(
      (path) => req.nextUrl.pathname === path || req.nextUrl.pathname.startsWith(`${path}/`),
    )

    const isAdminPath = adminPaths.some(
      (path) => req.nextUrl.pathname === path || req.nextUrl.pathname.startsWith(`${path}/`),
    )

    // If it's a protected route and the user is not authenticated, redirect to the login page
    if (isProtectedPath && !session) {
      const redirectUrl = new URL("/login", req.url)
      redirectUrl.searchParams.set("redirect", req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // If it's an admin route, check if the user has admin role
    if (isAdminPath && session) {
      try {
        // Fetch the user's profile to check their role
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single()

        if (profileError) {
          console.error(`AUTH_ERROR (${ERROR_CODES.ADMIN_ROLE_CHECK_FAILURE}): Admin role check failed`, profileError)
          return NextResponse.redirect(new URL("/dashboard", req.url))
        }

        if (!profile || profile.role !== "admin") {
          // Redirect non-admin users to the dashboard
          return NextResponse.redirect(new URL("/dashboard", req.url))
        }
      } catch (roleCheckError) {
        console.error(
          `AUTH_ERROR (${ERROR_CODES.ADMIN_ROLE_CHECK_FAILURE}): Admin role check exception`,
          roleCheckError,
        )
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }
    }

    // If the user is authenticated and trying to access login/register pages, redirect to dashboard
    if (session && (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register")) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    return res
  } catch (error) {
    console.error(`MIDDLEWARE_ERROR (${ERROR_CODES.MIDDLEWARE_EXECUTION_FAILURE}): Middleware execution failed`, error)

    // In case of critical error, redirect to error page with code
    if (error instanceof Error && error.message.includes("supabaseUrl is required")) {
      return NextResponse.redirect(new URL(`/error?code=${ERROR_CODES.MISSING_SUPABASE_URL}`, req.url))
    }

    // For other errors, continue to avoid breaking the app completely
    return res
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|_vercel|error).*)"],
}
