---
layout: post
title: Access a H2 in memory database from other clients
date: '2017-08-08 22:38'
---

While the H2 console is handy, I'd prefer to use the tool I'm using for sql most of the time just for handiness and in my case it's IntelliJ so it also means having everything in the one place, the code, running boot and the sql.

In order to do that you need to start a H2 server on startup which will listen for incoming connections.

H2 have a 'how to' on starting such a server on their page [here](http://www.h2database.com/html/tutorial.html#spring) but that's xml config, sure who uses that anymore in the shiny new land of Boot :)

So I believe this is the equivalent, add to your application start class

```
@Bean(initMethod="start", destroyMethod="stop")
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

You can then connect to H2 from any sql client using something like

`jdbc:h2:tcp://localhost:9092/mem:testdb`
