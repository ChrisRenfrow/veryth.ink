import { getCollection } from 'astro:content'

export async function getAllPosts(
  options = {
    chronSort: true,
    includeDrafts: false,
  },
) {
  let posts = await getCollection('blog')
  posts = !options.includeDrafts
    ? posts.filter((post) => !post.data.draft)
    : posts
  if (options.chronSort)
    posts.sort(
      (a, b) => b.data.published_on.valueOf() - a.data.published_on.valueOf(),
    )
  return posts
}

export async function getAllProjects(
  options = {
    chronSort: true,
  },
) {
  let projects = await getCollection('projects')
  if (options.chronSort)
    projects.sort(
      (a, b) => b.data.dateStarted.valueOf() - a.data.dateStarted.valueOf(),
    )
  return projects
}
