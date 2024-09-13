---
title: "Trying out Typst"
description: Sharing some of my thoughts on this new-school typsetting system as I begin to use it
published_on: 2024-07-02
category: impressions
tags: [ "typst", "typsetting", "blaggregate" ]
---

I think it makes sense to first disclose my limited experience and relationship with typesetting for context. However, if you just want a simple summary, see the following TLDR.

**TLDR;** As someone who valued LaTeX in theory but found it hard to learn and use in practice, I really enjoy Typst's far more intuitive approach. Though Typst is young and leaves a bit to be desired, it's earned a place as my go-to for all of my (limited) typesetting needs.

# Some background

More than three years ago, my go-to for any document-crafting needs would have been Google Docs or perhaps even LibreOffice, but over time I grew frustrated with them. I seemed to always find a way for these tools to fall short of how I envisioned presenting my information, and I found that maintaining consistent style and layout would grow increasingly tedious. I would often copy and paste certain components to get the right styling in bulk rather than having to go through and click buttons and/or remember shortcuts to apply the right styles. And then once I did, if I wanted to change anything I'd have to go through the document and update it to fit my revised preferences. I wondered if there was another way.

I began using LaTeX initially to create my resume through [Overleaf](https://www.overleaf.com/). And by create I mean I used a template I found which I gradually added to and updated to work for me. I really liked the idea of "programming" a document with reusable components. Eventually I moved to a local LaTeX environment with help of Emac's strong LaTeX support and was happy for a time.

My trajectory with LaTeX looked something like this:

LaTeX is great -> LaTeX is a pain -> Do I even know how to write LaTeX actually?

Soon enough I found myself needing to generate a variety of documents, contracts, invoices, reports, proposals, etc. After fiddling with Org to LaTeX exports for a bit I decided it was time to try something new. I had remembered hearing about this thing called Typst which piqued my interest not long ago and thought to give it a go.

# Typst is neat

[Typst](https://github.com/typst/typst) is not shy about it's motivations:

> Typst is a new markup-based typesetting system that is designed to be as powerful as LaTeX while being much easier to learn and use.

\- [Typst README, 2024](https://github.com/typst/typst/blob/45366c0112ac7a6197cee35f1e180c6a00923e05/README.md)

And after using the system for a few days, I can verify their claims are correct. In three days I...

- Made a basic report template to use for a new client
- Created a simple data-driven invoicing template/system for this and future clients
- Started work on a modular and data-driven resume template

What do I mean by "data-driven"? Well, I'm referring to what I think is one of Typst's strongest features, its built-in data import functionality. You can import data from a [number of formats](https://typst.app/docs/reference/data-loading/) to use however you wish in your documents. So in the case of my invoicing template, I generate a data file which contains all the details for one invoice, which is then consumed by this template as Typst compiles it, and out comes a beautiful invoice document with all of that information reflected in its contents. Isn't that neat?

Another great thing about Typst is its familiar scripting syntax. If you've ever used a powerful templating language you'll likely feel right at home. But unlike the template scripting I'm accustomed to, I've found Typst's to be fairly expressive thus far, allowing me to choose patterns that suit me and the situation best.

# Typst is young

Overall my first impressions of Typst have been favorable, but it does have its shortcomings. Probably one of the most glaring being that support for fonts is lacking, specifically variable fonts. Additionally, fonts that fail to load do so silently leaving you to figure out what went wrong. There is the handy `typst fonts` command which will list all the fonts detected on one's system, but if they don't know in advance that variable fonts aren't supported then they might be in for a bad time.

Of course, the Typst team is aware of these issues and has enhancements to address them and many more listed in [their roadmap](https://typst.app/docs/roadmap/) (looking forward to EPUB exporting!).

# Who is Typst for?

I think Typst works best for someone a bit like me, who doesn't yet need to generate deeply complicated documents and never really got too deep into LaTeX to know what features they might be missing out on by switching to Typst wholesale (though it's my understanding those are becoming fewer by the day). I think Typst will be intuitive to anyone just starting out in the world of typesetting, especially those with a background in programming. If that's you, consider checking it out!

# Conclusion

I hope this helps anyone who has perhaps heard of Typst but wasn't sure about getting started with it, or perhaps is their first time hearing of it! If you have any questions about Typst, comments about what I wrote, or just want to say hi, feel free to drop an email to dev@chrisrenfrow.me or find me on other platforms. I'd enjoy hearing from you. :)
