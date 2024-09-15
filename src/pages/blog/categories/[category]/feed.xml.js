import rss from '@astrojs/rss'
import { getPosts, getCategories } from '~/helpers/queries'

export async function GET(context) {
  const posts = await getPosts({ category: context.params.category })
  return rss({
    title: `category: ${context.params.category}`,
    description: `All posts on veryth.ink in the category "${context.params.category}"`,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.published_on,
      description: post.data.description,
      link: `/blog/${post.slug}`,
    })),
  })
}

export async function getStaticPaths() {
  const categories = await getCategories()
  return categories.map(([slug, category]) => ({
    params: { category: slug },
  }))
}
