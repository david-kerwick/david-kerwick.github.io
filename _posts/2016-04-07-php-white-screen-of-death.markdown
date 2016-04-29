---
title: PHP White Screen Of Death
layout: post
date: 2016-04-07 08:47:44
---

What's with php and it's refusal to log anything useful?
So I've been playing with Docker to set up a dev environment for php, all was going well until it came to adding mysql into the mix.
I had reckoned that connecting the two dockers was going to be fun as I hadn't done it before and therefore there would be several problems along the way.
I wasn't banking on php not telling me what any of those problems were. So I know there's some problems with the database set up. But is it is a driver problem, can it contact it, wrong username? well keep guessing Mr Developer because all I'm going to show you is a white screen.
Which is fine I thought initially, the error logs will be full of information. Err no, they contained nothing.

So this post is documenting my futile attempt to get php to tell me what it's moaning about.
Quick tip, give up now. Start sorting out the connection yourself from first principles, pinging, setting up the mysql client, connecting etc... PHP will be no help in telling you what's gone wrong. Oh Java I miss your verbose logs.

So quick disclaimer it may not be all PHP's fault as I am using Codeigniter but logging when something goes fundamentally wrong should be standard and on by default in my opinion.

#Turn on php logging.
Simple right? Holy world of options Batman.

For starters there's nothing in the apache logs. The docker image sends the logs to standard out and all I see there is the access log saying http 200 for index.php i.e. it served out the blank page.

Next step

Turn on the logging in index.php
{% highlight bash %}
ini_set('display_errors', 1); 
ini_set('log_errors', 1); 
ini_set('error_log', '/var/www/html/error_log.txt'); 		
error_reporting(-1);
{% endhighlight %}
Make sure the file is writable.

It shows me nothing some random stuff about the fact that using error_log() the timezone is unreliable.

Try php.ini

Next I tried setting a custom php.ini file
{% highlight bash %}
display_startup_errors = true
display_errors = false
html_errors = true
log_errors = true
ignore_repeated_errors = false
ignore_repeated_source = false
report_memleaks = true
track_errors = true
docref_root = 0
docref_ext = 0
error_log = /var/www/html/an_error.log
error_reporting = -1 
log_errors_max_len = 0
{% endhighlight %}
Showed me nothing at all

I then tried adding settings to the .htaccess file
{% highlight bash %}
php_value error_log /var/www/html/PHP_errors.log
php_flag display_startup_errors on
php_flag display_errors on
php_flag html_errors on
php_value error_reporting -1
php_flag log_errors on
{% endhighlight %}
Again nothing

I then tried setting Codeigniters settings in the `application/config/config.php` file find and set the below
{% highlight bash %}
#Set the logging to everything
$config['log_threshold'] = 4;
#Set a path make sure it's writable
$config['log_path'] = '/var/www/html/';
{% endhighlight %}
Again nothing of use. Seems to say everything is fine, I've actually not started the database so know it can't connect.

{% highlight bash %}
DEBUG - 2016-03-20 13:01:11 --> Config Class Initialized
DEBUG - 2016-03-20 13:01:11 --> Hooks Class Initialized
DEBUG - 2016-03-20 13:01:11 --> Utf8 Class Initialized
DEBUG - 2016-03-20 13:01:11 --> UTF-8 Support Enabled
DEBUG - 2016-03-20 13:01:11 --> URI Class Initialized
DEBUG - 2016-03-20 13:01:11 --> Router Class Initialized
DEBUG - 2016-03-20 13:01:11 --> No URI present. Default controller set.
DEBUG - 2016-03-20 13:01:11 --> Output Class Initialized
DEBUG - 2016-03-20 13:01:11 --> Security Class Initialized
DEBUG - 2016-03-20 13:01:11 --> Input Class Initialized
DEBUG - 2016-03-20 13:01:11 --> Global POST and COOKIE data sanitized
DEBUG - 2016-03-20 13:01:11 --> Language Class Initialized
DEBUG - 2016-03-20 13:01:11 --> Loader Class Initialized
DEBUG - 2016-03-20 13:01:11 --> Helper loaded: url_helper
DEBUG - 2016-03-20 13:01:11 --> Helper loaded: form_helper
DEBUG - 2016-03-20 13:01:11 --> Helper loaded: extra_functions_helper
DEBUG - 2016-03-20 13:01:11 --> Database Driver Class Initialized
{% endhighlight %}
Throw me a bone here there's no database at least log that somewhere!

Right, off to `application/config/database.php` make sure database debugging is on
{% highlight bash %}
$db['default']['db_debug'] = TRUE;
{% endhighlight %}
Nothing

So starting to run out of options so I installed Xdebug and started stepping through.
So it's obviously where it connects to the database.
And that's in `system/database/drivers/mysql/mysql_driver.php`

There are two functions there db_connect and db_pconnect
And the line
{% highlight bash %}
return @mysql_pconnect($this->hostname, $this->username, $this->password);
{% endhighlight %}
So the @ symbol looked odd and I had to look it up (I'm new to PHP) it [suppresses errors](http://php.net/manual/en/language.operators.errorcontrol.php)... and that's there on purpose... and problem with the database and the framework hides it... because? Reasons?

So removing that and you will actually get an error, oh happy days.
So it's been CI all along.
I guess I've been spoiled by Java's rather verbose logging, if it was up to me I'd ditch CI right now.  Something that hides a fatal error on purpose... I just don't get it.
It may generate warnings? But surely that can be handled by log filtering, or a conditional that checks if the user wants to see fatal errors.
