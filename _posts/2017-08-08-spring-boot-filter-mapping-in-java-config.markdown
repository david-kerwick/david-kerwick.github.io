---
layout: post
title: Spring Boot filter-mapping in Java Config
date: '2017-08-08 22:55'
---

Using Spring Boot for a while you get used to not having a `web.xml` but every now and again you want to do something and all you can find is how to do it in web.xml.

One such thing I needed to do was to customise a servlet filter, I needed to change it's dispatcher settings.

So in web.xml it looks like this.

```
<filter-mapping>
    <filter-name>sitemesh</filter-name>  
    <url-pattern>/*</url-pattern>   
    <dispatcher>REQUEST</dispatcher>    
    <dispatcher>FORWARD</dispatcher>
    <dispatcher>ERROR</dispatcher>
</filter-mapping>
```

It took me longer than I liked to find the solution to that so wanted to write it down.

Basically you use `FilterRegistrationBean`

So in Spring Boot I first had.

```
@Bean
public Filter siteMeshFilter() {
    return new SiteMeshFilter();
}
```

You can change it to

```
@Bean
public FilterRegistrationBean siteMeshFilter() {
    FilterRegistrationBean registration = new FilterRegistrationBean();
    registration.setFilter(new SiteMeshFilter());
    registration.setEnabled(true);
    registration.addUrlPatterns("/*");
    registration.setOrder(1);
    registration.setDispatcherTypes(DispatcherType.ERROR, DispatcherType.FORWARD, DispatcherType.REQUEST);
    return registration;
}
```

To get access to all the other good stuff from filter-mapping.

It didn't solve my sitemesh not decorating error pages of course, but I had to go down this rabbit hole first.
