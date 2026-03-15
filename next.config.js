/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'inbar.sk',
        pathname: '/app/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig;
