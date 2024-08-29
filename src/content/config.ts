import { z, defineCollection } from 'astro:content'

import siteInfo from '~/data/site-info.ts'

const { author } = siteInfo

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string().default(author),
    description: z.string(),
    published_on: z.date(),
    updated_on: z.optional(z.date()),
    draft: z.optional(z.boolean()),
    category: z.optional(z.string()),
    tags: z.optional(z.array(z.string())),
  }),
})

export const collections = {
  blog: blogCollection,
}
