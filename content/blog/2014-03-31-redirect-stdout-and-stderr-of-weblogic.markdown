---
layout: post
title: Redirect stdout and stderr of Weblogic managed servers
date: '2014-03-31T22:03:00.001+01:00'
author: David Kerwick
tags:
- weblogic
---

As you may have noticed Weblogic is fond of having two log files for each server. A *.out and a *.log. If you have customised the 'Log file name:' of your server you may also wish to move the location and name of these '.out' files.  
You can do this by setting the two values below in the server start arguments  

``` bash
-Dweblogic.Stdout=${serverName}_%yyyy%_%MM%_%dd%_%hhmm%.log  
-Dweblogic.Stderr=${serverName}_%yyyy%_%MM%_%dd%_%hhmm%.log  
```

You can also set  
Redirect stdout logging enabled:  
Redirect stderr logging enabled:  

If you want the redirect the .out content to your .log file
