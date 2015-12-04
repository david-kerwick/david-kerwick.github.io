---
layout: post
title: Set up static routes on startup on the mac
categories: 
 - blog
date: 2015-12-01 14:17:24

---

I needed to add some static routes to only one interface on my Mac.  One route for ethernet and then default to wireless.

To do it

/Library/LaunchDaemons

Add in a plist e.g. local.static.routes.plist

Need a script that does the magic
/usr/local/bin/static

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

#sudo /sbin/route add -net 192.168.210.0 -netmask 255.255.255.0 -gateway 192.168.215.1
#sudo /sbin/route add -net 192.168.215.0 -netmask 255.255.255.0 -gateway 192.168.215.1
#sudo /sbin/route add -net 192.168.217.0 -netmask 255.255.255.0 -gateway 192.168.215.1
#sudo /sbin/route add -net 192.100.200.0 -netmask 255.255.255.0 -gateway 192.168.215.1
#sudo /sbin/route add -net 192.168.230.0 -netmask 255.255.255.0 -gateway 192.168.215.1
#!/bin/bash
echo "Trying to set the network"
networksetup -setadditionalroutes "Thunderbolt Ethernet" 192.168.210.0  255.255.255.0  192.168.215.1 192.168.215.0  255.255.255.0  192.168.215.1 192.168.216.0  255.255.255.0  192.168.215.1 192.168.217.0  255.255.255.0  192.168.215.1 192.100.200.0  255.255.255.0  192.168.215.1  192.168.230.0  255.255.255.0  192.168.215.1
exit 0

