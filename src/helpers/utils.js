export function slugify(str) {
  return str.replace(/[^A-Za-z0-9\s]+/, '-')
}

// Very basic pluralization.
export const pluralize = (str, n) => (n > 1 ? str + 's' : str)

export const isProduction = (env) =>
  (env.NETLIFY && env.CONTEXT === 'production') ||
  (env.VERCEL && env.PUBLIC_VERCEL_ENV === 'production') ||
  env.PROD
