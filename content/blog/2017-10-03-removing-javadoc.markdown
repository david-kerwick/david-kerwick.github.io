---
layout: post
title: Removing Javadoc
date: '2017-10-03T15:53:00'
---
At one time or other someone ran an auto javadoc plugin on some of the code base, likely me.
Turns out most of it is just general crap just echoing the method name.

To find and remove them you can use Intellij's find and replace with regex ticked

Search for this regex
```
\/\*\s*[\s\S]*?\*\/$
```

Replace with blank if the javadoc adds no value, be careful not to throw the baby out with the bath water here. i.e. keep the good javadoc.
