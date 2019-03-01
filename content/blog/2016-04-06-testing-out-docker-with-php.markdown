---
title: Testing out Docker with php
layout: post
date: '2016-04-06T15:17:52'
---
Moving along in the Docker series it's time to try set up a php container.
We won't go down the database route just yet so will be trying to just get a standard php config dump going.

May as well pull the image it's the biggest so far
``` bash
docker pull php:5.6-apache
```

Create a directory for the project
cd into it and create a php file e.g
``` bash
vi info.php
```
And the contents of a test php file, this one dumps out the environment details
``` bash
<?php

phpinfo();

?>
```

then run docker from the project directory

``` bash
docker run --rm -p 80:80 --name my-apache-php-app -v "$PWD":/var/www/html php:5.6-apache
```

You should now be able to go to `http://<your docker machine>/info.php` and see the standard php info dump.

I'm liking this Docker thing.