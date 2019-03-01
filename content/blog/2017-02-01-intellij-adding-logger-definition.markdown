---
layout: post
title: IntelliJ - Adding logger definition
date: '2017-02-01T21:24:00'
---

I find more often than not I'll need a logger in whatever java class I'm in.  Back in Eclipse days I had added it to new file creation.  I've moved to IntelliJ now and I hadn't added such things so time to fix that.

It would also be useful to have an easy way to add the logger declaration to a class missing it without all that typing or search then copy and pasting.

## Adding logger to new file template
Head to IntelliJ preferences and search for template, you are looking for `File and Code Templates` section. Then select the one for Class

![Template Preferences Screenshot](./assets/img/template-preferences-screenshot.png)

Add what you want here for every new java file created.  I was tempted by the `Enable Live Templates` as I thought I could create a Live Template for the logger and reuse it here but it seems only Live Template variables work? I couldn't find a way to actually expand a live code template here.

In the end I ended up with

``` java
#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end
#parse("File Header.java")
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
public class ${NAME} {
    @SuppressWarnings("unused")
    private static final Logger logger = LoggerFactory.getLogger(${NAME}.class);

}
```

While as you will see below Live Templates can handle the imports for you if you specify the whole package names I couldn't get the file template to do the same.  I've added a suppress in as when you first create the file you haven't used the logger and the warning annoys me.

## Adding a live template for a logger declaration
In the case where the file has already been created but there's no logger you can add a live template to add the logger declaration.

Head to IntelliJ preferences again and search for templates and you are looking for the `Live Templates` section.

![Live Templates Preferences Screenshot](./assets/img/live-templates-preferences-screenshot.png)

Click the plus icon on the right to add a new Template.

Add the abbreviation text you want to use for this and a useful description.
This is the code I added

```
@SuppressWarnings("unused")
private static final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger($CLASS_NAME$.class);
```

You then need to define an application context, hit the define link and choose `Java -> Declaration`

You can then click the edit variable button and pick className() from the dropdown list

![ Edit Template Variables Screenshot](./assets/img/edit-template-variables-screenshot.png)

If you don't define the application context first the dropdown list will be blank.

Also check `Reformat according to style` and `Shorten FQ names`.

![Live Template logger Screenshot](./assets/img/live-template-logger-screenshot.png)


## Add templates for log statements
Seen as I'm this far into it may as well add Live Templates for the logging statements themselves.

So add say logd which will have

`logger.debug("$END$");`

`$END$` tells IntelliJ where to put the cursor after the template is expanded.  You can really go nuts with these I guess.
