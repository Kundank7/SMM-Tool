// Environment configuration with fallbacks for critical values
export const ENV = {
  // Supabase credentials with fallbacks to prevent undefined errors
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "https://felixxjzwbvtmenmzkek.supabase.co",
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",

  // Other environment variables
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  NODE_ENV: process.env.NODE_ENV || "development",

  // Validation helper
  isValid() {
    const requiredVars = ["SUPABASE_URL", "SUPABASE_ANON_KEY"]
    const missing = requiredVars.filter((key) => !this[key as keyof typeof this])

    return {
      valid: missing.length === 0,
      missing,
    }
  },

  // Logging helper that doesn't expose sensitive values in production
  logSafe() {
    if (this.NODE_ENV === "production") {
      return {
        SUPABASE_URL: this.SUPABASE_URL ? "[SET]" : "[MISSING]",
        SUPABASE_ANON_KEY: this.SUPABASE_ANON_KEY ? "[SET]" : "[MISSING]",
        APP_URL: this.APP_URL,
        NODE_ENV: this.NODE_ENV,
      }
    }

    return {
      SUPABASE_URL: this.SUPABASE_URL,
      SUPABASE_ANON_KEY: this.SUPABASE_ANON_KEY ? "[HIDDEN]" : "[MISSING]",
      APP_URL: this.APP_URL,
      NODE_ENV: this.NODE_ENV,
    }
  },
}

// Error codes for better error tracking
export const ERROR_CODES = {
  MISSING_SUPABASE_URL: 1001,
  MISSING_SUPABASE_KEY: 1002,
  AUTH_INIT_FAILURE: 2001,
  SESSION_REFRESH_FAILURE: 2002,
  MIDDLEWARE_EXECUTION_FAILURE: 3001,
  ADMIN_ROLE_CHECK_FAILURE: 4001,
}

// Validate environment at import time
const validation = ENV.isValid()
if (!validation.valid) {
  console.error(`CRITICAL: Missing environment variables: ${validation.missing.join(", ")}`)
  // Still continue execution since we have fallbacks
}

// Log environment configuration in development
if (ENV.NODE_ENV !== "production") {
  console.log("Environment configuration:", ENV.logSafe())
}
