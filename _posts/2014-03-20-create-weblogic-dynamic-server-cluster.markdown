---
layout: post
title: Create a Weblogic dynamic server cluster using WLST
date: '2014-03-20T23:06:00.002Z'
author: David Kerwick
tags:
- wlst
- weblogic
---

Continuing my little series of posts on using wlst, [how to create a domain]( {% post_url 2014-03-19-create-new-weblogic-domain-using-wlst %}) and [how to add a machine]( {% post_url 2014-03-20-create-machine-for-weblogic-with-wlst %}) the below will set up a dynamic server cluster.  This is a new feature for Weblogic 12C 12.1.2.  

You can find more details on the dynamic cluster [here](http://docs.oracle.com/middleware/1212/wls/INTRO/clustering.htm#BABJGIBI).  In brief it allows you to grow and shrink the number of available managed servers, with each managed server based on a template.

{% highlight python %}
if __name__ == '__main__':  
    from wlstModule import *  

connect('weblogic', 'weblogic1', 't3://myhost.mydomain.ie:7001')  
edit()  
startEdit()  

dynamicServerTemplate = cmo.createServerTemplate('my-server-template')  
dynamicServerTemplate.setAcceptBacklog(2000)  
dynamicServerTemplate.setAutoRestart(true)  
dynamicServerTemplate.setRestartMax(1)  
dynamicServerTemplate.setStartupTimeout(600)  
dynamicServerTemplate.setAutoKillIfFailed(true)  
dynamicServerTemplate.getOverloadProtection().setFailureAction('force-shutdown')  
dynamicServerTemplate.getOverloadProtection().setPanicAction('system-exit')  
# Set whatever settings best suit the memory on the system and what you what to do with this server  
#I believe MaxPermSize should be half the max heap  
#The urandom is covered in another post  
dynamicServerTemplate.getServerStart().setArguments(  
    '-Xmx2048m -Xms2048m -XX:+UseG1GC -XX:MaxPermSize=1024m -Djava.security.egd=file:///dev/./urandom')  
dynamicServerTemplate.getLog().setFileName('${serverName}_%yyyy%_%MM%_%dd%_%hhmm%.log')  
dynamicServerTemplate.getLog().setRotationType('byTime')  
dynamicServerTemplate.getLog().setRedirectStderrToServerLogEnabled(true)  
dynamicServerTemplate.getLog().setRedirectStdoutToServerLogEnabled(true)  
dynamicServerTemplate.getWebServer().getWebServerLog().setFileName('${serverName}_access_%yyyy%_%MM%_%dd%_%hhmm%.log')  
dynamicServerTemplate.getWebServer().getWebServerLog().setRotationType('byTime')  

dynCluster = cmo.createCluster('my-cluster')  
dynCluster.getOverloadProtection().setFailureAction('force-shutdown')  
dynCluster.getOverloadProtection().setPanicAction('system-exit')  
dynServers = dynCluster.getDynamicServers()  
dynServers.setMaximumDynamicServerCount(1)  
dynServers.setServerTemplate(dynamicServerTemplate)  

dynServers.setServerNamePrefix('my-server-')  

dynServers.setCalculatedMachineNames(true)  
dynServers.setCalculatedListenPorts(true)  

activate(block="true")  

exit()  

{% endhighlight %}


One thing worth mentioning a bit more is the log file names.  
As the servers an dynamically created based on the prefix, in this case my-server-1, my-server-2, etc... you can use a variable made available by Weblogic ${serverName} which will have this dynamically created name.  
The filepattern can be of your choosing and is used when the log files are rotated, the pattern replaced with the actual date values.  
So for example the logs for my-server--1 would be  
`my-server-1_yyyy_MM_dd_hhmm.log`  
Bit of an eye full, but when rotated the old one becomes  
`my-server-1_2014_03_20_0000.log`  
Which I find better than the sequence number which is the default
