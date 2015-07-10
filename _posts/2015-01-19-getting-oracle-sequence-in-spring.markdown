---
layout: post
title: Getting an Oracle Sequence in Spring
date: '2015-01-19T21:38:00.000Z'
author: David
tags: 
modified_time: '2015-01-19T21:38:14.842Z'
blogger_id: tag:blogger.com,1999:blog-2027514548288128942.post-3377114735126612980
blogger_orig_url: http://davidkerwick.blogspot.com/2015/01/getting-oracle-sequence-in-spring.html

---

Ok so this one is a bit of lead in but no harm in it by itself.  
If you are using Spring and want to get the next value from an Oracle sequence you can do something like this.  

{% highlight java %}
import javax.sql.DataSource;  

import org.slf4j.Logger;  
import org.springframework.beans.factory.annotation.Autowired;  
import org.springframework.jdbc.support.incrementer.OracleSequenceMaxValueIncrementer;  
import org.springframework.stereotype.Repository;  
import org.springframework.transaction.annotation.Transactional;  

@Repository  
public class MessageIdSeqDaoImpl implements MessageIdSeqDao {  

    private static final Logger  logger          = org.slf4j.LoggerFactory.getLogger(MessageIdSeqDaoImpl.class);
    private static final String  MESSAGE_ID = "message_id";  
    private transient DataSource dataSource;  

    @Autowired  
    public void setDataSource(DataSource dataSource) {  
        this.dataSource = dataSource;  
    }  

    @Transactional(readOnly = true)  
    @Override  
    public int getNext() {  
        OracleSequenceMaxValueIncrementer incr = new OracleSequenceMaxValueIncrementer(this.dataSource, MESSAGE_ID);  
        int messageId = incr.nextIntValue();  
        logger.debug("Sequence nextval = '{}'", messageId);  
        return messageId;  
    }  
}  
{%  endhighlight %}
This is a basic wrapper that uses the Spring class `OracleSequenceMaxValueIncrementer` to get the sequence, as you can see you pass in the datasource and the name of the sequence.
In this case the sequence is an int hence the `nextIntValue` method there's also one for long and String.  

Short and sweet now if you wanted to get them in bulk...