---
layout: post
title: Material 2 - Customising the theme
date: '2017-01-14 13:03'
---

Material 2 comes with a few pre built themes which can get you started and may if you are lucky fit with the colour scheme you want to go with.  But chances are someone will want to go with some mad set of colours so you need to be able to set that up.

So following the [guide](https://github.com/angular/material2/blob/master/guides/theming.md) you need to create you own scss file and add the primary, accent, warn and error colours in there.  They say pick from the [palette](https://material.io/guidelines/style/color.html#color-color-palette) and recommend picking the 500's as your main colour.  I'm in the land of designers now and I'm scared :) all I really need to know how to do is how to change and set custom colours then I can let a designer decide on the subtle shades that work best for the sites needs.

As I'm using Angular CLI it's already set up to process scss files so I don't have to worry about that part, so create a file in your the src folder of your site, you can call it whatever but something like `your-app-theme.scss` makes sense.

Copy the contents from the [Material 2 theming guide](https://github.com/angular/material2/blob/master/guides/theming.md#defining-a-custom-theme) that's subject to change of course they reckon they can make setting a theme easier.

```
@import '../node_modules/@angular/material/core/theming/all-theme';
@include md-core();

$your-app-primary: md-palette($md-blue, 800, 600, 900);
$your-app-accent:  md-palette($md-green, 900);
$your-app-warn:    md-palette($md-red);

$your-app-theme: md-light-theme($your-app-primary, $your-app-accent, $your-app-warn);

@include angular-material-theme($your-app-theme);
```

Most of the colour dark arts are handled by `md-palette` the first parameter of which is the main color palette from the colour guide above so `md-blue`, `md-yellow`, etc... this will pick the 500 variation from that colour palette.

You don't have to pick the 500, you can pass in the code to use as the second parameter e.g

`$your-app-accent:  md-palette($md-green, 900);`

Which pick's the 900 for the green palette as the accent colour for example.

You can also specify the lighter and darker hues you want to use.  Not sure yet where they kick in.

`$your-app-primary: md-palette($md-blue, 800, 600, 900);`

So pick a blue 800 as the primary, with a lighter shade two steps down (600) and a darker shade one step up (900).

Seems good and makes sense in my non designer head, can't mess things up too bad by sticking with the palettes I think.
