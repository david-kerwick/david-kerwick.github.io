---
layout: post
title: Not enough entropy on RedHat
date: '2014-03-12T20:59:00.000Z'
author: David
tags:
modified_time: '2014-03-31T21:53:28.621+01:00'
blogger_id: tag:blogger.com,1999:blog-2027514548288128942.post-3776705068099286637
blogger_orig_url: http://davidkerwick.blogspot.com/2014/03/not-enough-entropy-on-redhat.html

---

### Chaos is good....

I found the wlst and the weblogic adminserver kept 'hanging' on me.  When doing a domain creation sometimes the script would just stall, when I logged in to check the box things would be ok.  Strange says I.

Turns out to be kind of a common problem, I set the box up as a virtual machine and since I was only ssh'd into the box I wasn't creating enough entropy for the random pool on redhat.  Weblogic does a good bit of ssl and encryption and can use up the pool very quickly, especially a headless dev box as there's next to nothing happening on the box.

{% highlight bash %}   
watch cat /proc/sys/kernel/random/entropy_avail  
Every 2.0s: cat /proc/sys/kernel/random/entropy_avail  Wed Mar 12 18:50:13 2014  
170  
{% endhighlight %}


Not alot available

{% highlight bash %}  
rngd -r /dev/urandom -o /dev/random
{% endhighlight %}

Much better

{% highlight bash %}  
Every 2.0s: cat /proc/sys/kernel/random/entropy_avail  Wed Mar 12 19:11:17 2014  
3200  
{% endhighlight %}

Of course you'll need a better long term solution

{% highlight bash %}  
rngd -r /dev/urandom -o /dev/random -b -W 4096 -t 30  
{% endhighlight %}

-r take random bits from /dev/urandom
-o output them to /dev/random
-b become a background daemon
-W fill up to 4096 bits (the max I think)
-t refresh every 30 seconds

To have that run on startup

edit

{% highlight bash %}  
vi /etc/sysconfig/rngd  
{% endhighlight %}


Replace the EXTRAOPTIONS with  


{% highlight bash %}  
EXTRAOPTIONS="-r /dev/urandom -o /dev/random -b -W 4096 -t 30"  
{% endhighlight %}

Make sure rngd starts on each boot  

{% highlight bash %}  
chkconfig rngd on
{% endhighlight %}

You should have no more delays now, adjust the refresh internal if there's problems.

### Note

/dev/urandom isn't fully random (what is), when it runs out it just reuses what it has, /dev/random blocks when it runs out, hence the 'hanging'.  But it solved my problem the sysadmin's can sort a proper solution for production.

More on /dev/random [here](http://en.wikipedia.org/wiki//dev/random)
