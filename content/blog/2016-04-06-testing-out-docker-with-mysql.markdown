---
title: Testing out Docker with mysql
layout: post
date: '2016-04-06T15:22:42'
---
Now things will start to get interesting I imagine.  So far getting apache and php up and running on Docker has been pretty handy.  It's been easy getting them running and mounting the local source.

It's now time to look at the mysql database part, which will need either persisted data over each run or a way of initialising into a known state, I guess it depends on if you are using it for development or testing.

I'm interested in development for now so a little bit of both I think, I want the database structure in place when I create the image and want the data entered to persist during my development.

So may as well pull down the official image now
``` bash
docker pull mysql
```

To get started lets just create a running server we can connect to and play with so at least we have that bit down and are happy.

``` bash
docker run -it --rm --name some-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password mysql
```

So a slight variant on what's on the official image page.
Runs it in interactive mode, tells it to remove the container when it closes, name's the instance, maps the port for mysql and passes an environment variable for the root password and the image to run.

Once that's finished running you should be able to connect to it using mysql workbench and play around.
It just has the bare minimum.

You can stop the server by running
``` bash
docker stop some-mysql
```

You will notice if you restart it anything you entered is gone and you are back to the start again.
Time to solve that.

So first option remove the --rm so that the image stays.
You can then start the image with 
``` bash
docker start some-mysql
```

If you decide that route you are better off using a command like
``` bash
docker run -d --name some-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password mysql
```

To start the container initially

So this has some disadvantages, the data is in the container so if anything happens it your data is gone.

Next option is to mount a volume.
So that's deceptively simple
``` bash
docker run -d --name some-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -v /var/lib/mysql mysql
```
The `-v /var/lib/mysql` mounts a volume in the docker-machine so that it will survive restarts.

And that's good enough for me.

Another option is to mount is locally rather than in the docker-machine.
``` bash
 docker run -d --name some-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -v /local/local/path:/var/lib/mysql mysql
``` 
Might be an option if you have different docker machines.
