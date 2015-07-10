---
layout: post
title: Connecting to Nodemanager using WLST in production mode
date: '2014-03-27T21:53:00.001Z'
author: David
tags:
- wlst
- weblogic
modified_time: '2014-04-23T22:10:56.201+01:00'
thumbnail: http://3.bp.blogspot.com/-OWRuJln6qs4/UzSb23NmjcI/AAAAAAAAFKs/9nkAn1OlsJw/s72-c/nodemanager_prod_1.jpg
blogger_id: tag:blogger.com,1999:blog-2027514548288128942.post-1234743456356966126
blogger_orig_url: http://davidkerwick.blogspot.com/2014/03/connecting-to-nodemanager-using-wlst-in.html

---

If you have set up a series of scripts using wlst and start by connecting to the nodemanager using nmConnect you may have noticed that they don't work and you can't connect if you have set weblogic up in production mode.  Even though you are pretty sure you are using the right username and password.  

Well you are not using the right username and password! When you set weblogic to production mode it chooses a random username and password for the nodemanager, if you want to connect again using a script you will need to change it.  
Click through the numbers, you notice on number 4 there's a random username.  Change it and the password so you know what they are  

![nodemanager_prod_1](http://3.bp.blogspot.com/-OWRuJln6qs4/UzSb23NmjcI/AAAAAAAAFKs/9nkAn1OlsJw/s1600/nodemanager_prod_1.jpg)

![nodemanager_prod_2](http://2.bp.blogspot.com/-Lr0hM-SP5ao/UzSb21AK9hI/AAAAAAAAFK0/QHBOPSzutSs/s1600/nodemanager_prod_2.jpg)

![nodemanager_prod_3](http://3.bp.blogspot.com/-7maZ6HoKHEY/UzSb25wVDHI/AAAAAAAAFKw/cJ8_BxxiRX4/s1600/nodemanager_prod_3.jpg)
