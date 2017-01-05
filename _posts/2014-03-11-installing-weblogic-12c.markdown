---
layout: post
title: Installing Weblogic 12c
date: '2014-03-11T21:02:00.003Z'
author: David Kerwick
tags:
  - weblogic
---

## Installing Weblogic 12c.

Some preample, I created a 64bit Redhat 6.5 virtual machine using VirtualBox.  Just followed the default install.

### Create a weblogic user

{% highlight bash %}
adduser -m weblogic   
{% endhighlight %}
*the -m will create the home directory are well.

{% highlight bash %}
passwd weblogic  
Changing password for user weblogic.  
New password:  
Retype new password:  
passwd: all authentication tokens updated successfully.  
{% endhighlight %}

### Install Java

Get the rpm installer from [here](http://www.oracle.com/technetwork/java/javase/downloads/index.html)

I downloaded jdk-7u51-linux-x64.rpm.

{% highlight bash %}
rpm -ivh jdk-7u51-linux-x64.rpm  
{% endhighlight %}

-i install
-v verbose output
-h hash tag to show progress

### Download Weblogic

Download the latest Weblogic generic installer from [here](http://www.oracle.com/technetwork/middleware/weblogic/downloads/index.html)

I downloaded the generic installer for 12.1.2.

Copy the weblogic_1211200.jar to the weblogic home directory for now.

### Install Weblogic

So even though it says [here](https://blogs.oracle.com/WeblogicConfigurations/entry/how_to_install_oracle_weblogic2) that you can install with console mode when you try  

{% highlight bash %}
java -jar wls_121200.jar -mode=console  
{% endhighlight %}


You get the lovely dump below, seems to want a display regardless of the fact you have asked for console mode

{% highlight bash %}
Extracting files..................  
Starting Oracle Universal Installer  

Checking if CPU speed is above 300 MHz.   Actual 2951.164 MHz    Passed  
Checking monitor: must be configured to display at least 256 colors.  DISPLAY environment variable not set.    Failed <<<<  
Checking swap space: must be greater than 512 MB.   Actual 1675256 MB    Passed  
Checking if this platform requires a 64-bit JVM.   Actual 64    Passed (64-bit not required)  
Checking temp space: must be greater than 300 MB.   Actual 8817 MB    Passed  

Some requirement checks failed.  
You must fulfill these requirements before continuing with the installation.  

Continue? (y/n) [n]   
y  
You have confirmed that the product can be installed on this platform.  
Continuing with the install.  

>>> Ignoring required prerequisite failures.  Continuing...  
Preparing to launch the Oracle Universal Installer from /tmp/OraInstall2014-03-11_08-16-43PM  
DISPLAY is not set.  Please set the DISPLAY environment variable and try again.  
Depending on the Unix Shell, you can use one of the following commands as examples to set the DISPLAY environment variable:  
- For csh:  %% setenv DISPLAY 192.168.1.128:0.0  
- For sh, ksh and bash: $ DISPLAY=192.168.1.128:0.0; export DISPLAY  
Use the following command to see what shell is being used:  
echo $SHELL  
Use the following command to view the current DISPLAY environment variable setting:  
echo $DISPLAY  
- Make sure that client users are authorized to connect to the X Server.  
To enable client users to access the X Server, open an xterm, dtterm or xconsole as the user that started the session and type the following command:  
%% xhost +  
To test that the DISPLAY environment variable is set correctly, run a X11 based program that comes with the native operating system such as 'xclock':  
%% <full below="" path="" see="" to="" xclock..="">  
If you are not able to run xclock successfully, please refer to your PC-X Server or OS vendor for further assistance.  
Typical path for xclock: /usr/X11R6/bin/xclock  
java.awt.HeadlessException:   
No X11 DISPLAY variable was set, but this program performed an operation which requires it.  
at java.awt.GraphicsEnvironment.checkHeadless(GraphicsEnvironment.java:207)  
at java.awt.Window.<init>(Window.java:535)  
at java.awt.Frame.<init>(Frame.java:420)  
at java.awt.Frame.<init>(Frame.java:385)  
at javax.swing.SwingUtilities$SharedOwnerFrame.<init>(SwingUtilities.java:1757)  
at javax.swing.SwingUtilities.getSharedOwnerFrame(SwingUtilities.java:1832)  
at javax.swing.JDialog.<init>(JDialog.java:271)  
at javax.swing.JDialog.<init>(JDialog.java:205)  
at javax.swing.JDialog.<init>(JDialog.java:153)  
at oracle.as.install.engine.modules.presentation.ui.common.dialogs.SpecifyInventoryDirectoryDialog.<init>(SpecifyInventoryDirectoryDialog.java:237)  
at oracle.as.install.engine.modules.presentation.ui.common.dialogs.SpecifyInventoryDirectoryDialog.showDialog(SpecifyInventoryDirectoryDialog.java:763)  
at oracle.sysman.oio.oioc.OiocOneClickInstaller.main(OiocOneClickInstaller.java:584)  

{% endhighlight %}

So best to log on to the server with a gui present and run

{% highlight bash %}
java -jar wls_121200.jar  
{% endhighlight %}

The set of screens that follow are pretty well detailed [here](http://docs.oracle.com/middleware/1212/core/WLSIG/install_gui.htm#CBBGCJEH So not going to reproduce them.)

I skipped the domain creation wizard in favour of creating my own using wlst, which in theory should give me more control between development iterations
