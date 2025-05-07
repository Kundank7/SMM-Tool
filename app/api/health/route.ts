import { NextResponse } from "next/server"
import { ENV } from "@/lib/env-config"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export async function GET() {
  const startTime = Date.now()
  const envValidation = ENV.isValid()

  try {
    // Test Supabase connection if credentials are available
    let supabaseStatus = "not_tested"
    let responseTime = 0

    if (envValidation.valid) {
      try {
        const supabase = createClientComponentClient({
          supabaseUrl: ENV.SUPABASE_URL,
          supabaseKey: ENV.SUPABASE_ANON_KEY,
        })

        const before = Date.now()
        const { data, error } = await supabase.from("profiles").select("count").limit(1)
        responseTime = Date.now() - before

        supabaseStatus = error ? "error" : "connected"
      } catch (e) {
        supabaseStatus = "connection_failed"
      }
    }

    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      supabase: {
        url: ENV.SUPABASE_URL ? "configured" : "missing",
        key: ENV.SUPABASE_ANON_KEY ? "configured" : "missing",
        status: supabaseStatus,
        responseTime: `${responseTime}ms`,
      },
      config: {
        valid: envValidation.valid,
        missing: envValidation.missing,
      },
      uptime: process.uptime(),
      responseTime: `${Date.now() - startTime}ms`,
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
        supabase: {
          url: ENV.SUPABASE_URL ? "configured" : "missing",
          key: ENV.SUPABASE_ANON_KEY ? "configured" : "missing",
        },
        config: {
          valid: envValidation.valid,
          missing: envValidation.missing,
        },
      },
      { status: 500 },
    )
  }
}
