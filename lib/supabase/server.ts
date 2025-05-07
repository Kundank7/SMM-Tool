import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import type { Database } from "@/types/supabase"
import { ENV, ERROR_CODES } from "@/lib/env-config"

// Create a Supabase client for server components
export const createServerSupabaseClient = () => {
  try {
    return createServerComponentClient<Database>({
      cookies,
      options: {
        supabaseUrl: ENV.SUPABASE_URL,
        supabaseKey: ENV.SUPABASE_ANON_KEY,
      },
    })
  } catch (error) {
    console.error(`AUTH_ERROR (${ERROR_CODES.AUTH_INIT_FAILURE}): Server Supabase client init failed`, error)
    throw error
  }
}

// Create a Supabase client with service role for admin operations
export const createServiceRoleClient = () => {
  try {
    return createClient<Database>(
      ENV.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY || "MISSING_SERVICE_ROLE_KEY",
      {
        auth: {
          persistSession: false,
        },
      },
    )
  } catch (error) {
    console.error(`AUTH_ERROR (${ERROR_CODES.AUTH_INIT_FAILURE}): Service role client init failed`, error)
    throw error
  }
}
