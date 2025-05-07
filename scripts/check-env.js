// Pre-start script to verify environment variables
const fs = require("fs")
const path = require("path")

// Required environment variables
const REQUIRED_VARS = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"]

// Check for .env file
const envPath = path.resolve(process.cwd(), ".env")
const envExists = fs.existsSync(envPath)

if (!envExists) {
  console.warn("⚠️ No .env file found. Using environment variables from system.")
}

// Check each required variable
const missing = REQUIRED_VARS.filter((varName) => !process.env[varName])

if (missing.length > 0) {
  console.error("❌ Missing required environment variables:")
  missing.forEach((varName) => {
    console.error(`   - ${varName}`)
  })

  // Create a fallback .env file with placeholders in development
  if (process.env.NODE_ENV !== "production" && !envExists) {
    const fallbackContent = REQUIRED_VARS.map(
      (varName) =>
        `${varName}=${
          varName === "NEXT_PUBLIC_SUPABASE_URL"
            ? "https://felixxjzwbvtmenmzkek.supabase.co"
            : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }`,
    ).join("\n")

    fs.writeFileSync(envPath, fallbackContent)
    console.log("✅ Created fallback .env file with placeholder values for development.")
    console.log("⚠️ Replace these with your actual values before deploying.")

    // Exit with success in development to allow development to continue
    process.exit(0)
  }

  // Exit with error in production
  process.exit(1)
}

console.log("✅ All required environment variables are set.")
