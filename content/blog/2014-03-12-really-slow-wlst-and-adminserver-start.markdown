---
layout: post
title: Really slow wlst and adminserver start on weblogic
date: '2014-03-12T21:47:00.000Z'
author: David Kerwick Kerwick
tags:
- wlst
- weblogic
---
As an alternative to my post [here](../2014-03-12-not-enough-entropy-on-redhat) instead of feeding /dev/random with data from /dev/urandom you can switch the weblogic components only.

Modify wlsh.sh  
Look for the line  

``` bash
JVM_ARGS="-Dprod.props.file='${WL_HOME}'/.product.properties ${WLST_PROPERTIES} ${JVM_D64} ${UTILS_MEM_ARGS} ${SECURITY_JVM_ARGS} ${CONFIG_JVM_ARGS}"  
```

and add  

``` bash  
-Djava.security.egd=file:///dev/urandom  
```

to the end of it  
or  

``` bash  
-Djava.security.egd=file:///dev/./urandom  
```

Java has a nice crusty bug  
[https://bugs.java.com/bugdatabase/view_bug.do?bug_id=6202721](https://bugs.java.com/bugdatabase/view_bug.do?bug_id=6202721)  

Which they don't class as a bug for some reason, it doesn't do what you ask... yep that's by design and won't be fixed!  Use the hack to confuse it, lovely.
