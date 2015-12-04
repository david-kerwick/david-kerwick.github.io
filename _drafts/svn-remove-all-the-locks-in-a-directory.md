---
layout: post
title: SVN remove all the locks in a directory
categories: 
 - blog
date: 2015-12-04 15:36:52

---

I was archiving old projects as we are moving to from svn to git. But I keep coming across old locks, sometimes very old the developer had left.

It was proving a bit of a pain find each of the files an unlocking them.
I also didn't want to checkout all the repos involved.

The way I ended up doing it requires access to the svn server

{% highlight bash %}
sudo svnadmin lslocks /svnrepos/ | grep '^Path: /Web' | cut -c 7- > locks

sudo cat locks | xargs -d \\n sudo svnadmin rmlocks /svnrepos/
{% endhighlight %}

So find all the locks in under a path.

Then pipe them to the unlock command.
