---
layout: post
title: Really slow wlst and adminserver start on weblogic
date: '2014-03-12T21:47:00.000Z'
author: David
tags:
- wlst
- weblogic
modified_time: '2014-03-23T21:42:19.494Z'
blogger_id: tag:blogger.com,1999:blog-2027514548288128942.post-6105794210527833698
blogger_orig_url: http://davidkerwick.blogspot.com/2014/03/really-slow-wlst-and-adminserver-start.html

---

As an alternative to my post [here](http://davidkerwick.blogspot.ie/2014/03/not-enough-entropy-on-redhat.html) instead of feeding /dev/random with data from /dev/urandom you can switch the weblogic components only.

Modify wlsh.sh  
Look for the line  

{% highlight bash cssclass=nowrap%}  
JVM_ARGS="-Dprod.props.file='${WL_HOME}'/.product.properties ${WLST_PROPERTIES} ${JVM_D64} ${UTILS_MEM_ARGS} ${SECURITY_JVM_ARGS} ${CONFIG_JVM_ARGS}"  
{% endhighlight %}

and add  

{% highlight bash %}  
-Djava.security.egd=file:///dev/urandom  
{% endhighlight %}

to the end of it  
or  

{% highlight bash %}  
-Djava.security.egd=file:///dev/./urandom  
{% endhighlight %}

Java has a nice crusty bug  
[http://bugs.java.com/view_bug.do;jsessionid=ff625daf459fdffffffffcd54f1c775299e0?bug_id=6202721](http://bugs.java.com/view_bug.do;jsessionid=ff625daf459fdffffffffcd54f1c775299e0?bug_id=6202721)  

Which they don't class as a bug for some reason, it doesn't do what you ask... yep that's by design and won't be fixed!  Use the hack to confuse it, lovely.
