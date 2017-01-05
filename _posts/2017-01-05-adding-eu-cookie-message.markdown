---
layout: post
title: "Adding EU cookie message"
date: "2017-01-05 14:18:00 +0000"
---
So because I'm using Google Analytics and I'm in the EU I need to add a cookie
message saying I use cookies to track the user.

It's a bit of a plague but around long enough now that there's easy libraries to
add it in.

[This](https://cookieconsent.insites.com/) seems to be a good one and I think it
looks nice so I'll go with that.

It generates a block of code you need to add into your head section so will need
to customise the default Jekyll theme minima (or whatever theme you are using I guess)

First create a directory in the root of your blog called `_includes`

Then copy the head.html from the minima theme into this new directory.  To find
the location of the minima files use the below if you used bundler and github-pages to set things up.

```
bundle show minima
```

Once that's there it will override the one in the theme so just copy in the code
you create from [here](https://cookieconsent.insites.com/download/) just above
`</head>` as instructed and you should be good to go.
