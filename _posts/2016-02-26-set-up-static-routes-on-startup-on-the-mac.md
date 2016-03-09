---
layout: post
title: Set up static routes on startup on the mac
categories: 
 - blog
date: 2016-02-26 10:30:15

---

I needed to add some static routes to only one interface on my Mac.  One route for ethernet and then default to wireless.

To do it go to the directory

{% highlight bash %}
cd /Library/LaunchDaemons
{% endhighlight %}

Create a plist file here that will run a script at launch to setup our custom route
{% highlight bash %}
vi local.static.routes.plist
{% endhighlight %}

And this to the plist file
{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>local.static.routes</string>
    <key>Program</key>
    <string>/usr/local/bin/static</string>
    <key>RunAtLoad</key>
    <true/>
    <key>StandardErrorPath</key>
    <string>/Users/David/mycommand.err</string>
    <key>StandardOutPath</key>
    <string>/Users/David/mycommand.out</string>
</dict>
</plist>
{% endhighlight %}
This will run the script at the given location at startup, it also sets up some logging

You now need to create the script for doing the routes
So whatever location makes sense
{% highlight bash %}
cd /usr/local/bin/
{% endhighlight %}
works for me.

Create the script
{% highlight bash %}
vi static
{% endhighlight %}
Then add 
{% highlight bash %}
#!/bin/bash

# max number of retries
retries=10
echo "Starting the script"
# include Startup commons
. /etc/rc.common

# wait for network to become available
CheckForNetwork
echo "Net status $NETWORKUP"
echo "Check for network"
while [ "$NETWORKUP" != "-YES-" ]
do
       echo "Net status $NETWORKUP"
        retries=$((retries - 1))
        if [ $retries -le 0 ] ; then
                exit 1
        fi
        sleep 2
        NETWORKUP=
        CheckForNetwork
done

echo "Trying to set the network"
networksetup -setadditionalroutes "Thunderbolt Ethernet" 192.168.210.0  255.255.255.0  192.168.208.1 192.168.215.0  255.255.255.0  192.168.208.1 192.168.216.0  255.255.255.0  192.168.208.1 192.168.217.0  255.255.255.0  192.168.208.1 192.100.200.0  255.255.255.0  192.168.208.1  192.168.230.0  255.255.255.0  192.168.208.1
exit 0
{% endhighlight %}

This uses the networksetup command to set the routes on a particular interface.
the definition for the method is
{% highlight bash %}
-setadditionalroutes networkservice [dest1 mask1 gate1] [dest2 mask2 gate2] ... [destN maskN gateN]
             Use this command to set the list of IPv4 additional routes configured for the service. Each route is specified as a (destination address, subnet mask,
             gateway address) tuple. Specifying no tuples clears the list of routes.
{% endhighlight %}

Lots of tuples can be fun so beware the copy and paste demon.

That should be it, set the routes up as you need them.


