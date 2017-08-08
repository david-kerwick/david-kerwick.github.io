---
layout: post
title: Spring Data and Named Parameters
date: '2017-08-08 22:31'
---

Having got used to Spring figuring out the name of parameters based on the name of the passed in names I was surprised when using Spring Data that I got the error

```
Name for parameter binding must not be null or empty! For named parameters you need to use @Param for query method parameters on Java versions < 8
```

A lot when I tested my new app.  I have Java 8 so all should be good, but it wasn't.

So I attempted to set the compiler options in maven as per the [example](https://github.com/spring-projects/spring-data-examples/blob/master/pom.xml#L110)

i.e

```
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-compiler-plugin</artifactId>
  <version>${maven-compiler-plugin.version}</version>
  <configuration>
	  <source>${java.version}</source>
	  <target>${java.version}</target>
	  <compilerArgument>-parameters</compilerArgument>
  </configuration>
</plugin>
```

That didn't work, it also didn't fit with the options I current had so I tried

```
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-compiler-plugin</artifactId>
  <version>${maven-compiler-plugin.version}</version>
  <configuration>
    <source>${java.version}</source>
    <target>${java.version}</target>
    <compilerArgs>
      <arg>-Xlint</arg>
      <arg>-parameters</arg>
    </compilerArgs>
  </configuration>
</plugin>
```

Still no joy.

Thought it might be that I'm running Tomcat from IntelliJ so set it's compiler to pass the `-parameters` flag.

At that point I've stopped for now and just added `@Param("parameterName")` for anything that needed it.
