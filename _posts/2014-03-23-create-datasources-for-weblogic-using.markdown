---
layout: post
title: Create datasources for weblogic using WLST
date: '2014-03-23T18:42:00.000Z'
author: David
tags:
- wlst
- weblogic
modified_time: '2014-04-03T22:43:26.505+01:00'
blogger_id: tag:blogger.com,1999:blog-2027514548288128942.post-2361511894501527125
blogger_orig_url: http://davidkerwick.blogspot.com/2014/03/create-datasources-for-weblogic-using.html

---

If you are flattening your dev Weblogic server regularly you might want to have your datasources in a wlst file so you can re run it every time.  

Here is one you can use as the basis  

{% highlight python %}
if __name__ == '__main__':  
    from wlstModule import *  

print 'Starting the  create datasource script ....'  
#connect to the Adminserver  
connect('weblogic', 'weblogic1', 't3://myhost.mydomain.ie:7001')  
#switch to the cluster  
cd("/Clusters/my-cluster")  
#record the cluster a variable for later use  
target = cmo  
#return to the root  
cd("../..")  

#method to create a datasource with generic settings  
def create_datasource(username, password, jndiList):  
    print 'Creating a data source with name ' + username  
    #Create a datasource using the username as the name  
    jdbcSystemResource = create(username, "JDBCSystemResource")  
    jdbcResource = jdbcSystemResource.getJDBCResource()  
    jdbcResource.setName(username)  

    #set the connection properties  
    connectionPoolParams = jdbcResource.getJDBCConnectionPoolParams()  
    connectionPoolParams.setConnectionReserveTimeoutSeconds(25)  
    connectionPoolParams.setInitialCapacity(1)  
    connectionPoolParams.setMaxCapacity(5)  
    connectionPoolParams.setTestConnectionsOnReserve(true)  
    connectionPoolParams.setHighestNumWaiters(20)  
    connectionPoolParams.setStatementTimeout(30)  
    connectionPoolParams.setTestTableName("SQL SELECT 1 FROM DUAL")  

    #add each element in the jndiList array as a jndi name  
    dsParams = jdbcResource.getJDBCDataSourceParams()  
    for jndi in jndiList:  
      print 'Add jndi ' + jndi + ' to datasource ' + username  
      dsParams.addJndiName(jndi)  

    #Set the connection to the database  
    driverParams = jdbcResource.getJDBCDriverParams()  
    driverParams.setUrl("jdbc:oracle:thin:@your_db_hostname:1521:your_db_server_name")  
    driverParams.setDriverName("oracle.jdbc.driver.OracleDriver")  
    driverParams.setPassword(password)  

    driverProperties = driverParams.getProperties()  
    proper = driverProperties.createProperty("user")  
    proper.setValue(username)  

    #target the new datasource to your cluster  
    jdbcSystemResource.addTarget(target)  

edit()  
startEdit()  

#create an array for the datasource  
jndiList='jdbc/whatever','jdbc/whomever','jdbc/etc'  
create_datasource('who_ds', 'who_ds_pw', jndiList)  

#create an array for the datasource  
jndiList=['jdbc/curly','jdbc/larry','jdbc/moe']  
create_datasource('stooges', 'stooges_pw', jndiList)  

save()  
activate(block="true")  

print 'Finished configuring the data source'  

{% endhighlight %}
