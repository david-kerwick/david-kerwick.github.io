---
layout: post
title: Http 400 Error Submitting a Form With Errors With Spring
date: '2015-01-19T20:47:00.001Z'
author: David Kerwick
---

So I got a http 400 error when testing a form I thought used to work.  
Something like this  

![Error Screenshot](./assets/img/http-400-error-submitting-form-with/error-screenshot.png)

I'm using Spring MVC.  
The form will submit fine if there are no errors but fails with a 400 error if there's a validation problem.  

It's likely the curse of the evil copy and paste.  
``` java
@RequestMapping(method = RequestMethod.POST, value = "/something")  
    public String somethingPost(Model model, @Valid SomeForm form,   
            HttpServletRequest req, BindingResult result) {  
```
So it looks harmless enough but it should look like this  

``` java
@RequestMapping(method = RequestMethod.POST, value = "/something")  
    public String somethingPost(Model model, @Valid SomeForm form,   
            BindingResult result, HttpServletRequest req) {  
```        

The Binding result must follow the form, I had pasted `HttpServletRequest req` in between them and borked the binding.  

[http://docs.spring.io/spring/docs/4.1.x/spring-framework-reference/html/mvc.html#mvc-ann-methods](http://docs.spring.io/spring/docs/4.1.x/spring-framework-reference/html/mvc.html#mvc-ann-methods)  

> org.springframework.validation.Errors /  org.springframework.validation.BindingResult validation results for a preceding command or form object (the immediately preceding method argument).
