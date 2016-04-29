---
title: Using Gulp to create a 'deployment' directory for a php project
layout: post
---
The PHP project I'm looking at doesn't have a 'deployment' process.  The advantage of interpreted languages I guess. The whole thing can be shipped to the production server, but that also means alot of files that don't need to be on the server are on the server.  This does not sit well with my brain. So I think it's time to create a folder for just deployment files and have the needed files copied to that folder.

For that I'm going to use Gulp. Why not Grunt? Well the move seems to be away from poor Grunt but maybe I'm wrong. Gulp is also meant to be faster so that's always good.

NPM should be installed from the bower post so to install gulp globally.
{% highlight bash %}
npm install -g gulp
{% endhighlight %}

Then go to your project folder. Now node will want a config file to store it's dependencies. The project is going to be swimming in json files, going to have to do something about that soon it's getting ridiculous this will be the third. Anyway
{% highlight bash %}
npm init
{% endhighlight %}
answer the questions that make sense, it seems to pick up some sensible defaults.

Then install gulp as a dev dependency.
{% highlight bash %}
npm install gulp --save-dev
{% endhighlight %}

Next create a gulpfile.js in the project root
Copying files it Gulp is very straight forward as two of the main api's deal with getting files `gulp.src` and writing them out `gulp.dest`
So you copy the application folder to a dist directory you could use the below code. 
{% highlight javascript %}
gulp.task('dist-app', function () {
     return gulp.src('./application/**/*')
         .pipe(gulp.dest('./dist/application'));
});
{% endhighlight %}

You can then run it with
{% highlight bash %}
gulp dist-app
{% endhighlight %}

You can then build up a series of tasks to copy over what's need for the production directory.

I think it's best to have the separate copies in different tasks, because then you can run them in parallel.
One gotcha is you will likely want to clean down the dist directory but if that kind of thing tries to run in parallel you are going to end up in a world of hurt.

So say your delete task it like this
{% highlight javascript %}
var del = require('del');
gulp.task('clean-dist', function () {
    console.log('Cleaning the dist folder');
    return del('dist/**/*');
});
{% endhighlight %}
And you had two 'copy' tasks 'dist-app' and 'dist-system' which can run in parallel but clean must run first.
Well there's a module for that `run-sequence` and will look something like the below

{% highlight javascript %}
var runSequence = require('run-sequence');
gulp.task('make-dist', function(callback) {
    runSequence('clean-dist',
        ['dist-app', 'dist-system'],
        callback);
});
{% endhighlight %}
So each task is run in sequence and the array's run in parallel.

That's a basic clean and copy to only pull in the folders needed from your production deploy.
I.e. non of the .git stuff, *.json, etc...
But not exactly taking advantage of what gulp can do.

It's a good starting point though.