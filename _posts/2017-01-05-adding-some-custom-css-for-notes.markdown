---
layout: "post"
title: "Adding some custom css for notes"
date: "2017-01-05 16:22:32 +0000"
---
After the [conversion to Jekyll 3]({% post_url 2017-01-04-moving-to-jekyll-3x %})
and in particular starting fresh on the new theme I've lost the odd customisation
that's built up over the years, some of which is probably a good thing.

So one of the things that seems to be missing it the styling I had for an info banner which just stated that the site is no longer on blogger so blogger related stuff doesn't show up as it used to.

So it's just a matter of adding custom css to the new minima theme that's being used.

How to do this is specced out on [the site](https://github.com/jekyll/minima#customization)
it seems to me creating a blank main.scss file loses some settings so I think
I'll go with the copy and add approach so that it remains pretty much the same.

When I did that though I ended up with this error

```
Conversion error: Jekyll::Converters::Scss encountered an error while converting 'main.scss':
                    File to import not found or unreadable: minima. on line 36
jekyll 3.3.1 | Error:  File to import not found or unreadable: minima. on line 36
```

But then realised that's because I ran Jekyll serve from within the assets directory! Noob!

The info banners on the Jekyll site itself look nice so I reckon I'll borrow them

I took the notes section from [here](https://github.com/jekyll/jekyll/blob/2adac58b41a788eef41a6db1d4588a667de611da/docs/_sass/_style.scss)
and copied it into my `main.scss`

This gave the error

```
Conversion error: Jekyll::Converters::Scss encountered an error while converting 'assets/main.scss':
                    Undefined mixin 'border-radius'. on line 43
...error:
             Error: Undefined mixin 'border-radius'. on line 43
             Error: Run jekyll build --trace for more information.
```

Looks like it need some mixins, two from what I can see.
I got them from [here](https://github.com/jekyll/jekyll/blob/2adac58b41a788eef41a6db1d4588a667de611da/docs/_sass/_mixins.scss)
I needed `box-shadow` and `border-radius`

And that seems to be golden, I have fancy info banners now.
You can see one [here]({% post_url 2012-05-03-so-i-decided-to-give-this-blogging %}) from my first post.
