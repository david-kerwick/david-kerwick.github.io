---
layout: post
title: Bulk adding users in linux
categories: 
 - blog
date: 2015-09-06 23:57:16

---

So while I'm no Linux admin I end up having to do the odd thing on test servers, which generally involves some head scratching and googling as I do it so rarely.  So this is one for the time vault as I really doubt I'll be adding users to a server on a regular basis.

The problem was a couple of new test servers needed to be created and everyone in the team given a login.  Now there's talk of a jumpbox coming but in the mean time I needed a quick way of creating all the users and of course there's a command for that `newusers` which can be passed in a file with the users listed.

An example line in the file would be
{% highlight bash %}
david:david:607:607:david:/home/david:/bin/bash
{% endhighlight %}
So that's
1. Username
2. Password
3. User Id
4. Primary Group Id
5. Display name
6. Home Directory
7. Default shell

Beware the copy and paste monster on this one, I got busted by forgetting to change the user id's and therefore actually set everyone up as the one user... DOH

The next thing was to add all the users to a particular group, wheel for example.
I could set it as the primary group in the above file but I wanted to add to the secondary groups.  I couldn't find anything so I created a little script that just runs the commands

{% highlight bash %}
#!/bin/sh
sudo usermod -G wheel david
{% endhighlight %}

Just add a line for each user