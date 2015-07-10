---
layout: post
title: Some nice tee
date: '2014-04-02T11:36:00.000+01:00'
author: David
tags: 
modified_time: '2014-04-02T11:36:16.676+01:00'
blogger_id: tag:blogger.com,1999:blog-2027514548288128942.post-5881358097899897553
blogger_orig_url: http://davidkerwick.blogspot.com/2014/04/some-nice-tee.html

---

I wanted to log something in bash to the console and to a log file.  
Turns out there's a command for that  

tee  

more information [here](http://www.linuxmanpages.com/man1/tee.1.php)  

So a very simple example would be  

{% highlight bash %} 
ls | tee test.txt  
{% endhighlight %}

 
which will display the output of ls to the screen and store the result in the file test.txt.

By default it overwrites the file, if you want an ongoing log use the -a option

{% highlight bash %} 
ls | tee -a test.txt  
{% endhighlight %}

If you want errors as well, also useful for a log file, redirect stderr to stdout

{% highlight bash %} 
ls -e 2>&1 | tee -a text.txt  
{% endhighlight %}

The test.txt file will contain the error about -e being an invalid option