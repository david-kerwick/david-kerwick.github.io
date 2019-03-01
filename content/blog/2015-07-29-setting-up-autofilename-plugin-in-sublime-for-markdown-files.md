---
layout: post
title: Setting up AutoFileName plugin in Sublime for Markdown files
categories: 
 - blog
date: '2015-07-29T00:39:23'

---

So I was looking for a better way of linking in images in my posts. Well I guess the link would be the same it's just how I find the images in the editor I'm looking to change.

So I searched for a Sublime plugin on package control and found AutoFileName. Sure seems like it will do the job.

First off though it doesn't fire for the Markdown image text and it does if I insert an img tag, the problem there is it's relative to the current file which is minor annoyance as the Jeykll 'dev' structure is different to the complied version.

So this turns out to be not so bad, main problem here is I'm such a Sublime newb.
I needed to add the setting for AutoFileName, I first started adding them to the User settings Preferences.sublime-settings as that's what I did with the Jekyll plugin.  That was the wrong path, what I needed to do was add the file [autofilename.sublime-settings](https://github.com/BoundInCode/AutoFileName/blob/a522f3db928809ea03485f8eb97a347806185e02/autofilename.sublime-settings) to my sublime user settings folder.

### Setting it up for Markdown files
In order to allow it to trigger for Markdown files I changed the afn_valid_scopes to

``` bash
"afn_valid_scopes":["string","css","sass","less","scss","markdown"],
```

### Setting the 'base' directory
The base directory proved a little be trickier.

``` bash
//By default, AutoFileName uses the disk root for absolute paths.
//Changing this setting allows for absolute paths on a project level
//This is useful for web designers and developers who want to use the
//root of their site.
"afn_use_project_root": true,

// Override the project root. Will only work 
// if "auto_file_name_use_project_root" is true.
"afn_proj_root": "",
```

But for some reason it would only even give the top level directory and not the sub-directories.
Seems to be a [bug](https://github.com/BoundInCode/AutoFileName/issues/39) to get around it set the project root to the actual project directory

``` bash
//By default, AutoFileName uses the disk root for absolute paths.
//Changing this setting allows for absolute paths on a project level
//This is useful for web designers and developers who want to use the
//root of their site.
"afn_use_project_root": true,

// Override the project root. Will only work 
// if "auto_file_name_use_project_root" is true.
"afn_proj_root": "/Users/David/Dropbox/david-kerwick-blog/",
```

If you have multiple sites that could be a pain, but it works for me now... well most of the time

### Better autocomplete
So by most of the time I meant that I had to be pressing ctrl+space after each directory, not the biggest of problems but when I tested it out with the img tag it's a much better experience you can tab and select all the way to the file which is nice.

This didn't work on the markdown links though, this lead me down a dark and deep rabbit hole one where I should have stopped ages ago but I kept thinking it'll be easy.  And I guess it would be if I spoke Sublime Text and python.

I thought initially it was going to be a easy config change as the below is mentioned by the plugin

``` bash
"auto_complete_triggers":
    [
      {
         "characters": "<",
         "selector": "text.html"
      },
      {
         "characters": "/",
         "selector": "string.quoted.double.html,string.quoted.single.html, source.css"
      }
    ]
```

Which sets it up to fire when the / character is hit inside quotes, now it says this is a option you have to put in but it's doing that at moment.  I couldn't for the life of my figure out how or where is was doing that.

I looking into keybindings, setting the above to fire for text.html.markdown (this kind of works, for the first entry)

I eventually reckon it was the event on_selection_modified that was doing the magic, here is the snippet from autofilename.py

``` bash
def on_selection_modified(self,view):
    if not view.window():
        return
    sel = view.sel()[0]
    if sel.empty() and self.at_path_end(view):
        if view.substr(sel.a-1) == '/' or len(view.extract_scope(sel.a)) < 3:
            view.run_command('auto_complete',
            {'disable_auto_insert': True,
            'next_completion_if_showing': False})
```

The at_path_end I think was causing the problem, think it's looking for css files and the like.

So my own 'plugin' seemed like the solution, plugin seem over kill as it's a method but sure that's how the system works.
So it turns out it's extremely easy to create a plugin.
`Tools --> New Plugin`
I gives some boilerplate to get you started.

Anyway here's what seems to have worked for me, you save it into you your Package/User folder as whateveryouwant.py

``` bash
import sublime, sublime_plugin, sys

class CompleteMarkdownLink(sublime_plugin.EventListener):
    def on_selection_modified(self,view):
        sel = view.sel()[0]
        if not view.match_selector(sel.a, "meta.image.inline.markdown"):
            return
        if not view.window():
            return
        if sel.empty():
            if view.substr(sel.a-1) == '/' or len(view.extract_scope(sel.a)) < 3:
                view.run_command('auto_complete',
                {'disable_auto_insert': True,
                'next_completion_if_showing': False})
```

So it only fires if the cursor is in a markdown image `meta.image.inline.markdown` and on the / character.

There's no way I could write up all the dead ends I followed to get to the above.  I'm now going to have to link about a million images to make the time figuring this out worthwhile, hopefully it will help someone else.