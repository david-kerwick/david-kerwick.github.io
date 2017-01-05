---
layout: post
title: WLST to auto undeploy retired apps
date: '2014-04-08T22:04:00.001+01:00'
author: David Kerwick
tags:
- wlst
- weblogic
---

So something that annoys me is having to clean up retired applications, I generally discover them because the deploy fails as the retired app is still present.  
Of course I should check beforehand and remove it etc... but I prefer to run the below script first thing in the morning.  There should be no deployments that need to be rolled back to the retired version as any problems should have been well discovered.  

{% highlight python %} import os  

def check_app_status(appName, serverName):  
 cd('domainRuntime:/AppRuntimeStateRuntime/AppRuntimeStateRuntime')  
 currentState = cmo.getCurrentState(appName, serverName)  
 return currentState  

def undeploy_app(appName):  
 print 'Undeploying ' + appName  
 stopApplication(appName, targets='my-cluster')  
 undeploy(appName, targets='my-cluster')  

#redirect wlst's own output to null, print lines in the script itself  
redirect('/dev/null', 'false')  

connect(userConfigFile='/home/weblogic/user_projects/domains/my_domain/adminServerConfig.secure',  
 userKeyFile='/home/weblogic/user_projects/domains/my_domain/adminServerKey.secure',  
 url='t3://myhost.mydomain.ie:7001')  
cd('AppDeployments')  
appList = ls(returnMap='true')  
for appName in appList:  
 currentAppStatus = check_app_status(appName, 'my-cluster')  
 if currentAppStatus == 'STATE_RETIRED':  
 print 'Found a retired app ' + appName  
 #email that the script has taken an action  
 os.system(  
 'echo "Auto undeploy retired app %s" | /bin/mailx -s "INFO: Auto undeploy retired application" system@mydomain.ie' % appName)  
 undeploy_app(appName)  
 elif currentAppStatus == 'STATE_ACTIVE':  
 print 'App is running ' + appName  
 else:  
 print 'App is not in one of the running state App: ' + appName + ' State: ' + currentAppStatus  
 #Could email a warning here as well if the likes of prepared states are not desired on the likes of production etc...  

disconnect()  
exit()  

{% endhighlight %}
