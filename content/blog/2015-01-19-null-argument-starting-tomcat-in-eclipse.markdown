---
layout: post
title: Null Argument Starting Tomcat in Eclipse
date: '2015-01-19T20:16:00.004Z'
author: David Kerwick
---

Every now and again I've start getting error's when trying to start Tomcat from within Eclipse.  
Pretty much no project will work it just gives  

Null Argument  

Looking in the workspace log I get  
``` java
!ENTRY org.eclipse.wst.server.core 4 0 2015-01-09 09:40:13.365  
!MESSAGE Could not publish to the server.  
!STACK 0  
org.eclipse.core.runtime.AssertionFailedException: null argument:  
 at org.eclipse.core.runtime.Assert.isNotNull(Assert.java:85)  
 at org.eclipse.core.runtime.Assert.isNotNull(Assert.java:73)  
 at org.eclipse.core.runtime.Path.initialize(Path.java:577)  
 at org.eclipse.core.runtime.Path.<init>(Path.java:163)  
 at org.eclipse.jst.server.tomcat.core.internal.TomcatServerBehaviour.publishDir(TomcatServerBehaviour.java:335)  
 at org.eclipse.jst.server.tomcat.core.internal.TomcatServerBehaviour.publishModule(TomcatServerBehaviour.java:268)  
 at com.vmware.vfabric.ide.eclipse.tcserver.internal.core.TcServerBehaviour.publishModule(TcServerBehaviour.java:471)  
 at org.eclipse.wst.server.core.model.ServerBehaviourDelegate.publishModule(ServerBehaviourDelegate.java:1091)  
 at org.eclipse.wst.server.core.model.ServerBehaviourDelegate.publishModules(ServerBehaviourDelegate.java:1183)  
 at org.eclipse.wst.server.core.model.ServerBehaviourDelegate.publish(ServerBehaviourDelegate.java:987)  
 at org.eclipse.wst.server.core.model.ServerBehaviourDelegate.publish(ServerBehaviourDelegate.java:774)  
 at org.eclipse.wst.server.core.internal.Server.publishImpl(Server.java:3157)  
 at org.eclipse.wst.server.core.internal.Server$PublishJob.run(Server.java:345)  
 at org.eclipse.core.internal.jobs.Worker.run(Worker.java:54)  
```
I didn't really have time the first time to look at it I needed to upgrade the server anyway and installing a new server solved the problem.  

But it happened again.  

Searching Google I found someone with a work around.  

Double click on the server in the Servers tab which will bring up the servers properties page.  

Under Server Options click "Serve modules without publishing"  
The server should now at least start.  

You'll soon find this setup is a bit of a pain as it tries to hot deploy as soon as you make a change and I find making several changes at once confuses the crap out of it.  

So rather than reinstall again I started trying several things I'm not such if only one of these will solve it but doing both worked for me. The problem seems to follow a lockup and forced quit of the workspace so some files must get out of whack.  

Go to   

`workspace/.metadata/.plugins/org.eclipse.wst.server.core`  

and delete the tmp folders to find there.  

Go to the 'instance' folder, I think this changes depending on your install I'm actually using vFabric server so it's under the folder the server is extracted to so something like  

`vfabric-tc-server-developer-2.9.6.RELEASE/base-instance/ `

I think raw Tomcat would be under /.metadata/.plugins/ somewhere  

Once there I deleted any references to projects in my workspace  

So anything in  

`conf/Catalina/localhost/`  
`wtpwebapps/`  

And I was back in action again, your mileage may vary.
