// noinspection JSLastCommaInObjectLiteral
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: true,
  experimental: {
    appDir: true,
    allowMiddlewareResponseBody: true,
  },
};

module.exports = nextConfig;
