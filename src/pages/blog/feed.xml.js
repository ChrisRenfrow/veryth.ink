import rss from '@astrojs/rss'

import { getPosts } from '~/helpers/queries'
import siteInfo from '~/data/site-info'

const { author, name, description } = siteInfo

export async function GET(context) {
  const posts = await getPosts()
  console.log(posts)
  return rss({
    title: `${name}`,
    description,
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
