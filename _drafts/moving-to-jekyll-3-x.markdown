---
layout: "post"
title: "Moving to Jekyll 3.x"
date: "2016-12-16 12:06"
---
So big gap in the posts again, life does have a way of getting in the way of blogging.

Anyway turns out Jekyll has moved on a good bit, I've new machines so I need to set up again
and 'upgrade' the site with anything that is new or breaking.

The recommendations for installing Jekyll changed slightly, bundler seems to be the preferred way
and this I think means you can link it to the version github pages uses which makes great sense to me

The main site just mentions the lines to get started but I found this page

[Setting up Github pages](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/)

The version on Ruby on the Mac is still ancient so update it using
[details in this post]({{ site.baseurl }}{% post_url 2016-02-05-jekyll-stopped-working-then-error-trying-to-install %})

As a quick reminder that's
{% highlight bash linenos%}
brew install rbenv ruby-build
rbenv install 2.3.3
rbenv global 2.3.3
{% endhighlight %}

Then the new method is to install bundler, create a Gemfile and then use bundler to install Jekyll and github-pages

{% highlight bash %}
gem install bundler
vi Gemfile
  source 'https://rubygems.org'
  gem 'github-pages', group: :jekyll_plugins
bundle install
{% endhighlight %}

``` html
<a href="#">Hello world</a>
<a href="#">Hello world</a>
```

And well that seems to be it. My site seems to still work as well as it did before.
