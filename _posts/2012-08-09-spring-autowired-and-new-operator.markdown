---
layout: post
title: Spring @Autowired and the new operator
date: '2012-08-09T10:17:00.000+01:00'
author: David
tags: 
modified_time: '2012-08-09T10:17:23.083+01:00'
blogger_id: tag:blogger.com,1999:blog-2027514548288128942.post-8790621473285832872
blogger_orig_url: http://davidkerwick.blogspot.com/2012/08/spring-autowired-and-new-operator.html

---

So there I was happily shooting the breeze and added @Autowired to things like it was going out of fashion.  But I then added it to a normal bean, which I was creating using the new operator in a RowMapper. Something like this  

{% highlight java linenos %}
private static final class MyBeanMapper implements RowMapper <MyBean>{  

  @Override  
  public CapSumLineBean mapRow(ResultSet resultSet, int rowNum) throws SQLException {  

    MyBean myBean = new MyBean();  
    myBean.setParam1(resultSet.getString("param1"));  
    myBean.setParam1(resultSet.getString("param1"));  
    return myBean;  
  }  
}

{% endhighlight %}

And MyBean looks something like  

{% highlight java linenos %}
	public class MyBean implements Serializable  
{  
    private static final long serialVersionUID = 1L;  
    @Autowired 
    private transient SomeUtil someUtil;  
    private String param1;  
    private String param2;  
    public String getParam1() {  
        return someUtil.doSomething(this.param1);  
    }  
    public void setParam1(String param1) {  
        this.param1 = param1;  
    }  
    public String getParam2() {  
        return this.param2;  
    }  
    public void setParam2(String param2) {  
        this.param2 = param2;  
    }  
}  
{% endhighlight %}


So when you call getParam1 you will get a `NullPointerException` because the `@Autowired` didn't do anything.  It didn't do anything because this bean was created by me and not Spring and for `@Autowired` or any of its mates to work the bean must be Spring managed which something created by the new operator generally isn't.  

## Getting MyBean Spring Managed

So 'simple' solution, make the bean one that's managed by Spring.  A bit of googling and  I could create a factory class to produce these objects and tie that factory into Spring so the beans produced are Spring managed.  That seems clunky to me at the time, it may be the best approach as I started down the rabbit hole with the next bit.  

### It's easy just use @Configurable

Found this  
[http://static.springsource.org/spring/docs/3.1.x/spring-framework-reference/html/aop.html#aop-atconfigurable](http://static.springsource.org/spring/docs/3.1.x/spring-framework-reference/html/aop.html#aop-atconfigurable)  
Add an annotation and some config and Spring will catch the new operator operation and do it's magic, or something like that general Aspect Voodoo happens anyway.  

Right.... it's never that easy I added `@Configurable` to MyBean and added  
`<context:spring-configured/> ` to my root-context.xml and I get the error  

{% highlight java cssclass=nowrap %}
Caused by: java.lang.ClassNotFoundException: org.springframework.beans.factory.aspectj.AnnotationBeanConfigurerAspect   
{% endhighlight %}

Time to check the dependencies I already had  

{% highlight xml %}
	<dependency>  
  <groupId>org.aspectj</groupId>  
  <artifactId>aspectjrt</artifactId>  
  <version>${org.aspectj-version}</version>  
</dependency>  
<dependency>  
  <groupId>cglib</groupId>  
  <artifactId>cglib</artifactId>  
  <version>${cglib.version}</version>  
</dependency>
{% endhighlight %}

Which brought in spring-aop So I added  

{% highlight xml %}
<dependency>  
  <groupId>org.springframework</groupId>  
  <artifactId>spring-aspects</artifactId>  
  <version>${org.springframework-version}</version>  
</dependency>  
{% endhighlight %}

Which stopped the errors anyway  
But still getting the NullPointerException  
Found something which suggested adding in   
`<context:annotation-config />  `
Which did no harm but didn't solve anything  
Next discovered was that `@Configurable` needs load time weaving, thought I had that I'm sure STS asked me about it, must have been compile time weaving?  
Anyway I added in  
`<context:load-time-weaver/>  `
Which resulted in  

{% highlight java cssclass=nowrap %}
Caused by: java.lang.IllegalStateException: ClassLoader [org.apache.catalina.loader.WebappClassLoader] does NOT provide an 'addTransformer(ClassFileTransformer)' method. Specify a custom LoadTimeWeaver or start your Java virtual machine with Spring's agent: -javaagent:org.springframework.instrument.jar  
{% endhighlight %}

Turns out Tomcat isn't that happy about load time weaving   
[http://static.springsource.org/spring/docs/3.1.x/spring-framework-reference/html/aop.html#aop-aj-ltw-environments](http://static.springsource.org/spring/docs/3.1.x/spring-framework-reference/html/aop.html#aop-aj-ltw-environments)  
I got the jar from  
[http://mvnrepository.com/artifact/org.springframework/spring-instrument-tomcat](http://mvnrepository.com/artifact/org.springframework/spring-instrument-tomcat)  
And added it into <span class="emphasis">_$CATALINA_HOME_</span>/lib  
I went blunderbuss and added  

{% highlight xml cssclass=nowrap%}
	<Loader loaderClass="org.springframework.instrument.classloading.tomcat.TomcatInstrumentableClassLoader" />  
{% endhighlight %}

to the Servers context.xml  
Which lead to the error 

{% highlight java cssclass=nowrap%}java.lang.IllegalStateException: LifecycleProcessor not initialized - call 'refresh' before invoking lifecycle methods via the context   
{% endhighlight %}


Well time to throw more dependencies at this so  

{% highlight java %}
<dependency>  
    <groupId>org.aspectj</groupId>  
    <artifactId>aspectjweaver</artifactId>  
    <version>${org.aspectj-version}</version>  
</dependency>  

{% endhighlight %}

And it works!  

### Conclusion

Once setup with the dependencies and config elements `@Configurable` should just work like the rest of the magic annotations all be it there's more Aspect Voodoo going on.  All in all it might be worth considering the factory option but this should be cleaner... I probably need to revisit the config and take out what's not needed and I just started adding things in to try get it to work.