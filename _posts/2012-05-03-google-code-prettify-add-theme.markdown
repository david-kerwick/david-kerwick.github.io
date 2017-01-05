---
layout: post
title: Google Code Prettify - Add a Theme
date: '2012-05-03T22:20:00.000+01:00'
author: David Kerwick
modified_time: '2012-05-03T22:44:51.225+01:00'
---
<div class="note info">
  <h5>I'm not on Blogger anymore</h5>
  <p>So this post doesn't look like it should anymore as it's on Jekyll now</p>
</div>

## Adding a theme to Google Code Prettify

So in my first post I got Google Code Prettify to work, happy days.  I wasn't happy with how it looked though.  Probably to do with the simple theme I picked so that might be changing in the near future.  But i know the prettify has themes so decided to add in one.

[Gallery of themes](http://google-code-prettify.googlecode.com/svn/trunk/styles/index.html)

The Sons-Of-Obsidian looks like the one for me. So the theory should be to modify the instructions from my [first post]({{ site.baseurl }}{% post_url 2012-05-03-so-i-decided-to-give-this-blogging %})
So went to Template --> Edit HTML and added this to the head section after your prettify.css entry



	<link href="http://google-code-prettify.googlecode.com/svn/trunk/styles/sons-of-obsidian.css" rel="stylesheet" type="text/css"></link>  


As an aside you can't just paste the likes of the html code above into the post, but that's another post.  

So I thought this would work but it didn't.  I could see the entry in the html using Firebug and I could see it download the file but it didn't show up as a css for some reason.  Tried in chrome as well just to be sure and again the response body showed the file downloaded but blank in the css section.  

So decided to get old school on it's ass and include it inline.  
Rather than have all the spaces I ran the css through a [compressor](http://www.csscompressor.com/)  

I kept the comment header of course, the compressor will strip that   

{%highlight css linenos%}
<style type='text/css'>  
 /*  
 * Derived from einaros&#39;s Sons of Obsidian theme at  
 * http://studiostyl.es/schemes/son-of-obsidian by  
 * Alex Ford of CodeTunnel:  
 * http://CodeTunnel.com/blog/post/71/google-code-prettify-obsidian-theme  
 */   

.kwd{color:#93C763}.com{color:#66747B}.typ{color:#678CB1}.lit{color:#FACD22}.tag{color:#8AC763}.atn{color:#E0E2E4}.dec{color:purple}pre.prettyprint{border:0 solid #888}ol.linenums{margin-top:0;margin-bottom:0}.prettyprint{background:#000}li.L0,li.L1,li.L2,li.L3,li.L4,li.L5,li.L6,li.L7,li.L8,li.L9{color:#555;list-style-type:decimal}li.L1,li.L3,li.L5,li.L7,li.L9{background:#111}.str,.atv{color:#EC7600}.pun,.pln{color:#F1F2F3}@media print{.com{color:#600;font-style:italic}.typ{color:#404;font-weight:700}.lit{color:#044}.pun{color:#440}.pln{color:#000}.atn{color:#404}.str,.atv{color:#060}.kwd,.tag{color:#006;font-weight:700}}  
</style>  
{% endhighlight %}

And that worked, I now have pretty prettified code.
