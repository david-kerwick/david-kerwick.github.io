---
layout: post
title:  "Importing Blogger into Jekyll"
date:   2015-06-24 18:00:00
categories: 
- blog
- google

---

So I believe I have the basics up and running I have the [blog published on github]({% post_url 2015-06-17-publishing-blog-on-github %}) and I have [analytics added]({% post_url 2015-06-22-add-google-analytics-to-jekyll %}) so the next thing is too import all my old Blogger posts, now there isn't that many I'm not exactly a prolific blogger.

The Jekyll project has a set of importers for other blogs, blogger included, instructions are [here](http://import.jekyllrb.com/docs/blogger/)

## Install jekyll import

{% highlight console%}
sudo gem install jekyll-import
Password:
Fetching: fastercsv-1.5.5.gem (100%)
Successfully installed fastercsv-1.5.5
Fetching: jekyll-import-0.7.1.gem (100%)
Successfully installed jekyll-import-0.7.1
Parsing documentation for fastercsv-1.5.5
Installing ri documentation for fastercsv-1.5.5
Parsing documentation for jekyll-import-0.7.1
Installing ri documentation for jekyll-import-0.7.1
2 gems installed
{% endhighlight%}

## Export Blogger
[Follow instructions here](https://support.google.com/blogger/answer/97416)## Import Blogger

{% highlight ruby%}
ruby -rubygems -e 'require "jekyll-import";
    JekyllImport::Importers::Blogger.run({
      "source"                => "//Users/David/Downloads/blog-06-23-2015.xml",
      "no-blogger-info"       => false, # not to leave blogger-URL info (id and old URL) in the front matter
      "replace-internal-link" => true, # replace internal links using the post_url liquid tag.
    })'
{% endhighlight%}## Done
While it has worked it's all different kinds of ugly.  Well it's eye of the beholder stuff I guess after getting used to blogging in markdown the giant blocks of html sure look terrible now and will be a real pain to update. All internal links to my own pages still seem to point to the Blogger version, guess the internal link detection has a few terms and conditions I didn't obey when using Blogger and lastly all the images still seem to be hosted on Blogger as well. Done doesn't mean done as I'm still dependent on Blogger, but the initial import was easy.