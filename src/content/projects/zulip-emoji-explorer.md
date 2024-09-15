---
name: 'Zulip Emoji Explorer'
description: "An Astro web-app to view custom emoji uploaded by the RC community to RC's Zulip"
homepage: 'https://zulip-emoji.vercel.app'
repository: 'https://github.com/chrisrenfrow/zulip-emoji-feed'
started_on: 2024-09-30
status: 'active'
associated_tags: ['zulip-emoji']
---

This web-app allows any member of the RC community to view the custom emoji uploaded to RC's Zulip organized by recency in a very casually browseable way. The emoji are safe-guarded behind authentication using RC's OAuth so as to not leak any more information than needed to the public internet.

I ended up learning a lot more than I bargained for with this project! Initially I got this idea and set out to build it as statically as possible to take advantage of Astro's strong SSG capabilities, but with safety and privacy concerns brought to my attention I eventually realized serving static pages to authenticated users was a very tricky task - trickier than say, just building a simple SSR (server-side rendered) app.

At the time of writing, this project is in what I'd call an alpha state. It technically works, though there are plenty of improvements I'd like to make before calling it "done."

If you're a Recurser, I'd be very grateful for any feedback you might have for me. See any accessibility issues? Glaring security flaws? Let me know directly, open up an issue, or ask to pair on it!
