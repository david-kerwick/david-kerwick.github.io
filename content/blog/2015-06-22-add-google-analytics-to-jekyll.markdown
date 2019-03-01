---
layout: post
title:  "Add Google Analytics To Jekyll"
date:   '2015-06-22T18:24:11'
categories: 
- blog
- jekyll 
- google

---

So one of the things missing for the new blog is I have no idea how many people are viewing it from where etc...
That's something Blogger took care of for me.

So what I need to do is add Google Analytics into the site myself.  Or I guess any other tracker but having come from Blogger I think I'll stick with Google for now.

Google's info and docs about their products remind me of the Microsoft docs of old (actually they are probably the same I haven't looked in years) technically loads of information but best of luck finding out what something does or how to do it.

Actually that's probably a little harsh, the main problem is I haven't added anything like that to a site in years, last time was probably a hit counter to a Geocities site...

And Google Analytics has a bit more to it than a hit counter.

So one option is Google quick start for Analytics [here](https://developers.google.com/analytics/devguides/collection/analyticsjs/) yea that makes a lot of assumptions that you have done this before.

In my searching for more information I happened upon [Google Tag Manager](https://www.google.com/tagmanager/) which promises to make things all simple and dreamy. Now it does seem odd to complain about the docs being hard to follow and then choosing the newest thing without understanding the basics but I aim to be consistently inconsistent as much as possible.

## Creating a Tag Manager Account
I assume you have a Google account (who doesn't) head to [Sign up](https://tagmanager.google.com/) to sign up

I picked my github username as the company name.

![google1](./assets/img/add-google-analytics-to-jekyll/google1.png)

I created a web container giving the url for the blog

![google2](./assets/img/add-google-analytics-to-jekyll/google2.png)

This gives you a snippet to add to your html

![google3](./assets/img/add-google-analytics-to-jekyll/google3.png)


I added this snippet to the `_layouts/default.html` under the body tag as instructed.

This then goes to rather boxy page below

![google4](./assets/img/add-google-analytics-to-jekyll/google4.png)

So this is where reading the instructions would probably help but sure how hard could it be.  So click on New Tag, this will give you a set of possible options

![google5](./assets/img/add-google-analytics-to-jekyll/google5.png)

For now I'm only interested in Analytics so choose that and then realise I still need to setup a Google Analytics account anyway to get the tracking code. 
[Simple setup here](../2015-06-22-setup-google-analytics-account) Enter your tracking code from when you set up your site on Google Analytics

![google6](./assets/img/add-google-analytics-to-jekyll/google6.png)

You will want this code to fire on every page to set that up in 'Fire on'

![google7](./assets/img/add-google-analytics-to-jekyll/google7.png)

That's your tag set up

![google8](./assets/img/add-google-analytics-to-jekyll/google8.png)

You then hit publish and the magic should happen

![google9](./assets/img/add-google-analytics-to-jekyll/google9.png)

So it seems to have worked, all I need now is some traffic in order to be sure... that should take a while, it's not exactly a high traffic blog. But in general not so bad, it also seems like Blogger has the dumbed down version of Analytics as there is a world of choice there way too much for the 4 hits I get but it will be interesting to play with