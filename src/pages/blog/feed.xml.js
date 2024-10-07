import rss from '@astrojs/rss'
import sanitizeHtml from 'sanitize-html'
import MarkdownIt from 'markdown-it'

import { getPosts } from '~/helpers/queries'
import siteInfo from '~/data/site-info'

const parser = new MarkdownIt()
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
      content: sanitizeHtml(parser.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags,
      }),
      link: `/blog/${post.slug}`,
      author,
    })),
  })
}
