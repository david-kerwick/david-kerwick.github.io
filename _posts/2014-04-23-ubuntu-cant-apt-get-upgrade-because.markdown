---
layout: post
title: Ubuntu can't apt-get upgrade because boot partition is full
date: '2014-04-23T21:11:00.001+01:00'
author: David
tags: 
modified_time: '2014-04-23T21:13:42.932+01:00'
blogger_id: tag:blogger.com,1999:blog-2027514548288128942.post-2573224521948148034
blogger_orig_url: http://davidkerwick.blogspot.com/2014/04/ubuntu-cant-apt-get-upgrade-because.html

---
When trying to do an upgrade I got the error below

{% highlight bash %}
sudo apt-get upgrade  
Reading package lists... Done  
Building dependency tree   
Reading state information... Done  
You might want to run 'apt-get -f install' to correct these.  
The following packages have unmet dependencies:  
 linux-server : Depends: linux-headers-server (= 3.2.0.55.65) but 3.2.0.60.71 is installed  

E: Unmet dependencies. Try using -f.  
{% endhighlight %}

<div class="p1">When you run sudo apt-get -f install as suggested you might get something like</div>

{% highlight bash %}   
sudo apt-get -f install  
gzip: stdout: No space left on device  
E: mkinitramfs failure cpio 141 gzip 1  
update-initramfs: failed for /boot/initrd.img-3.2.0-60-generic with 1.  
run-parts: /etc/kernel/postinst.d/initramfs-tools exited with return code 1  
Failed to process /etc/kernel/postinst.d at /var/lib/dpkg/info/linux-image-3.2.0-60-generic.postinst line 1010.  
dpkg: error processing linux-image-3.2.0-60-generic (--configure):  
 subprocess installed post-installation script returned error exit status 2  
Setting up linux-image-server (3.2.0.55.65) ...  
Setting up linux-headers-server (3.2.0.60.71) ...  
dpkg: dependency problems prevent configuration of linux-server:  
 linux-server depends on linux-headers-server (= 3.2.0.55.65); however:  
 Version of linux-headers-server on system is 3.2.0.60.71.  
dpkg: error processing linux-server (--configure):  
 dependency problems - leaving unconfigured  
No apport report written because the error message indicates its a followup error from a previous failure.  
 Errors were encountered while processing:  
 linux-image-3.2.0-60-generic  
 linux-server  
E: Sub-process /usr/bin/dpkg returned an error code (1)  
{% endhighlight %}

If you do a df you will probably see your boot partition is full.

Freeing up space seems to be no fun, to find the list of old images

{% highlight bash %} 
sudo dpkg --list | grep linux-image  

ii linux-image-3.2.0-41-generic 3.2.0-41.66 Linux kernel image for version 3.2.0 on 64 bit x86 SMP  
ii linux-image-3.2.0-43-generic 3.2.0-43.68 Linux kernel image for version 3.2.0 on 64 bit x86 SMP  
ii linux-image-3.2.0-44-generic 3.2.0-44.69 Linux kernel image for version 3.2.0 on 64 bit x86 SMP  
ii linux-image-3.2.0-45-generic 3.2.0-45.70 Linux kernel image for version 3.2.0 on 64 bit x86 SMP  
ii linux-image-3.2.0-48-generic 3.2.0-48.74 Linux kernel image for version 3.2.0 on 64 bit x86 SMP  
ii linux-image-3.2.0-51-generic 3.2.0-51.77 Linux kernel image for version 3.2.0 on 64 bit x86 SMP  
ii linux-image-3.2.0-52-generic 3.2.0-52.78 Linux kernel image for version 3.2.0 on 64 bit x86 SMP  
ii linux-image-3.2.0-53-generic 3.2.0-53.81 Linux kernel image for version 3.2.0 on 64 bit x86 SMP  
ii linux-image-3.2.0-54-generic 3.2.0-54.82 Linux kernel image for version 3.2.0 on 64 bit x86 SMP  
iF linux-image-3.2.0-55-generic 3.2.0-55.85 Linux kernel image for version 3.2.0 on 64 bit x86 SMP  
iF linux-image-3.2.0-56-generic 3.2.0-56.86 Linux kernel image for version 3.2.0 on 64 bit x86 SMP  
iU linux-image-server 3.2.0.55.65 Linux kernel image on Server Equipment.  
{% endhighlight %}

Trying to remove the oldest one of these gives the error below

{% highlight bash %}
sudo apt-get purge linux-image-3.2.0-41-generic  
Reading package lists... Done  
Building dependency tree   
Reading state information... Done  
You might want to run 'apt-get -f install' to correct these:  
The following packages have unmet dependencies:  
 linux-server : Depends: linux-headers-server (= 3.2.0.55.65) but 3.2.0.60.71 is to be installed  
E: Unmet dependencies. Try 'apt-get -f install' with no packages (or specify a solution).  
{% endhighlight %}


Get the current kernel and take note!

{% highlight bash %}
uname -r  
3.2.0-54-generic  
{% endhighlight %}

Make sure you don't remove this image!

{% highlight bash %} sudo dpkg -r linux-image-3.2.0-41-generic  
{% endhighlight %}

and

{% highlight bash %} sudo dpkg --purge linux-image-3.2.0-41-generic  
{% endhighlight %}

Do this for a few of the older versions and you should have space again on the /boot partition  

But you will now probably get

{% highlight bash %}   
sudo apt-get -f install  
Setting up linux-image-server (3.2.0.60.71) ...  
dpkg: dependency problems prevent configuration of linux-server:  
 linux-server depends on linux-image-server (= 3.2.0.55.65); however:  
 Version of linux-image-server on system is 3.2.0.60.71.  
 linux-server depends on linux-headers-server (= 3.2.0.55.65); however:  
 Version of linux-headers-server on system is 3.2.0.60.71.  
dpkg: error processing linux-server (--configure):  
 dependency problems - leaving unconfigured  
No apport report written because the error message indicates its a followup error from a previous failure.  
 Errors were encountered while processing:  
 linux-server  
E: Sub-process /usr/bin/dpkg returned an error code (1)  
{% endhighlight %}
  
I'm not admin as you may have guessed but it's a virtual server and I took a snapshot, anyway time to get nuclear on it.  


{% highlight bash %} 
sudo dpkg --remove --force-remove-reinstreq linux-image-server  
sudo dpkg --remove --force-remove-reinstreq linux-headers-server  
sudo dpkg --remove --force-remove-reinstreq linux-server  
{% endhighlight %}

Then run -f install again

{% highlight bash %} 
sudo apt-get -f install  
Reading package lists... Done  
Building dependency tree   
Reading state information... Done  
The following packages were automatically installed and are no longer required:  
 linux-headers-3.2.0-44-generic linux-headers-3.2.0-52-generic linux-headers-3.2.0-41 linux-headers-3.2.0-43 linux-headers-3.2.0-44 linux-headers-3.2.0-45 linux-headers-3.2.0-51 linux-headers-3.2.0-52 linux-headers-3.2.0-53  
 linux-headers-3.2.0-48 linux-headers-3.2.0-45-generic linux-headers-3.2.0-53-generic linux-headers-3.2.0-48-generic linux-headers-3.2.0-43-generic linux-headers-3.2.0-51-generic linux-headers-3.2.0-41-generic  
Use 'apt-get autoremove' to remove them.  
0 upgraded, 0 newly installed, 0 to remove and 130 not upgraded.  
{% endhighlight %}

Progress at last, clean up the old packages by following it's recommendation

{% highlight bash %}
sudo apt-get autoremove  
{% endhighlight %}

Try the install again

{% highlight bash %}
sudo apt-get -f install  
Reading package lists... Done  
Building dependency tree   
Reading state information... Done  
0 upgraded, 0 newly installed, 0 to remove and 130 not upgraded.  
{% endhighlight %}


You should now be in a happy state again, I found the below which should purge all the remaining old images, you might need to modify it if you want to keep more than the current

{% highlight bash %} 
sudo apt-get purge $(dpkg -l linux-{image,headers}-"[0-9]*" | awk '/ii/{print $2}' | grep -ve "$(uname -r | sed -r 's/-[a-z]+//')")  
{% endhighlight %}


Should be back to normal now and can perform ann update and upgrade.

{% highlight bash %}
sudo apt-get update  
sudo apt-get upgrade  
{% endhighlight %}