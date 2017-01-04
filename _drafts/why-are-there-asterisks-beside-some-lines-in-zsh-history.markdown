---
title: Why are there asterisks beside some lines in .zsh_history
layout: post
---
So
{% highlight bash %}
10101  cd
10102  cat .zsh_history
10103* cd Dropbox/imac
10104* ls
10105* ls -la
10106* cat .zsh_history
10107* cat .zsh_history ~/.zsh_history
10108* cat .zsh_history ~/.zsh_history | sort -nr
10109* cat .zsh_history ~/.zsh_history | LC_ALL=C sort -nr
10110* vi ~/.zsh_history
10111* cat .zsh_history ~/.zsh_history
10112* cat .zsh_history ~/.zsh_history | sort
10113* cat .zsh_history ~/.zsh_history | LC_ALL=C sort
10114  pwd
10115  cat Dropbox/imac/.zsh_history
{% endhighlight %}

What's with the asterisk on some lines?