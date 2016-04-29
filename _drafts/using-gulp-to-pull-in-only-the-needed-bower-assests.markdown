---
title: Using Gulp to pull in only the needed bower assets
layout: post
---
While using bower to pull in the assets seems great it pulls in more than is needed for a production deploy. i.e. readme's, config files, various versions normal and minified, etc...
So need a way of only copying what's needed to the deployment directory. May as well attempt to optimise the assets as well while I'm at it.

This will likely involve some changes in the code as well, first to move the old references from an unmanaged folder to the bower directory, then to pull only the used files into the 'deployment' folder and then concat and minify those that I can.

#Move to bower versions
This bits easy
Replace the likes of
{% highlight html %}
<script type="text/javascript" src="/inc/js/jquery-1.9.1.min.js"></script>
{% endhighlight %}
With
{% highlight html %}
<script type="text/javascript" src="/bower_components/jquery/jquery.min.js"></script>
{% endhighlight %}
That can be a job of work in itself but should be beneficial in the long run.


In order to pull these out into there own directory what I found that seems to be the best is the gulp plugin [useref](https://www.npmjs.com/package/gulp-useref) with a bit of config this will combine the referenced files, copy them to a specified location and update the html.

#Update the link and script references
In order for the plugin to work you have to wrap comments around the blocks you want converted.
For example
{% highlight html %}
	<!-- build:css /inc/css/combined.css -->
    <link href="bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="bower_components/bootstrap/dist/css/bootstrap-theme.min.css" rel="stylesheet">
    <!-- endbuild -->
{% endhighlight %}
So that's a comment block around what you want combined the `build:css` tells it it's css, use `build:js` for javascript and `/inc/css/combined.css` is the path to the new file that has the combination.

#Gulp task
Once you have the html set up you need a gulp task to run the plugin
{% highlight javascript %}
gulp.task('optimise', function () {
    return gulp.src('./application/views/**/*.php', {base: 'dist'})
        .pipe(useref({searchPath: ['.']}))
        .pipe(gulp.dest('dist/inc/'))
});
{% endhighlight %}
So there's some trickery going on here because of how I want things to be split up
What I want is my php files under
`dist/application/views/`
and my static assests under
`dist/inc/`
As a htaccess file will be used to serve the assets.

So 

`gulp.src('./application/views/**/*.php', {base: 'dist'})` gets all my view layer php files, and has dist as the base so the full path is transferred and not included under the `gulp.dest('dist/inc/')`
`.pipe(useref({searchPath: ['.']}))` calls useref with the searchPath option so it can find the bower_components directory in the root.
`.pipe(gulp.dest('dist/inc/'))` write the files to `dist/inc`

This will write the php files into the dist directory and find and replace any of the build blocks it finds.

The combined files will then be written to `dist/inc` which leaves the problem that css and js are both in `dist/inc` I don't think there's a way to split them using useref or gulp dest.  They may need to be moved as part of the gulp task.