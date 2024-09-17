import { getCollection } from 'astro:content'
import { slugify, isProduction } from './utils'

const PROD = isProduction(import.meta.env)

export async function getPosts(options) {
  options = {
    ...{
      chronSort: true,
      tags: null,
      category: null,
    },
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

export async function getTags() {
  const posts = await getPosts({ chronSort: false })
  const tagMap = new Map()
  posts.forEach((post) => {
    const tags = post.data.tags
    tags &&
      tags.forEach((tag) => {
        if (tagMap.has(slugify(tag))) {
          tagMap.set(slugify(tag), [tag, tagMap.get(slugify(tag))[1] + 1])
        } else {
          tagMap.set(slugify(tag), [tag, 1])
        }
      })
  })
  return Array.from(tagMap)
    .map(([slug, [tag, count]]) => [slug, tag, count])
    .sort((a, b) => {
      // Sort by count (descending) first, then alphabetically
      if (b[2] !== a[2]) {
        return b[2] - a[2]
      }
      return a[1].localeCompare(b[1])
    })
}

export async function getCategories() {
  const posts = await getPosts()
  const categoryMap = new Map()
  posts.forEach((post) => {
    const category = post.data.category || 'uncategorized'
    if (categoryMap.has(slugify(category))) {
      categoryMap.set(slugify(category), [
        category,
        categoryMap.get(slugify(category))[1] + 1,
      ])
    } else {
      categoryMap.set(slugify(category), [category, 1])
    }
  })
  return Array.from(categoryMap)
    .map(([slug, [category, count]]) => [slug, category, count])
    .sort((a, b) => {
      // Sort by count (descending) first, then alphabetically
      if (b[2] !== a[2]) {
        return b[2] - a[2]
      }
      return a[1].localeCompare(b[1])
    })
}

export async function getProjects(options) {
  options = {
    ...{
      chronSort: true,
    },
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
