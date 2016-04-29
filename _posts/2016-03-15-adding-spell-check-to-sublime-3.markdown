---
title: Adding spell check to Sublime 3
layout: post
date: 2016-03-15 10:15:33
---
So a thing I noticed with the posts is I tend to have a few spellings wrong. Generally on the Mac I can rely on it's built in spell check to catch most things but it wasn't picking up the typos in Sublime. And considering the posts are generally brain vomits it had more typos than most.

So enabling spell checking is sublime is pretty easy.

Open the command palette CMD + SHIFT + P
and go to package control install new package.
Search for Dictionaries and install that.
Then go to preferences --> Settings - User
and add the line
{% highlight bash %}
"spell_check":true,
{% endhighlight %}

And you should get nice little red underlines for your typos.

Another package that seems good is
Google Spell Check

As you can give it a sentence and it uses Google magic to guess the correct spelling given the context.