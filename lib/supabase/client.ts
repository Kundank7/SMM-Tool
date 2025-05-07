import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/types/supabase"
import { ENV, ERROR_CODES } from "@/lib/env-config"

// Create a singleton client for the browser to avoid multiple instances
let clientSingleton: ReturnType<typeof createBrowserSupabaseClient> | null = null

export const createBrowserSupabaseClient = () => {
  try {
    // Use ENV with fallbacks to ensure we always have values
    return createClientComponentClient<Database>({
      supabaseUrl: ENV.SUPABASE_URL,
      supabaseKey: ENV.SUPABASE_ANON_KEY,
      options: {
        auth: {
          persistSession: true,
          storageKey: "socialboost-auth",
          autoRefreshToken: true,
        },
      },
    })
  } catch (error) {
    console.error(`AUTH_ERROR (${ERROR_CODES.AUTH_INIT_FAILURE}): Supabase client init failed`, error)
    throw error
  }
}

export const getBrowserSupabaseClient = () => {
  if (!clientSingleton) {
    clientSingleton = createBrowserSupabaseClient()
  }
  return clientSingleton
}
