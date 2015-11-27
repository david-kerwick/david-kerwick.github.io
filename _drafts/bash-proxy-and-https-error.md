---
layout: post
title: Bash proxy and https error
categories: 
 - blog
date: 

---

So I wanted to install Oh-my-zsh on one of the dev servers, shouldn't be too much of a problem...
Well except it has to use a MS Proxy, so things are generally fine with that, there's a cntlm proxy set up on the machine and stuff generally works.

But I got 
{% highlight bash %}
Proxy tunneling failed: Bad RequestUnable to establish SSL connection.
{% endhighlight %}

The world has moved to https, but our server config hadn't.

A bit of messing try to set https_proxy_port which doesn't seem to be a actually setting and what I needed to add was

{% highlight bash %}
export https_proxy=127.0.0.1:3128
{% endhighlight %}

The wget also needed to have the --no-check-certificate option added I guess this isn't always the case.