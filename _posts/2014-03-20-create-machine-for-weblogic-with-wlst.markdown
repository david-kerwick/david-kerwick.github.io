---
layout: post
title: Create a 'machine' for Weblogic with WLST
date: '2014-03-20T22:36:00.000Z'
author: David
tags:
- wlst
- weblogic
modified_time: '2014-04-03T22:40:29.112+01:00'
blogger_id: tag:blogger.com,1999:blog-2027514548288128942.post-6599294441738696385
blogger_orig_url: http://davidkerwick.blogspot.com/2014/03/create-machine-for-weblogic-with-wlst.html

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