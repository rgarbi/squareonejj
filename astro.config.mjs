// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://squareonejj.com',

  // Clean URLs with no trailing slash (/schedule, /pricing). Keeps the URLs Google
  // already indexed from the Gymdesk site. `file` format emits schedule.html,
  // which public/.htaccess serves at /schedule on Hostinger.
  trailingSlash: 'never',
  build: { format: 'file' },

  // Astro 7 defaults to 'jsx', which drops whitespace between inline elements.
  compressHTML: true,

  integrations: [
    sitemap({
      filter: (page) => !/\/(thank-you|404)$/.test(page),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Barlow Condensed',
      cssVariable: '--font-barlow-condensed',
      weights: [600, 700, 800],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['Arial Narrow', 'sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Archivo',
      cssVariable: '--font-archivo',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],
});
