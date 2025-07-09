/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🔥 Enables static export (creates the `out/` folder on build)
  output: 'export',

  // ✅ Allows build to ignore ESLint errors
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Allows build to ignore TypeScript errors
  typescript: {
    ignoreBuildErrors: true,
  },

  // ✅ Required for static export if using <Image> from 'next/image'
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
