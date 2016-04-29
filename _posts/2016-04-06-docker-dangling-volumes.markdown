---
title: Docker Dangling Volumes
layout: post
date: 2016-04-06 16:32:21
---
When trying out my own docker image I was creating and deleting it.
But I wasn't deleting it with the -v option so I ended up with alot of 'dangling' volumes i.e. volumes that were created for a container but that container is now gone.

To see if you have them and find them run
{% highlight bash %}
docker volume ls -f dangling=true
{% endhighlight %}

If they are there and you want to remove them you can use
{% highlight bash %}
docker volume rm <VOLUME NAME>
{% endhighlight %}
