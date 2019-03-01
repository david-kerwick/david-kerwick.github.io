---
layout: post
title: CNTLM and Mac startup
date: '2018-01-17T12:13:00'
---

In work I need to use [cntlm](http://cntlm.sourceforge.net/) to handle the Microsoft proxy.

One of the things I was doing was starting it manually when I needed it. So that started being a pain so needed to get it to start running on startup. On a Mac that generally involves plists, LaunchAgent, etc...

But brew to the rescue!

There's a tap to help you out so install services

```
brew tap homebrew/services
```

Then

```
brew services start cntlm
```

Ah isn't brew awesome.
