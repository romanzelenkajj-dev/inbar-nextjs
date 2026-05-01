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
      // legacy: old CMS images at /app/uploads/ — keep until cutover stable
      {
        protocol: 'https',
        hostname: 'cms.inbar.sk',
        pathname: '/app/uploads/**',
      },
      // post-cutover: new CMS images at /wp-content/uploads/
      {
        protocol: 'https',
        hostname: 'cms.inbar.sk',
        pathname: '/wp-content/uploads/**',
      },
      // testing phase: staging hostname (will be removed after cutover)
      {
        protocol: 'https',
        hostname: 'cms-new.inbar.sk',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig;
