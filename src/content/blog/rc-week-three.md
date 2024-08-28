---
title: "RC | Week 3/6"
description: An update from the middle of my half-batch, some compromise made.
published_on: 2022-06-05
category: check-in
tags: [ "recurse_center", "s1'22", "rust" ]
---

# 50%

I'm halfway through my batch. And like most others at this point, I'm
seriously questioning what it is I'm planning on achieving between now
and the finish line. As much as I want to continue pursuing my
embedded project, it seems increasingly unlikely that I'll be making
satisfactory progress on that in the remaining three weeks. But
thankfully, I found something I'm really interested in pursuing, and
it should be achievable in the remaining weeks, maybe.

# Not giving-up

I've written some documentation for my embedded project, so whenever I
feel like I have the time and motivation to pick it back up again, I
can. It's not that I'm not interested in it anymore, I'm just a little
intimidated by how much I don't know about the domain yet.

Every time I tell myself I'm going to work on learning about embedded
programming I end-up finding other things to work on instead. It seems
like I'm just not ready right now, and that's okay. That could change
in a month or three.

# A moment of inspiration

So, what's this other project I've found? I'll get to that
in a moment, but first, some context.

I've been enjoying stoking the embers that are my interest in
producing music. I've been attending various computer audio related
events at RC and I've really enjoyed playing with tools like [Pure
Data](https://puredata.info/), and
[SuperCollider](https://supercollider.github.io/). I'm especially
interested in attaining a surface-level understanding of music theory
so I can produce [generative
music](https://en.wikipedia.org/wiki/Generative_music) using either of
these tools.

Last week, I started working on a simple [Conway's Game of
Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) library
in Rust. Mostly to have something to pair on with others, but also
because I think Game of Life is cool. So cool in fact, that I believe
I've started Game of Life implementations a handful of times in
different languages but never actually finished them. I'm also
interested in using this as an opportunity to learn what makes a
library "good" in Rust.

I was talking with RC faculty on my concerns of not having anything to
show by the end of my batch. I asked about extending my batch
(which is completely chill, because it's just an arbitrary date). They
gave me some good strategies to explore my interests (music
production) while also pursuing my other goals (filling-out my
portfolio) as an alternative to extending, such as having a "music
week" on the last week. But shortly after, I [was
struck](https://youtu.be/rPP56_I4IB4?t=222) with inspiration. I
thought, how cool would it be to use a Game of Life board-state as a
means of influencing generative music in real-time?

# How would this work?

At the time of writing I'm not clear on the specifics. But I have a
high-level understanding of the components I think will be involved.

Firstly, there's the Game of Life library that I have already started
writing. This will provide an [API](https://en.wikipedia.org/wiki/API)
to create and interact with Game of Life instances for use with other
software.

Then, we need a way to interface with programs like Pure Data and
SuperCollider. Probably the most straightforward way is via
[MIDI](https://en.wikipedia.org/wiki/MIDI). Essentially, this Game of
Life to MIDI "encoder" will consume the library mentioned above to
generate a Game of Life state and then, reading that state, will
generate MIDI events based on certain parameters. Ideally all of this
will be highly configurable.

Finally, we come to the part where sound is actually produced. After
defining a generative music "patch" in Pure Data terminology, or a
`sclang` program in SuperCollider, we would then define MIDI inputs
which, when triggered, would influence the music in certain ways. Some
obvious choices might be the level of a particular musical component
or group, or the channel (left or right), but I'm excited to see what
other fun interactions I can come up with!

# Next week

I intend to be working and pairing on these three meta-projects as
much as possible next week! I hope to at least have some fun Game of
Life gifs to share next time. :)
