---
title: Per Domain DNS and reverse DNS on a Mac
layout: post
---
So following on from my fairly old post about static routes on a Mac, in the process of setting up a new machine I realised I solved another DNS issue back then that I never really documented.

I need to be able to specify the DNS to use on a per domain basis (we have some internal test and dev servers) and it would also be nice to have reverse DNS working as well.

Turns out pretty simple to do in Mac land once you know where to put things.

So create the directory `/etc/resolver` if there isn't one there already.

Then in that directory create a file named after the domain you want to have a specific name server for. So for `mydomain.intra` create the file `mydomain.intra`

In that file specify the name servers you want to use.

e.g.
{% highlight bash %}
nameserver 192.168.215.2
nameserver 192.168.215.3
{% endhighlight %}

And that should just work.

To set up the reverse copy the file you created but name it with the ip range you want to use the same DNS
{% highlight bash %}
cp mydomain.intra 192.168.215.in-addr.arpa
{% endhighlight %}

And that should just work too.