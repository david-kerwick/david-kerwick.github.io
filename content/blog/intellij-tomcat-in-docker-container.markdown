---
layout: 'post'
title: 'IntelliJ working with a Tomcat Docker container'
date: '2019-04-16T13:48:50'
---
I'm in the process of trying out a Tomcat server that's running JDK 11 and rather than deal with multiple VM's on my machine for the moment I want to try the server out locally in a isolated environment.

So packaged with Java 8 but running on Java 11.

To do that Docker made sense. Set up a docker container with Tomcat 9 and JDK 11.

# Connect IntelliJ to Docker
So first is to set up IntelliJ to connect to your docker install, on a Mac this seemed nice and straight forward. Guide [here](https://www.jetbrains.com/help/idea/docker.html)

# Deploy app to a container
That's covered [here](https://www.jetbrains.com/help/idea/deploying-a-web-app-into-an-app-server-container.html#7a841cf4). Now the settings for this is where the real fun is. Seems from the interface the 'Bind Mounts' are only happy with directories. Having a maven build the war was a file within the target directory, so I created a new artifact that was the war in it's own directory and has a stable name (i.e. the version isn't tacked on) the name is the context path so this is handy I think.

# Container settings
Not sure the best way for setting up the settings for Tomcat within the container. The app ran out of memory straight away so first port of call was adding `JAVA_OPTS` to the environment variables section.

```java
-Xss64m
```   

Next was setting up a database connection, this seemed less clean. I added a volume mount for the whole config directory using the settings copied from a local install. So that's

```docker
<LOCAL PATH>:/usr/local/tomcat/conf/
```

It then needs the driver (in this case Oracle). Rather than mount the whole lib folder which seems like the only option under Bind Mounts I added a volume definition to the Run Options section

```docker
-v /Users/David/oracle/ojdbc8.jar:/usr/local/tomcat/lib/ojdbc8.jar
```

So started getting there now. For some reason it failed with a TimeZone error

```java
16-Apr-2019 13:26:23.937 WARNING [main] org.apache.naming.NamingContext.lookup Unexpected exception resolving reference
 java.sql.SQLException: Cannot create PoolableConnectionFactory (ORA-00604: error occurred at recursive SQL level 1
ORA-01882: timezone region  not found
)
	at org.apache.tomcat.dbcp.dbcp2.BasicDataSource.createPoolableConnectionFactory(BasicDataSource.java:735)
	at org.apache.tomcat.dbcp.dbcp2.BasicDataSource.createDataSource(BasicDataSource.java:605)
	at org.apache.tomcat.dbcp.dbcp2.BasicDataSource.getLogWriter(BasicDataSource.java:1110)
	at org.apache.tomcat.dbcp.dbcp2.BasicDataSourceFactory.createDataSource(BasicDataSourceFactory.java:554)
	at org.apache.tomcat.dbcp.dbcp2.BasicDataSourceFactory.getObjectInstance(BasicDataSourceFactory.java:236)
	at org.apache.naming.factory.FactoryBase.getObjectInstance(FactoryBase.java:94)
	at java.naming/javax.naming.spi.NamingManager.getObjectInstance(NamingManager.java:325)
	at org.apache.naming.NamingContext.lookup(NamingContext.java:840)
	at org.apache.naming.NamingContext.lookup(NamingContext.java:159)
	at org.apache.naming.NamingContext.lookup(NamingContext.java:827)
	at org.apache.naming.NamingContext.lookup(NamingContext.java:173)
	at org.apache.catalina.core.NamingContextListener.addResource(NamingContextListener.java:1017)
	at org.apache.catalina.core.NamingContextListener.createNamingContext(NamingContextListener.java:557)
	at org.apache.catalina.core.NamingContextListener.lifecycleEvent(NamingContextListener.java:253)
	at org.apache.catalina.util.LifecycleBase.fireLifecycleEvent(LifecycleBase.java:123)
	at org.apache.catalina.core.StandardServer.startInternal(StandardServer.java:920)
	at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:183)
	at org.apache.catalina.startup.Catalina.start(Catalina.java:634)
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
	at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.base/java.lang.reflect.Method.invoke(Method.java:566)
	at org.apache.catalina.startup.Bootstrap.start(Bootstrap.java:350)
	at org.apache.catalina.startup.Bootstrap.main(Bootstrap.java:492)
Caused by: java.sql.SQLException: ORA-00604: error occurred at recursive SQL level 1
ORA-01882: timezone region  not found
```

Must be something different from the local setting and the docker setup, back to `JAVA_OPTS` and add `-Duser.timezone=GMT`

# Success
So it now runs and I can attempt to hammer the app config until it's happy to run on 8 and 11 as we transition. The thing is though a Spring Boot application runs **very very slowly** way slower than if it was a local install.  I haven't nailed it yet but some of these magic sauce options make it better but not great.  Added to `JAVA_OPTS`

```java
JAVA_OPTS=-XX:MaxMetaspaceSize\=512m -Xmx512m -Xss512m -Djava.security.egd\=file:/dev/./urandom -Duser.timezone\=GMT
```

Random is a known performance problem as there just isn't enough entropy in the container. Normal warnings apply to urandom (it isn't full secure) but the performance on startup is still pretty poor.