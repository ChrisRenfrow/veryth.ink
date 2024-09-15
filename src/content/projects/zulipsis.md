---
name: 'zulipsis'
description: 'A fun tool for automatically cycling your Zulip status. Built with Rust.'
homepage: 'https://github.com/chrisrenfrow/zulipsis'
repository: 'https://github.com/chrisrenfrow/zulipsis'
started_on: 2023-10-10
finished_on: 2023-11-09
status: 'on-hold'
associated_tags: ['zulipsis']
contributors:
  - name: Erika Rowland
    profile_url: https://github.com/erikareads
  - name: stcucufa
    profile_url: https://github.com/stcucufa
---

This project came from an idea to make a service one could run while they were working to cycle through fun/silly Zulip status messages and emoji, then, when stopped, automatically set an "away" status.

I learned how to respond to system signals, when not to use panics, how to utilize XDG environment variables to respect the user's preferences, how to implement verbose logging, and how to use both a configuration file and CLI arguments to allow flexible customization of a program's behavior.

The project as it stands is "complete" in the sense that I achieved my objectives. It is, at the time of writing, unreleased or packaged on any platform, though I'm not opposed to it!
