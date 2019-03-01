---
layout: post
title: Problem with cmo object in wlst script
date: '2014-04-07T19:29:00.001+01:00'
author: David Kerwick
---

Do you have a script that's giving the error below?  

Or something like it, perhaps no attribute 'getName'?  Does it work fine when you bring wlst up interactively?  


``` python 
Problem invoking WLST - Traceback (innermost last):  
File "/yourScript.py", line 8, in ?  

AttributeError: 'NoneType' object has no attribute 'getServers'  
```

Good chance it's caused by the

``` python 
if __name__ == "main":  
 from wlstModule import *  
```

I found the above recommend [here](http://docs.oracle.com/cd/E15315_09/help/oracle.eclipse.tools.weblogic.doc/html/wlst.html#import)

The bit I missed though was

"the global object cmo will not be available in this mode"

That's why cmo is coming back with NoneType.  One way I found around that is to create your own cmo object like this

``` python 
cmo=cd(pwd())  
```

But I think I'll just remove the import statement, it seems to cause other weirdness and I'm not using OEPE (I tried it isn't worth the hassle IMHO)
