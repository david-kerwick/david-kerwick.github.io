---
layout: post
title: Turn off the firewall on RedHat linux
date: '2014-03-27T21:06:00.000Z'
author: David Kerwick
---

If you are  having problems connecting with the Weblogic server you have just installed it's worth looking at the firewall, as every good developer knows all problems are either the network or the firewall ;)  

``` bash 
service iptables stop  
chkconfig iptables off  

service ip6tables stop  
chkconfig ip6tables off  
```

A total sledgehammer approach and only for dev machines, I'll come back and work out just the ports and ip's I need in the future... honestly