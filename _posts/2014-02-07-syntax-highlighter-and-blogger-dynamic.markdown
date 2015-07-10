---
layout: post
title: Syntax Highlighter and Blogger Dynamic Views
date: '2014-02-07T21:07:00.000Z'
author: David
tags: 
modified_time: '2014-02-08T00:42:24.029Z'
blogger_id: tag:blogger.com,1999:blog-2027514548288128942.post-813946794684265812
blogger_orig_url: http://davidkerwick.blogspot.com/2014/02/syntax-highlighter-and-blogger-dynamic.html

---

<div class="note info">
  <h5>I'm not on Blogger anymore</h5>
  <p>So this post doesn't look like it should anymore as it's on Jekyll now</p>
</div>

The last time I looked at this it was a bit of a pain to get highlighters working with dynamic views, as you couldn't edit the html template.  That seems to have changed so time to add syntaxhighlighter to the mix  

Found it could be done at  
[http://kevin-junghans.blogspot.ie/2013/01/adding-syntaxhighlighter-to-blogger.html](http://kevin-junghans.blogspot.ie/2013/01/adding-syntaxhighlighter-to-blogger.html)  

I decided it would be good to change it to use the loader function and here is what I ended up with.  

Go to Template --> Edit Html  
At the end of the head tag add

{% highlight html lineno %}
	<link href=’http://alexgorbatchev.com/pub/sh/current/styles/shCore.css’ rel=’stylesheet’ type=’text/css‘/>
<link href=’http://alexgorbatchev.com/pub/sh/current/styles/shThemeDefault.css’ rel=’stylesheet’ type=’text/css‘/>
<script src=’http://alexgorbatchev.com/pub/sh/current/scripts/shCore.js’ type=’text/javascript‘/>
<script src=’http://alexgorbatchev.com/pub/sh/current/scripts/shAutoloader.js’ type=’text/javascript‘/>
<script language=’javascript’>
 SyntaxHighlighter.config.bloggerMode = true; 
 SyntaxHighlighter.defaults.toolbar = false;
 function loadSHL(){
 SyntaxHighlighter.autoloader(
 ‘applescript http://alexgorbatchev.com/pub/sh/current/scripts/shBrushAppleScript.js’,
 ‘actionscript3 as3 http://alexgorbatchev.com/pub/sh/current/scripts/shBrushAS3.js’,
 ‘bash shell http://alexgorbatchev.com/pub/sh/current/scripts/shBrushBash.js’,
 ‘coldfusion cf http://alexgorbatchev.com/pub/sh/current/scripts/shBrushColdFusion.js’,
 ‘cpp c http://alexgorbatchev.com/pub/sh/current/scripts/shBrushCpp.js’,
 ‘c# c-sharp csharp http://alexgorbatchev.com/pub/sh/current/scripts/shBrushCSharp.js’,
 ‘css http://alexgorbatchev.com/pub/sh/current/scripts/shBrushCss.js’,
 ‘delphi pascal http://alexgorbatchev.com/pub/sh/current/scripts/shBrushDelphi.js’,
 ‘diff patch pas http://alexgorbatchev.com/pub/sh/current/scripts/shBrushDiff.js’,
 ‘erl erlang http://alexgorbatchev.com/pub/sh/current/scripts/shBrushErlang.js’,
 ‘groovy http://alexgorbatchev.com/pub/sh/current/scripts/shBrushGroovy.js’,
 ‘java http://alexgorbatchev.com/pub/sh/current/scripts/shBrushJava.js’,
 ‘jfx javafx http://alexgorbatchev.com/pub/sh/current/scripts/shBrushJavaFX.js’,
 ‘js jscript javascript http://alexgorbatchev.com/pub/sh/current/scripts/shBrushJScript.js’,
 ‘perl pl http://alexgorbatchev.com/pub/sh/current/scripts/shBrushPerl.js’,
 ‘php http://alexgorbatchev.com/pub/sh/current/scripts/shBrushPhp.js’,
 ‘text plain http://alexgorbatchev.com/pub/sh/current/scripts/shBrushPlain.js’,
 ‘py python http://alexgorbatchev.com/pub/sh/current/scripts/shBrushPython.js’,
 ‘ruby rails ror rb http://alexgorbatchev.com/pub/sh/current/scripts/shBrushRuby.js’,
 ‘sass scss http://alexgorbatchev.com/pub/sh/current/scripts/shBrushSass.js’,
 ‘scala http://alexgorbatchev.com/pub/sh/current/scripts/shBrushScala.js’,
 ‘sql http://alexgorbatchev.com/pub/sh/current/scripts/shBrushSql.js’,
 ‘vb vbnet http://alexgorbatchev.com/pub/sh/current/scripts/shBrushVb.js’,
 ‘xml xhtml xslt html http://alexgorbatchev.com/pub/sh/current/scripts/shBrushXml.js’ );
 SyntaxHighlighter.all();
 };
</script>
{% endhighlight %}

  
<strike>Then at the end of each post add</strike> (See Update below)  

{% highlight html lineno %}
<script type="text/javascript">  
 loadSHL();  
</script>  
{% endhighlight %}

Which will call the function you added above, it should only load the brushes you have used in the page.  

**Example of the Java style**

{% highlight java lineno %}
/**
 * @author David Kerwick
 * Created on 07 Feb 2014
 */
 
public interface HelloWorld {
   void sayHello();
}
{% endhighlight %}
# UPDATE:  
So it turns out the above will work on one page, because Dynamic Views display several posts on 'one page' things go to crap, the loader gets the first set of brushes then doesn't load the rest.  I'm beginning to remember why I didn't use them in the last time.  
Anyway this seems to work

{% highlight html lineno %}
<script>
$(window.blogger.ui()).on(‘viewitem’, function (event, post, element) {
 loadSHL();
});
</script>
{% endhighlight %}

 
It has the advantage of not needing to and loadSHL to the end of every post as well.