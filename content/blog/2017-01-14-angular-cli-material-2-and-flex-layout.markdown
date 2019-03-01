---
layout: post
title: 'Angular CLI, Material 2 and Flex Layout'
date: '2017-01-14T12:49:00'
---

Having done a bit of Angular 2 work at breakneck speed it's time to look at better ways.

The first attempt was all about getting something done and ended up being fairly massive, in regards to code size and initial download. There wasn't time for a how it should be structured, what does adding library X mean for the overall performance and is it worth it etc...

So time to start something smaller and see where things are at. The main problem with a lot of the Angular 2 stuff is it's totally in flux. While Angular 2 went final a while ago things have been changing rapidly and a lot of what you might call the supporting systems only got serious once Angular 2 final came out. Because of that the initial attempt had a lot of bespoke stuff, the build system, the UI, etc... which wasn't the most optimised or fleshed out for internationalisation or accessibility.

So in an attempt to get all of that without having a massive team of css and javascript developers I'll attempt to piggy back on larger projects. They are in alot of flux at the moment but at least are out of alpha and into beta so have the basis of the functionality. I expect things to break regularly and there will be alot of screaming at the screen but hopefully once they get to final myself and the projects will have a good understanding of what's on offer and how to use it.

So the stack is

# Angular CLI
This will scaffold on an app, help create common items such as components, services, etc... has a dev server for testing and will build the application for dev or production. This will bake in the best practices for structuring the app and the build should be able to get the maximum performance for your app. The initial hello world is less than 200kb which is massive for a hello world but very good for Angular 2.

Setup is initially simple

```
npm install -g angular-cli

ng new test-cli
cd test-cli
ng serve
```

# Angular Material 2
Now we are into wild guess territory, which css framework to use.  There are several options here, commercial / free, write your own, use bits of another. And alot (all?) are a bit away from a final release.  Going to go with Material 2 for now because it seems to look good and it's from Google as well.  Not the greatest reasons but reasons all the same.

The core elements seem to be there but there's a good bit to come.  We will see how we get on.

Setup is also initially simple

```
npm install --save @angular/material
```

Open you `app.module.ts` and add the import

```
import { MaterialModule } from '@angular/material';
```

and then add `MaterialModule.forRoot()` to your NgModule imports.

My test-cli looks like this

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

# Flex Layout
This was news to me, Material 2 doesn't come with a responsive layout system it concentrates on the elements.  The flex layout library handles the responsive layout / grid system.  Makes it more general and can be used by of the other systems I guess. Docs are very thin on the ground at the moment for this, the demo's make it all look very simple and awesome though, time will tell!

Setup in cli is slightly less straightforward

```
npm install --save @angular/flex-layout
```

Gives the error

```
├── UNMET PEER DEPENDENCY @angular/common@2.4.2
├── UNMET PEER DEPENDENCY @angular/core@2.4.2
├── @angular/flex-layout@2.0.0-beta.1
├── UNMET PEER DEPENDENCY rxjs@5.0.3
└── UNMET PEER DEPENDENCY zone.js@0.7.4
```

But that's only warnings, flex is a bit behind where the cli is with the dependency tree I guess. This is where the fun will start to happen as the projects move at a different pace.

Open your `app.module.ts` and add the import

```
import { FlexLayoutModule } from '@angular/flex-layout';
```

and then add `FlexLayoutModule.forRoot()` to your NgModule imports.

My test-cli looks like this

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

We are up to 221KB now. On the increase but not bad so far.
