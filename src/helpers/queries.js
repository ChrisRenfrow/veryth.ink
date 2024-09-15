import { getCollection } from 'astro:content'
import { slugify } from './utils'

const PROD = import.meta.env.NETLIFY
  ? import.meta.env.CONTEXT == 'production'
  : import.meta.env.PROD

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
    post.data.tags?.forEach((tag) => {
      tagMap.set(slugify(tag), tag)
    })
  })
  return Array.from(tagMap).sort((a, b) => a[0].localeCompare(b[0]))
}

export async function getCategories() {
  const posts = await getPosts()
  const categoryMap = new Map()
  posts.forEach((post) => {
    const category = post.data.category || 'uncategorized'
    categoryMap.set(slugify(category), category)
  })
  return Array.from(categoryMap).sort((a, b) => a[0].localeCompare(b[0]))
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
