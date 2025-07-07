/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // ✅ Add this line here

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
