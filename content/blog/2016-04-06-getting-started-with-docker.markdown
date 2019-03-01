---
title: Getting started with Docker
layout: post
date: '2016-04-06T14:07:16'
---

# Intro
So I needed to set up a machine for php development but rather than use a server I reckoned now would be a good time to try and set up Docker so that the server will be local, I can easily bring it up and down, change config, lightning fast and all the other things Docker promises.

# Installation
Docker has the installation pretty well covered as you can imagine
<https://docs.docker.com/mac/>

I went with the more manual option as I kind of wanted to know more about what's going on
<https://docs.docker.com/engine/installation/mac/#from-your-shell>

So a quick copy of what's happening

Download and install the [Docker ToolBox](https://www.docker.com/products/docker-toolbox)


Create a 'default' docker machine -- on a Mac you need a linux base
``` bash
docker-machine create --driver virtualbox default
```
You should now have a default machine, check with
``` bash
docker-machine ls
```
Should give you something like
``` bash
NAME      ACTIVE   DRIVER       STATE     URL   SWARM   DOCKER    ERRORS
default   -        virtualbox   Stopped                 Unknown
```

You then need to start it (I only have one so fairly simple)
``` bash
docker-machine start
```
To get info on this machine
``` bash
docker-machine env
```

Should give you something like this
``` bash
export DOCKER_TLS_VERIFY="1"
export DOCKER_HOST="tcp://192.168.99.100:2376"
export DOCKER_CERT_PATH="/Users/David/.docker/machine/machines/default"
export DOCKER_MACHINE_NAME="default"
# Run this command to configure your shell:
# eval $(docker-machine env)
```

So run what it tells you to run in order to set the terminal up for docker commands
``` bash
eval $(docker-machine env)
```

# Test It
If everything worked you can test it with
``` bash
docker run hello-world
```
Which will print a hello from Docker.

# Shell Completion
So as you may know I use the ZSH shell with Oh-My-Zsh.  	
It has command auto completion for docker.
Open up your .zshrc and find the line for plugins
And add docker to it, for example
``` bash
plugins=(git mvn z history-substring-search docker)
```
