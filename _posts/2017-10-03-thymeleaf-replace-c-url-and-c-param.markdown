---
layout: post
title: 'Thymeleaf - replace c:url and c:param'
date: '2017-10-03 16:10'
---

As part of my conversion from jsp's to Thymeleaf I came across a block that was creating url's using `c:url` and `c:param` for the url parameters.

So there is several things going on in the code

```
<fmt:message key="linkDesc" var="linkDescVar"/>
<c:set value="?${pageContext.request.queryString}" var="queryString"/>
<c:set var="baseUrl" value="/test/app"/>
<c:if test="${queryString == '?'}">
    <c:set value="" var="queryString"/>
</c:if>

<c:set var="testLink" value="${pageContext.request.requestURI}${queryString}"/>
<c:url value="${baseUrl}" context="/" var="baseUrlLink">
    <c:param name="link" value="${testLink}"></c:param>
    <c:param name="linkDesc" value="${linkDescVar}"></c:param>
</c:url>
```

So it's forming a url link to test/app and adding parameters of where it's currently at including the current query string. So if you go to say `http://localhost:8080/pub/home?key=value` it should form a link that would go to `http://localhost:8080/test/app?link=home?key=value&linkDesc=testit`

The linkDesc comes from the `messages.properties` file

So things are done this way because of how the jsp taglibs work.  The Thymeleaf solution might not be a line by line replacement. But lets go through it line by line, look at the options in Thymeleaf then see about mushing it all together into something that works.

## `<fmt:message key="linkDesc" var="linkDescVar"/>`

The normal replacement for `fmt:message` would be `th:text` but in this case it's using it to get a value from the properties file and store it in a variable.  Don't think that's a option for `th:text`

So a direct replacement I think would be

```
<div th:with="linkDescVar=#{linkDesc}"></div>
```

Which sets up the linkDescVar within the context of the div (reckon the within the div bit is something that's worth noting as the fmt:message var is available to the whole page)

Another variant would be

```
<div th:with="linkDescVar=${#messages.msgOrNull('linkDesc')}"></div>
```

This uses the `#messages` utility so can be used directly in expressions, might be useful later as there may not be a need to create the variable anymore.

## `<c:set value="?${pageContext.request.queryString}" var="queryString"/>`

The replacement for `c:set` I believe is `th:with` like above. The request object is available in Thymeleaf as `request` so this can be a fairly straight replacement

```
<div th:with="queryString=${'?' + #request.queryString}"></div>
```

But there's some gotcha's here, while c:set returned blank if `${pageContext.request.queryString}` was blank Thymeleaf returns `null` so in the case where there are no query parameters you get `?null` which is not what we want.

The code here

```
<c:if test="${queryString == '?'}">
    <c:set value="" var="queryString"/>
</c:if>
```

Handled the case of no query parameters by checking for just the `?` and replacing it with blank.

This needs to be handled in the `th:with` in Thymeleaf I believe so this

```
<div th:with="queryString=${#request.queryString == null ? '' : '?' + #request.queryString}"></div>
```

an awful lot of question marks but this is using (if) ? (then) : (else) in the expression. If it's null set queryString to blank else set it you a `?` and concat on the query string.
## `<c:set var="testLink" value="${pageContext.request.requestURI}${queryString}"/>`
Our friend `th:with` again for this job, which is just concatenating two values.

```
<div th:with="testLink=${#request.requestURI + queryString}"></div>
```

## Last part

```
<c:url value="${baseUrl}" context="/" var="baseUrlLink">
    <c:param name="link" value="${testLink}"></c:param>
    <c:param name="linkDesc" value="${linkDescVar}"></c:param>
</c:url>
```

Yea `th:with` again, the go to variable assignment wizard.

So some Thymeleaf url magic beans to cover first, for forming url's use `@{...}` which handles alot of the url dark arts, context root etc... within that to add parameters you use `()` so `@{/test/app(key=value)}` to get the context to be server root like `context="/"` you use a tilde `~` at the start of the url.

With that in mind

```
<div th:with="baseUrlLink=@{~/test/app(backLink=${testLink},linkDesc=${linkDescVar})}"></div>
```

Creates the link and assigns it to the baseUrlLink variable and uses the two other variables set up earlier `testLink` and `linkDescVar`

This gives an overall block like this

```
<div th:with="linkDescVar=#{linkDesc}">
    <div th:with="queryString=${#request.queryString == null ? '' : '?' + #request.queryString}">
        <div th:with="testLink=${#request.requestURI + queryString}">
            <div th:with="baseUrlLink=@{/test/app(backLink=${testLink},linkDesc=${linkDescVar})}">
                <a th:href="${baseUrlLink}">example of link</a>
            </div>
        </div>
    </div>
</div>
```

So seeing as these are all expressions you can collapse them down as much as you like for example you could move the linkDescVar inline.

```
<div th:with="queryString=${#request.queryString == null ? '' : '?' + #request.queryString}">
    <div th:with="testLink=${#request.requestURI + queryString}">
        <div th:with="baseUrlLink=@{/test/app(backLink=${testLink},linkDesc=${#messages.msgOrNull('linkDesc')})}">
            <a th:href="${baseUrlLink}">example of link</a>
        </div>
    </div>
</div>
```

In theory you can get the whole thing on one line if you wanted, that would be a complex looking line but you might prefer it that way.
