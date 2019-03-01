---
layout: post
title: Adding color to Maven output
date: '2017-02-01T21:58:00'
---

Maven output as anyone who has used it knows is pretty verbose and scrolls on by at a good ole lick. And in the terminal it's hard to see the wood for the trees.  What helps with this is to add some colour to the output that way if red flashes by or yellow you can take notice.  It's actually amazing how much you spot with the addition of colour.

With oh-my-zsh this is very easy, you are using that right? You totally should.

Anyway first add the mvn plugin to your plugin list in `.zshrc`
e.g

`plugins=(git mvn z history-substring-search brew docker)`

and make sure you add an alias for mvn so you get the color goodness, I've also boosted the memory and set java home.

```
alias mvn="mvn-color"
export MAVEN_OPTS="-Xmx512M"
export JAVA_HOME=$(/usr/libexec/java_home)
```

Enjoy the 'pretty' output
