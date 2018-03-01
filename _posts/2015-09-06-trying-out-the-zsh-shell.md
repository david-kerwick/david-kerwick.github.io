---
layout: post
title: Trying out the zsh shell
categories:
 - blog
date: 2015-09-06 23:58:17

---

So when watching googles coding tips on youtube they were talking about dotfiles and general setup.  Going to the dotfiles they recommended and looking into it in general there a good few recommend using zsh as your shell as it has 'cool' features, I'm not fully sure what these features are but better tab completion seems to be one of them which sounds good to me.

Only way to find out is to try it out.  I've used bash for forever so hopefully it's not too different ;)

# Update zsh
May as well start off with the latest version
{% highlight bash %}
brew install zsh
{% endhighlight %}

This installs zsh to `/usr/local/bin/zsh` so I believe some things need to change for that, it needs to be added to the list of accepted shells

# Add homebrew zsh to allowed shells
{% highlight bash %}
sudo vi /etc/shells
# add in the line
/usr/local/bin/zsh
{% endhighlight %}

# Change the shell
Then change the shell

{% highlight bash %}
chsh -s /usr/local/bin/zsh
{% endhighlight %}

# Configure zsh
Restart the terminal and zsh should scare you with a world of options...
That is
> "This is the Z Shell configuration function for new users"

I followed the config wizard changed what I thought made sense.

You can always run it again it seems
{% highlight bash %}
  autoload -Uz zsh-newuser-install
  zsh-newuser-install -f
{% endhighlight %}

# Profit...
So autocompletion is cool
{% highlight bash %}
cd /u/l/b
# press tab
cd /usr/local/bin/
# magic!
{% endhighlight %}

The tab cycling of directories is pretty cool too
