export type Taxonomy = {
    name: string;
    feed: boolean;
}

export type NavigationItem = {
    name: string;
    url: string;
}

export type SocialLink = {
    // me?: string;
    text: string;
    icon: string;
    href: string;
    platform: string;
}

export type SiteInfo = {
    name: string;
    title: string;
    description: string;
    author: string;
    taxonomies: Taxonomy[];
    navigation: NavigationItem[];
    socials: SocialLink[];
}


const siteInfo: SiteInfo = {
    name: "veryth.ink",
    title: "hello, world.",
    description: "home to my thoughts",
    author: "Chris Renfrow",
    taxonomies: [
        {
            name: "categories",
            feed: true
        },
        {
            name: "tags",
            feed: true
        }
    ],
    navigation: [
        {
            name: "/now",
            url: "/now"
        },
        // {
        //     name: "/projects",
        //     url: "/projects"
        // },
        {
            name: "/blog",
            url: "/blog"
        },
        // {
        //     name: "/categories",
        //     url: "/categories"
        // },
        // {
        //     name: "/tags",
        //     url: "/tags"
        // }
    ],
    socials: [
        {
            platform: "mastodon",
            text: "Follow me on Mastodon",
            // me: "https://recurse.social/crenfrow",
            href: "https://recurse.social/crenfrow",
            icon: "mastodon"
        },
        {
            platform: "github",
            text: "See what I'm building on GitHub",
            // me: "https://github.com/ChrisRenfrow",
            href: "https://github.com/ChrisRenfrow",
            icon: "github"
        },
        {
            platform: "gitlab",
            text: "I'm also on Gitlab",
            // me: "https://gitlab.com/crenfrow",
            href: "https://gitlab.com/crenfrow",
            icon: "gitlab"
        }
    ]
}

export default siteInfo;
