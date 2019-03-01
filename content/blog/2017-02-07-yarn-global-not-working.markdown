---
layout: post
title: Yarn Global not working
date: '2017-02-07T21:49:00'
---

I was following a guide that and it used Yarn to install a global dependency. So that's no problem I've been using yarn and it's great. I hadn't used it for anything global yet though.

The install ran just fine but the program itself didn't work. Yarn's bin path wasn't in my system path.  I think is might be because I installed yarn using homebrew which adds things to a different path.  You can see which path yarn adds things to by running

`yarn global bin`

It gave me

`/usr/local/Cellar/node/7.4.0/bin`

Hence the homebrew suspicion.

To fix it add the yarn path to your main path in your `.zshrc`

`export PATH=$(yarn global bin):$PATH`

And things should work away normally from now on
