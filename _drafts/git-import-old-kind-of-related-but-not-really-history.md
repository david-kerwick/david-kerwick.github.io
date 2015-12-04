---
layout: post
title: Git import old kind of related but not really history
categories: 
 - blog
date: 2015-12-01 14:17:24

---

So someo the projects I've work on for a while have has various version control systems used, VSS, SVN and now GIT.  The fun here is not all imports have gone that well, there has been upgrade that happened in a different project because branches weren't very good (VSS) or the project has be moved and renamed (SVN) so now that it's landed in GIT I thought I try tie them togther in one repo, before they were always in the big giant repo.

The problem is as far as git is concerned they have nothing in common. The VSS is completely seperate and with SVN the SVN to GIT import doesn't follow renames, so they are seperate too.

I had tried importing the history as seperate repo's pull them all into one repo and merging them.  That kind of works but is an unholy mess to look at.

So I decided to try again.
Probably not the greatest idea it's really going to mess with the commit hashes so not for something shared by lots of people.

So step 1 unmerge the previous merges
So at the point just before the merge get the hash of that commit and create a branch from it

{% highlight bash %}
git checkout -b oldHistory 2708c62125fd29d2e752da349c221e274f2adf33
{% endhighlight %}

This branch should now be the old merge.

Step 2
So one option is to use git replace to chain the histories together. Seems like it might work
But I think to do it right I need an empty commit at the start which I don't alway have
http://stackoverflow.com/questions/645450/insert-a-commit-before-the-root-commit-in-git

Allows you to add a commit at the start, seems to work quite well
{% highlight bash %}
# first you need a new empty branch; let's call it `newroot`
git checkout --orphan newroot
git rm -rf .

git commit --allow-empty -m 'root commit'
git rebase --preserve-merges --onto newroot --root master
git branch -d newroot
{% endhighlight %}

That messes up all the dates though... bummer 
so run
{% highlight bash %}
git filter-branch --env-filter 'GIT_COMMITTER_DATE=$GIT_AUTHOR_DATE; export GIT_COMMITTER_DATE'
{% endhighlight %}
Magic.

Next up was trying to remove the old merges.
Thought good ole rebase -i would in the easy option and I guess it was in the end but just doing 
{% highlight bash %}
git rebase -i d0559ead5df7aea344fae4b1971419a1047916de
{% endhighlight %}
gave me all the commits in a linear line, way to many to go through and set manually.

But turns out all I was missing was --preserve-merges
{% highlight bash %}
git rebase --preserve-merges -i d0559ead5df7aea344fae4b1971419a1047916de
{% endhighlight %}

which had the merge listed as one commit so I could easily drop it.

Then I needed to replace the new blank commit with the end of the old commit, which should also be blank to make sure there aren't any conflicts

{% highlight bash %}
git replace "5b4e4e2" "6577477"
{% endhighlight %}

