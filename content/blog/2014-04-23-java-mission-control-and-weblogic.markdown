---
layout: post
title: Java Mission Control and Weblogic Dynamic Server
date: '2014-04-23T20:38:00.002+01:00'
author: David Kerwick
tags:
- weblogic
---

So the problem with dynamic servers is they are dynamic...  
Most of the time this is fine, Weblogic has ways and means of handling them, it assigns dynamic listen ports etc...  
But just say you want to set up Java Mission Control, you need to set up a jmxremote port, fine if you have things on separate addresses and can use the same port.  Not so good if it's all on the one machine and you need different ports.  Weblogic handles it's own ports, but it's up to you to figure something out for jmx.  

I thought `${id}` would work, it does not  
so here is what I have.  
In the setDomainEnv.sh I've added  

``` bash 
echo "Server name is ${SERVER_NAME}"  
if [ "${SERVER_NAME}" = "AdminServer" ] ; then  
 echo "Found AdminServer, no need for jmx port"  

else  
 echo "Found a managed server"  
 SERVER_ID=${SERVER_NAME: -1}  
 export SERVER_ID  
 echo "Server ID is ${SERVER_ID}"  
 JAVA_OPTIONS="${JAVA_OPTIONS} -Djavax.management.builder.initial=weblogic.management.jmx.mbeanserver.WLSMBeanServerBuilder -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false -Dcom.sun.management.jmxremote.port=709${SERVER_ID} -Dcom.sun.management.jmxremote.rmi.port=709${SERVER_ID} -Djava.rmi.server.hostname=gmslx071-vm.sspcrs.intra -Dcom.sun.management.jmxremote.local.only=false"  
 export JAVA_OPTIONS  
fi  
```
