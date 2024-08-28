---
title: "RC W1'23 | Wk 4/14"
description: "A summary of my fourth week in Winter 1 '23, a shorter one due to Thanksgiving."
published_on: 2023-11-27
category: check-in
tags: [ "recurse_center", "blaggregate", "w1'23" ]
---

**TLDR;** Got a couple of solid days at RC in before taking somewhat of a break for Thanksgiving. This week I made progress working with Bevy to make a card game interface and spent some time learning about Svelte, the front-end web framework, and I even practiced some Blender sculpting and pixel art animation with Aseprite.

---

# Day 16 (Mon, 20th)
After debugging some network issues with my still fresh Arch installation (**Pro-tip:** Don't run competing network services). I started getting my Bevy developer environment dialed-in, this meant applying the recommended compiler optimizations presented in the official guide. And then I set to work getting my project set up, eventually rendering a single rectangle which would eventually behave like a card, probably? 

After that I paired with someone incredibly knowledgeable in the growing field of AI-safety who was generous enough to spend most of our hour together explaining the fundamentals of NNs, LLMs, as well as going over some calculus concepts my math-deficient brain hadn't soaked-up. All the while giving me plenty of opportunity to ask questions and come up with my own answers to keep me engaged. Just a really wonderful experience that piqued my interest in the topic. I won't be pursuing it at this moment though since I have enough going on. Though refreshing myself on calculus got bumped near the top of my growing task list!

Later, I spent some time rediscovering the joy of writing tiny scripts to accomplish small but common tasks.

## A fishy interlude

 I use [Fish](https://fishshell.com) as my shell, as I have for about 2 years now, but in all this time I never really took advantage of it. I also manage an ever-growing collection of music locally using a program called [Beets](https://beets.io/), this lets me list and filter my music by a number of fields, among other things. I also use [`mpv`](https://mpv.io) for most of my media playback needs. To play my music, I would combine both `mpv` and `beet` by running something like `mpv (beet ls -p 'albumartist:Anamanaguchi')`. Which in summary, tells Beets "I would like paths to all the songs in my library that belong to album-artist Anamanaguchi" which then passes all of those paths to `mpv` which will happily start playing them in order. This is fine, but there's got to be [a better way](https://media.tenor.com/0RQyqOfqS-sAAAAC/infomercial-help.gif), right?

To start solving this minor inconvenience, I made use of the Beets plugin, [Smart Playlist](https://beets.readthedocs.io/en/v1.6.0/plugins/smartplaylist.html). This plugin lets you use queries to generate `.m3u` playlists, this way I could query for all songs released in a certain year and add that to a playlist, or by a single artist. But this would be tedious to do for every album-artist, thankfully there's a way to automate even this using beet's template syntax in the name of the playlist. By simply using the `$albumartist.m3u` as the name of the playlist, providing an empty query, and running `beet splupdate`, I ended up with a playlist for each album-artist, containing all of their songs!

```yaml
# ~/.config/beets/config.yaml
# ...
smartplaylist:
  playlist_dir: ~/.config/beets/playlists
  playlists:
    - name: all.m3u
      query: ''

    - name: '$albumartist.m3u'
      query: ''
# ...
```

Now all I had to do was type `mpv ~/.config/beets/playlists/Anamanaguchi.m3u`, but I knew I could do better! With this in mind I used fish's `funced` to create a simple function which would take the playlist title as an argument and use it to form the path to then pass into `mpv`.

```fish
# ~/.config/fish/functions/play_pl.fish
function play_pl
    mpv --shuffle --no-video "$HOME/.config/beets/playlists/$argv.m3u"
end
```

Simple, but effective! But there was something that became evident as I tested/used it. While I could probably memorize what playlists were available to me, it would be nice to have some completions! This led me to learn how to use fish's `complete` command and write the following fish script.

```fish
# ~/.config/fish/completions/play_pl.fish
function __autocompletes
    set pl_directory $HOME/.config/beets/playlists/
    set completions (ls $pl_directory)

    for completion in $completions
        echo (basename $completion '.m3u')
    end
end

complete -f -c play_pl -a "(__autocompletes)"
```

And just like that I had tab-complete for every playlist! There was something else bothering me, but this was good enough for now.

## I also started sculpting a dragon

I promised a friend I would sculpt them a dragon and 3D-print it, but I had been struggling getting my integrated GPU to play nicely with Blender which had been delaying me. But since I had a fresh installation to work with I decided to give it another go and ended up with this.

{{ embed_image(
    path="dragon-11-20.png", 
    alt="A low-poly mesh of a dragon's head", 
    caption="I wasn't entirely happy with the way this guy reads, but also not too bad for not having done anything in Blender for some time."
) }}

# Day 17 (Tue, 21st)

## Just a little bit of yak-shaving

I started the day by indulging in a bit of yak-shaving, that is, continuing to improve my little playlist fish script. As I alluded to previously, there was one other thing I wanted from this script. I wanted to be able to pass multiple playlists and have them all sampled from collectively. So I thought I could just pass all the playlist paths to `mpv` and call it a day.

```fish
function play_pl
    set playlist_dir "$HOME/.config/beets/playlists"
    set selected_playlists (echo "$argv" | tr ' ' '\n')
    set playlist_paths

    for pl in $selected_playlists
        # Append each path to playlist_paths
        set playlist_paths $playlist_paths "$playlist_dir/$pl.m3u"
    end

    mpv --shuffle --no-video $playlist_paths

end
```

I started rolling with this when I realized that while the music was being shuffled, it was only from one playlist! As it turned out, passing multiple playlist files, `mpv` will play each in sequence. My first thought was to concatenate the contents of all the playlist files into one temporary file and then pass that to `mpv` instead. Turns out that was a pretty good idea.

```fish
function play_pl
    set playlist_dir "$HOME/.config/beets/playlists"
    # Make a temporary (/tmp) file 
    set playlist_contents (mktemp)

    for pl in $argv
        # Append the contents of each playlist to the temporary file
        cat "$playlist_dir/$pl.m3u" >> $playlist_contents
    end
    # Using the --playlist flag forces mpv to parse the file as a .m3u file
    mpv --shuffle --no-video --playlist=$playlist_contents
    # Might as well clean up after ourselves
    rm $playlist_contents
end
```

Finally, this script worked the way I wanted to and I could move on to other things.

## Back to Bevy

I had a basic Bevy project set up and was rendering a single rectangle now it was time to start getting something resembling a card interface working. The first goal was to figure out how to translate the mouse pointer from the window position to the world position. Once I got that figured out the next goal was to have the rectangle simply follow my mouse.

{{ embed_image(
    path="bevy-card-1.gif"
    alt="A white rectangle against a black background following a mouse pointer"
    caption="Success!"
) }}

You can check out the source [here](https://github.com/ChrisRenfrow/bevy-cards/commit/c8f5857e63e78d18bb53a9e1b1295d5f8d568fa2), but the core of this simple functionality lies in this system:

```rs
fn move_cards(
    time: Res<Time>,
    mut q_card: Query<(&mut Transform, &Card)>,
    q_win: Query<&Window, With<PrimaryWindow>>,
    q_cam: Query<(&Camera, &GlobalTransform), With<MainCamera>>,
) {
    let (cam, cam_transform) = q_cam.single();
    let window = q_win.single();
    if let Some(world_pos) = window
        .cursor_position()
        .and_then(|cursor| cam.viewport_to_world(cam_transform, cursor))
        .map(|ray| ray.origin.truncate())
    {
        for (mut card_transform, _) in &mut q_card {
            card_transform.translation.y = world_pos.y;
            card_transform.translation.x = world_pos.x;
        }
    }
}
```

## Learning Svelte

I started working through the [official Svelte tutorial](https://learn.svelte.dev/) over the weekend and stopped at the "Advanced Svelte" section. Today I resumed where I left off and got through the first half of that section, which most notably covered the component composition features of Svelte, such as Slots.

# Day 18 (Wed, 22nd)
Today RC faculty had gone on vacation for Thanksgiving for the remainder of the week and a number of recursers it seemed had followed suit. I chose to treat the remainder of my week more or less the same as I would have normally but perhaps a little more quietly.

## Bevy, what a drag!
I decided to continue working on my Bevy card interface, today I made it possible to drag cards around! I think today the Entity Component System finally "clicked" for me. I found an older [Stack Overflow](https://stackoverflow.com/questions/65396065/what-is-an-acceptable-approach-to-dragging-sprites-with-bevy-0-4) question regarding dragging sprites around and I used that as a jumping-off point to make my cards draggable.

{{ embed_image(
    path="bevy-card-2.gif"
    alt="Two rectangles against a black background, one grey and one white, the white one is draggable and the grey one is not"
    caption="One non-draggable card, and one very much draggable card!"
) }}

By adding marker components like `Draggable`, `Hoverable`, `Dragged` and `Hovered`, I was able to define systems that would handle adding and removing these components under the correct conditions, enabling the behavior you see above!

Here is [the commit](https://github.com/ChrisRenfrow/bevy-cards/commit/6367efe281a736ea9e4160655de939401842ba9e) so you can see what changed. 

## Speaking of dragon

I also did some more sculpting, the issues that made it difficult to use Blender in the first place began manifesting again. I achieved this by compulsively saving after every major modification.

{{ embed_image(
    path="dragon-11-22.png"
    alt="A low poly dragon mesh, but this time it has eyes and is a little more detailed"
    caption="Now with eyeballs and teeth!"
) }}

# Day 19 (Thu, 23rd)

Today was Thanksgiving Day and while we didn't have plans to travel we did decide to do a small dinner, so I helped with that. But before we started I was deciding how to best handle animating flipping cards in my Bevy card interface. The options were to use Aseprite to animate the flip, or use some kind of texture transformation in-engine. I decided I would try both and started with the Aseprite method.

{{ embed_image(
    path="card-flip.gif"
    alt="A pixelated card with a blank side and a back spinning endlessly"
    caption="Spinny!"
) }}

# Day 20 (Fri, 24th)
I didn't do much today aside from trying to sort out the issues I was having with Blender regarding my integrated graphics. Apparently the issues I was having were common with the Intel CPU I had on-board, so I had to make use of my discrete GPU instead. After a short session with Blender it seemed like the problem had been resolved!

# Summary
A short and somewhat quiet week but overall still productive. I was still able to move toward my batch goals and made time for art practice!
