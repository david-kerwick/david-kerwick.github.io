---
layout: post
title: Weblogic linking machine and cluster using WLST
date: '2014-03-20T23:16:00.000Z'
author: David Kerwick
tags:
- wlst
- weblogic
---

Having created a machine and dynamic cluster you need to set the cluster to use the machine and it's nodemanager  

``` python
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
```
