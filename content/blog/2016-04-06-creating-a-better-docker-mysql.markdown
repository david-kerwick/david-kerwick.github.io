---
title: Creating a better Docker mysql
layout: post
date: '2016-04-06T16:30:30'
---
So having played with Docker and the mysql images before it's time to create something that's less of a disposable test.

The idea is to create a mysql instance, preload it with a test database and have a custom mysql config as well.

All will be based off the official Docker image so not to difficult.

Let's start with the Dockerfile and then go through it
``` text
FROM mysql:5.7.11
RUN apt-get update && apt-get install -y vim

COPY mydb.sql /docker-entrypoint-initdb.d/
COPY my-config.cnf /etc/mysql/conf.d/

VOLUME /var/lib/mysql
```

`FROM mysql:5.7.11` the base image.  Picking a tag is a good idea that way you get the same version each time.

`RUN apt-get update && apt-get install -y vim` installs vi, the base image doesn't have a text editor and I wanted one

`COPY mydb.sql /docker-entrypoint-initdb.d/` mydb.sql is your local file that creates your database, tables, etc...

`COPY my-config.cnf /etc/mysql/conf.d/` my-config.cnf is your local file that overrides any of the normal my.cnf mysql stuff that you want.
For example I had to do it for [this problem]({{ site.baseurl }}../2016-04-06-group-by-error-when-updating-mysql)

Once you have your Dockerfile, your local db and config file you can go to that directory and run

``` bash
docker build -t test-sql .
```
The `-t test-sql` tags this build so you can use it later.  It will trundle away and build the image.

Once done you can use it as a base for a container.
For example
``` bash
docker run -d --name container-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password test-sql
```
That should have created the database with your config and you should be good to go.
