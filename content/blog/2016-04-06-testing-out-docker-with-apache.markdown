---
title: Testing out Docker with apache
layout: post
date: '2016-04-06T15:14:13'
---
Following on from my last post rather than going directly to php and then mysql it might be worth getting a test container slightly better then the hello docker one working.

The Apache web server sure seems like a good bet, easily understood and very easy to create a simple test html.

So there's an official image for the Apache web server [here](https://hub.docker.com/_/httpd/)

You may as well pull it down while reading
``` bash
docker pull httpd
```
That will take down the image and have it available locally for you.

There's little point in a dockerfile for this one as all it suggests is setting the base image and copying your files into the new image. Which is fine if you want to ship the image somewhere else I guess but for now we are only interested in testing.

The thing with the dockerfile is you can't mount the local file system as dockerfiles must be portable and mounting to a local host wouldn't be so that makes sense.  The run command lets you do that and in this case there's no additional setup as the image has apache set up for you.

Therefore create a folder for this 'project' and create a test index.html in that folder
Then run
``` bash
docker run -p 80:80 --rm --name my-apache-app -v "$PWD":/usr/local/apache2/htdocs/ httpd
```
Then go to the ip of your docker-machine in your browser and marvel at your test file.
You can find the ip by running
``` bash
docker-machine ls
```

So because of the test setup mentioned above you can now change your test file, reload your browser and see your changes.  So that's a nice code / test cycle right there.

Lets break down the docker run command. There's alot going on in it

| Command | Description |
| --------| ----------- |
|docker |  main docker command         |
|run| tells docker to run a container|
|-p 80:80| port map the containers port 80 with the machine's port 80 |
|--rm| remove the container after shutdown|
|--name my-apache-app| name the container|
|-v "$PWD":/usr/local/apache2/htdocs/| mount the current path to the htdocs folder on apache|
|httpd| the image to run (the httpd from the hub in this case)|


So that's a test apache up and running and it sure does start mighty quick.

