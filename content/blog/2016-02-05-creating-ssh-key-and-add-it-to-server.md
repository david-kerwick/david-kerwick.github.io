---
layout: post
title: Creating an SSH key and add it to a server
date: '2015-03-25T23:26:00.003Z'
author: David Kerwick
tags: 
modified_time: '2015-03-25T23:26:48.771Z'


---

So it's rare when I have to generate a new key and add it to a server to I forget the commands, they ain't complex so here they are  

``` bash
ssh-keygen -t rsa
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/David/.ssh/id_rsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /Users/David/.ssh/id_rsa.
Your public key has been saved in /Users/David/.ssh/id_rsa.pub.
The key fingerprint is:
0a:9c:f7:43:dd:e8:5d:44:48:76:fd:30:ac:c9:cd:e2 David@DavidiMac.local
The key's randomart image is:
+--[ RSA 2048]----+
|             .. o|
|             .+..|
|     o +    E.   |
|       o o o     |
|       .+.o      |
+-----------------+
```

To add to a server  

``` bash
	
system@192.168.1.160's password:
bash: .ssh/authorized_keys: No such file or directory
```

Doh!  
Need to create the .ssh folder on the server system first  

``` bash
ssh system@192.168.1.160 mkdir -p .ssh
system@192.168.1.160's password:
```

Try the command above again and we should be good.  

Except that doesn't always work, ubuntu isn't happy.  

``` bash
cat .ssh/id_rsa.pub | ssh system@192.168.1.160 'cat >> .ssh/authorized_keys2'
system@192.168.1.160's password:
bash: .ssh/authorized_keys: No such file or directory
```

Still not happy?  

Time to actually log in to the server to start changing permissions  

``` bash
system@ubuntu:~$ cd
system@ubuntu:~$ pwd
/home/system
system@ubuntu:~$ chmod 700 .ssh
system@ubuntu:~$ cd .ssh/
system@ubuntu:~/.ssh$ chmod 640 authorized_keys2
system@ubuntu:~/.ssh$
```