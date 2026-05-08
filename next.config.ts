import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'platform-lookaside.fbsbx.com', // For some Spotify profile pics
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Suppress the build warning about <img> tags since we use them for dynamic profile pics in some components
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
