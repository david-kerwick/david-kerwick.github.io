---
layout: 'post'
title: 'Sonarqube missing Integration Test coverage'
date: '2019-04-18T15:18:13'
---


> **Update**
So it's covered in the Java Plugin release [here](https://www.sonarsource.com/resources/product-news/news.html#sonarjava-5-12) but it's meant to be a warning I think, not totally stop working like happened in my install, I must be doing something different.

I have been using Sonarqube in a local docker container for a while now, but just today the quality gates started failing, due to not enough code coverage. Looking at the results there was a fairly substantial drop in the overall test coverage.

After some poking about it became apparent that it wasn't including anything from the Integration Tests that were run. The test number count was right just no coverage from them.

After running a fresh analysis I noticed a warning on the console stating that `sonar.jacoco.reportPaths` was being replaced by `sonar.coverage.jacoco.xmlReportPaths`, I googled that add found [this](https://docs.sonarqube.org/display/PLUG/Java+Unit+Tests+and+Coverage+Results+Import) which doesn't give a whole lot of info but seems to be the route cause of the problem so in my `pom.xml` I changed

```xml
<sonar.jacoco.reportPaths>target/jacoco.exec, target/jacoco-it.exec</sonar.jacoco.reportPaths>
```

to

```xml
<sonar.coverage.jacoco.xmlReportPaths>target/site/jacoco/jacoco.xml, target/site/jacoco-it/jacoco.xml</sonar.coverage.jacoco.xmlReportPaths>
```

and the test coverage went back to normal. Maybe that warning should be an error.

