import rss from '@astrojs/rss'

import { getPosts, getTags } from '~/helpers/queries'
import siteInfo from '~/data/site-info'

const { author, name } = siteInfo

export async function getStaticPaths() {
  const tags = await getTags()
  return tags.map(({ slug }) => ({
    params: { tag: slug },
  }))
}

export async function GET(context) {
  const posts = await getPosts({ tags: [context.params.tag] })
  return rss({
    title: `${name} - ${context.params.tag}`,
    description: `All blog posts tagged with "${context.params.tag}"`,
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
