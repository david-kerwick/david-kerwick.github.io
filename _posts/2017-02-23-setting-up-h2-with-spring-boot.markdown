---
layout: post
title: Setting up H2 with Spring Boot
date: '2017-02-23 21:11'
---

Spring Boot makes it fairly painless to spin up a H2 database. So I decided to try it out on my next project as a way to develop locally and have seeded the test scripts with relevant data.

First off include H2 in the dependencies of your pom

```
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
</dependency>
```

And well you are just about done! Which is impressive.

You can configure things in your `application.properties` such as

```
spring.h2.console.enabled=true
spring.datasource.url=jdbc:h2:mem:testdb;MODE=Oracle;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE
spring.datasource.platform=h2
spring.jpa.hibernate.ddl-auto=none
```

`spring.h2.console.enabled=true` enables the H2 console, which you can get to on `http://localhost:8080/h2-console` after startup. It allows you to view the tables, data, run sql etc... Handy for playing around with things while your developing.

`spring.datasource.url=jdbc:h2:mem:testdb;MODE=Oracle;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE` sets up the in memory H2 database. You can also pass along a few parameters, so in this case it's set to Oracle mode as Oracle will be the real database that will be used. `DB_CLOSE_ON_EXIT` is recommended by Spring Boot so that it handles the closing of the db when it's ready. `DB_CLOSE_DELAY` was another recommendation I found since it's in memory there's no need to delay the shutdown.

`spring.datasource.platform=h2` set the platform for use during database initialisation, details [here](https://docs.spring.io/spring-boot/docs/current/reference/html/howto-database-initialization.html#howto-initialize-a-database-using-spring-jdbc) which sets the schema/data load file to `schema-h2.sql` and `data-h2.sql`

`spring.jpa.hibernate.ddl-auto=none` stop jpa from reinitialising your database.  I'm going to be using the scripts.

Then create `schema-h2.sql` and add your creation scripts and create `data-h2.sql` and add your test data in your resources folder.

These will then run on startup and build your H2 database. How to seed those from an existing database is another post.
