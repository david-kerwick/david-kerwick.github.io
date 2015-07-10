---
layout: post
title: Syntax Highlighter - Remove the lime green help box on blogger
date: '2014-03-11T23:42:00.001Z'
author: David
tags: 
modified_time: '2014-03-11T23:42:38.386Z'
blogger_id: tag:blogger.com,1999:blog-2027514548288128942.post-7267580981600017612
blogger_orig_url: http://davidkerwick.blogspot.com/2014/03/syntax-highlighter-remove-lime-green.html

---

I thought I already had this sorted by setting  

when setting up SyntaxHighlighter.  

but what this does is turn of the toolbar for everything!  

What I found is that if you try to use  

{% highlight html %}   
<pre class="brush: plain; collapse: true">          
	test  
</pre>  
{% endhighlight %}

It won't display the "expand source" as the whole toolbar is hidden  

I believe this css targets the green box and the question mark only, leaving the toolbar available for other functions  

{% highlight css %}    
.syntaxhighlighter div.toolbar span a.toolbar_item{  
	display: none !important;  
}  

.syntaxhighlighter .toolbar {  
	background: none !important;  
}  
{% endhighlight %}

Blogger puts up a fight of course, I couldn't get the custom css to load after the SyntaxHighlighter css, so used `!important` and a very specific rule to get around it.