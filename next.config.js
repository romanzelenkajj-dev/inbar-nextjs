/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/mediakit',
        destination: '/mediakit.html',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.inbar.sk',
        pathname: '/app/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig;
