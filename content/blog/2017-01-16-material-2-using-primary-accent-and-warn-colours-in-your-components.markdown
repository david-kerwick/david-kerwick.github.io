---
layout: post
title: 'Material 2 - Using primary, accent and warn colours in your components'
date: '2017-01-16T21:31:00'
---

After custom theming the app using material 2 [here](../2017-01-14-material-2-customising-the-theme) what I wanted was to be able to use the main colours again and again in my components so that everything will be the same and when they change the colours it will all 'just work'. There isn't as yet a baked in easy solution for this, by that I mean just using --primary or $primary.  Don't know if there will be to be honest the Angular CLI global style is a css one, even when it's sass it's only available globally to the end app which has been compiled to css.

The Material 2 people have mentioned they need something better themselves for reusing the main colours, I've asked there if whatever solution they come up with can also be used across all components including the ones normal punters write. You can check the progress and maybe chime in your thoughts [here](https://github.com/angular/material2/issues/2394) if you think it's a good idea.

For now the best option is to follow Material 2's [theming your components guide](https://github.com/angular/material2/blob/master/guides/theming-your-components.md)

That means switching the Angular CLI project to use sass for the components, if you already have one setup like I have you can switch it to sass by running

`ng set defaults.styleExt scss`

You may need to rename component styles that have already been created.  If starting from new set it up with

`ng new test-cli --style=sass`

This means adding two imports to all components style files, I think it's better to get that down to one by moving the variable definitions into the `your-app-theme.scss` that was created when you were customising the theme.

I've added the following lines to that theme file

```
$primary : md-color($your-app-primary);
$accent : md-color($your-app-accent);
$warn : md-color($your-app-warn);
```

Then in the component `.scss` file I imported that custom theme

`@import '../pcrs-app-theme.scss';`

And can use the variables `$primary`, `$accent` and `$warn`

Slightly better I think.  It would be good also if I could add that import line to all generated style files for components but there doesn't seem to be a extension point for that at the moment.  The templates are there but they are deep in the bowels of the CLI project [here](https://github.com/angular/angular-cli/blob/master/packages/angular-cli/blueprints/component/files/__path__/__name__.component.__styleext__) but considering how often things are changing customising that in your local environment would be more trouble than it's worth.
