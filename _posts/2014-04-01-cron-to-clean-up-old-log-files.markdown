---
layout: post
title: Cron to clean up old log files
date: '2014-04-01T14:05:00.001+01:00'
author: David
tags: 
modified_time: '2014-04-01T14:05:21.430+01:00'
blogger_id: tag:blogger.com,1999:blog-2027514548288128942.post-5137943719103691496
blogger_orig_url: http://davidkerwick.blogspot.com/2014/04/cron-to-clean-up-old-log-files.html

---

If you run a few Weblogic dev server installs like the ones set up with the scripts in other parts of this blog, or just dev servers in general there's a good chance there's old and useless log files you can get rid of. Mainly because they cause clutter and make it harder to find what you are actually looking for.  

The find command with it's set of magic arguments will be your friend in this case.  

So lets layer this up  

{% highlight bash %} 
find /your/log/dir  
{% endhighlight %}

Will return all files and directories in and under your log directory, which is probably too much  

{% highlight bash %} 
find /your/log/dir -maxdepth 1
{% endhighlight %}

Will keep the depth to just your log directory  

We are only interested in files not directories  

{% highlight bash %} 
find /your/log/dir -maxdepth 1 -type f
{% endhighlight %}

Will restrict find to just files.  

Now we don't want all just the older ones  

{% highlight bash %} 
find/your/log/dir -maxdepth 1 -type f -mtime +7
{% endhighlight %}

Will list files modified over 7 days ago  

Then to restrict to you certain log files, for example I have my weblogic access logs set up as `${serverName}_access_%yyyy%_%MM%_%dd%_%hhmm%.log`  
So I can find just them using  

{% highlight bash %} 
find /your/log/dir -maxdepth 1 -type f -mtime +7 -regex  ".*access_[0-9]+_[0-9]+_[0-9]+_[0-9]+\.log"
{% endhighlight %}

Once you are happy that is is finding the files you want to get rid of it's time to start deleting.  It's best to get the find itself right first because if you go directly to the deleting you might end up taking too much.  

{% highlight bash %} 
find /your/log/dir -maxdepth 1 -type f -mtime +7 -regex ".*access_[0-9]+_[0-9]+_[0-9]+_[0-9]+\.log" -exec rm {} \;
{% endhighlight %}

-exec runs the command you specify, in this case rm, {} will be replaced with the file find found \; tells exec it's done.  

Once you are happy with that it's handy enough add them to a cron job, having individual lines means you can have different time frames for the different logs  

{% highlight bash %} 
# Remove old log files  
# Remove access logs  
30 01 * * * find /your/log/dir -maxdepth 1 -type f -mtime +7 -regex ".*access_[0-9]+_[0-9]+_[0-9]+_[0-9]+\.log" -exec rm {} \;  
# Remove server logs  
30 01 * * * find /your/log/dir -maxdepth 1 -type f -mtime +7 -regex ".*_[0-9]+_[0-9]+_[0-9]+_[0-9]+\.log" -exec rm {} \;  
# Remove application logs  
30 01 * * * find /your/log/dir -maxdepth 1 -type f -mtime +7 -regex ".*.log\.[0-9]+-[0-9]+-[0-9]+" -exec rm {} \;  
{% endhighlight %}