---
layout: post
title: >-
  Error on Weblogic deploying Spring Boot Unable to access the selected
  application
date: '2017-10-03T15:43:00'
---

When trying to deploy a new Spring Boot application on Weblogic the console gave the rather helpful error

```
Unable to access the selected application
Unmarshaller failed
Unmarshaller failed
```

After hunting around in the logs I found this smoking gun.

> ####<Mar 9, 2017 2:22:21 PM GMT> <Error> <Munger> <test.weblogic.intra> <AdminServer> <[ACTIVE] ExecuteThread: '5' for queue: 'weblogic.kernel.Default (self-tuning)'> <weblogic> <> <> <1489069341505> <BEA-2156200> <Unable to load descriptor weblogic.utils.classloaders.GenericClassLoader@6f824b97 finder: weblogic.utils.classloaders.CodeGenClassFinder@11a02cde annotation: /WEB-INF/lib/tomcat-embed-websocket-8.5.11.jar!/META-INF/web-fragment.xml of module my-api-1.0.0-SNAPSHOT.war. The error is weblogic.descriptor.DescriptorException: Unmarshaller failed


So what's the embedded server doing there, I don't need it so I removed it from the pom...

Well, removing

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-tomcat</artifactId>
    <scope>provided</scope>
</dependency>
```

Means it will be added...

So you need to leave it as provided so it doesn't add it for you.

Computing is logical and understandable I swear.
