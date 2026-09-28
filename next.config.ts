import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/skyjet-charter',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
