---
layout: post
title: 'Bash scripting square brackets and ampersands '
date: '2014-04-03T14:39:00.000+01:00'
author: David Kerwick
---

So I'm trying to create a startup script for Weblogic on Redhat.  
There's a few out there, but I wanted one that did everything I wanted and that I also understood.  
I'm not an admin so this scripting thing is a dark art to me.  

I'll hopefully have the actual script in a later post but for now I noticed alot of the lines below in example init scripts I came across.  

For the start function  

``` bash 
[ ${RETVAL} -eq 0 ] && touch ${LOCKFILE}
```

For the stop function   

``` bash 
[ ${RETVAL} -eq 0 ] && rm -f ${LOCKFILE}
```

So creation and removal of the lock file, problem for me was I didn't quite understand what it was doing exactly, examples and tutorials kind of gloss over it as something to basic to explain, which is fair enough it is a basic built in function, I just didn't know about it.  

In bash [ is a built in command for test it doesn't need the if  
In bash && is a control operator, this says if the previous command is true (exit status 0) continue on  

So the above line is a shortcut for  

``` bash 
if [${RETVAL} -eq 0]; then  
   touch ${LOCKFILE}  
fi  
```
