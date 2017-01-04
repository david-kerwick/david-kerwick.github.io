---
layout: post
title: Http 400 Error Submitting a Form With Errors With Spring
date: '2015-01-19T20:47:00.001Z'
author: David
tags:
modified_time: '2015-01-19T20:47:29.661Z'
thumbnail: http://1.bp.blogspot.com/-TrReH9mnDcs/VL1pze7ZqWI/AAAAAAAAFYA/J4WHLQ8WSP8/s72-c/Screen%2BShot%2B2015-01-19%2Bat%2B20.28.33.png
blogger_id: tag:blogger.com,1999:blog-2027514548288128942.post-5946017471358651403
blogger_orig_url: http://davidkerwick.blogspot.com/2015/01/http-400-error-submitting-form-with.html

---

So I got a http 400 error when testing a form I thought used to work.  
Something like this  

[![](http://1.bp.blogspot.com/-TrReH9mnDcs/VL1pze7ZqWI/AAAAAAAAFYA/J4WHLQ8WSP8/s1600/Screen%2BShot%2B2015-01-19%2Bat%2B20.28.33.png)](http://1.bp.blogspot.com/-TrReH9mnDcs/VL1pze7ZqWI/AAAAAAAAFYA/J4WHLQ8WSP8/s1600/Screen%2BShot%2B2015-01-19%2Bat%2B20.28.33.png)

I'm using Spring MVC.  
The form will submit fine if there are no errors but fails with a 400 error if there's a validation problem.  

It's likely the curse of the evil copy and paste.  
{% highlight java %}
@RequestMapping(method = RequestMethod.POST, value = "/something")  
    public String somethingPost(Model model, @Valid SomeForm form,   
            HttpServletRequest req, BindingResult result) {  
{% endhighlight %}
So it looks harmless enough but it should look like this  

{% highlight java %}
@RequestMapping(method = RequestMethod.POST, value = "/something")  
    public String somethingPost(Model model, @Valid SomeForm form,   
            BindingResult result, HttpServletRequest req) {  
{% endhighlight %}        

The Binding result must follow the form, I had pasted `HttpServletRequest req` in between them and borked the binding.  

[http://docs.spring.io/spring/docs/4.1.x/spring-framework-reference/html/mvc.html#mvc-ann-methods](http://docs.spring.io/spring/docs/4.1.x/spring-framework-reference/html/mvc.html#mvc-ann-methods)  

> org.springframework.validation.Errors /  org.springframework.validation.BindingResult validation results for a preceding command or form object (the immediately preceding method argument).
