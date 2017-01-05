---
layout: post
title: Weblogic setup and install series
date: '2014-04-23T22:08:00.002+01:00'
author: David Kerwick
tags:
- weblogic
---

So I ended up with several posts on setting up weblogic.  
I thought it would be best to have a page that collects them together and to put the scripts mentioned onto github.  

#### Machine setup and initial notes

[Setting up the entropy pool on Red Hat if needed]({% post_url 2014-03-12-not-enough-entropy-on-redhat %})

[Setting the type of random used is WLST is slow]({% post_url 2014-03-12-really-slow-wlst-and-adminserver-start %})

#### Creation

[Set up a Weblogic domain]({% post_url 2014-03-19-create-new-weblogic-domain-using-wlst %})

[Set up a Weblogic 'machine']({% post_url 2014-03-20-create-machine-for-weblogic-with-wlst %})

[Set up a Weblogic dynamic cluster]({% post_url 2014-03-20-create-weblogic-dynamic-server-cluster %})

[Link the Weblogic 'machine' and cluster]({% post_url 2014-03-20-weblogic-linking-machine-and-cluster %})

[Set up Weblogic datasources]({% post_url 2014-03-23-create-datasources-for-weblogic-using %})

#### Running

[Use boot.properties to start Weblogic]({% post_url 2014-03-27-create-bootproperties-to-start-weblogic %})

#### Possible Problems

[Out of permgen]({% post_url 2014-04-07-weblogic-out-of-permgen %})

[Localhost not known]({% post_url 2014-03-27-local-host-not-known-error-when-running %})

[MyRealm failed to load]({% post_url 2014-03-23-problems-when-starting-weblogic-admin %})

#### Configuration

[Connecting to NodeManager in production mode]({% post_url 2014-03-27-connecting-to-nodemanager-using-wlst-in %})

[Store login securely for WLST scripts]({% post_url 2014-03-31-store-wlst-login-securely %})

[Weblogic Plugin settings for dynamic cluster]({% post_url 2014-03-24-iis-weblogic-proxy-and-weblogic-plugin %})

[Control location of standard out for Weblogic servers]({% post_url 2014-03-31-redirect-stdout-and-stderr-of-weblogic %})

[Customise the Weblogic Admin Console]({% post_url 2014-03-31-customise-skin-of-weblogic-admin-console %})

#### Service

[Startup service for Weblogic under Redhat]({% post_url 2014-04-03-weblogic-startup-service-for-redhat%})

#### Monitoring

[Server health check and restart]({% post_url 2014-04-07-wlst-health-check-script-for-weblogic %})

[Undeploy retired apps]({% post_url 2014-04-08-wlst-to-auto-undeploy-retired-apps%})

#### GitHub

The full collection of scripts is available on Github [here](https://github.com/david-kerwick/weblogic-scripts)
