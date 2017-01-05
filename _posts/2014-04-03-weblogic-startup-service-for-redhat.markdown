---
layout: post
title: Weblogic startup service for RedHat
date: '2014-04-03T22:58:00.002+01:00'
author: David Kerwick
tags:
- weblogic
---

I want to create a startup service for Weblogic on RedHat so that when the machine started all the Weblogic components I wanted would be started. So that's the nodemanager, the AdminServer and the servers in the dynamic cluster.  

What I ended up with was an init.d script and a set of wlst scripts for starting and stopped the various components.  

First create the init.d script  

{% highlight bash %}
cd /etc/init.d  
vi nodemgr  
{% endhighlight %}

Add the following contents

{% highlight bash %} #!/bin/sh  
#  
# nodemgr Oracle Weblogic service  
#  
# chkconfig: 345 85 15  
# description: Oracle Weblogic service  

### BEGIN INIT INFO  
# Provides: nodemgr  
# Required-Start: $network $local_fs  
# Required-Stop:  
# Should-Start:  
# Should-Stop:  
# Default-Start: 3 4 5  
# Default-Stop: 0 1 2 6  
# Short-Description: Oracle Weblogic service.  
# Description: Starts and stops Oracle Weblogic NodeManager, Adminserver and Cluster.  
### END INIT INFO  

. /etc/rc.d/init.d/functions  

DOMAIN_HOME="/home/weblogic/user_projects/domains/my_domain"  
WLS_HOME="/home/weblogic/Oracle/Middleware/Oracle_Home"  
DAEMON_USER="weblogic"  
PROCESS_STRING="^.*${DOMAIN_HOME}.*weblogic.NodeManager.*"  
LOG=${DOMAIN_HOME}/daemon_nodemanager.log  
/bin/su ${DAEMON_USER} -c "source ${WLS_HOME}/wlserver/server/bin/setWLSEnv.sh 2>&1 >> ${LOG}"  

PROGRAM="${DOMAIN_HOME}/bin/startNodeManager.sh"  
SERVICE_NAME=`/bin/basename $0`  
LOCKFILE="/var/lock/subsys/${SERVICE_NAME}"  

RETVAL=0  

wait_for() {  
 res=0  
 COUNTER=0  
 while [ ! ${res} -gt 0 ] && [ ${COUNTER} -lt 20 ]  
 do  
 res=$(tail -5 "$2" | fgrep -c "$1")  
 let COUNTER=COUNTER+1  
 sleep 1  
 done  
 if [ ${COUNTER} -ge 20 ]; then  
 echo "Didn't find $1 within the timeout"  
 else  
 echo "Found $1"  
 fi  

}  

startAdminServer(){  
 /bin/su ${DAEMON_USER} -c "echo 'Starting Weblogic AdminServer on $(date)' | tee -a ${LOG}"  
 /bin/su ${DAEMON_USER} -c "${WLS_HOME}/oracle_common/common/bin/wlst.sh /home/weblogic/user_projects/domains/my_domain/startAdminServer.py 2>&1 | tee -a ${LOG}"  
 export -f wait_for  
 /bin/su ${DAEMON_USER} -c "wait_for 'Successfully started server AdminServer' '${LOG}'" 2>&1 | tee -a ${LOG}  
}  

stopAdminServer(){  
 /bin/su ${DAEMON_USER} -c "echo 'Stopping Weblogic AdminServer on $(date)' | tee -a ${LOG}"  
 /bin/su ${DAEMON_USER} -c "${WLS_HOME}/oracle_common/common/bin/wlst.sh ${DOMAIN_HOME}/stopAdminServer.py 2>&1 | tee -a ${LOG}"  
}  

startCluster(){  
 /bin/su ${DAEMON_USER} -c "echo 'Starting Weblogic Cluster on $(date)' | tee -a ${LOG}"  
 /bin/su ${DAEMON_USER} -c "${WLS_HOME}/oracle_common/common/bin/wlst.sh ${DOMAIN_HOME}/startCluster.py 2>&1 | tee -a ${LOG}"  
}  

stopCluster(){  
 /bin/su ${DAEMON_USER} -c "echo 'Stopping Weblogic Cluster on $(date)' | tee -a ${LOG}"  
 /bin/su ${DAEMON_USER} -c "${WLS_HOME}/oracle_common/common/bin/wlst.sh ${DOMAIN_HOME}/stopCluster.py 2>&1 | tee -a ${LOG}"  
}  

start() {  
 /bin/su ${DAEMON_USER} -c "echo 'Starting all Weblogic on $(date)' | tee -a ${LOG}"  
 OLDPID=`/usr/bin/pgrep -f ${PROCESS_STRING}`  
 if [ ! -z "$OLDPID" ]; then  
 /bin/su ${DAEMON_USER} -c "echo '${SERVICE_NAME} is already running (pid ${OLDPID}) !' | tee -a ${LOG}"  
 exit  
 fi  
 /bin/su ${DAEMON_USER} -c "echo -n 'Starting ${SERVICE_NAME}: ' | tee -a ${LOG}"  
 /bin/su ${DAEMON_USER} -c "${PROGRAM} 2>&1 | tee -a $LOG &"  
 export -f wait_for  
 /bin/su ${DAEMON_USER} -c "wait_for 'Plain socket listener started on port 5556' '${LOG}'" 2>&1 | tee -a ${LOG}  
 #store the error code of the last command  
 RETVAL=$?  
 startAdminServer  
 startCluster   
#if the return value is success touch the lock file  
 echo  
 [ ${RETVAL} -eq 0 ] && touch ${LOCKFILE}  
 return ${RETVAL}  
}  

stop() {  

 stopCluster  
 stopAdminServer  
 echo -n "Stopping ${SERVICE_NAME}: "  

 OLDPID=`/usr/bin/pgrep -f ${PROCESS_STRING}`  
 if [ "$OLDPID" != "" ]; then  
 /bin/kill -TERM ${OLDPID}  
 else  
 /bin/echo "${SERVICE_NAME} is stopped"  
 fi  
 RETVAL=$?  
 echo  
 [ ${RETVAL} -eq 0 ] && rm -f ${LOCKFILE}  
 return ${RETVAL}  

}  

restart() {  
 stop  
 sleep 10  
 start  
}  

case "$1" in  
 start)  
 start &  
 ;;  
 stop)  
 stop &  
 ;;  
 restart|force-reload|reload)  
 restart &  
 ;;  
 condrestart|try-restart)  
 [ -f ${LOCKFILE} ] && restart  
 ;;  
 status)  
 OLDPID=`/usr/bin/pgrep -f ${PROCESS_STRING}`  
 if [ "${OLDPID}" != "" ]; then  
 /bin/echo "${SERVICE_NAME} is running (pid: ${OLDPID})"  
 else  
 /bin/echo "${SERVICE_NAME} is stopped"  
 fi  
 RETVAL=$?  
 ;;  
 startAdminServer)  
 startAdminServer &  
 ;;  
 stopAdminServer)  
 stopAdminServer &  
 ;;  
 startCluster)  
 startCluster &  
 ;;  
 stopCluster)  
 stopCluster &  
 ;;  
 *)  
 echo $"Usage: $0 {start|stop|status|restart|reload|force-reload|condrestart|startAdminServer|stopAdminServer|startCluster|stopCluster}"  
 exit 1  
esac  

exit ${RETVAL}  

{% endhighlight %} You need to make the script executable  

{% highlight bash %} chmod +x nodemgr  
{% endhighlight %}

And you need it to run on startup  

{% highlight bash %} chkconfig nodemgr on  
{% endhighlight %}   
This references several scripts that are place in the domain home which in this case is  
{% highlight bash %} /home/weblogic/user_projects/domains/my_domain{% endhighlight %}   
The scripts are  

startAdminServer.py  
{% highlight bash %} if __name__ == '__main__':   
from wlstModule import *   

nmConnect(userConfigFile='/home/weblogic/user_projects/domains/my_domain/nodemanagerConfig.secure', userKeyFile='/home/weblogic/user_projects/domains/my_domain/nodemanagerKey.secure', host='myhost.mydomain.ie', port='5556', domainName='my_domain', domainDir='/home/weblogic/user_projects/domains/my_domain/', nmType='plain')  

nmStart('AdminServer')   

exit()  
{% endhighlight %}   

stopAdminServer.py  
{% highlight bash %} if __name__ == '__main__':   
from wlstModule import *   

try:   
connect(userConfigFile='/home/weblogic/user_projects/domains/my_domain/adminServerConfig.secure', userKeyFile='/home/weblogic/user_projects/domains/my_domain/adminServerKey.secure', url='t3://myhost.mydomain.ie:7001')  
 shutdown()  
 disconnect()  
except WLSTException,e:  
 print 'Could not shutdown admin server, attempting to kill it'  
 nmConnect(userConfigFile='/home/weblogic/user_projects/domains/my_domain/nodemanagerConfig.secure', userKeyFile='/home/weblogic/user_projects/domains/my_domain/nodemanagerKey.secure', host='myhost.mydomain.ie', port='5556', domainName='my_domain', domainDir='/home/weblogic/user_projects/domains/my_domain/', nmType='plain')  
 nmKill('AdminServer')  
 disconnect()  

exit()  

{% endhighlight %}   

startCluster.py  
{% highlight bash %} if __name__ == '__main__':   
from wlstModule import *  

connect(userConfigFile='/home/weblogic/user_projects/domains/my_domain/adminServerConfig.secure', userKeyFile='/home/weblogic/user_projects/domains/my_domain/adminServerKey.secure', url='t3://myhost.mydomain.ie:7001')  

start('my-cluster', 'Cluster')  

exit()  
{% endhighlight %}   

stopCluster.py  
{% highlight bash %} if __name__ == '__main__':   
from wlstModule import *  

connect(userConfigFile='/home/weblogic/user_projects/domains/my_domain/adminServerConfig.secure', userKeyFile='/home/weblogic/user_projects/domains/my_domain/adminServerKey.secure', url='t3://myhost.mydomain.ie:7001')  

shutdown('my-cluster', 'Cluster')  

exit()  

{% endhighlight %}
