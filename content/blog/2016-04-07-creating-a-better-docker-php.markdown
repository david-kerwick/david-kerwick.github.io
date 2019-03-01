---
title: Creating a better docker php
layout: post
date: '2016-04-07T09:43:16'
---
Following on from [Creating a better Docker Mysql](../2016-04-06-creating-a-better-docker-mysql) I also needed a proper php server.
This will be based off the official php Docker image, it needs to connect to mysql so needs the drivers set up for that and I think installing xdebug is a good idea as well.

So I'll start with the Dockerfile
``` ruby
FROM php:5.6.19-apache
RUN apt-get update  \
  && apt-get install -y php5-mysql \
  && docker-php-ext-install mysql \
  && pecl install xdebug
RUN echo "zend_extension=$(find /usr/local/lib/php/extensions/ -name xdebug.so)" > /usr/local/etc/php/conf.d/xdebug.ini \
  && echo "xdebug.remote_enable=true" >> /usr/local/etc/php/conf.d/xdebug.ini \
  && echo "xdebug.remote_autostart=1" >> /usr/local/etc/php/conf.d/xdebug.ini \
  && echo "xdebug.remote_host=192.168.208.95" >> /usr/local/etc/php/conf.d/xdebug.ini \
RUN a2enmod rewrite
```

So I'll go through that by line number

1. The base image to base off
2. Start of a set of RUN commands to install items into this image, start with doing an apt-get update.  The `\` is the continuation character that allows this run command to be split over several lines
3. Install the mysql php client
4. Use the script built into the base image to setup mysql for php
5. Install xdebug
6. Another RUN command to set up the xdebug config. This finds the `xdebug.so` line 5 installed and adds it an xdebug.ini file
7. Enable remote debugging in the config file
8. Start debugging 
9. Set the host (this is the ip of your client machine, ideally would want a way of dynamically setting that)
10. Another RUN command to install mod rewrite