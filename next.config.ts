import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: { remotePatterns: [{ protocol: 'https', hostname: 'cdn.dummyjson.com' }] },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
