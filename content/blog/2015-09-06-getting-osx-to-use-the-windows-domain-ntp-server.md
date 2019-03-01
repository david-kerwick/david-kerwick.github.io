---
layout: post
title: Getting OSX to use the windows domain ntp server
categories: 
 - blog
date: '2015-09-06T23:57:49'

---

So I use a MacBook on a windows network, most things are fine but recently my tests started failing and it turned out to be a time sync problem.

The Mac sync's it's time over the network but to the apple servers and our windows domain whatever they are using drifts dramaticly away from the actual time.  So the solution is to get the Mac to use the windows domain time.

#Find the domain time server
I believe this is generally the Primary Domain Controller (PDC) but to be sure you can run the below in a command prompt with administrator access on a windows machine 

``` bash
w32tm /query /source
```

And it will show you the time server being used, I believe the below will show you the same thing and not need admin privileges 

``` bash
w32tm /query /status
```

One wonders why the /source command needs admin is all the info is available in /status

#Set the Mac to use the window NTP server
Once you have the server name from above

``` bash
	sudo systemsetup -setnetworktimeserver <your server>
```

You can check this worked by running

``` bash
	sudo systemsetup -getnetworktimeserver
```

Now just have to wait and see does it stick... Apple have a way of ignoring your settings if they think they know better
