---
layout: 'post'
title: "Dealing with Java 8 LocalDate in jsp's"
date: '2018-01-17T15:55:00'
---

When converting legacy apps to bring them up to Java 8 one of the things I sometimes run into is when switching from Date to LocalDate that some jps's that format dates.

You may get the error

``` java
Caused by: javax.el.ELException: Cannot convert 2014-08-12T12:39:08 of type class java.time.LocalDateTime to class java.util.Date
```

The jstl tags don't know how to directly handle java 8's LocalDate and LocalDateTime
So what you'll need to do it parse in like a String first and then use that value for the formatting so something like

``` html
<fmt:parseDate value="${patient.dob}" pattern="yyyy-MM-dd" var="patientDob" type="date"/>
<fmt:formatDate pattern="dd/MMM/yyyy" value="${patientDob}"/>

```
