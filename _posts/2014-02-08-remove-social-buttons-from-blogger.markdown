---
layout: post
title: Remove the social buttons from Blogger Dynamic Views
date: '2014-02-08T00:02:00.003Z'
author: David Kerwick
modified_time: '2014-02-08T00:11:15.167Z'
---

<div class="note info">
  <h5>I'm not on Blogger anymore</h5>
  <p>So this post doesn't look like it should anymore as it's on Jekyll now</p>
</div>

The layout section has an option to not display the buttons for Twitter, Facebook and Google Plus but it seems to be ignored in Dynamic Views.  

It pretty easy to remove them, several blogs cover it i just wanted to note it for myself really as I seem to have lost the custom css a few times already.  

Go to Template --> Customise --> Advanced --> Add CSS  
And add the line

{% highlight css %}
.share-controls {display:none !important;}  
{% endhighlight %}
