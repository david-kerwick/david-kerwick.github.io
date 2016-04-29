---
title: Testing out Docker with php
layout: post
date: 2016-04-06 15:17:52
---
Moving along in the Docker series it's time to try set up a php container.
We won't go down the database route just yet so will be trying to just get a standard php config dump going.

May as well pull the image it's the biggest so far
{% highlight bash %}
docker pull php:5.6-apache
{% endhighlight %}

Create a directory for the project
cd into it and create a php file e.g
{% highlight bash %}
vi info.php
{% endhighlight %}
And the contents of a test php file, this one dumps out the environment details
{% highlight bash %}
<?php

phpinfo();

?>
{% endhighlight %}

then run docker from the project directory

{% highlight bash %}
docker run --rm -p 80:80 --name my-apache-php-app -v "$PWD":/var/www/html php:5.6-apache
{% endhighlight %}

You should now be able to go to `http://<your docker machine>/info.php` and see the standard php info dump.

I'm liking this Docker thing.