---
layout: post
title: Create boot.properties to start weblogic admin server
date: '2014-03-27T18:53:00.002Z'
author: David
tags:
- weblogic
modified_time: '2014-03-27T18:53:24.771Z'
blogger_id: tag:blogger.com,1999:blog-2027514548288128942.post-4462359699505801197
blogger_orig_url: http://davidkerwick.blogspot.com/2014/03/create-bootproperties-to-start-weblogic.html
---

So you have been starting the admin server using the startWeblogic.sh script and you are tired of entering the username and password each time.  You want the credentials stored, this can be done by creating a boot.properties file where the admin server will take the credentials.  

Go to your domain directory and cd into the servers/Adminserver directory  

for example  

{% highlight bash %} 
cd /user_projects/domains/your_domain/servers/Adminserver/  
{% endhighlight %}

If there isn't a security directory create it  

{% highlight bash %}
mkdir security  
{% endhighlight %}

then cd into it  

{% highlight bash %}
cd security  
{% endhighlight %}

now create the boot.properties file  

{% highlight bash %}
vi boot.properties  
{% endhighlight %}

add in lines for your username and password  

{% highlight bash %} 
username=weblogic  
password=weblogic1  
{% endhighlight %}

You should now be able to run startWeblogic.sh without it prompting you for a username and password.  
After starting if you look back at the boot.properties file you will notice that weblogic has encrypted the contents for you.