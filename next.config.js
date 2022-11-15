/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: true,
  experimental: {
    appDir: true,
    runtime: 'node.js',
  },
};

module.exports = nextConfig;
