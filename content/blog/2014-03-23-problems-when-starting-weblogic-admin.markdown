---
layout: post
title: Problems when starting the Weblogic admin server
date: '2014-03-23T23:04:00.003Z'
author: David Kerwick
tags:
- weblogic
---

If you have been following my little series on installing weblogic or you have used the configuration wizard and encounter the error below when trying to start the server with the startWeblogic.sh script I detail a possible cause and solution below  

First here is the error you will get  

``` java
<23-Mar-2014 21:46:08 o'clock GMT> <Error> <Security> <BEA-090870> <The realm "myrealm" failed to be loaded: weblogic.security.service.SecurityServiceException: java.lang.ExceptionInInitializerError.  
weblogic.security.service.SecurityServiceException: java.lang.ExceptionInInitializerError  
 at weblogic.security.service.CSSWLSDelegateImpl.initializeServiceEngine(CSSWLSDelegateImpl.java:341)  
 at weblogic.security.service.CSSWLSDelegateImpl.initialize(CSSWLSDelegateImpl.java:220)  
 at weblogic.security.service.CommonSecurityServiceManagerDelegateImpl.InitializeServiceEngine(CommonSecurityServiceManagerDelegateImpl.java:1812)  
 at weblogic.security.service.CommonSecurityServiceManagerDelegateImpl.initializeRealm(CommonSecurityServiceManagerDelegateImpl.java:447)  
 at weblogic.security.service.CommonSecurityServiceManagerDelegateImpl.loadRealm(CommonSecurityServiceManagerDelegateImpl.java:845)  
 Truncated. see log file for complete stacktrace  
Caused By: java.lang.ExceptionInInitializerError  
 at com.octetstring.vde.util.guid.GuidGenerator.nextGuidInBytes(GuidGenerator.java:125)  
 at com.octetstring.vde.util.guid.Guid.<init>(Guid.java:84)  
 at com.octetstring.vde.backend.standard.BackendStandard.add(BackendStandard.java:378)  
 at com.octetstring.vde.backend.BackendHandler.add(BackendHandler.java:460)  
 at com.octetstring.vde.util.LDIF.importLDIF(LDIF.java:279)  
 Truncated. see log file for complete stacktrace  
Caused By: java.lang.NullPointerException  
 at java.lang.System.arraycopy(Native Method)  
 at com.octetstring.vde.util.guid.GuidParamGenerator.generateNodeID(GuidParamGenerator.java:47)  
 at com.octetstring.vde.util.guid.GuidStateManager.initializeGUIDParameters(GuidStateManager.java:59)  
 at com.octetstring.vde.util.guid.GuidStateManager.<init>(GuidStateManager.java:30)  
 at com.octetstring.vde.util.guid.GuidStateManager.<clinit>(GuidStateManager.java:23)  
 Truncated. see log file for complete stacktrace  
>   
<23-Mar-2014 21:46:08 o'clock GMT> <Notice> <Security> <BEA-090082> <Security initializing using security realm myrealm.>   
<23-Mar-2014 21:46:08 o'clock GMT> <Critical> <WebLogicServer> <BEA-000362> <Server failed. Reason:   

There are 1 nested errors:  

weblogic.security.service.SecurityServiceRuntimeException: [Security:090399]Security services unavailable  
 at weblogic.security.service.CommonSecurityServiceManagerDelegateImpl.doBootAuthorization(CommonSecurityServiceManagerDelegateImpl.java:921)  
 at weblogic.security.service.CommonSecurityServiceManagerDelegateImpl.initialize(CommonSecurityServiceManagerDelegateImpl.java:1058)  
 at weblogic.security.service.SecurityServiceManager.initialize(SecurityServiceManager.java:873)  
 at weblogic.security.SecurityService.start(SecurityService.java:148)  
 at weblogic.t3.srvr.SubsystemRequest.run(SubsystemRequest.java:64)  
 at weblogic.work.ExecuteThread.execute(ExecuteThread.java:295)  
 at weblogic.work.ExecuteThread.run(ExecuteThread.java:254)  

>   
<23-Mar-2014 21:46:08 o'clock GMT> <Notice> <WebLogicServer> <BEA-000365> <Server state changed to FAILED.>   
<23-Mar-2014 21:46:08 o'clock GMT> <Error> <WebLogicServer> <BEA-000383> <A critical service failed. The server will shut itself down.>   
<23-Mar-2014 21:46:08 o'clock GMT> <Notice> <WebLogicServer> <BEA-000365> <Server state changed to FORCE_SHUTTING_DOWN.>   
Stopping Derby server...  
Derby server stopped.  
```

The problem can be caused by weblogic not been able to look up your hostname. So if for example you ran the script to create the domain and your admin server listen address is '   
myhost.mydomain.ie' this needs to be resolvable.  
So on Redhat set the hostname in  

`/etc/sysconfig/network`


and have an entry in  

`/etc/hosts`
