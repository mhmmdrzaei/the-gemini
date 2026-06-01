const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root — a stray lockfile in the home dir otherwise
  // confuses Next's auto-detection.
  turbopack: {
    root: path.join(__dirname),
  },
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
