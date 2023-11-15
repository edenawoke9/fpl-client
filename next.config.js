/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'fantasy.premierleague.com' },
      { hostname: 'resources.premierleague.com' },
    ],
  },
};

module.exports = nextConfig;
