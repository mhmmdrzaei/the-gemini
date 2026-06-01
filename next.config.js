/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['sanity', '@sanity/ui', '@sanity/icons', 'styled-components'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

module.exports = nextConfig
