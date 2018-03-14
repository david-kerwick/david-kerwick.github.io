---
layout: "post"
title: "Transfer iTunes and iPhone backups to new Mac"
date: "2018-03-13 23:07"
---
Having set up a new Mac I wanted to start using it as the primary machine. I'm still old school and plug my phone into the Mac for updates and backups.
So for that to work I need to transfer my music (hardly ever listen to but can't bring myself to delete) and the last backup of the phone.

Before transfer it's worth clearing down the very old backups, I've has the old machine for a while and it had backups from long gone phones/ipads. And these backups are fairly big.

Head to iTunes preferences then the Devices tab. Here delete as many backups as you are comfortable with.

Once you have both machines on the same network you should be able to go to the new machine, find the old machine in the shared section in finder and navigate to
`/Users/David/Library/Application Support/` and copy the MobileSync folder to the same location on your new machine (provided your user is the same on both of course)

That will probably take a while.

For iTunes do something similar on the new machine move or delete iTunes folder in `/Users/David/Music/` somewhere else.
Go to the same folder on the old machine through the share and copy the iTunes folder over to `/Users/David/Music/`

If like me you have built up a ton of music since the first iPod days this will take a really long time.

Once all done you should be able to open iTunes which will check itself, plug in your iPhone and thrust the computer and do another backup.

 
