---
layout: post
title: Not enough entropy on RedHat
date: '2014-03-12T20:59:00.000Z'
author: David Kerwick
---

### Chaos is good....

I found the wlst and the weblogic adminserver kept 'hanging' on me.  When doing a domain creation sometimes the script would just stall, when I logged in to check the box things would be ok.  Strange says I.

Turns out to be kind of a common problem, I set the box up as a virtual machine and since I was only ssh'd into the box I wasn't creating enough entropy for the random pool on redhat.  Weblogic does a good bit of ssl and encryption and can use up the pool very quickly, especially a headless dev box as there's next to nothing happening on the box.

``` bash   
watch cat /proc/sys/kernel/random/entropy_avail  
Every 2.0s: cat /proc/sys/kernel/random/entropy_avail  Wed Mar 12 18:50:13 2014  
170  
```  


Not alot available

``` bash  
rngd -r /dev/urandom -o /dev/random
```

Much better

``` bash  
Every 2.0s: cat /proc/sys/kernel/random/entropy_avail  Wed Mar 12 19:11:17 2014  
3200  
```

Of course you'll need a better long term solution

``` bash  
rngd -r /dev/urandom -o /dev/random -b -W 4096 -t 30  

```  

-r take random bits from /dev/urandom  
-o output them to /dev/random  
-b become a background daemon  
-W fill up to 4096 bits (the max I think)  
-t refresh every 30 seconds  

To have that run on startup

edit

``` bash  
vi /etc/sysconfig/rngd  
```


Replace the EXTRAOPTIONS with  


``` bash  
EXTRAOPTIONS="-r /dev/urandom -o /dev/random -b -W 4096 -t 30"  
```

Make sure rngd starts on each boot  

``` bash  
chkconfig rngd on
```

You should have no more delays now, adjust the refresh internal if there's problems.

### Note

/dev/urandom isn't fully random (what is), when it runs out it just reuses what it has, /dev/random blocks when it runs out, hence the 'hanging'.  But it solved my problem the sysadmin's can sort a proper solution for production.

More on /dev/random [here](http://en.wikipedia.org/wiki//dev/random)
