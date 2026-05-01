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
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.inbar.sk',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig;
