---
layout: post
title: Intellij customise JPA generation
date: '2017-02-21T21:52:00'
---

Intellij can generate your initial mappings from your existing database schema if you so wish. This I find is a good starting point but you tend to have to do a bit of cleanup after.

One of the things is that I use Lombok and the default generation puts all the annotations on the getters.  This makes adding Lombok a bit of a pain as you have to move all the annotations to the field level before removing the getters and setters.

But all is not lost, of the bugger all you can customise the location of the annotations seem to be it.

Create an `orm.xml` file in your `META-INF` folder

Add the following contents

```
<?xml version="1.0" encoding="UTF-8"?>
<entity-mappings xmlns="http://xmlns.jcp.org/xml/ns/persistence/orm"
                 version="2.1">
    <persistence-unit-metadata>
        <persistence-unit-defaults>
            <access>FIELD</access>
        </persistence-unit-defaults>
    </persistence-unit-metadata>
</entity-mappings>
```

Pretty self explanatory, changes the access type from PROPERTY (the getters) to FIELD (the declarations) which makes converting to use Lombok easier.

You will also generally need to change the time/date mappings I find.  If that kind of thing bugs you vote on [this](https://youtrack.jetbrains.com/issue/IDEA-144763) issue to hopefully get it looked at
