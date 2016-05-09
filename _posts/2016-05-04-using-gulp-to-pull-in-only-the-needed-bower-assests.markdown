---
title: Using Gulp to pull in only the needed bower assets
layout: post
date: 2016-05-04 10:33:06
---
While using bower to pull in the assets seems great it pulls in more than is needed for a production deploy. i.e. readme's, config files, various versions normal and minified, etc...
So need a way of only copying what's needed to the deployment directory. May as well attempt to optimise the assets as well while I'm at it.

This will likely involve some changes in the code as well, first to move the old references from an unmanaged folder to the bower directory, then to pull only the used files into the 'deployment' folder and then concat and minify those that I can.

#Move to bower versions
This bits easy replace the likes of
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
    return gulp.src('./application/views/**/*.php', {base: '.'})
        .pipe(useref({searchPath: ['.']}))
        .pipe(gulp.dest('dist/inc/'))
});
{% endhighlight %}
So there's some trickery going on here because of how I want things to be split up what I want is my php files under
`dist/application/views/`
and my static assests under
`dist/inc/`
as a htaccess file will be used to serve the assets.

So 

`gulp.src('./application/views/**/*.php', {base: '.'})` gets all my view layer php files, and has '.' as the base so the full path is transferred and not included under the `gulp.dest('dist/inc/')`

`.pipe(useref({searchPath: ['.']}))` calls useref with the searchPath option so it can find the bower_components directory in the root.

`.pipe(gulp.dest('dist/inc/'))` write the files to `dist/inc`

This will write the php files into the dist directory and find and replace any of the build blocks it finds.

The combined files will then be written to `dist/inc` which leaves the problem that css and js are both in `dist/inc` so will have to work on fixing that.

The solution I came up with for that is to use [gulp-filter](https://www.npmjs.com/package/gulp-filter) to split the files up and write them to different destinations. What I have is this
{% highlight javascript %}
gulp.task('optimise', function () {
    const cssFilter = filter(['**/*.css'], { restore: true });
    const jsFilter = filter(['**/*.js'], { restore: true });
    const phpFilter = filter(['**/*.php'], { restore: true });

    var stream = gulp.src('./application/views/**/*.php', {base: '.'})
        .pipe(useref({searchPath: ['.']}))
        .pipe(cssFilter)
        .pipe(gulp.dest('dist/inc/css/'))
        .pipe(cssFilter.restore)
        .pipe(jsFilter)
        .pipe(gulp.dest('dist/inc/js/'))
        .pipe(jsFilter.restore)
        .pipe(phpFilter)
        .pipe(gulp.dest('dist'));
    return stream;
});
{% endhighlight %}

This sets up the filters for each of the types I want to separate, css, js and php. These have the restore option set as I'll be restoring them as I go. The useref setup is the same as before but in this case I pipe to a filter which takes out the files I'm interested in (cssFilter for example), write those files where I want them to appear ('dist/inc/css/' for example) and then restore everything back, rinse and repeat.

Not sure it's the best way but sure seems to work.

Seeing as we have the assets split into types it's now pretty easy add in minification. Just add it to the pipe just after the filter for example

{% highlight javascript %}
gulp.task('optimise', function () {
    const cssFilter = filter(['**/*.css'], { restore: true });
    const jsFilter = filter(['**/*.js'], { restore: true });
    const phpFilter = filter(['**/*.php'], { restore: true });

    var stream = gulp.src('./application/views/add.php', {base: '.'})
        .pipe(useref({searchPath: ['.']}))
        .pipe(cssFilter)
        .pipe(csso())
        .pipe(gulp.dest('dist/inc/css/'))
        .pipe(cssFilter.restore)
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(gulp.dest('dist/inc/js/'))
        .pipe(jsFilter.restore)
        .pipe(phpFilter)
        .pipe(gulp.dest('dist'))
    return stream;
});
{% endhighlight %}

