import { getCollection } from 'astro:content'
import { slugify, isProduction } from './utils'
import type { CollectionEntry } from 'astro:content'

const PROD: string = isProduction(import.meta.env)

interface PostOptions {
  chronSort?: boolean
  tags?: string[] | null
  category?: string | null
}

export async function getPosts(
  options?: PostOptions,
): Promise<CollectionEntry<'blog'>[]> {
  options = {
    chronSort: true,
    tags: null,
    category: null,
    ...options,
  }
  let posts = await getCollection('blog', ({ data }) => {
    let includePost = PROD ? data.draft !== true : true
    if (options.tags && includePost) {
      includePost = options.tags.some(
        (tag) => data.tags && data.tags.includes(tag),
      )
    }
    if (options.category && includePost) {
      includePost = data.category === options.category
    }
    return includePost
  })
  if (options.chronSort)
    posts.sort(
      (a, b) => b.data.published_on.valueOf() - a.data.published_on.valueOf(),
    )
  return posts
}

interface TagInfo {
  slug: string
  label: string
  postCount: number
}

export async function getTags(): Promise<TagInfo[]> {
  const posts = await getPosts({ chronSort: false })
  const tagMap = new Map<string, { label: string; postCount: number }>()
  posts.forEach((post) => {
    const tags = post.data.tags
    tags &&
      tags.forEach((tag) => {
        const slugTag = slugify(tag)
        if (tagMap.has(slugTag)) {
          const tagInfo = tagMap.get(slugTag)!
          tagMap.set(slugTag, { ...tagInfo, postCount: tagInfo.postCount + 1 })
        } else {
          tagMap.set(slugTag, { label: tag, postCount: 1 })
        }
      })
  })
  return Array.from(tagMap)
    .map(([slug, { label, postCount }]) => ({ slug, label, postCount }))
    .sort((a, b) => {
      // Sort by count (descending) first, then alphabetically
      if (b.postCount !== a.postCount) {
        return b.postCount - a.postCount
      }
      return a.label.localeCompare(b.label)
    })
}

interface CategoryInfo {
  slug: string
  label: string
  postCount: number
}

export async function getCategories(): Promise<CategoryInfo[]> {
  const posts = await getPosts()
  const categoryMap = new Map<string, { label: string; postCount: number }>()
  posts.forEach((post) => {
    const category = post.data.category || 'uncategorized'
    const slugCategory = slugify(category)
    if (categoryMap.has(slugCategory)) {
      const categoryInfo = categoryMap.get(slugCategory)!
      categoryMap.set(slugCategory, {
        ...categoryInfo,
        postCount: categoryInfo.postCount + 1,
      })
    } else {
      categoryMap.set(slugCategory, { label: category, postCount: 1 })
    }
  })
  return Array.from(categoryMap)
    .map(([slug, { label, postCount }]) => ({ slug, label, postCount }))
    .sort((a, b) => {
      // Sort by count (descending) first, then alphabetically
      if (b.postCount !== a.postCount) {
        return b.postCount - a.postCount
      }
      return a.label.localeCompare(b.label)
    })
}

export async function getProjects(options?: {
  chronSort?: boolean
}): Promise<CollectionEntry<'projects'>[]> {
  options = {
    chronSort: true,
    ...options,
  }
  let projects = await getCollection('projects', ({ data }) =>
    PROD ? data.draft !== true : true,
  )
  if (options.chronSort)
    projects.sort(
      (a, b) => b.data.started_on.valueOf() - a.data.started_on.valueOf(),
    )
  return projects
}
