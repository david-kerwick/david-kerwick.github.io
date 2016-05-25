---
title: Using Bitbucket Pipelines to run Sonarqube analysis
layout: post
date: 2016-05-25 12:21:53
---

So Atlassian just announced [Bitbucket Pipelines](http://blogs.atlassian.com/2016/05/introducing-bitbucket-pipelines-beta-continuous-delivery-built-within-bitbucket/) and they look really good so I signed up for the beta to give them a go.

We have a SonarQube server set up and had Jenkins configured to pick up from Bitbucket and run the analysis, works OK had also set up web hooks to prod Jenkins when there was a push.

So there's a few integrations already available but SonarQube isn't one yet but the examples are worth looking at as they give you an idea of how to set up your own one.

The [docs](https://confluence.atlassian.com/bitbucket/get-started-with-bitbucket-pipelines-792298921.html) cover the setup well. I found it worthwhile getting the simple echo to work.

For the build of your branch they create a docker container, checkout your branch and then it's pretty much up to you, very powerful I think.

So you could create your own Docker image and have it on Docker Hub to pull down but for getting the sonar scanner working we can just use the scripting part of the yaml file.

So in the `bitbucket-pipelines.yml` file

{% highlight yaml %}
pipelines:
  default:
    - step:
        script:
          - echo "Sonar pipeline, baby!"
          - curl --insecure -OL https://sonarsource.bintray.com/Distribution/sonar-scanner-cli/sonar-scanner-2.6.1.zip
          - unzip sonar-scanner-2.6.1.zip
          - ./sonar-scanner-2.6.1/bin/sonar-scanner -Dsonar.host.url=https://sonar.<YOURSERVER>.com -Dsonar.branch=$BITBUCKET_BRANCH
{% endhighlight %}

This sets up a default pipeline for all branches

The script

Echo's something out at the start just to show it's working

Downloads the latest sonar scanner

Unzips the scanner

Then runs the scanner script, you need to pass in the location of your SonarQube server and use the provided `$BITBUCKET_BRANCH` environment variable to pass sonar the branch name.

And well that's it, pretty simple and awesome if you ask me. It also seems to run really quick at the moment.

You can going into the pipeline section on the bitbucket console you see what's happening and even click into the detail of that to see live running logs of the container and your scripts running

![Pipeline Shot](/assets/img/using-bitbucket-pipelines-to-run-sonarqube-analysis/pipeline_shot.png)

You can expand each section as well to get more details.

I think they have nailed it with Pipelines, of course no idea of the pricing yet, but for now I'm very impressed.