import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import expressiveCode from 'astro-expressive-code'
import mdx from '@astrojs/mdx'

import pageInsight from 'astro-page-insight'
import { isProduction } from './src/helpers/utils'

// https://astro.build/config
export default defineConfig({
  site: isProduction(import.meta.env)
    ? 'https://veryth.ink'
    : 'http://localhost',
  integrations: [tailwind(), expressiveCode(), pageInsight(), mdx()],
  markdown: {
    remarkPlugins: [
      /* Make/install read time plugin */
    ],
  },
  redirects: {
    // Redirect the root path for anything paginated to the first page for each
    // '/blog': '/blog/1',
    // '/projects': '/projects/1',
    // '/blog/categories/[category]': '/blog/categories/[category]/1',
    // '/blog/tags/[tag]': '/blog/tags/[tag]/1',
    // Make old links compatible with new layout
    // '/categories/[category]': '/blog/categories/[category]',
    // '/tags/[tag]': '/blog/tags/[tag]',
  },
})
