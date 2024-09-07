import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  markdown: {
    remarkPlugins: [
      /* Make/install read time plugin */
    ],
  },
  redirects: {
    '/blog': '/blog/1',
    '/blog/categories/[category]': '/blog/categories/[category]/1',
    '/blog/tags/[tag]': '/blog/tags/[tag]/1',
  },
})
