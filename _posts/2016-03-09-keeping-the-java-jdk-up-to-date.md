---
layout: post
title: Keeping the java jdk up to date
categories: 
 - blog
date: 2015-12-01 14:17:24

---

So all well and good getting nagged about the updates for the Java JRE, but my jdk quickly gets out of date.  And going to the Oracle site and doing the manually download is a bit of a pain. Well not that much of a pain I guess but enough hassle that I hardly ever bother.

There must be a better way... and of course there is.
Homebrew can do it, I'm new to homebrew so didn't know it could do things like java.

{% highlight bash %}
brew install caskroom/cask/brew-cask
brew cask install java
{% endhighlight %}

So that bits nice and simple.
Now Eclipse on the other hand...

First off add the new jdk to the to the main preferences and set it as the default jdk.
![Default JRE](/assets/img/keeping-the-java-jdk-up-to-date/Installed_jres.png)

Then to change all projects
![Java Environment](/assets/img/keeping-the-java-jdk-up-to-date/Java_environment.png)

Depending on the size of your eclipse workspace site back and enjoy the sweet sound of fans kicking in as it rebuilds all projects.

