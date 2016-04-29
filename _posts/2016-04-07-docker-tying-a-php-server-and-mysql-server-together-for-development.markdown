---
title: Docker tying a php server and mysql server together for development
layout: post
date: 2016-04-07 09:58:34
---
Having got individual docker containers up and running doing simple enough things like serving a html page, basic phpinfo and a mysql server it's time to try and tie these things together.

The idea is two containers one with apache/php and the other a mysql server and have one talk to the other.

So a few things more than the basics, need to link containers and there's a bit more setup this time, the php server will need the mysql drivers installed, mysql should init a database, etc...

#Apache / PHP
As mentioned this needs mysql drivers and other config I have a dockerfile and blog post about it [Creating a better Docker PHP]({{ site.baseurl }}{% post_url 2016-04-07-creating-a-better-docker-php %})

#MySql
I created a dockerfile for this that preloads the database based off a sql file etc... blog post about it [Creating a better Docker Mysql]({{ site.baseurl }}{% post_url 2016-04-06-creating-a-better-docker-mysql %})

#Tying it together
To tie it together I'm going to use Docker Compose, sure seems like the correct fit.
It will build and start both servers, in the correct order and link them.

Create a docker-compose.yml
{% highlight yaml %}
version: '2'
services:
  php:
    build: ./php-server
    image: php-img
    ports:
      - "80:80"
    links:
      - an-mysql:an-mysql
    volumes:
      - ./php-server:/var/www/html
  an-mysql:
    build: ./sql
    image: mysql-img
    ports:
      - "3306:3306"
    environment:
      - MYSQL_ROOT_PASSWORD=password
{% endhighlight %}

Basically is takes the normal docker run commands and puts them in the yaml structure.

To run go to the directory with the compose file and run
{% highlight bash %}
docker-compose up
{% endhighlight %}
First time it runs it will build the two containers and start them
You can check up on them by running
{% highlight bash %}
docker-compose ps
{% endhighlight %}

Stop them with 
{% highlight bash %}
docker-compose stop
{% endhighlight %}

And many more see the [docs](https://docs.docker.com/compose/reference/overview/)


