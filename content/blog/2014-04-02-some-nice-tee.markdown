---
layout: post
title: Some nice tee
date: '2014-04-02T11:36:00.000+01:00'
author: David Kerwick
---

I wanted to log something in bash to the console and to a log file.  
Turns out there's a command for that  

tee  

more information [here](http://www.linuxmanpages.com/man1/tee.1.php)  

So a very simple example would be  

``` bash
ls | tee test.txt  
```


which will display the output of ls to the screen and store the result in the file test.txt.

By default it overwrites the file, if you want an ongoing log use the -a option

``` bash
ls | tee -a test.txt  
```

If you want errors as well, also useful for a log file, redirect stderr to stdout

``` bash
ls -e 2>&1 | tee -a text.txt  
```

The test.txt file will contain the error about -e being an invalid option
