---
layout: post
title: IIS weblogic proxy and Weblogic plugin enabled
date: '2014-03-24T14:40:00.000Z'
author: David
tags:
- weblogic
modified_time: '2014-03-24T14:40:19.292Z'
blogger_id: tag:blogger.com,1999:blog-2027514548288128942.post-2857585544300264902
blogger_orig_url: http://davidkerwick.blogspot.com/2014/03/iis-weblogic-proxy-and-weblogic-plugin.html

---

If you have IIS in front of your Weblogic cluster you are probably familiar with the 'WebLogic Plug-In Enabled:' feature on Weblogic server. This allows the access logs and calls to `getRemoteAddr()` to return the IP address of the client rather than the IP of the webserver, which is where the request has come from.  

Having set up the dynamic servers using a template I was wondering why this wasn't working.  I had set the  'WebLogic Plug-In Enabled:' to yes in the Configuration --> General --> Advanced section of the Clusters --> Server Templates  

There are two places for this setting the 'server' one which in this case is the server template and the 'cluster' one, the cluster one over rides the server one.  You'd think after going into Clusters --> Server Templates you would be in the right place.  You of course would be wrong.  

Head to Clusters and click on the cluster you have set up, in its Configuration --> General --> Advanced section set 'WebLogic Plug-In Enabled:' to yes and you should be golden.