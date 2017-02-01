---
layout: post
title: Mapstruct and Lombok working together
date: '2017-02-01 21:53'
---

I've been using Lombok for a while now and it's great not having to bother with alot of boiler plate.
The 'problem' is that it doesn't play nice with the other kids. So trying to use say the likes of Mapstruct or any other annotation processor.

This is 'about' to change... Keep an eye this [mapstruct issue](https://github.com/mapstruct/mapstruct/issues/510) which should be in the next [release](https://github.com/mapstruct/mapstruct/releases) as of writing the current release is 1.1.0.Final and Lombok's [release](https://github.com/rzwitserloot/lombok/releases) as of writing the current release is v1.16.12.

But no idea when both will be released so in the mean time there's some work arounds which hopefully can be removed once they start playing nice together.

This sure seems a bit hacky but seems to work so far.  In the above issue there's a [comment](https://github.com/mapstruct/mapstruct/issues/510#issuecomment-214038002) by Alexander Schwartz which shows how to get them working together for now.  And it runs in the one project which is nice. General theory is it delomboks the files into the `generated-sources` folder and Mapstruct can then run on those and therefore see the getters and setters.  So for Maven builds everything is happy.

For IntelliJ weelll it doesn't complain but also can't make the changes on the fly.  So deploying to a local server can be a bit hit and miss.  You can improve things somewhat by expanding the `Maven Projects` tab on the right and going to the lifecycle of your project, right click on the compile phase and tick `Execute After Build` and `Execute After Rebuild`

This slows the build down a bit and doesn't create everything but should keep things ticking over until they can all work together normally...
