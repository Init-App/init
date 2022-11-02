/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: true,
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
