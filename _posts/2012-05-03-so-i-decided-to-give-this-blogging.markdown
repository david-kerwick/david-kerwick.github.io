---
layout: post
title: Blogger Getting Started
date: '2012-05-03T21:28:00.000+01:00'
author: David
tags: 
modified_time: '2014-02-07T21:28:51.976Z'
blogger_id: tag:blogger.com,1999:blog-2027514548288128942.post-9137449142306761871
blogger_orig_url: http://davidkerwick.blogspot.com/2012/05/so-i-decided-to-give-this-blogging.html

---

<div class="note info">
  <h5>I'm not on Blogger anymore</h5>
  <p>So this post doesn't look like it should anymore as it's on Jekyll now</p>
</div>

## Blogger Getting Started

So I decided to give this blogging thing a go.  Mainly so that when I figure out something I'll have a place to find it again and in theory should help me document the process of doing things etc...  

So I decided to go with blogger, Wordpress is good of course but I have a Google account and sure it seems to offer more customisation... kind of.  

So first order to business was code highlighting, I reckon I will be posting code so I want it to look pretty and be readable etc... So it turns out there are loads of options for this but two seem to stand out  

**SyntaxHighlighter**  
[http://alexgorbatchev.com/SyntaxHighlighter/](http://alexgorbatchev.com/SyntaxHighlighter/)  
Which sure seems to have alot of hits on Google  

**Google Code Prettify**  
[http://code.google.com/p/google-code-prettify/](http://code.google.com/p/google-code-prettify/)  
Used on Google code and stackoverflow it seems  

So maybe because I'm used to seeing it on stackoverflow I think I'll try the google code prettify and sure it's another Google project so it'll be easy to integrate into Blogger right?  

So how does random code look in normal mode  

    /** * @author David Kerwick * Created 3 May 2012 */public class HelloWorld {        public void hi(){        System.out.println("Hello Blogger");    }}

Not bad really, a bit dull though and as soon as the code got longer it would be hard to read.  
I also had to get the HelloWorld in, it just won't feel right starting without it :)  

So how to add the highlighting.  Like most things I'm way behind the curve so it was easy find other people who had added it.  

[Adding SyntaxHighlighter](http://oneqonea.blogspot.com/2012/04/how-do-i-add-syntax-highlighting-to-my.html)  
[Adding Google Code Prettify](http://www.milesdennis.com/2010/02/adding-googles-code-prettify-in-blogger.html)  

So first roadblock, that sure didn't take long, I haven't even finished my first post!  
The Edit HTML button they both speak of in the Template section is greyed out.  
Turns out Dynamic Views don't allow the addition of third party scripts or css.  
Bummer.  

So you can do get it working  
[http://www.alexconrad.org/2011/12/highlight-code-with-bloggers-dynamic.html](http://www.alexconrad.org/2011/12/highlight-code-with-bloggers-dynamic.html)  

But that's a bit of a hack I think, so Dynamic Views it was nice not to use you, time to switch to something else. Switched to a simple view and now this should work   

<pre class="prettyprint linenums">/**  
 * @author David Kerwick  
 * Created 3 May 2012  
 */  

public class HelloWorld {  

    public void hi(){  
        System.out.println("Hello Blogger");  
    }  
}</pre>

Which it does, happy days all praise the Internet. It looks butt ugly now time to try figure out themes on prettify, another post perhaps