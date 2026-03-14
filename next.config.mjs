/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'inbar.sk',
      },
      {
        protocol: 'https',
        hostname: '**.inbar.sk',
      },
    ],
  },
};

export default nextConfig;
