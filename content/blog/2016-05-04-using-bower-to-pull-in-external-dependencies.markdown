---
title: Using Bower to pull in external dependencies
layout: post
date: '2016-05-04T10:15:47'
---
Following on from using composer to reduce the amount of external code checked into GIT on a legacy project the next step was to look at the internal javascript/css etc... and see about reducing that.

That folder is reasonably large on the legacy project I'm looking at, a multiple of the actual application source.

So the solution is pretty similar, use a package manager for the front end dependencies.  Now the choices don't seem as straight forward here but I'm going to go with [Bower](http://bower.io/) there seems to be alot of talk of using NPM directly for this but I think a bridge to far for this project.  Maybe once it's moved over to Bower we can look at what would be involved in making the switch to NPM.  For now I think it's easier to find everything the legacy project uses with Bower (perhaps I'll end up in a dependency hell and will be screaming for NPM shortly)

#Install Bower
So in order to get Bower you first need node.js so homebrew to the rescue again
``` bash
brew install node
```

Then install bower
``` bash
npm install -g bower
```

#Basic setup
Once installed head to your project directory.

Much like `composer.json` we need a `bower.json` file to mange what dependencies to pull in and what version.
You can create a base one by calling
``` bash
bower init
```
And it will ask some questions and create one for you, I think you can pretty much leave most questions blank.

The bare minimum I think is just the name but adding private seems to make sense
``` json
{
  "name": "my-project",
  "private": true
}
```
`private` means it will never publish the project to the bower registry.

#Add dependencies 
You can then start adding dependencies, for example the below will add jquery
``` bash
bower install --save jquery
```
`--save` adds this dependency to the bower.json file.

So it will now look something like this
``` json
{
  "name": "my-project",
  "private": true,
  "dependencies": {
    "jquery": "^2.2.3"
  }
}
```

#Finding the correct dependency and version
So the chances are the legacy project wouldn't be happy using the latest version of jquery or whatever packages it was using.  Therefore you have to try and find and install the correct version. You can find the packages using [Bower Search](http://bower.io/search/) (not the greatest search in the world). Searching for jquery doesn't seem to actually return the jquery project... but it's your first port of call.

So for the project I'm looking at there was just a `jquery.js` which turned out to the minified version. Had to open it and look around for something looked like the version number found `1.10.2` so a few years old. Updated the `bower.json` file to that exact version
``` json
{
  "name": "my-project",
  "private": true,
  "dependencies": {
    "jquery": "1.10.2"
  }
}
```
And then ran
``` bash
bower update
```
Which replaced the previous version with the one we now need.

Now it's a matter of going through all the included files, finding and adding them to bower.
That seems like it's going to be a bit of a pain but oh well.

#Next steps
So need to bosh on at finding and installing all the dependencies.  This will put everything in the `bower_components` directory.  So I can change the links for the likes of jquery to look in that folder but it actually installs more than needed for example jquery.js, jquery.min.js, jquery-migrate.js, jquery-migrate.min.js, etc... That I think will require a build step to move only what's needed for 'production' but not something for now.  Another post perhaps, use a PHP build tool? grunt? gulp? Hmmm I just don't know.

