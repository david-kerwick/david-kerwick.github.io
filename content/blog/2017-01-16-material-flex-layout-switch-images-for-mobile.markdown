---
layout: post
title: Material Flex Layout - switch images for mobile
date: '2017-01-16T21:30:00'
---

Having got the basic structure for a material layout based on flex-layout I moved onto doing the header in more detail. It will be the classic toolbar with an image on the right and then some title etc...

But what I wanted was a different image for mobile and desktop. Or to be more precise I already have a different image for both it's just a matter of displaying them at the correct time.

Mainly because I just started looking at Flex Layout for Material 2 I'll use that to achieve this.

Lets set out the header and toolbar I'm using first.

```
<header>
  <md-toolbar color="primary">
    <img class="logo-lg" src="assets/logo-lg.png" alt="My Logo">
    <span>Header Title</span>
  </md-toolbar>
</header>
```

Display the toolbar using `md-toolbar` and in that I have an image and a title.  I've added a class to the image so i can set padding etc...

First off I used the Flex directives to show/hide depending on the breakpoints.

```
<header>
  <md-toolbar color="primary" fxLayout="row">
    <img fxFlex fxShow="false" fxShow.gt-sm class="logo-lg" src="assets/logo-lg.png" alt="My Logo">
    <img fxFlex fxHide="false" fxHide.gt-sm class="logo-sm" src="assets/logo-sm.png" alt="My Logo">
    <span>Header Title</span>
  </md-toolbar>
</header>
```

First add `fxLayout="row"` to the container so flex in 'turned on' for that container, in this case `md-toolbar`

Then for the large image, don't show it `fxShow="false"` unless the breakpoint is greater than small `fxShow.gt-sm`

For the small image, don't hide it `fxHide="false"` unless the breakpoint is greater than small `fxHide.gt-sm`

This works, you can shrink and expand your screen once you have it deployed to marvel at it.

But both images are loaded when in most cases only one is needed, and loading the large image on mobile is quite the waste. So another attempt needed.

Flex-layout has a set of observables etc... you can use to query the breakpoints that are active etc... Now be aware as of beta.1 here be dragons, it is beta software after all. So I moved to working directly off master i.e.

`npm install https://github.com/angular/flex-layout-builds.git -save`

**UPDATE 2017-02-02**
So the fun of running of a beta, this has changed now, `MatchMediaObservable` is no more so you will get not found errors.  It's now `ObservableMediaService` so that needs to be changed. But using the latest Angular CLI you'll get the error

```
Module build failed: TypeError: Cannot read property 'kind' of undefined
    at /Users/David/Dropbox/work/HSE/Documents/workspace-sts-3.7.0.RELEASE/test-cli/node_modules/@ngtools/webpack/src/loader.js:93:31
    at Array.map (native)
    at _addCtorParameters (/Users/David/Dropbox/work/HSE/Documents/workspace-sts-3.7.0.RELEASE/test-cli/node_modules/@ngtools/webpack/src/loader.js:92:46)
    at /Users/David/Dropbox/work/HSE/Documents/workspace-sts-3.7.0.RELEASE/test-cli/node_modules/@ngtools/webpack/src/loader.js:114:17
    at Array.forEach (native)
    at _removeDecorators (/Users/David/Dropbox/work/HSE/Documents/workspace-sts-3.7.0.RELEASE/test-cli/node_modules/@ngtools/webpack/src/loader.js:109:10)
    at /Users/David/Dropbox/work/HSE/Documents/workspace-sts-3.7.0.RELEASE/test-cli/node_modules/@ngtools/webpack/src/loader.js:280:48
    at process._tickCallback (internal/process/next_tick.js:103:7)
 @ ./src/$$_gendir/app/app.component.ngfactory.ts 12:0-51
 @ ./src/$$_gendir/app/app.module.ngfactory.ts
 @ ./src/main.ts
 @ multi ./src/main.ts
```

The injected constructor argument needs a type to keep things happy.
So new code follows
**End update**

You then need to inject the `ObservableMediaService` to get access to it in your template. I did that by adding a constructor to `app.component.ts`

```
constructor(@Inject(ObservableMediaService) private _media: OpaqueToken) {}
```

Then in the template I removed the flex directives and used ngIf to conditionally display the image for the small and greater than small breakpoints

```
<header>
    <md-toolbar color="primary">
      <img *ngIf="_media.isActive('gt-sm')" class="logo-lg" src="assets/logo-lg.png" alt="My Logo">
      <img *ngIf="!_media.isActive('gt-sm')" class="logo-sm" src="assets/logo-sm.png" alt="My Logo">
      <span>Header Title</span>
    </md-toolbar>
  </header>
```

As you can see the large logo is displayed if the breakpoint is greater than small `*ngIf="_media.isActive('gt-sm')"` and small one is displayed if it's not `*ngIf="!_media.isActive('gt-sm')"`

Now only one image is downloaded for mobile, on desktop they might load both if they wiggle the browser window size about but that's OK.
