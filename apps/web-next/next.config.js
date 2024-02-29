/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  images: {
    remotePatterns: [],
  },
  output: "standalone",
  reactStrictMode: false,
  transpilePackages: ["@project/ui", "@project/common"],
  eslint: {
    ignoreDuringBuilds: true,
  },
};
