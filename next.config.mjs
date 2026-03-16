/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['typeorm', 'better-sqlite3']
  },
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com']
  }
};

export default nextConfig;
