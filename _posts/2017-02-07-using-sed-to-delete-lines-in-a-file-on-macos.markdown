---
layout: post
title: Using SED to delete lines in a file on MacOS
date: '2017-02-07 22:53'
---

I needed to delete a set of lines from a file.  I didn't realise the Mac version of `sed` is a bit different to the Linux one. So what I had tried first was

`sed -i -e '/<your pattern>/d' yourfile.txt`

and

`sed -ie '/<your pattern>/d' yourfile.txt`

So what you end up with after these is file copies ending in `e` or `-e` so you end up with backups `yourfile.txte` and `yourfile.txt-e`

What you need to do is give the inline edit `-i` an extension to work with, even if that's blank (if you don't want the backup). So

`sed -i '' -e '/<your pattern>/d' yourfile.txt`
