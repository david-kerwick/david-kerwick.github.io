---
layout: "post"
title: "Finding double byte characters in text files"
date: "2017-10-06 09:03"
---
Having just coming out of hunting down an oddball error I thought it might be a good idea write down some steps.

Things started off with a database insert breaching the size limits on a column. Nothing to strange at that point, but the insert was from xml data that has a schema to enforce the max size. So how could it breach the limit.

Turns out the database column in question is specified using BYTE i.e. `VARCHAR2(20 BYTE)` and xml being a good internet citizen treats strings as UTF-8 so counts double byte characters as 1 like for example things with fada's á ú etc... but they take up two bytes so if you are at the limit this can push you over the edge.

Now finding the offender in a giant blob of xml is no fun. Especially when it's a invisible character.
So regex to the rescue

```
[^\x00-\x7F]
```

Search for anything matching the above, so anything outside the 00 - 7f range (table [here](http://www.fileformat.info/info/charset/UTF-8/list.htm))
