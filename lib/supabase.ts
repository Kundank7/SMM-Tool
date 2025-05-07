import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// Create a single supabase client for the entire server-side application
export const createServerSupabaseClient = () => {
  return createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: {
      persistSession: false,
    },
  })
}

// Create a singleton client for the browser to avoid multiple instances
let clientSingleton: ReturnType<typeof createBrowserSupabaseClient> | null = null

export const createBrowserSupabaseClient = () => {
  return createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: {
      persistSession: true,
      storageKey: "socialboost-auth",
    },
  })
}

export const getBrowserSupabaseClient = () => {
  if (!clientSingleton) {
    clientSingleton = createBrowserSupabaseClient()
  }
  return clientSingleton
}
