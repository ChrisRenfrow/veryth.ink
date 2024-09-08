import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import expressiveCode from 'astro-expressive-code'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    expressiveCode({
      themes: ['solarized-light', 'vitesse-dark'],
      styleOverrides: { uiFontFamily: 'inherit' },
      plugins: [pluginLineNumbers()],
    }),
  ],
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
