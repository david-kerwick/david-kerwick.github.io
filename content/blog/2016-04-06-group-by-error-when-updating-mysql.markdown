---
title: Group By error when updating mysql
layout: post
date: '2016-04-06T16:14:33'
---
When playing with Docker, php and mysql I ended up using the latest mysql with some old php
This caused php to start spewing errors such as

``` ruby
Expression #1 of SELECT list is not in GROUP BY clause and contains 
nonaggregated column 'db.table.column' which is not functionally 
dependent on columns in GROUP BY clause; this is incompatible with
sql_mode=only_full_group_by
```

So mysql changed the default for group by (a while ago it turns out) which means old and I guess incorrectly written group by statements don't work.  So the long term solution is to fix these statements but for now I just want to get it running like before but using Docker.

So one option is to use the old version of mysql, something that pre-dates mysql 5.7.5.
The other option is to turn off the `only_full_group_by` setting.

This can be done in a session using 
``` sql
SET sql_mode = '';
```
Or globally using
``` sql
SET GLOBAL sql_mode = '';
```
That turns off all sql modes btw.

But I'd prefer to have this as part of my docker build which uses the official mysql docker image.
Too to that I need to add a custom config which will set the sql mode.
To find out the current sql modes enabled run
``` sql
SELECT @@sql_mode;
```
So this will list everything enabled including `only_full_group_by`
``` text
ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
```

So you can add the sql mode to the existing my.cnf dropping the `only_full_group_by` of course
``` bash
[mysqld]
sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
```

For a new container in dockerland the official image has an extension point so map your own whatever.cnf into `/etc/mysql/conf.d` as long and it ends in `.cnf` it will be combined into the config