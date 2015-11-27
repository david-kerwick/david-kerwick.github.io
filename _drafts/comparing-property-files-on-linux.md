---
layout: post
title: Comparing property files on linux
categories: 
 - blog
date: 

---

I was upgrading sonarqube and one of the things was to move custom settings in the old property file to the new one.  They say don't copy the whole file as other things may have changed etc...

Property files tend to be huge things with alot of the defaults commented out so find the bits you added can be a bit of fun.

You can of course use good ole grep to only show the uncommented lines

{% highlight bash %}
grep -v '^#' sonar.properties
{% endhighlight %}

`-v` inverts the match 
`'^#'` is lines start with a comment

But I wanted to compare the files and ignore the irrelevant bits.

`diff` is a bit hard on the eyes I think so used `sdiff` 'side by side diff'

What I ended up with was

{% highlight bash %}
sdiff --strip-trailing-cr -sBI '^#' /opt/sonarqube-5.1.2/conf/sonar.properties /opt/sonar/conf/sonar.properties
{% endhighlight %}

So I ended up throwing a few options at it

| Option                   | Description                                           |
| ------------------------ |:-----------------------------------------------------:|
| --strip-trailing-cr      | The file name windows carriage returns so remove them |
| -s                       | Don't show common lines                               |
| -B                       | Don't show blank lines                                |
| -I '^#'                  | Ignore lines starting with a comment                  |
