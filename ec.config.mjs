import { defineEcConfig } from 'astro-expressive-code'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'

export default defineEcConfig({
  themes: ['solarized-light', 'vitesse-dark'],
  defaultProps: {
    showLineNumbers: false,
  },
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
})
