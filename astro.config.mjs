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
      defaultProps: { showLineNumbers: false },
      styleOverrides: {
        uiFontFamily: 'inherit',
        frames: {
          frameBoxShadowCssValue: 'none',
          editorTabBarBackground: ({ theme }) =>
            theme.colors['tab.activeBackground'],
          editorActiveTabIndicatorTopColor: 'transparent',
        },
        editorActiveTabBackground: 'transparent',
      },
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
