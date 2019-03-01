---
layout: post
title: jekyll stopped working then error trying to install
categories: 
 - blog
date: '2015-12-01T14:17:24'

---

``` bash
jekyll serve --drafts
zsh: command not found: jekyll
```

I would guess one of the Apple updates knocked it out

Going a reinstall gives
``` bash
ERROR:  While executing gem ... (Gem::FilePermissionError)
    You don't have write permissions for the /Library/Ruby/Gems/2.0.0 directory.
```

I think this must have happened the first time I installed it and I just cheated and used sudo.  Guess it comes back to haunt me in the end, so better attempt to do it right this time.

The thing to do seems to be to let Apple have there version of Ruby and use your own so that Apple updates don't knock it off.

There seems to be two big options

[rbenv](https://github.com/sstephenson/rbenv/)

[RVM](https://rvm.io/)

Decided to try rbenv first

``` bash
brew install rbenv ruby-build

# As per the cavets I added the below to my .zshrc
export RBENV_ROOT=/usr/local/var/rbenv
if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi
```

Restart the terminal
``` bash
# Install a verion of ruby
rbenv install 2.2.3
# Set the global verion to that
rbenv global 2.2.3
# After that the install should work again
gem install jekyll
```


