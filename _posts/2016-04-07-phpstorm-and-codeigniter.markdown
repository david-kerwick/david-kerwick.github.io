---
title: PHPStorm and Codeigniter
layout: post
date: 2016-04-07 10:05:56
---
The legacy php project I'm looking into at the moment uses Codeigniter, version 2 as well.
Popular in it's day I think but I think other php frameworks have surpassed it now.

Anyway I decided to look for an IDE to make sense of it all.
PHPStorm kept coming up and it has a 30 day trial so decided I'd give that a go.

Installation and project import are all standard so little point going through that.
What I was surprised at is PHPStorm had no idea what it was looking at, undefined variables, unknown methods all over the place.  And there doesn't seem to be anything in the plugin system to help either.

So some googling and I found someone had decided to do something about it, several years ago... I guess when CI was still hanging on ;)

The files are on github [here](https://github.com/topdown/phpStorm-CC-Helpers)

Which boils down to adding three files to the root of your project

* CI_phpStorm.php
* DB_active_rec.php
* my_models.php

Then mark these files as plain text

* /system/core/Controller.php
* /system/core/Model.php
* /system/database/DB_active_rec.php

So that works wonders, a good proportion of the errors go away.
It uses the doc to hint PHPStorm in the right direction for the global variables CI seems to use all over the place.
Another big win is adding all your models to the my_models.php file.
Add your models to the docs like below
{% highlight javascript %}
* @property your_model                       $your_model
{% endhighlight %}
Where the first `your_model` is the model class and the `$your_model` is what's used in your controllers.

Bit of a pain to type them all in but should provide some long term gain.

I noticed nothing was really working in the models. i.e `db` was showing up as undefined.
The definition for db was in the CI_phpStorm.php file in the docs for CI_Model.
I did notice PHPStorm was complaining about multiple definitions for CI_Model though.
Looking at the Models there's this little nugget
{% highlight php %}
if(!class_exists('CI_Model')) { class CI_Model extends Model {} }
{% endhighlight %}
Which PHPStorm finds and uses instead of the one with the documentation for autocomplete.
So it turns out the really old legacy code is an upgrade of a really really old code base... nice.
Anyway things are for sure on CI 2 now so removing the above line everywhere gets autocomplete back working in models.

Next I was getting errors in the controllers for the 'data' variable.
I think this is a super global? I can't see where it's set up I guess it mightn't be actually set up just used which sets it up?  Can't say I like it
Anyway it's used in the code like this.
{% highlight php %}
$this->data['page_name'] = 'Welcome';
{% endhighlight %}

To get the error to go away add the following to the doc in CI_phpstorm.php
{% highlight php %}
* @property array $data                          Super global array for user data
{% endhighlight %}

That gets you a good bit of the way there.
I'm not sure what version of CI the help files are based on but they are old enough so you may find 'newer' code doesn't autocomplete or shows up as undefined. Hopefully most can be fixed by simply providing the document hint like above. The database hint seem a bit more complex but I assume you can keep adding as you go and build up a full set.
Or convince people to move off to something from the brave new world...
