import rss from '@astrojs/rss'

import { getPosts, getCategories } from '~/helpers/queries'
import siteInfo from '~/data/site-info'

const { name, author } = siteInfo

export async function getStaticPaths() {
  const categories = await getCategories()
  return categories.map(({ slug }) => ({
    params: { category: slug },
  }))
}

export async function GET(context) {
  const posts = await getPosts({ category: context.params.category })
  return rss({
    title: `${name} - ${context.params.category}`,
    description: `All blog posts in the category "${context.params.category}"`,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.published_on,
      description: post.data.description,
      link: `/blog/${post.slug}`,
      author,
    })),
  })
}
