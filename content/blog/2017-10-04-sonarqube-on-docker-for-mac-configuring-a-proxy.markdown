---
layout: post
title: 'Sonarqube on Docker for Mac configuring a proxy '
date: '2017-10-04T22:50:00'
---

Docker is very handy for throwing up a server and playing around with things, running things locally etc...

One of the things I've been using it for is to run Sonarqube to check some of my projects. They have a official image so it's handy to pull down and start, I ain't to bothered about the database being temporary or losing history when I upgrade etc...

So the next thing was getting it to work in work, behind the evil proxy.

I have cntlm installed on the host to deal with most of the madness of the proxy (authentication and what not)

The 'trick' as to configure sonarqube to use it.  There's a way of passing environment variables to the container when you first run it, but for proxies docker for mac supposedly handles that. It's sonarqube that needs the settings.

You need to edit `/opt/sonarqube/conf/sonar.properties` and set the http.proxy settings in there.

i.e.

```
# HTTP proxy (default none)
http.proxyHost=docker.for.mac.localhost
http.proxyPort=3128
```

Another thing I found is to use `docker.for.mac.localhost` which is a handy way of getting the IP address of the host inside a container.

Restart and you should be good to go, able to update plugins etc...
