---
layout: post
title: Customise the skin of weblogic admin console
date: '2014-03-31T21:26:00.000+01:00'
author: David Kerwick
tags:
- weblogic
---

If you have several Weblogic servers you might find it useful to customise the look of the Admin Console so that you can quickly see which one you are on.  
For example having a different border colour for production and development.  
You can do this by editing the look and feel of the console.  
Full details are available on the Oracle site [here](http://docs.oracle.com/cd/E23943_01/web.1111/e13745/rebrand.htm)  

Below is a quick example of what worked for me  
Change into the directory where the console app is located, it will depend on your Oracle based directory but it will be something like this  

{% highlight bash %}
cd /Oracle/Middleware/Oracle_Home/wlserver/server/lib/consoleapp/webapp/framework/skins/wlsconsole/css  
{% endhighlight %}

What I have done is replace the Oracle logo with my own text to identify the server and added a coloured border to distinguish each server.  
The red box surrounds where I want to place my custom text  

![custom_console_1](/assets/img/customise-skin-of-weblogic-admin-console/custom-console-1.png)

The first file you need to edit is console.css  
Add following lines to the end of the file, this will insert the text "PRODUCTION TEST" as part of the header of the console, allowing you to see which server you are on  

{% highlight css %}
#product-brand-name:before {  
    background-color: blue;  
    content: "PRODUCTION TEST ";  
    font-size: large;  
    margin-right: 20px;  
    padding: 35px;  
}  
{% endhighlight %}

This adds the text with a blue background like like  

![custom_console_2](/assets/img/customise-skin-of-weblogic-admin-console/custom-console-2.png)

Next find the rule below and add the display setting which will hide the Oracle logo.  

{% highlight css %}
#logo {  
  padding-top: 3px;  
  display: none;  
}
{% endhighlight %}

The logo should now be gone and should look like the below  

![custom_console_3](/assets/img/customise-skin-of-weblogic-admin-console/custom-console-3.png)

Lastly for this file find the below rule and change the padding to better align our new custom box  

{% highlight css %}
#console-header-logo {  
  float: left;  
  width: 400px;  
  padding: 0 0 5px 0;  
  white-space: nowrap;  
}
{% endhighlight %}

It should now look like below  

![custom_console_4](/assets/img/customise-skin-of-weblogic-admin-console/custom-console-4.png)

And lastly to create a coloured border edit the file general.css  
Find the html element rule and add a border with the colour and size you want  

{% highlight css %}
html {  
    background-color: #FFFFFF;  
    border: 8px solid blue;  
}  
{% endhighlight %}

This should give you something like this, which I believe makes it easy to see which server you are on, you can have bolder colours represent your main servers.  

![custom_console_5](/assets/img/customise-skin-of-weblogic-admin-console/custom-console-5.png)
