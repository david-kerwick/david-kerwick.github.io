---
layout: post
title: Connecting to Nodemanager using WLST in production mode
date: '2014-03-27T21:53:00.001Z'
author: David Kerwick
tags:
- wlst
- weblogic
---

If you have set up a series of scripts using wlst and start by connecting to the nodemanager using nmConnect you may have noticed that they don't work and you can't connect if you have set weblogic up in production mode.  Even though you are pretty sure you are using the right username and password.  

Well you are not using the right username and password! When you set weblogic to production mode it chooses a random username and password for the nodemanager, if you want to connect again using a script you will need to change it.  
Click through the numbers, you notice on number 4 there's a random username.  Change it and the password so you know what they are  

![nodemanager_prod_1](/assets/img/connecting-to-nodemanager-using-wlst-in/nodemanager-prod-1.jpg)

![nodemanager_prod_2](/assets/img/connecting-to-nodemanager-using-wlst-in/nodemanager-prod-2.jpg)

![nodemanager_prod_3](/assets/img/connecting-to-nodemanager-using-wlst-in/nodemanager-prod-3.jpg)
