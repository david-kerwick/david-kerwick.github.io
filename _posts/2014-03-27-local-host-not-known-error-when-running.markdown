---
layout: post
title: Local host not known error when running wlst scripts
date: '2014-03-27T18:57:00.001Z'
author: David
tags:
- wlst
- weblogic
modified_time: '2014-04-23T22:10:56.204+01:00'
blogger_id: tag:blogger.com,1999:blog-2027514548288128942.post-2986353348164570398
blogger_orig_url: http://davidkerwick.blogspot.com/2014/03/local-host-not-known-error-when-running.html

---

If you are running your own scripts or attempting to run some of the scripts on this blog and you encounter the error  

{% highlight bash %} 
Starting createMachine script ....  
Connecting to t3://hostname:7001 with userid weblogic ...  
This Exception occurred at Sun Mar 23 21:44:02 GMT 2014.  
weblogic.utils.NestedError: Local host not known?!  
Problem invoking WLST - Traceback (innermost last):  
  File "/Oracle/Middleware/Oracle_Home/oracle_common/common/bin/create_machine.py", line 7, in ?  
  File "<iostream>", line 19, in connect  
  File "<iostream>", line 520, in raiseWLSTException  
WLSTException: Error occurred while performing connect : Error connecting to the server : Local host not known?!   
Use dumpStack() to view the full stacktrace :  

{% endhighlight %} 

On the line that connects to the AdminServer, while the error is strange the reason is fairly simple.  The AdminServer isn't running, start it up and you should be back in action again.