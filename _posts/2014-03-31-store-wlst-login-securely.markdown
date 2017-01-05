---
layout: post
title: Store WLST login securely
date: '2014-03-31T21:59:00.000+01:00'
author: David Kerwick
tags:
- wlst
- weblogic
---

If you have started writing several wlst scripts for various functions you are probably happy to store the username and password in the script directly while doing dev setup actions.  If you have started writing scripts that run against production to check the health of the servers or something like that you are probably wondering about a better way to store them.  

Well you can use encrypted values all you need to do in generate them  

Start up wlst  

`/Oracle/Middleware/Oracle_Home/oracle_common/common/bin/wlst.sh`

Connect to the admin server using your username and password  

{% highlight python %}
connect('weblogic', 'weblogic1', 't3://myhost.mydomain.ie:7001')
{% endhighlight %}

{% highlight python %}
Connecting to t3://myhost.mydomain.ie:7001 with userid weblogic ...  
Successfully connected to Admin Server "AdminServer" that belongs to domain "my_domain".  

Warning: An insecure protocol was used to connect to the   
server. To ensure on-the-wire security, the SSL port or   
Admin port should be used instead.  
{% endhighlight %}

Run  

{% highlight python %}
storeUserConfig('/home/weblogic/user_projects/domains/my_domain/adminServerConfig.secure', '/home/weblogic/user_projects/domains/my_domain/adminServerKey.secure')  

Creating the key file can reduce the security of your system if it is not kept in a secured location after it is created. Do you want to create the key file? y or n y  
The username and password that were used for this WebLogic Server connection are stored in /home/weblogic/user_projects/domains/my_domain/adminServerConfig.secure and /home/weblogic/user_projects/domains/my_domain/adminServerKey.secure.  
{% endhighlight %}

Or whatever directory and filename you want, maybe your user directory if you want to restrict it to one user.  

You should now be able to connect using  

{% highlight python %}
connect(userConfigFile='/home/weblogic/user_projects/domains/my_domain/adminServerConfig.secure', userKeyFile='/home/weblogic/user_projects/domains/my_domain/adminServerKey.secure', url='t3://myhost.mydomain.ie:7001')  
{% endhighlight %}

you can do the same for the nodemanager  

{% highlight python %}
nmConnect('weblogic', 'weblogic1', 'myhost.mydomain.ie', '5556', 'my_domain', '/home/weblogic/user_projects/domains/my_domain', 'plain')  
{% endhighlight %}

{% highlight python %}
storeUserConfig(userConfigFile='/home/weblogic/user_projects/domains/my_domain/nodemanagerConfig.secure', userKeyFile='/home/weblogic/user_projects/domains/my_domain/nodemanagerKey.secure', nm='true')  
{% endhighlight %}
