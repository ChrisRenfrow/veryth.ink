---
title: "Simple Remote System Notifications"
description: "How I configured a server to notify my personal computer and smart-phone when I have new mail."
published_on: 2024-04-28
author: "Chris Renfrow"
category: workflow
tags: [ "bash", "ntfy", "systemd", "curl", "linux", "blaggregate", "mail" ]
---

# Motivation

A friend of mine dropped off a NAS/home-lab of his with me to look after and host while he is abroad. We got around to getting it configured and networked yesterday, after which he made me a user account. I started idly poking around a bit to see what I could do on this system when I remembered the often ignored (by me) `mail` system. Out of curiosity, I began to learn how to use it, and of course, I sent some obligatory test messages to my friend's user to bother him whenever he ssh'd in next.

Now, I didn't expect to receive a lot of mail on this system, but it got me wondering about how I could alert myself to new messages (or other events) without having to remember to login and check frequently.

There are a number of ways to be alerted or notified of something. For instance, one can trigger an email sent to themselves, or perhaps by placing a VOIP call, or they could even start a signal fire[^1]. But I wanted something that would work on any of my devices, and simple to configure without fiddling with any system configuration on the server itself - perhaps as easy as sending a request to another server, even?

[^1]: fork-bomb induced fires are frowned-upon in California

# A Solution

Before I begin detailing how I went about solving this, I want to make it clear that I purposefully did not look into whether or not there was existing software out there that solves this specific problem. I just wanted to craft my own simple solution, albeit still relying heavily on the efforts of others.

## ntfy

I remembered having heard of a simple, self-hostable, open-source service called [*ntfy*](https://ntfy.sh) that seemed to be a good match for what I was looking for. 

*ntfy* (pronounced "notify") is a very simple, but flexible service that allows users to generate a **topic**, subscribe other devices with a *ntfy* client to that **topic**, and send `POST` or `PUT` requests to that **topic** to create a new notification! Here's an example:

```txt
curl -d "Hello, World!" ntfy.sh/test-topic-plz-ignore
```

Any client that had subscribed to `test-topic-plz-ignore` at the time of sending would receive a notification with the contents of the `--data` flag. There are [loads of other features](https://docs.ntfy.sh/publish/) that let one further control the notification's appearance, meta-data, etc. But this is all I needed to begin.

## Bit of bash

So, to test that this worked for me, I quickly wrote the following bash script.

```sh
#!/usr/bin/env bash

USER="[REDACTED]"
MAIL_FILE="/var/mail/$USER"
NOTIFY_SERVER="https://ntfy.sh"
TOPIC="[REDACTED]"
REQUEST_URL="$NOTIFY_SERVER/$TOPIC"

if [ -s "$MAIL_FILE" ]; then
    MSG_COUNT="$(grep 'Message-Id' $MAIL_FILE -c)"
    curl -d "You have $MSG_COUNT new message(s)" $REQUEST_URL
fi
```

This may be a simple script, but I'll break it down anyway:

9. Uses `test`'s `-s` flag to check if the mail file has any contents
10. Uses `grep`'s `-c` flag to return the number of occurrences of 'Message-Id' (indicating unique messages[^2])
11. Finally, we make the request containing the notification body with `curl`!

And after running this script on a mail file I had locally, I could verify it worked! It was now time to figure out scheduling.

[^2]: I think, I'm not intimately familiar with the format!

## Some systemd

When I was exploring the server's system earlier, I had noticed the presence of `systemd` so, in an effort to familiarize myself with the utility more, I decided to use it for my scheduling needs - although, a simple cronjob would certainly have sufficed. 

First, I defined the service file in my remote user's home directory.

{% code_block(path="/home/bob/hello_world.txt") %}
```sh
rm -rf /
```
{% end %}

`~/.config/systemd/user/check-mail.service`
```ini
[Unit]
Description=notify if there is new mail

[Service]
Type=oneshot
ExecStart=%h/.local/bin/check-mail.sh
```

Then, I defined a timer file which specifies a service to run at defined intervals.

`~/.config/systemd/user/check-mail.timer`
```ini
[Unit]
Description=timer for check-mail.service

[Timer]
OnBootSec=5min
OnUnitActiveSec=15min
Unit=check-mail.service

[Install]
WantedBy=default.target
```

I then reloaded the systemd user daemon with `systemd --user daemon-reload`, and immediately enabled the timer with `systemd --user enable --now check-mail.timer`[^3]. After waiting several minutes (and amending some incorrectly defined paths 🤫), I confirmed that this indeed worked!

[^3]: Using `--now` enables *and* starts the unit immediately

## Improvements

I'm currently satisfied with the above, but of course, I've already identified several ways this could be improved. 

It would be preferred to only trigger a notification when there are new and previously un-notified messages that remain unread. Right now, this script will spam me with notifications every 15-minutes until I handle them all - not ideal. I could probably fix this easily by hashing the mail file and storing the value between runs, comparing hashes on the next run and triggering a new notification if they don't match. This also comes with the benefit of being able to tighten-up the interval a bit to get more immediate notifications, if I preferred.

Hard-coding variables in my script is perfectly acceptable for my own use, but if I were to ever consider releasing this for others to use I would want to add basic command-line arguments, environment variable support, perhaps even configuration file support.

Additionally, before releasing, I'd want to do research into how other mail systems populate unread mail to ensure that this solution functions for common environments and systems.

# Conclusion

Thanks for reading this short post! 

I want to take a moment to give a quick shout-out to [Philipp C. Heckel](https://blog.heckel.io/about/), the creator of [ntfy.sh](https://ntfy.sh), for publishing and maintaining his easy-to-use, well-documented, and open-source software! This would have taken much more effort to solve without his work being available to use freely. This post was not sponsored by him in any way, I'm just grateful for his efforts. :)

If you enjoyed reading this, and/or want to share how you've solved a similar problem, please consider sharing via one of the methods listed [here](/about). Notice anything incorrect about this or any other post? Please let me know!

Until next time.

\- crenfrow
