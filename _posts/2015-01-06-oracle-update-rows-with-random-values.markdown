---
layout: post
title: Oracle Update Rows With Random Values From A Set
date: '2015-01-06T16:28:00.001Z'
author: David
tags: 
modified_time: '2015-01-06T16:28:28.185Z'
blogger_id: tag:blogger.com,1999:blog-2027514548288128942.post-8682101546839001104
blogger_orig_url: http://davidkerwick.blogspot.com/2015/01/oracle-update-rows-with-random-values.html

---

So I had to update a table on Oracle and set one of the values to a random value, but that value had to be from a set of fixed values.  

I was looking at doing something based on the row number, perhaps all the rows starting with 1 get value X, etc...  

But that wasn't very random but would distribute pretty well, in blocks anyway.  

So I think combining DECODE and DBMS_RANDOM is the best solution.  

Random can give us a random number within a range, say 1-6  

{% highlight sql %}
select dbms_random.value(1,7) rand_num from dual;  

rand_num  
5.77115198323733 

{% endhighlight  %}
	
We will need a whole number though  

{% highlight sql %}
select trunc(dbms_random.value(1,7)) rand_num from dual;  

rand_num  
5.77115198323733 
{% endhighlight  %}

round might seem tempting but won't distribute evenly  

Next we can use the decode statement which acts like an if-elseif-else block  
{% highlight sql %}
select decode( trunc(dbms_random.value(1,7)),  
1,'Some value 1',  
2,'Some value 2',  
3,'Some value 3',  
4,'Some value 4',  
5,'Some value 5',  
'Default value') from dual; 
{% endhighlight  %}

Not the greatest set of values but shows what happens.   
The random statement picks a value between 1 and 6.  
The decode statement then picks the string associated with this number, '6' is not defined but the default value picks that up.  

So in the end the update statement would look something like this  
{% highlight sql %}
update some_table set some_value = decode( trunc(dbms_random.value(1,7)),  
1,'Some value 1',  
2,'Some value 2',  
3,'Some value 3',  
4,'Some value 4',  
5,'Some value 5',  
'Default value');  
{% endhighlight  %}