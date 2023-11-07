/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Accepts external images from these domains
    remotePatterns: [
      { hostname: 'fantasy.premierleague.com' },
      { hostname: 'resources.premierleague.com' },
    ],
  },
};

module.exports = nextConfig;
