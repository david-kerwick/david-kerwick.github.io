---
title: Getting PHP Composer working for a legacy project
layout: post
date: 2016-04-11 11:55:46
---
I'm looking at an old PHP project which uses codeigniter.  The repo is huge, over 100mb or something like that.  Which seemed odd when I first looked at it.  Turns out all the dependencies are checked in as there's nothing doing dependency management.  So very strange when coming from the Java / Maven world.

So Composer seems to be the package / dependency manager in PHP land.  Could be wrong but that's what I could find on a quick search, I find not having a 'build' tool very strange.

So what I hope to do is get composer up and running and remove some of the external dependencies from the repo.  I think Codeigniter is too ancient and can't be used as a package so I'll leave it there.  Think version 3 might allow such a thing.

#Installing Composer
There are options on the site but as you may know I'm a fan of homebrew for this kind of thing
so run
{% highlight bash %}
brew install composer
{% endhighlight %}

You should be good to go then.
They suggest a quick and simple test i.e.
create a `composer.json` file in a temp directory add the following to it
{% highlight bash %}
{
    "require": {
        "monolog/monolog": "1.0.*"
    }
}
{% endhighlight %}

Then run 
{% highlight bash %}
composer install
{% endhighlight %}
It should pull down monolog into a vendor directory.

#Finding the packages
Now that composer is installed I need to find the packages used.
You can do that using [https://packagist.org/](https://packagist.org/) which makes it quite simple to find the package based on the folder name on the legacy project.  Finding the correct version proved to be more difficult. Search around for changelog or something like that, failing that try find copyright year and have a guess or it's easy to download different versions so have a go into a temp directory and comparing them. In fact this is the hardest part of the whole process, finding the exact version can be a bit of a pain so perhaps some upgrades are in order.

#Loading the packages.
This seems easy enough as well. Composer creates an autoloading file so I think all you need to do is get Codeigniter to load that.

At the top of your `index.php` file add
{% highlight php %}
include_once './vendor/autoload.php';
{% endhighlight %}
If you had been manually loading the libraries based on a path you may now need to update those files to remove the manual load.

For example if you have a MY_Class in the libraries folder you might have something like the below in a MY_excel file
{% highlight php %}
require_once APPPATH."/third_party/PHPExcel.php"; 
{% endhighlight %}
When you add PHPExcel to composer and use autoload you can remove the above line and `PHPExcel.php` from `third_party`

#Conclusion
So seems straight forward enough and should free up the repo and get closer to only having application code there.  The versions is the 'big' problem but a bit of investigation and testing should sort that out. There's a little bit of manually changes to update how old things were loaded if they weren't using autoload and I guess the impact of having everything on autoload should be looked at as well but so far so good. Guess if that's a problem you can always turn off autoload and load them as needed from the vendor directory.