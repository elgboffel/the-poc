// Here we use the @cloudflare/next-on-pages next-dev module to allow us to use bindings during local development
// (when running the application with `next dev`), for more information see:
// https://github.com/cloudflare/next-on-pages/blob/5712c57ea7/internal-packages/next-dev/README.md
if (process.env.NODE_ENV === "development") {
  const { setupDevPlatform } = require("@cloudflare/next-on-pages/next-dev");
  setupDevPlatform();
}

/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  images: {
    remotePatterns: [],
  },
  // output: "standalone",
  // reactStrictMode: false,
  transpilePackages: ["@project/ui", "@project/common"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  headers: async () => {
    return [
      {
        source: "/swr",
        headers: [
          {
            key: "x-cache-custom",
            value: "cache 10",
          },
        ],
      },
    ];
  },
};
