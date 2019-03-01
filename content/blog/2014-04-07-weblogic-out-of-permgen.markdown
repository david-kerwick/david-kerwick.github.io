---
layout: post
title: 'Weblogic out of permgen '
date: '2014-04-07T22:58:00.002+01:00'
author: David Kerwick
tags:
- weblogic
--- 

If you are getting out of memory errors such as  

``` java
####<Apr 7, 2014 10:50:45 PM IST> <Error> <JMX> <myhost.mydomain.ie> <my-server-1> <[ACTIVE] ExecuteThread: '2' for queue: 'weblogic.kernel.Default (self-tuning)'> <<WLS Kernel>> <> <> <1396907445484> <BEA-149501> <An exception occurred while registering the MBean com.bea:Name=AdminServer,Type=WebServiceBuffering,Server=AdminServer,WebService=AdminServer at property WebServiceRequestBufferingQueue.  
java.lang.OutOfMemoryError: PermGen space  
 at java.lang.ClassLoader.defineClass1(Native Method)  
 at java.lang.ClassLoader.defineClass(ClassLoader.java:800)  
 at java.security.SecureClassLoader.defineClass(SecureClassLoader.java:142)  
 at java.net.URLClassLoader.defineClass(URLClassLoader.java:449)  
 at java.net.URLClassLoader.access$100(URLClassLoader.java:71)  
 at java.net.URLClassLoader$1.run(URLClassLoader.java:361)  
 at java.net.URLClassLoader$1.run(URLClassLoader.java:355)  
 at java.security.AccessController.doPrivileged(Native Method)  
 at java.net.URLClassLoader.findClass(URLClassLoader.java:354)  
 at java.lang.ClassLoader.loadClass(ClassLoader.java:425)  
 at sun.misc.Launcher$AppClassLoader.loadClass(Launcher.java:308)  
 at java.lang.ClassLoader.loadClass(ClassLoader.java:358)  
 at java.lang.ClassLoader.defineClass1(Native Method)  
 at java.lang.ClassLoader.defineClass(ClassLoader.java:800)  
 at java.security.SecureClassLoader.defineClass(SecureClassLoader.java:142)  
 at java.net.URLClassLoader.defineClass(URLClassLoader.java:449)  
 at java.net.URLClassLoader.access$100(URLClassLoader.java:71)  
 at java.net.URLClassLoader$1.run(URLClassLoader.java:361)  
 at java.net.URLClassLoader$1.run(URLClassLoader.java:355)  
 at java.security.AccessController.doPrivileged(Native Method)  
 at java.net.URLClassLoader.findClass(URLClassLoader.java:354)  
 at java.lang.ClassLoader.loadClass(ClassLoader.java:425)  
 at sun.misc.Launcher$AppClassLoader.loadClass(Launcher.java:308)  
 at java.lang.ClassLoader.loadClass(ClassLoader.java:358)  
 at weblogic.management.provider.internal.BeanInfoAccessImpl$BeanInterfaceClasses.load(BeanInfoAccessImpl.java:640)  
 at weblogic.management.provider.internal.BeanInfoAccessImpl$BeanInterfaceClasses.initialize(BeanInfoAccessImpl.java:624)  
 at weblogic.management.provider.internal.BeanInfoAccessImpl$BeanInterfaceClasses.contains(BeanInfoAccessImpl.java:592)  
 at weblogic.management.provider.internal.BeanInfoAccessImpl.hasBeanInfo(BeanInfoAccessImpl.java:198)  
 at weblogic.management.mbeanservers.internal.WLSObjectNameManager.isClassMapped(WLSObjectNameManager.java:85)  
 at weblogic.management.jmx.modelmbean.WLSModelMBeanContext.isContainedBean(WLSModelMBeanContext.java:220)  
 at weblogic.management.jmx.modelmbean.WLSModelMBeanFactory.registerWLSModelMBean(WLSModelMBeanFactory.java:140)  
 at weblogic.management.jmx.modelmbean.WLSModelMBeanFactory.registerWLSModelMBean(WLSModelMBeanFactory.java:166)  
>  
```   

With the weblogic admin server, it is likely because the memory settings for the default install are painfully low.  

Edit     

``` bash 
vi /home/weblogic/user_projects/domains/my_domain/bin/startWeblogic.sh
```   
adding in  

``` bash 
MEM_ARGS="-Xms1024m -Xmx1024m -XX:MaxPermSize=512m"
```   
Just before the main comment block seems to be a good place.  

For the managed servers you can add these arguments to the server start section in the admin console. The server start arguments aren't used for the Admin Server as it's started with the above script.
