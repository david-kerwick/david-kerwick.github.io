---
layout: post
title: Create new Weblogic Domain using wlst
date: '2014-03-19T22:38:00.000Z'
author: David
tags:
- wlst
- weblogic
modified_time: '2014-04-03T22:39:52.348+01:00'
blogger_id: tag:blogger.com,1999:blog-2027514548288128942.post-2666436262490330587
blogger_orig_url: http://davidkerwick.blogspot.com/2014/03/create-new-weblogic-domain-using-wlst.html
---

  
If you rather create the domain yourself instead of using the configuration wizard you can use wlst. You don't have to configure everything, you can use the Weblogic provided basic template. Details of what it comes with can be found [here](http://docs.oracle.com/middleware/1212/wls/WLDTR/templates.htm#i1115503)  

You can go with the all the defaults it supplies or you can create a script that reads in this basic template and then customise it to your needs, this can be quite useful for development and it allows you to easily delete and recreate the same domain.  

Here is one I've used, I'll go through the sections under the code.  

{% highlight python %} 
if __name__ == '__main__':  
    from wlstModule import *  

readTemplate("/home/weblogic/Oracle/Middleware/Oracle_Home/wlserver/common/templates/wls/wls.jar")  

print 'Create AdminServer: '  
cd('Servers/AdminServer')  
set('ListenAddress', 'myhost.mydomain.ie')  
set('ListenPort', 7001)  

create('AdminServer', 'SSL')  
cd('SSL/AdminServer')  
set('Enabled', 'false')  
set('ListenPort', 7002)  

print 'Set the password: '  
cd('/')  
cd('Security/base_domain/User/weblogic')  
cmo.setPassword('weblogic1')  

cd('/')  
cd('NMProperties')  
set('SecureListener', 'false')  
set('ListenAddress', 'myhost.mydomain.ie')  
set('CrashRecoveryEnabled', 'true')  

print 'Write the domain: '  
setOption('OverwriteDomain', 'true')  
setOption('ServerStartMode', 'prod')  
writeDomain('/home/weblogic/user_projects/domains/my_domain')  
closeTemplate()  

exit()  
{% endhighlight %}

#### Import

To start with import the supporting wlstModule, the method recommended it [here](http://docs.oracle.com/cd/E47843_04/121222/OEPUG/weblogic.htm#sthref175) it seems to keep the interpreter and Eclipse happy if you use it.  

#### readTemplate 

Reads in the basic Weblogic template, the location will be based on where you installed Weblogic, I installed in on the weblogic home directory.  

#### Create the AdminServer

Changes to the AdminServer in the template and modifies some of the settings, ListenPort is the same as the default so could be removed but handy if you want to change the port if for example you want two on the one hostname.  

#### SSL

SSL is disabled in the basic template, you could enable it here.  

#### Set the AdminServer password

Set the password for the default weblogic user, something handy for yourself, this is in plain text in this script so not the best, you can change it in the Admin Console later if you wish.  

#### NodeManager settings

It's possible to set some of the Node Manager properties as well when you are creating the domain, in this case I've set in up to use plain ports are than ssl, which is less secure of course but easier to play around with, the listen address is on the same host name as the Admin Server.  And lastly crash recovery is enabled, which will monitor the health of servers started with the nodemanager and attempt to restart them if they fail  

#### Write the domain

Lastly we need to write out newly configured domain to disk, overwrite is handy if you keep tinkering with the script and want to keep running it,  ServerStartMode can be either prod (for production mode) or dev (for development mode). WriteDomain writes you new template to the location you specify  

Run it  

So if say you save this file as create_domain.py you can run it by  

{% highlight bash %} 
/home/weblogic/Oracle/Middleware/Oracle_Home/oracle_common/common/bin/wlst.sh create_domain.py  
{% endhighlight %}

If this runs really slow have a look at my other blog post [here](http://davidkerwick.blogspot.ie/2014/03/really-slow-wlst-and-adminserver-start.html)