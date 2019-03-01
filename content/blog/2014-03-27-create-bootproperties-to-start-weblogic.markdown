---
layout: post
title: Create boot.properties to start weblogic admin server
date: '2014-03-27T18:53:00.002Z'
author: David Kerwick
tags:
- weblogic
modified_time: '2014-03-27T18:53:24.771Z'


---

So you have been starting the admin server using the startWeblogic.sh script and you are tired of entering the username and password each time.  You want the credentials stored, this can be done by creating a boot.properties file where the admin server will take the credentials.  

Go to your domain directory and cd into the servers/Adminserver directory  

for example  

``` bash 
cd /user_projects/domains/your_domain/servers/Adminserver/  
```

If there isn't a security directory create it  

``` bash
mkdir security  
```

then cd into it  

``` bash
cd security  
```

now create the boot.properties file  

``` bash
vi boot.properties  
```

add in lines for your username and password  

``` bash 
username=weblogic  
password=weblogic1  
```

You should now be able to run startWeblogic.sh without it prompting you for a username and password.  
After starting if you look back at the boot.properties file you will notice that weblogic has encrypted the contents for you.