---
layout: post
title: Moving from MacPorts to Homebrew
categories: 
 - blog
date: '2015-09-06T23:56:14'

---

So pretty much every blog you read now that involves installing a package on the Mac gives an example using Homebrew. Years ago I installed MacPorts to install subversion I think and haven't used it since.

So I decided I'd give Homebrew a shot to see what it's like.  I didn't want to run both so wanted to remove MacPorts first, this may mess up my subversion install but sure I mainly use git now anyway.

#Uninstalling MacPorts
They seem to have a good guide themselves
[here](https://guide.macports.org/chunked/installing.macports.uninstalling.html)

Which boils down to uninstalling the package MacPorts installed and deleting the directories it used.

The uninstall package command
``` bash
sudo port -fp uninstall installed
```

Wow does that uninstall alot, it may take some time.

``` bash
# Remove the 'ports' directory, best to make sure it only contains MacPorts
sudo rm -rf /opt/local 
# Remove directories used
sudo rm -rf /Library/Tcl/macports1.0
sudo rm -rf ~/.macports/
```

That's what was installed on my system, you may need to follow the full list from the link.

Lastly remove the path additions set by MacPorts in your .bash_profile
Something like
``` bash
# MacPorts Installer addition on 2013-07-29_at_09:42:33: adding an appropriate PATH variable for use with MacPorts.
export PATH=/opt/local/bin:/opt/local/sbin:$PATH
# Finished adapting your PATH environment variable for use with MacPorts.
```

So far so good

#Installing Homebrew
Just follow the instructions from [their site](http://brew.sh/)

``` bash
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

All pretty simple

#Installing subversion
So as I said above when removing MacPorts I removed my version of subversion
to install is using brew

``` bash
brew install subversion
```

And it only downloaded a small bit of the internet
