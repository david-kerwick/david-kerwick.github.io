---
layout: "post"
title: "New Mac Install"
date: "2018-02-05 22:58"
---
Having gotten a new computer and doing a fresh install I think it would be worthwhile to write down the steps involved for my future self.  As time sure does pass between machines and while the setup will evolve and it's generally easy enough sort the problems or find the missing config as you go there's nothing wrong with getting a good base.

1. Chrome and Firefox  
I've just never like Safari. Chrome has totally become the primary browser, Firefox is a habit at this point.

2. Dropbox  
Pretty simple start. I went Dropbox Pro a good while ago and use it as a default backup and way of syncing between machines. Of the ones I've tried it handles having lots and lots of files the best. The main thing is when you sync several git repos for example, it creates lots of little files. Both Google Drive and OneDrive attempted to burn a hole in my machine indexing, reindexing and syncing these. Dropbox is so much better at it so it got my money. Because there's so much it's the first install as the initial sync takes an age.

3. Atom  
So I can write these notes... basic setup with Markdown Writer [here]({{ site.baseurl }}{% post_url 2017-01-09-moving-to-the-atom-editor %}) still serves me well

4. Symlink to Dropbox  
After Dropbox has done it's thing I generally set up symlinks rather than deep driving into the layers of Dropbox folders I've set up, for example I point the main Documents folder to Dropbox. Best description for a symbolic link on a mac I've found is [here](https://apple.stackexchange.com/questions/115646/how-can-i-create-a-symbolic-link-in-terminal)
So what you will need to do is
```
cd
sudo rm -rf Documents/
ln -s /Users/David/Dropbox/Documents/ /Users/David/Documents
```
You need sudo rights to delete a directory link Documents, this seems to also mean you lose the fancy logo in finder.

5. iTerm2  
It's been so long since I used the standard terminal things seemed weird. There may be others but I haven't had any need to stray beyond iTerm2 get it [here](https://www.iterm2.com/index.html) The splitting of the windows/tabs is what I probably use the most.  And I like the look of it.

6. Homebrew  
Could be higher on the list for sure as I know you can use it to install applications and the likes, but I mainly use it of install command line tools.
Get details on the install [here](https://brew.sh/) I've wrote about it before [here]({% post_url 2015-09-06-moving-from-macports-to-homebrew %}) when I moved from macports

7. zsh and oh-my-zsh  
If using the normal terminal instead of iTerm felt weird using it without oh-my-zsh was like having an arm chopped off, navigating around, going back in history felt all wrong... and slow. My previous posts on setting up the zsh shell [here]({% post_url 2015-09-06-trying-out-the-zsh-shell %}) and installing oh-my-zsh [here]({% post_url 2015-09-06-pimping-the-zsh-shell %}) cover the basics.

8. git  
Not alot to say, who doesn't use it at this point
```
brew install git
```

9. Java  
So being a java developer kind of need this ;) brew casks have got even better since I last used them
```
brew cask install caskroom/versions/java8
```
I need java 8 rather than java 9 for the foreseeable :(

10. Maven  
May as well collect the set
```
brew install maven
```

11. Jekyll  
At some point I'll need to check this blog locally, so need to install Jekyll and anything needed for it. Think the setup I've done before [here]({% post_url 2017-01-04-moving-to-jekyll-3x %}) is still good. Versions have changed since of course.

12. Sourcetree  
Best visual git client I've come across, I haven't used many mind as I started using this even before Atlassian bought it. Download it [here](https://www.sourcetreeapp.com/)

13. Transfer iTunes and iPhone backups
14. Install Flycut
A clipboard manager, seems decent, main thing is it's fast. There's a few settings which make it even easier to use in my opinion
https://github.com/TermiT/Flycut/releases
In the general settings click, Sticky bezel, wraparound bezel, Menu selection pastes and Launch Flycut on login
![flycut-settings](assets/img/2018/03/flycut-settings.png)
15. Install Node and NPM
I do the odd bit of rare Angular development so need Node, but it's also great of a treasure trove of command line utilities, live-server has been a recent discovery for example

```
brew install node
```
