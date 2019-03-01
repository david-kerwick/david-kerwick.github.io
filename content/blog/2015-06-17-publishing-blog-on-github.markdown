---
layout: post
title:  "Publishing site on github"
date:   '2015-06-17T18:30:11'
categories: 
- blog
- jekyll 

---

So to start this process I decided I would publish the blog to github, seems the most straight forward to start with and it's free which is always good when you are playing around.

There are instructions [here](https://pages.github.com/) which are very easy to follow.

Once setup I needed to pull it down into my git client. 

I use [SourceTree](https://www.sourcetreeapp.com/) in work and find it very good so decided to use that as my git client. So while there's no instructions on the github site for it setup is very simple.

## Adding my github account to SourceTree

Click the settings cog in the top right

![sourceTree1](./assets/img/publishing-blog-on-github/sourceTree1.png)

then click on settings

![sourceTree2](./assets/img/publishing-blog-on-github/sourceTree2.png)

This will bring up the account page from here click on add account

![sourceTree3](./assets/img/publishing-blog-on-github/sourceTree3.png)

In the account page choose github and enter your github username and password.  I picked https for now, must setup ssh at some other point

![sourceTree4](./assets/img/publishing-blog-on-github/sourceTree4.png)

Once that's done you can click on the remote tab and then clone the blog or any repo you have

![sourceTree5](./assets/img/publishing-blog-on-github/sourceTree5.png)

## Basic Blog
Maybe I should have started with this but setting up the start site is very easy.

[Go to the Jekyll site](http://jekyllrb.com/)

And follow the basic instructions there, basically it's


	gem install jekyll
	jekyll new david-kerwick-blog

## Publish
Commit and push it will look a little something like this.

![sourceTree6](./assets/img/publishing-blog-on-github/sourceTree6.png)

Then marvel at the glory of your basic blog