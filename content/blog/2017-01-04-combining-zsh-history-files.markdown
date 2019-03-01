---
title: Combining zsh history files
layout: post
date: "2017-01-04T19:38:07"
---
So more and more I seem to be looking for that command I typed before. The one with the secret magic sauce to get something to work, long winded Docker run commands and such. And more and more it seems to be on another computer, if I'm on the laptop it's on the desktop etc...

To start with take two .zsh_history files and attempt to combine them before doing any scripts

``` bash
cat laptop/.zsh_history desktop/.zsh_history
```

Pretty basic but creates an odd 'history' it would be best to sort them. The first part of a .zsh_history file is a timestamp so it should be possible to neatly sort both files.

oh-my-zsh seems to have the history command aliased and only shows line numbers.  To see the date stamps bypassed the alias with a backslash

``` bash
\history -E
```

So to sort the combination of both files pipe is to sort

``` bash
cat laptop/.zsh_history desktop/.zsh_history | sort
```

Depending on your history you might get the error
``` bash
sort: string comparison failed: Illegal byte sequence
sort: Set LC_ALL='C' to work around the problem.
```

You can set that option inline which might be handier for this

``` bash
cat laptop/.zsh_history desktop/.zsh_history | LC_ALL=C sort
```

Getting there, the problem now will be the above has messed up multiline commands, they have been sorted into there seperate lines.

Now it depends how much you want your multiline history I guess, I didn't like the idea that I'd lose things if I merged and sorted like above.

``` bash
cat laptop/.zsh_history desktop/.zsh_history | awk '{if (sub(/\\$/,"RRRRR")) printf "%s", $0; else print $0}' | LC_ALL=C sort -u | awk '{gsub(/RRRRR/,"\\\n"); print $0}'
```

So quick summary combine both files as before, use awk to turn the multi line history into a single line, sort that, use awk again to change the multi line history back.

You need to pick a temporary character sequence that won't appear in your history for the multi line work around, "RRRRR" in the example.

But this means that the above line itself will have weird things done to it in the history. So a variable would be best, you can put one in a script if you are running it as a cron.  Or you could stamp it inline something like this.

``` bash
cat laptop/.zsh_history desktop/.zsh_history | awk -v date="WILL_NOT_APPEAR$(date +"%s")" '{if (sub(/\\$/,date)) printf "%s", $0; else print $0}' | LC_ALL=C sort -u | awk -v date="WILL_NOT_APPEAR$(date +"%s")" '{gsub('date',"\\\n"); print $0}'
```

Once you are happy with the output you can then pipe the results to a file by adding `> your_file.txt` to the end.

And finally cp / mv that file to your .zsh_history

One possible gotcha when I was testing this. Lines started being removed from the .zsh_history file, so I thought the sort was doing mad things.  In fact I just breached the HISTSIZE limit and zsh was trimming the file. So probably worth increasing that by a multiple of the number of computers you are syncing.
