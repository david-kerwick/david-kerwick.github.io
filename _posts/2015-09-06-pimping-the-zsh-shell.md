---
layout: post
title: Pimping the zsh shell
categories: 
 - blog
date: 2015-09-06 23:58:39

---

So having installed zsh and done some basic config it's time to really pimp it out and from what I can see that means installing [oh-my-zsh](http://ohmyz.sh/) that install is quick and painless, it does of course replace your .zshrc file so you will have to but back in any additions you have made there.  It does back your old one up to `.zshrc.pre-oh-my-zsh` so isn't to difficult to add stuff back in.

I'm happy with the defaults for now, but there are millions of themes and plugins to choose from. I'm sure I'll try others out over time. But coming from bash the prompt info, tab completion and history is great.

Speaking of which I set the history for shells to a huge number so I can find commands I performed ages ago, but they are all in bash and I wanted them in my new shiny shell.  The format of the history files are different so a direct copy seemed a bad idea, you as always someone else has solved it so run the script [here](http://goyalankit.com/blog/2014/05/24/bash-to-zsh-history/) and you have your full bash_history imported into your zsh_history.

So I can ctrl^r to search my history, also it seems I can start a command and hit up arrow and it gives me the history starting with that command (nice) I beleive there is a plugin that make this even better, one to look at.

#Getting mvn working
So while oh-my-zsh comes with git my default you have to add other plugins as you want them so for now the other main program for the command line I use is mvn.
For starters it wouldn't work of course because the setting from my .bashrc were missing.  So add the maven settings back in

{% highlight bash %}
export MAVEN_OPTS="-Xmx512M"
export JAVA_HOME=$(/usr/libexec/java_home)
{% endhighlight %}

Then enable the mvn plugin in oh-my-zsh, find the plugins line in `.zshrc` and add mvn something like this

{% highlight bash %}
plugins=(git mvn)
{% endhighlight %}

That gives you a world of alias's and command line competion for the mvn command.
I like having the output of maven colourised as it makes it easy spot errors and warnings, that's built into the plugin but not on by default to enable it add an alias to your `.zshrc` file

{% highlight bash %}
alias mvn="mvn-color"
{% endhighlight %}

That's the basics working and so far so good, I'm sure I'll be adding to the plugins over time and trying new themes but the difference so far it totally worth it.
