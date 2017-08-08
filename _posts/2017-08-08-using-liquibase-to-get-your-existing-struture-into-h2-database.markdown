---
layout: post
title: Using liquibase to get your existing structure into H2 database
date: '2017-08-08 22:09'
---

Following on from setting up an in memory H2 database in spring boot for initial development I wanted an easy enough way to set up some existing tables on H2 start up.  So in the previous post I laid the ground work for that in that I have files that will create the tables and another that will then insert the data to those tables.  And if you are creating new tables the world is your oyster and you can hack away.

If you have an existing set of tables and it's more than one or two you will want a way of exporting those and adding them to your `schema-h2.sql` file.  But going from one database to another can be a world of fun, in my case I'm going from Oracle to H2.

There are a few gotchas with that kind of thing, so it's easy enough export the create script from Oracle but it will specify varchar2 columns like so

`SURNAME VARCHAR2(50 BYTE)`

or

`SURNAME VARCHAR2(50 CHAR)`

H2 has no idea what you are talking about, it wants it like so

`SURNAME VARCHAR2(50)`

or

`SURNAME VARCHAR2(50 CHAR)`

if you end up trying the `BYTE` variant it will bomb out with an error

`expected "K, M, G, CHAR,`

And there are a few of these. Another way while not perfect is to use liquibase to generate your creation scripts from Oracle but in the H2 syntax.  Sure sounds like a winner.

Download liquibase and cd into it's directory.  You will also need to have the oracle jdbc driver or know where it is on your system.  In my case I have one in my tomcat directory.
```
liquibase --driver=oracle.jdbc.OracleDriver --classpath=/Users/David/Downloads/apache-tomcat-7.0.70/lib/ojdbc7.jar --url="jdbc:oracle:thin:@//192.168.215.27:1521/test.db.ie" --username=user --password=pass --changeLogFile=/Users/David/Downloads/test_db.h2.sql generateChangeLog --includeObjects="table:MY_TABLE, sequence:MY_SEQ"
```

Several things going on in this big command lets break it down.

- `liquibase` : the main command to run
- `--driver=oracle.jdbc.OracleDriver` : the driver to use
- `--classpath=/Users/David/Downloads/apache-tomcat-7.0.70/lib/ojdbc7.jar` : the location of the driver
- `--url="jdbc:oracle:thin:@//192.168.215.27:1521/test.db.ie"` : the connect string for the database
- `--username=user` : username to use
- `--password=pass` : password to use
- `--changeLogFile=/Users/David/Downloads/test_db.h2.sql` : file to create, lots of magic here see below
- `generateChangeLog` : what you want liquibase to do, create a change log in this case
- `--includeObjects="table:MY_TABLE, sequence:MY_SEQ"` : the list of objects to include, leave this out for everything

`test_db.h2.sql` the extension of the change log file will get you different things.  So in this case the `.h2` tells it we want the output in H2 syntax, you could specify `.oracle` here for example if you wanted oracle syntax. The `.sql` says you want normal sql syntax which you can run from anywhere, `.xml`, `.yaml` gives you a liquibase formatted file where you need to use liquibase to do the loading.

This will smooth out a good bit of the differences but you will still end with a few.
Here are some.

- For sequences maxvalue doesn't seem to be supported
- Beware of uses of functions for defaults, while `sysdate` is supported `user` and `sys_guid()` are not
- Doesn't seem to be happy with constraints that are set up using an index
- Functional indexes are probably worth skipping, things using `UPPER` / `TRUNC` etc...
- It does an odd thing with number precision it might output it like `number(*, 0)` but needs to be just `number` or `number(12, 0)`
