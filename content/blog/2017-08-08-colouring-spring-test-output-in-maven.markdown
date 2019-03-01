---
layout: post
title: Colouring Spring Test output in maven
date: '2017-08-08T22:43:00'
---

Continuing my little quest to bring colour to the land of maven output so I can better see what's scrolling past. The next biggish thing is the tests and any log entries they produce.  Spring Boot likes logging stuff so it can be giant blocks of white scrolling by which can be hard to read, spot non breaking warnings, depreciations etc...

Spring Boot uses logback and it can output fancy colours to a console if it can detect the console supports it. So in theory all should be good as iTerm2 supports ansi colours. But it seems tests are weird or at least special, they spawn a new java VM and in that process lose the ability to detect that the console can support colour.  Bummer.

But you can force it. Now that comes with a health warning of course as the logs are pretty much unreadable if the console doesn't support colours.

In the projects `test/resources` directory add an `application.properties` file and add the line

`spring.output.ansi.enabled=always`

Hmm it might be better having this as a profile so it can be set locally and it defaults to no colour.

And it doesn't cover the unit tests, needs more work this.
