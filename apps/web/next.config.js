/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/assets/event/*.jpg',
      },
    ],

    domains: ['s3-ap-southeast-1.amazonaws.com'],
  },
};

module.exports = nextConfig;
