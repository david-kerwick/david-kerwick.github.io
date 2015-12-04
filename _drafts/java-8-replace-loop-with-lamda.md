---
layout: post
title: Java 8 replace loop with lamda
categories: 
 - blog
date: 2015-12-01 14:17:24

---

So we have upgraded to Java 8 and so there's the oppurtunity to refactor some things when they are being upgraded for other reasons.

So one of these is converting some loops to lamda's, when the loops are doing extra logic, a standard loop doesn't make much sense to play with.

{% highlight java %}
HashMap<String, String> propMap = new HashMap<>();
for (PcrsUserPropVo pcrsUserPropVo : properties) {
    if (StringUtils.isNotEmpty(pcrsUserPropVo.getPropId())
            && StringUtils.isNotEmpty(pcrsUserPropVo.getValue())) {
        propMap.put(pcrsUserPropVo.getPropId(), pcrsUserPropVo.getValue());
    }
}
{% endhighlight %}

Can be turned into this

{% highlight java %}
 Map<String, String> propMap = properties
        .stream()
        .filter(prop -> StringUtils.isNotEmpty(prop.getPropId()) && StringUtils.isNotEmpty(prop.getValue()))
        .collect(Collectors.toMap(PcrsUserPropVo::getPropId, PcrsUserPropVo::getValue));
{% endhighlight %}

Better? Well that's up for debate I think, it's a bit cleaner once you speak lamda I guess