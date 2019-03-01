---
layout: 'post'
title: 'Jekyll in the Atom Editor easier own post linking'
date: '2018-02-27T21:48:00'
---

Having built up a few posts the number of times I want to link back to one of
them is starting to increase. So I'd like a faster way of doing that.

Main thing is the post title is transformed and the date added when you publish
the post so there's no easy copy and paste of the post title or the date.
So typing it out isn't that bad but slowish and a bit error prone.

So first off linking to posts works like this
[https://jekyllrb.com/docs/templates/#linking-to-posts](https://jekyllrb.com/docs/templates/#linking-to-posts)

Without following the link it's basically this, with the site.baseurl being optional

```
[Name of Link]({{ site.baseurl }}{% post_url 2010-07-21-name-of-post %})
```

First port of call then is to create a snippet, you can use Atom's welcome guide
to help with this. Here is what I've ended up with

``` yaml
'.source.gfm':
  'Post Link':
    'prefix': 'plink'
    'body': '[${1:here}]({% post_url $2 %})'
```

The slight extra here is using the \$ number to say where the cursor ends up. You
can then tab between them the first one `${1:here}` says this is where the cursor will
land first and it has a default of `here` if you press tab it accepts the default
and moves to \$2 position. Or you can type something over the default and press tab.

That will speed up the initial entry, now it's on to sorting out the path.

For this you will need to install '[autocomplete-paths](https://atom.io/packages/autocomplete-paths)'

Once installed you will need to configure it, it doesn't have any defaults for markdown that I could see.
Some useful javascript and other stuff of course.

Open up Atom's config file (cmd+shift+p) type in config and select 'Open Your Config'

Under the `"*":` I added

``` yaml
"autocomplete-paths":
  scopes: [
    {
      scopes: [
        "source.gfm"
      ]
      prefixes: [
        "post_url "
      ]
      extensions: [
        "markdown"
        "md"
      ]
      relative: true
      replaceOnInsert: [
        ['.markdown?$', ''],
        ['.md?$', ''],
        ['^.*_posts\/', ''],
        ['^.*_draft\/', ''],
        ['^\.\/', '']
      ]
    }
  ]
```

The parts of the config are
The second scopes lists the type of file this rule will apply to, to find out
(cmd+shift+p) type log cursor scope and it will display the details of the current file. In this case markdown files.
prefixes are a list of patterns where autocomplete paths will kick in, post_url followed by a space will match our snippet.
extensions limits the file extensions to look for, in this case we are only linking to other markdown files
relative is relative path or not
replaceOnInsert this is a list of regex replacements to perform once the file path has been selected, here I'm doing some clean up
to match what Jekyll wants, removing the extension, removing the start directory such as ` _posts`, ` _draft` and `./`

It should now be pretty simple to add links to posts finding them by date or title.
