---
layout: post
title:  "Wrapping code with Jekyll and pygments"
date:   2015-07-24 22:31:29
categories: 
- blog
- blogger

---

So I've been updating my old blogger posts to change them from html to markdown [here]() <!--post_url tidying-up-blogger-import--> and one of the very first things I did with blogger was to try sort out [syntax highlighting]({% post_url 2012-05-03-so-i-decided-to-give-this-blogging %}) and then sort out the [wrapping of lines]({% post_url 2012-05-03-get-prettify-to-behave-in-firefox %}).

So Jekyll has already solved most of these and Pygments does a great job of displaying code easily, when it's actual code, line wrapping doesn't work too well and makes it hard to read the code, Pygments sorts this out by scrolling the code.

But sometimes you want it to wrap because it doesn't matter, exception traces, long config line for example. Either way I want a way of having it wrap lines or not on a case by case basis.

So last time I set it globally by changing how `pre` worked by setting it to `white-space: pre-wrap;` I didn't want to do it globally this time, I want something I can pass to the {% raw %} `{% highlight%}` {% endraw %} block that will switch the behaviour.
	
So the highlight block says there are only two parameter language and linenos, so I had start down the rabbit hole of other options but in fact there are more options allowed for the highlight tag see [here](https://github.com/jekyll/jekyll/blob/master/lib/jekyll/tags/highlight.rb) so the actual options are

{% highlight ruby %}
[:startinline, opts.fetch(:startinline, nil)],
[:hl_linenos,  opts.fetch(:hl_linenos, nil)],
[:linenos,     opts.fetch(:linenos, nil)],
[:encoding,    opts.fetch(:encoding, 'utf-8')],
[:cssclass,    opts.fetch(:cssclass, nil)]
{% endhighlight %}

cssclass being the one I reckoned I want as it allows you to change the class used for the parent `<div>` Pygments creates, the default is the class highlight.

First I add a class to main.scss for the no line wrapping

{% highlight css linenos %}
.nowrap pre {    
      white-space: pre-wrap; /* css-3 */  
      white-space: -moz-pre-wrap; /* Mozilla, since 1999 */  
      white-space: -pre-wrap; /* Opera 4-6 */  
      white-space: -o-pre-wrap; /* Opera 7 */  
      word-wrap: break-word; /* Internet Explorer 5.5+ */  
}  
{% endhighlight %}

So first attempt looked something like this
{% highlight ruby linenos %}
{% raw %}
{% highlight java cssclass=nowrap %}
java.lang.IllegalStateException: LifecycleProcessor not initialized - call 'refresh' before invoking lifecycle methods via the context   
{% endhighlight %}
{% endraw %}
{% endhighlight %}

Which replaces `highlight` with `nowrap` in the output and it wraps the line but I've lost all formatting, yea I want everything

Attempt two, I tried to add the two classes to what is produced

{% highlight ruby linenos %}
{% raw %}
{% highlight java cssclass="hightlight nowrap" %}
java.lang.IllegalStateException: LifecycleProcessor not initialized - call 'refresh' before invoking lifecycle methods via the context   
{% endhighlight %}
{% endraw %}
{% endhighlight %}

But this gives the error
{% highlight bash %}
Liquid Exception: Syntax Error in tag 'highlight' while parsing the following markup: java cssclass="hightlight nowrap" Valid syntax: highlight <lang> [linenos] in
{% endhighlight %}

Thought initially it was something like the cssclass not showing up as one of the options but it seems that the quoted list is only for `hl_linenos` which if for the lines to highlight and therefore only takes numbers.

I spent way too much time trying to figure a way of passing two classes to that option, variables, escaping, try to change it so when it has nowrap it adds hightlight in front, using :before, etc...
All in vain.

Enter SASS, I've heard about it but never actually used it.  It always nesting, inheritance and all sorts in css, so since highlight already has everything defined I just need nowrap to have the same, which turn out to be stupidly simple

I just added the below to main.scss

{% highlight css linenos %}
.nowrap{
  @extend .highlight;
}
{% endhighlight %}

So back to the first attempt and it now wraps the lines and highlights the code.  All very simple in the end