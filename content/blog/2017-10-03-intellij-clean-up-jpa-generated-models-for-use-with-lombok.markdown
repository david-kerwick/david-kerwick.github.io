---
layout: post
title: IntelliJ clean up JPA generated models for use with Lombok
date: '2017-10-03T15:53:00'
---

As mentioned in a previous post, once you have generated your persistence mappings using IntelliJ you will need to do some cleanup and since I use Lombok I need to do that as part of it.

So start easy, Lombok the models

First make sure you have the IntelliJ Lombok plugin installed, if you are using Lombok you pretty much have to anyway.
Then go to your model and pick `Refactor-->Lombok-->Default @Data`

![Refactor Menu](./assets/img/refactor-menu.png)

Or when in the class bring up the Action menu and search for Lombok

![Lombok Action Menu](./assets/img/lombok-action-menu.png)

Then choose Default `@Data`

![Lombok Menu](./assets/img/lombok-menu.png)

This will remove all the getters and setters and add @Data to the class.

Much neater class right...

Next thing I do is remove the redundant parameters, I generate the mappings with column parameters but that means there can be alot of them that are redundant, but that's better than not having the good ones and they are easy to remove.

So you will get the warning reported as `Redundant default parameter value assignment` the sheer amount of them will set off most coders OCD.  You can ALT + ENTER each one to remove them but that's a bit tedious.

Best to go with 'Run inspection by name'
![Run inspection by name](./assets/img/run-inspection-by-name.png)

And pick 'default annotation parameter value'
![Enter inspection name](./assets/img/enter-inspection-name.png)

I run it on the directory all the models are in.

You can then clean them all up in one go.
![Remove redundant parameter](./assets/img/remove-redundant-parameter.png)

Next is Time.

So I guess you could individually select the type of mapping you want for each column of each table you want to map but that's a real time drain. I leave it at the default and change it after.  Hopefully there will be updates to set the default you want in the future.

I do 'Replace in path' find 'import java.sql.Time;' and replace it with blank.  This will error all the instances used.

I then replace Time with LocalDateTime or whatever makes sense for you.  That bit is clunky so hoping IntelliJ offers something better on that front soon.
