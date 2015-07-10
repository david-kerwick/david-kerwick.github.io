---
layout: post
title: Weblogic linking machine and cluster using WLST
date: '2014-03-20T23:16:00.000Z'
author: David
tags:
- wlst
- weblogic
modified_time: '2014-04-03T22:42:36.783+01:00'
blogger_id: tag:blogger.com,1999:blog-2027514548288128942.post-4948331470091558593
blogger_orig_url: http://davidkerwick.blogspot.com/2014/03/weblogic-linking-machine-and-cluster.html

---

Having created a machine and dynamic cluster you need to set the cluster to use the machine and it's nodemanager  

{% highlight python %} 
if __name__ == '__main__':  
    from wlstModule import *  

connect('weblogic', 'weblogic1', 't3://myhost.mydomain.ie:7001')  
edit()  

startEdit()  

cd('/ServerTemplates/my-server-template')  
cmo.setMachine(getMBean('/Machines/my-machine'))  
cmo.setCluster(getMBean('/Clusters/my-cluster'))  

cd('/ServerTemplates/my-server-template/SSL/my-server-template')  
cmo.setEnabled(false)  

activate()  

exit()  
{% endhighlight %}