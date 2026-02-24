import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/static';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://blog.revyl.com',
  output: 'static',
  adapter: vercel(),
  integrations: [
    react(),
    mdx(),
    sitemap(),
    tailwind(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
