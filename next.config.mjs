/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { dev, isServer }) => {
    // Validate environment variables at build time
    const requiredVars = ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY'];
    const missing = requiredVars.filter(varName => !process.env[varName]);
    
    if (missing.length > 0 && !dev) {
      console.error('\n❌ Missing required environment variables for production build:');
      missing.forEach(varName => {
        console.error(`   - ${varName}`);
      });
      
      // In production, fail the build
      if (process.env.NODE_ENV === 'production') {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
      }
    }
    
    return config;
  },
  // Add other Next.js config options here
};

export default nextConfig;
