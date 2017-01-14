---
layout: post
title: 'Material 2, Flex-layout. Making a sticky footer'
date: '2017-01-14 12:54'
---

Having got the initial hello world thing running with Angular CLI, Material 2 and Flex Layout I need to start doing something with the set.  So first off is the rather boring header, main content and footer layout.  Nothing fancy so far just want to stick the footer to the bottom of the screen.

So this is a chance to try out flexbox, I haven't used it before so have no idea about it really. But it's the magic bullet for responsive layout and easy placement of elements so should be a good fit.

The simple code to attempt to fix up is

```
<div>
  <header>
    This is the header
  </header>
  <div>
    Main content
  </div>
  <footer>
    This is the footer
  </footer>
</div>
```

I have this in my default test-cli, in the `app.component.html` file.

It seems normal boring stuff is needed beforehand. We need the html/body to fill the height of the window.
In the root `styles.css` add

```
html, body {
  height: 100%;
  margin: 0;
}
```

I cleared the margins as well as the white border is a bit annoying.

We then need a class for the parent container so we can set it's `min-height`. So add the below to `app.component.css`

```
.container {
  min-height: 100%;
}
```

With that house keeping in place we have

```
<div class="container">
  <header>
    This is the header
  </header>
  <div>
    Main content
  </div>
  <footer>
    This is the footer
  </footer>
</div>
```

It's now time to add the flex stuff. So add `fxLayout="column"` to the container div.
And pretty much nothing should happen at this point as `column` stacks them in rows... wait what?

You can change it to `fxLayout="row"` to see things are working as it will arrange them in columns... Or I guess a better way of saying that would be they are now all in a row?

Anyhow what we want next is the footer at the bottom, we can do that by setting the main div to fill all the spare space which will push the footer to the bottom. This can be done with `fxFlex="1"` on the main content div.  This set the `flex-grow` setting to 1 so it grows to the spare space as there's no other grow to compete with.

This gives us the end code of

```
<div class="container" fxLayout="column">
  <header>
    This is the header
  </header>
  <div fxFlex="1">
    Main content
  </div>
  <footer>
    This is the footer
  </footer>
</div>
```

Which all in all seems very little and seems to work well. I reckon I'm missing something.
