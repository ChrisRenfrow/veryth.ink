export type NavigationItem = {
  name: string
  url: string
}

export type SocialLink = {
  // me?: string;
  text: string
  icon: string
  href: string
  platform: string
}

export type SiteInfo = {
  name: string
  title: string
  description: string
  author: string
  navigation: NavigationItem[]
  socials: SocialLink[]
}

const siteInfo: SiteInfo = {
  name: 'veryth.ink',
  title: 'hello, world <3',
  description: '$HOME to my thoughts',
  author: 'liv',
  navigation: [
    {
      name: '/now',
      url: '/now',
    },
    {
      name: '/projects',
      url: '/projects',
    },
    {
      name: '/blog',
      url: '/blog',
    },
  ],
  socials: [
    {
      platform: 'mastodon',
      text: "follow me on the fediverse",
      // me: "https://tech.lgbt/@livvie",
      href: 'https://tech.lgbt/@livvie',
      icon: 'mastodon',
    },
    {
      platform: 'github',
      text: "See what I'm building on GitHub",
      // me: "https://github.com/livviest",
      href: 'https://github.com/livviest',
      icon: 'github',
    },
  ],
}

export default siteInfo
