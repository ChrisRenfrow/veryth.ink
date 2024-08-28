---
title: "RC W1'23 | Wk 3/14"
description: "Reflecting on the third week of my second batch at RC. This one was a bit of a doozy."
published_on: 2023-11-20
category: check-in
tags: [ "recurse_center", "blaggregate", "w1'23", "rust" ]
---

Install novel linux distributions on your only available machine. *Not a good move.* I absolutely knew better but I did it anyway! This is a long one so buckle-up, or just read the TLDR below. :)

**TLDR;** During the weekend I started installing Guix as my operating system thinking I would be good to go once the week started. I was wrong, this ate into my week significantly but in an effort to reclaim the rest of it I spent additional time getting Arch Linux installed again, just in time to get in two days of participation at RC. This was not a great week for me but I finished on a high-note by learning some graphics programming.

---

# Sat & Sun
On Saturday I decided it was time to reinstall my system. I know, it might sound backwards to some readers but for me sometimes it seems less overwhelming to start over than it does to fill in all the gaps in my knowledge and remind myself of the steps I took to set-up my system, what configuration files I touched, etc. Something which I thought a declarative system like [Guix](https://guix.gnu.org/) could help me solve in the future, as my system could be reconfigured from a single point of entry, committed to VCS, a living record of how my system has changed. It sounds really nice, on paper.

But before I could think of installing a new system, I had to back-up the old one. But there was a problem, see, my backup "strategy" only happened before moving to a new system, and involved taking a flashdrive and cramming all of the things I cared about, or thought I should care about onto it and sorting it out later. This works in a pinch, but over the years, manually managing these backups had reached an incredible state of disarray. So, I set to the task of sorting through it and getting everything on my system the way I wanted it, or at least closer to it. Then, I chose [Restic](https://github.com/restic/restic) as my backup manager and initialized an empty repository on the thumbdrive. I set up a sensible ignore file (e.g. for all the `node_modules` in my project folders) and then backed-up my entire home directory.

This took me the rest of Saturday and Sunday to complete after ~~double~~ triple check everything was in order for the move. This should have given me pause, here I am the night before the start of the new week, fully planning on installing a new and unfamiliar OS. I'm really not sure what I expected to happen. But foolishly I took the plunge, reformatted my disk and began installing Guix.

# Day 11 (Mon, 13th)
I woke up early, having left the installation process running late last night. It seemed to be downloading the requisite precompiled substitutes *very* slowly (dial-up speeds) so I let it do its thing hoping speeds would improve overnight. It still hadn't finished by morning. I of course had to excuse myself from all RC events today. After some troubleshooting without success, suddenly things started downloading much more quickly, and finally I was able to boot into my system. But it wasn't until late afternoon that I had a familiar desktop environment, a useable web-browser, but no developer environment to speak of. I worked late into the night trying to understand how to use this unfamiliar system and realizing a lot of things I depended on were not packaged by the Guix official channel and that I would have to make my own channel(s) to regain this functionality.

# Day 12 (Tue, 14th)
I woke up and was able to join daily checkins with surprisingly few issues. I couldn't screenshare, but at least I could participate in video calls! I had quite a backlog of coffee-chats and pairing sessions (I had forgotten to skip yesterday's matches), so I had intended to schedule them all for today to try and get caught up. I had a coffee chat, and paired on my card deck thing with someone who had been wanting to pair on it since the week prior. We had to use replit for this as I had no screensharing, which had its benefits and drawbacks. Hassle-free collaborative editing, but no shared terminal output... Both the coffee-chat and the pairing session were strained on my part. I wasn't 100% present because I was stressed out about my self-inflicted situation and on top of that I was operating on very little sleep. So I rescheduled/postponed the rest of my coffee-chats and pairings. Sometime during my morning I had decided that this situation was untenable and that I would spend the rest of the day (and the next) re-installing Arch. So after a short nap that's exactly what I did. 

It was kind of refreshing to be in familiar territory after stumbling around with Guix not knowing up from down, the ever-helpful Arch Wiki at my side guiding me through the process. Despite my eagerness to get back to a functional system, I decided to take a minor detour to learn how to encrypt my disk, the one nice and intuitive thing about Guix was being able to just tick an option in the graphical installer and have an encrypted disk by default. Not so in Arch of course. Once I informed myself of the options available I settled on a configuration and proceeded with the Arch installation.

# Day 13 (Wed, 15th)
By next morning I had more or less installed Arch, though I needed to use the installation image more than a couple of times to install programs I thought I had already to get things into a manageable state. By noon I had a recognizable graphical environment again! I had some other things to do today, but when I returned I worked on getting my developer environment back in order. After some fussing with Emacs I had finally regained most of the former system's functionality.

# Day 14 (Thu, 16th)
Finally, today was the day I could rejoin everyone else in another week at RC! And today was "Impossible Stuff Day", a faculty-led event in which participants would identify a goal that seemed impossible and just dedicate the day to taking steps toward achieving that goal. Initially I was feeling like skipping this because the days prior had really kind of taken it out of me. But I got reminded that a lot of complicated graphics programming is kind of impossible to me because math is just not my strong suit. So at the last moment I decided to dedicate the day to writing a 3D-renderer (which I realized later what I was thinking of was more of a raytracer) in Rust. I also wanted to pair with someone on Aseprite to give them a tour of the interface and explore it together. But as it happened I still had some A/V issues to sort out in my fresh system, so I had to back out of that.

I worked on what I now knew as a raytracer for the better part of 4 hours, following along with [this guide](https://github.com/ssloy/tinyraytracer/wiki/Part-1:-understandable-raytracing), and ended up with this render, which I lovingly refer to as "the most complicated way to render a circle".

{{ embed_image(
    path="tinyraytracer-first-render.png"
    alt="The output from my program, a white circle against a color gradient background"
    caption="You wouldn't know it from this image, but that white circle is actually mathematically a sphere"
)}}

I spent the rest of the day writing my long-overdue summary for the week prior.

# Day 15 (Fri, 17th)
I had some errands to run and tasks to complete today outside of RC. But once I finished those I decided to keep working on my tiny raytracer, not before getting a little distracted by hacking my window manager, [Sway](https://swaywm.org/).

See, I was making such frequent and small changes to my raytracer, that it was getting very tedious to run the program and open the resultant output, so I used `cargo-watch` to watch for changes and then run `cargo run && [open image]`. This worked fine for a little while, but unfortunately the window would open in the currently focused workspace, where I had Emacs open. This too began to get tedious as I would save not necessarily to see the output but see what the compiler was saying about my code, only to have my image viewer barge-in with the latest render. This is just how Sway works though, new windows show up in the focused workspace unless you add a statement in your configuration telling Sway to *always* put particular windows in a particular workspace. So instead, I wrote a simple bash script to help me manage this and added its invocation to the end of my `cargo-watch` command.

```sh 
#!/bin/bash

target_workspace=1
cmd="imv"
cmd_args="/tmp/output.ppm"
# get the currently focused workspace
focused_workspace=$(swaymsg -t get_workspaces | jq -r '.[] | select(.focused == true).name')

# kill instances of command/app already in target workspace
swaymsg "workspace $target_workspace; [app_id=\"$cmd\"] kill"
# switch to target workspace and execute app with args
swaymsg "workspace $target_workspace; exec $cmd $cmd_args"
# switch back to previously focused workspace
swaymsg "workspace $focused_workspace"
```
Now, when I save my project and the image renders, the window opens on my second monitor rather than in my face! It felt really good to be able to put that together and have it immediately improve my workflow.

Now I was able to work on adding lighting to my raytracer, which proved to be difficult. Somewhere along the line I must have confused some variables as things were not quite looking the way they should, but it was approaching something resembling lighting, so I still count it as a success.

{{ embed_image(
    path="tinyraytracer-approaching-lighting.png"
    alt="Now a collection of circles with what looks like a radiating gradient coming from their centers still against a color gradient background"
    caption="Slightly less flat circles now, progress!"
)}}

# Summary
Well, that was a week. Mistakes were made, lessons were learned, and I think I did an okay job recovering. I'm looking forward to not making the same mistakes this next week and having more fun with graphics programming and finally making some real progress toward my batch goals.
