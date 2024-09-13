// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
  htmlWhitespaceSensitivity: 'strict',
  tabWidth: 2,
  trailingComma: 'all',
  singleQuote: true,
  semi: false,
  plugins: [
    'prettier-plugin-astro',
    'prettier-plugin-organize-attributes',
    'prettier-plugin-tailwindcss',
  ],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}
