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

export const projectSchema = z.object({
  name: z.string(),
  description: z.string(),
  homepage: z.string().url(),
  repository: z.optional(z.string().url()),
  status: z.enum(['active', 'on-hold', 'complete', 'archived']),
  draft: z.optional(z.boolean()),
  license: z.optional(z.enum(['MIT', 'Apache-2.0', 'GPL-3.0'])),
  started_on: z.date(),
  finished_on: z.optional(z.date()),
  associated_tags: z.optional(z.array(z.string())),
  contributors: z.optional(
    z.array(
      z.object({
        name: z.string(),
        profile_url: z.optional(z.string().url()),
        email: z.optional(z.string().email()),
      }),
    ),
  ),
})

export type ProjectSchema = z.infer<typeof projectSchema>

const projectCollection = defineCollection({
  type: 'content',
  schema: projectSchema,
})

export const collections = {
  blog: blogCollection,
  projects: projectCollection,
}
