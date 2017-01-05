---
layout: post
title: Get prettify to behave in Firefox
date: '2012-05-03T23:18:00.000+01:00'
author: David Kerwick
modified_time: '2012-05-03T23:18:13.885+01:00'
---
<div class="note info">
  <h5>I'm not on Blogger anymore</h5>
  <p>So this post doesn't look like it should anymore as it's on Jekyll now</p>
</div>

## Force wrap of long lines in Firefox

So having got Google code prettify working on blogger and being quite happy with myself I was testing it on Firefox bit of a habit I guess.  So all looked well on Chrome but on Firefox the long lines didn't wrap and extended beyond the prettyprint box and beyond the blogger page and even beyond the page for the compressed css I displayed.  This did not sit well with my OCD.

So I initially thought it was the theme I put on, there's no way the google css is wrong right... well sons-of-obsidian.css was totally innocent.

And I guess it's a bit harsh to say prettify.css is wrong.  As it's the pre tag that's the offender.

I guess it's a choice Blogger made to not wrap the pre tag even though it sure looks as ugly as sin when it over flows.  I would also have thought the prettify css would handle it as it's job is to make code look pretty.  When I knew the culprit is was handy to find some [punter](http://www.mitch-solutions.com/blog/16-wrap-text-in-a-tag) that solved the problem.

So back into the well worn path of Template --> Edit HTML in Blogger I added this to the head section

{% highlight css linenos %}
<style type='text/css'>  
   pre {  
      white-space: pre-wrap; /* css-3 */  
      white-space: -moz-pre-wrap; /* Mozilla, since 1999 */  
      white-space: -pre-wrap; /* Opera 4-6 */  
      white-space: -o-pre-wrap; /* Opera 7 */  
      word-wrap: break-word; /* Internet Explorer 5.5+ */  
    }  
</style>  
{% endhighlight %}


Things now look fine in Firefox and I can sleep tonight :)
