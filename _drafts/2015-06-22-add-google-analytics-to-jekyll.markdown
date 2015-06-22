---
layout: post
title:  "Add Google Analytics To Jekyll"
date:   2015-06-22 18:24:11
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

In my searching for more information I happened upon [Google Tag Manager](https://www.google.com/tagmanager/) which promises to make things all simple a dreamy. Now it does seem odd to complain about the docs being hard to follow and then choosing the newest thing without understanding the basics but I aim to be consistently inconsistent as much as possible.

## Creating a Tag Manager Account
I assume you have a Google account (who doesn't) head to [Sign up](https://tagmanager.google.com/) to sign up

I picked my github username as the company name.

![google1](/assets/img/add-google-analytics-to-jekyll/google1.png)

I created a web container giving the url for the blog

![google2](/assets/img/add-google-analytics-to-jekyll/google2.png)

This gives you a snippet to add to your html

![google3](/assets/img/add-google-analytics-to-jekyll/google3.png)


I added this snippet to the `_layouts/default.html` under the body tag as instructed.

This then goes the to rather unintuitive page 

![google4](/assets/img/add-google-analytics-to-jekyll/google4.png)
