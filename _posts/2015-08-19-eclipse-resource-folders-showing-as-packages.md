---
layout: post
title: Eclipse Resource folders showing as packages
categories: 
 - blog
date: 2015-08-19 08:53:09

---

So I use Eclipse for my java development.  I recently added a new resource folder for testing and for some reason it has decided to treat the folder in the directory as packages, but because they don't contain source files they seem to be odd and white as well.  The normal resource folder seems to be fine.

Wrong looking folder
![Wrong resources](/assets/img/eclipse-resource-folders-showing-as-packages/wrong_test_resources.png)

The correct looking folder
![Correct resources](/assets/img/eclipse-resource-folders-showing-as-packages/normal_resources.png)

Comparing the setup of both in the project build path I noticed the normal resource folder had an entry in excluded, so I added the same entry for /src/test/resources

The current setup had none in the exluded list
![Build path](/assets/img/eclipse-resource-folders-showing-as-packages/build_path_test_resources.png)

To fix the problem I add an exclusion of '**'
Which will now look like this
![New Build Path](/assets/img/eclipse-resource-folders-showing-as-packages/build_path_test_resources_exclusion.png)

