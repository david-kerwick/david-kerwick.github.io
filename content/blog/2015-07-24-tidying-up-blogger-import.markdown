---
layout: post
title:  "Tidying up Blogger Import"
date:   '2015-07-24T22:30:36'
categories: 
- blog
- blogger

---
So after the import of Blogger things work but they are an bit of an ugly mess.  The import has taken the compressed html from the rss export feed and added it with some Jekyll front matter. So while this works it would be had to edit going forward.  One of the pages for example looks like this

``` html
    I wanted to log something in bash to the console and to a log file.<br />Turns out there's a command for that<br /><br />tee<br /><br />more information <a href="http://www.linuxmanpages.com/man1/tee.1.php" target="_blank">here</a><br /><br />So a very simple example would be<br /><br /><pre class="brush: bash">ls | tee test.txt<br /></pre><div class="p1"><br />which will display the output of ls to the screen and store the result in the file test.txt.</div><div class="p1"><br /></div><div class="p1">By default it overwrites the file, if you want an ongoing log use the -a option</div><div class="p1"><br /></div><div class="p1"></div><pre class="brush: bash">ls | tee -a test.txt<br /></pre><div class="p1"><br /></div><div class="p1">If you want errors as well, also useful for a log file, redirect stderr to stdout</div><div class="p1"><br /></div><div class="p1"></div><pre class="brush: bash">ls -e 2&gt;&amp;1 | tee -a text.txt<br /></pre><div class="p1"><br /></div><div class="p1">The test.txt file will contain the error about -e being an invalid option</div>
```

Which is one long line of html, bit of a nightmare to edit in a markdown editor.

But like most things there's someone who must have had something similar and has written a tool to convert html to markdown it can be found [here](https://domchristie.github.io/to-markdown/)

This produces the much better looking

``` html
	I wanted to log something in bash to the console and to a log file.  
Turns out there's a command for that  

tee  

more information [here](http://www.linuxmanpages.com/man1/tee.1.php)  

So a very simple example would be  

<pre class="brush: bash">ls | tee test.txt  
</pre>

<div class="p1">  
which will display the output of ls to the screen and store the result in the file test.txt.</div>

<div class="p1">By default it overwrites the file, if you want an ongoing log use the -a option</div>

<pre class="brush: bash">ls | tee -a test.txt  
</pre>

<div class="p1">If you want errors as well, also useful for a log file, redirect stderr to stdout</div>

<pre class="brush: bash">ls -e 2>&1 | tee -a text.txt  
</pre>

<div class="p1">The test.txt file will contain the error about -e being an invalid option</div>
```

So it has gotten rid of the br's, changed the links and added whitespace to make it actually readable.  Happy days and fair play to Dom Christie.

There are still some div's that can be cleaned up and I guess change the code highlighting to the Jekyll way but a good start I think.

Now just to do it for 40 odd posts