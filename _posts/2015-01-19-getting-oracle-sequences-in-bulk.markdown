---
layout: post
title: Getting Oracle Sequences in bulk
date: '2015-01-19T22:06:00.002Z'
author: David Kerwick
---

So following on from getting [one value from a sequence]({% post_url 2015-01-19-getting-oracle-sequence-in-spring %}) what if you want to get alot of sequences in bulk.  So you could get them as and when you need them or you could loop the number of times to need and call the OracleSequenceMaxValueIncrementer each time.  

Depending on the amount you need you may find this pretty slow as at the end of the day it's a database call each time and there's a cost to that that adds up.  

So how to get them in bulk, it would be good if a sequence gave you a list if you asked for it but that doesn't seem to be there yet.  So how about we cheat a bit  

select message_id.nextval from dual connect by level <= 50;  

Will give you 50 values from the sequence.  Happy days, so leave it at that right... No?

Well I have to say if I was asked to explain it fully in an interrogation room under a swinging lamp I would be hard pressed.

It uses hierarchal queries but not strictly correctly, there's none of the other supporting stuff like 'start with' and 'prior' so it causes it to act like a recursion.  So I assume really large values will blow it up but several thousand should be fine.

And one database and network round trip = fast so don't over think it :)

An example class that does this would be  



{% highlight java %}
import java.util.List;  

import javax.sql.DataSource;  

import org.slf4j.Logger;  
import org.springframework.beans.factory.annotation.Autowired;  
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;  
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;  
import org.springframework.stereotype.Repository;  

@Repository  
public class MessageIdSeqBulkImpl implements MessageIdSeqBulk {  
    private transient NamedParameterJdbcTemplate namedTemplate;  

      @Autowired  
    public void setDataSource(DataSource dataSource) {  
        this.namedTemplate = new NamedParameterJdbcTemplate(dataSource);  
    }  

    @Override  
    public List<Integer> getBulkMessageId(int count) {  
        MapSqlParameterSource paramSource = new MapSqlParameterSource("count", count);  
        return this.namedTemplate.queryForList(“select message_id.nextval from dual connect by level <= :count  
”, paramSource, Integer.class);  
    }  
}  
{%  endhighlight %}
