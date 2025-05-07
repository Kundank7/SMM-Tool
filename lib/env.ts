import { z } from "zod"

// Define schema for environment variables
const envSchema = z.object({
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),

  // App
  NEXT_PUBLIC_APP_URL: z.string().url().optional().default("v0-next-js-14-application-beta.vercel.app"),

  // Auth
  AUTH_REDIRECT_URL: z.string().url().optional(),

  // Rate limiting
  RATE_LIMIT_MAX: z.coerce.number().optional().default(100),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().optional().default(60000),
})

// Parse and validate environment variables
function getEnv() {
  // In server components, we can access process.env directly
  // In client components, we can only access NEXT_PUBLIC_ variables
  const parsedEnv = envSchema.safeParse(process.env)

  if (!parsedEnv.success) {
    console.error("❌ Invalid environment variables:", parsedEnv.error.flatten().fieldErrors)
    throw new Error("Invalid environment variables")
  }

  return parsedEnv.data
}

export const env = getEnv()
