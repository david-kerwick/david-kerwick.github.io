---
layout: post
title: 'ORA-39726: unsupported add/drop column operation on compressed tables'
date: '2017-02-23T21:11:00'
---

Working on an old table I needed to add a primary key.  Attempting the below code

`alter table old_table add (new_id varchar2(40 char) default sys_guid() not null);`

Gave the error

`ORA-39726: unsupported add/drop column operation on compressed tables`

I think the problem is with the default value rather than adding the new column. So in order to add the key you will need to decompress the table then I guess compress it again so it's back to how it was.

```
alter table old_table move nocompress;
alter table old_table add (new_id varchar2(40 char) default sys_guid() not null);
alter table old_table add constraint pk_old_table primary key (new_id);
alter table old_table move compress;
```

DBA might have words about such an approach but it works.
