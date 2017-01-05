---
layout: post
title: Create a 'machine' for Weblogic with WLST
date: '2014-03-20T22:36:00.000Z'
author: David Kerwick
tags:
- wlst
- weblogic
---

Following on from my [post]( {% post_url 2014-03-19-create-new-weblogic-domain-using-wlst %}) on creating a domain using WLST here is how to create a machine on the weblogic server.  

{% highlight python %}
if __name__ == '__main__':  
    from wlstModule import *  

print 'Starting createMachine script ....'  
#connect to the adminserver this time, using the username, password   
#and hostname set you in the create domain script  
connect('weblogic', 'weblogic1', 't3://myhost.mydomain.ie:7001')  

#start up an edit session  
edit()  
startEdit()  
#change to the root  
cd('/')  

#create a unix machine with what ever name suits  
myMachine = cmo.createUnixMachine("my-machine")  

print 'Create machine result: ' + str(myMachine)  

#set the nodemanager settings, again that match the settings set up in   
#the create domain script  
myMachine.getNodeManager().setNMType('plain')  
myMachine.getNodeManager().setListenAddress('myhost.mydomain.ie')  

#save and activate the changes  
save()  
activate(block="true")  

print 'Done'  

exit()  
{% endhighlight %}
