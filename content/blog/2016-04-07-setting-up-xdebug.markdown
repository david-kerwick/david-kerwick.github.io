---
title: Setting up Xdebug for PHP
layout: post
date: '2016-04-07T09:02:11'
---
So as part of my fight with the [white screen of death](../2016-04-07-php-white-screen-of-death) I ended up setting up Xdebug which proved very useful.
Installation is pretty straight forward actually just follow the [guide](https://xdebug.org/docs/install)

Quick highlights
``` bash
pecl install xdebug
```
At the end it will tell you what to add to your `php.ini` file

For example
``` text
You should add "zend_extension=/usr/local/lib/php/extensions/no-debug-non-zts-20131226/xdebug.so" to php.ini
```
Restart apache and Xdebug should be installed

Next is setting it up so a client can connect for that you need to add settings for remote debugging so in your `php.ini` add something like the below
``` bash
zend_extension=/usr/local/lib/php/extensions/no-debug-non-zts-20131226/xdebug.so
xdebug.remote_enable=true
xdebug.remote_host=192.168.208.95
xdebug.remote_port=9000
xdebug.remote_autostart=1
```

The `192.168.208.95` is your client machine where you will be running the debug client.

I then needed a simple client to connect to the debugger I found [MacGDBp](https://www.bluestatic.org/software/macgdbp/) which does the job nicely for now.
So opening that up, make sure it's listening on the same port as the php server and going to the site should trigger a debug session and you can step through the code and inspect variables etc...

Next step is to have this automatically set up in the docker containers I've been playing with
