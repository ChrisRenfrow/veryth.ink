import rss from '@astrojs/rss'
import { getPosts, getTags } from '~/helpers/queries'

export async function GET(context) {
  const posts = await getPosts({ tags: [context.params.tag] })
  return rss({
    title: `tagged: ${context.params.tag}`,
    description: `All posts on veryth.ink tagged with "${context.params.tag}"`,
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
  const tags = await getTags()
  return tags.map(([slug, tag]) => ({
    params: { tag: slug },
  }))
}
