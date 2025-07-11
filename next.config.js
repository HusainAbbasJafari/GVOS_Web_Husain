const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/index.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators : false,
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'greenstoneintl.com',
        pathname: '/**',
      },
    ],
    domains: [
      '127.0.0.1',
      'localhost',
      'greenstoneintl.com',
    ],
  },
  experimental: {
    proxyTimeout: 30000
  }
};

module.exports = withNextIntl(nextConfig);