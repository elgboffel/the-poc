import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  vite: {
    build: {
      minify: false,
    },
  },
  output: "server",
  adapter: cloudflare({
    platformProxy: {
      enabled: false,
    },
  }),
  integrations: [tailwind(), react()],
});
