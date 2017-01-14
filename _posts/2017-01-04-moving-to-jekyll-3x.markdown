---
layout: "post"
title: "Moving to Jekyll 3.x"
date: "2017-01-04 20:38:07 +0000"
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
{% highlight bash %}
brew install rbenv ruby-build
rbenv install 2.3.3
rbenv global 2.3.3
{% endhighlight %}

Don't forget to follow the cavets it tells you. i.e. add `eval "$(rbenv init -)"` to your profile.

Then the new method is to install bundler, create a Gemfile and then use bundler to install Jekyll and github-pages

{% highlight bash %}
gem install bundler
vi Gemfile
  source 'https://rubygems.org'
  gem 'github-pages', group: :jekyll_plugins
bundle install
{% endhighlight %}

With this the method of running the site seems to have changed to use bundler to preview the site locally

{% highlight bash %}
bundle exec jekyll serve --drafts
{% endhighlight %}

And well that seems to be it. My site seems to still work as well as it did before...

Except there's the odd issue here and there, nothing major by the looks of it. Mainly code highlighting, my blogging nemesis!
I think it's because I have the very old baked in theme and 3.X comes with it's own theme system.

My files will be overriding the default theme but would guess they are a bit outdated. I have also customised it the odd time over the years.
So I think if I'm going to move to Jekyll 3 may as well make the whole big move now, it should hopefully mean easier upgrades in the future... right?

So I think the best way of going about that is to create a blank site with the new generator, add my posts in and then attempt to add back in any customisation I need from the old site.  Remembering what those were and why I did them could be fun, but my theory is if they are not that important they won't show up again or have being fixed by the new theme or they will show up quickly and I'll deal with them then.

I hadn't stayed too far from the defaults so it's a fairly easy process. Set up new site using
{% highlight bash %}
jekyll new my-awesome-site
{% endhighlight %}

Copy in your _drafts, _posts and assets directories

Update your new config file with your title, email, etc...

Copy across the about.md file.

If you are using github-pages which I am, update your Gemfile to use the github-pages gem rather than the Jekyll one.

Test it out and once you are happy, delete everything but the .git folder in your actual blog and copy the new awesome version into it.

Commit that and you should be rocking a clean Jekyll 3 site.

So with the Minima theme that's the Jekyll default rather than [this post]({{ site.baseurl }}{% post_url 2015-06-22-add-google-analytics-to-jekyll %})
you can just add

{% highlight bash %}
google_analytics: <YOUR CODE>
{% endhighlight %}

to your `_config.yml` file.

I'll have to see about adding the Google Tag manager at some point but I'm only using Analytics for now so that's definitely the easy way.
