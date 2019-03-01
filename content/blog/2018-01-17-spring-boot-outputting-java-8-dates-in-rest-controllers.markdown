---
layout: post
title: Spring Boot outputting java 8 dates in rest controllers
date: '2018-01-17T12:13:00'
---

If you are using Spring Boot and have it marshaling your DTO's to json for you you'll probably encounter is handling dates in an 'oddball' fashion.

So something like

```
"dob":[1970,10,30]
```

An array, no thanks.

to change that add the following to your application.properties

```
spring.jackson.serialization.WRITE_DATES_AS_TIMESTAMPS=false
```

You'll now get the much better looking

```
"dob":"1970-10-30"
```
