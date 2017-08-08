---
layout: post
title: Spring Boot - use profiles to have H2 for local and Oracle for prod
date: '2017-08-08 22:39'
---

Having set up H2 in the previous posts which is handyish it needs to be set up in such a way that H2 only kicks in when developing locally and it should connect to a Oracle instance otherwise.

So Spring has you pretty well covered here with the use of profiles.

First up is to split your `application.properties` into your different profiles.

In this case I'm going to go with three

- `application.properties`       - settings shared across all
- `application-local.properties` - settings for local (H2)
- `application-prod.properties`  - settings for prod (Oracle)

## application.properties
There's not alot common at the moment but that will grow with the application.  For now

```
spring.jpa.hibernate.ddl-auto=none
```

## application-local.properties
Set up H2, I also find it useful to have debugging turned on for JDBC so you can see what's gone wrong.

```
logging.level.org.springframework.jdbc=DEBUG
spring.h2.console.enabled=true
spring.datasource.url=jdbc:h2:mem:testdb;MODE=Oracle;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE
spring.datasource.platform=h2
h2.tcp.enabled=true
```

## application-prod.properties
In prod all we need is the name of the datasource to use.

```
spring.datasource.jndi-name=jdbc/myapp
```

From the previous post H2 server was started in the Application class, we also only want this to happen for the local profile so add `@Profile("local")` to that bean definition like so

```
@Bean(initMethod = "start", destroyMethod = "stop")
@Profile("local")
public Server h2Server() {
    Server h2Server;
    try {
        h2Server = Server.createTcpServer();
    } catch (SQLException e) {
        throw new RuntimeException("Failed to start H2 server: ", e);
    }
    return h2Server;
}
```
