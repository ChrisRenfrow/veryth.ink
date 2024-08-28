import { getCollection } from 'astro:content';

// Content queries for re-use

export async function getAllPosts(options = {
  chronSort: true,
  includeDrafts: false,
}) {
  let posts = await getCollection('blog');
  posts = (!options.includeDrafts) ? posts.filter((post) => !post.data.draft) : posts;
  if (options.chronSort) posts.sort((a, b) => b.data.published_on.valueOf() - a.data.published_on.valueOf());
  return posts;
}
