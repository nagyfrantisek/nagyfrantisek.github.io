---
title: "Mid-click by three finger in Windows 10"
date: 2022-10-23T19:57
thumb: "touchpad.jpg"
tags: 
    - microsoft
    - windows
---
Open registry edit by Win+R, regedit, ENTER. Go all the way down to
```
HKEY_CURRENT_USER\SOFTWARE\Synaptics\SynTP\TouchPadxxxx
```
There you will find 3FingerTapPlugInActionID key, change the value to 4. If you see 3FingerTapAction, change it to 4 as well.
Sign out of Windows and sign-in.

This change can be reverted by the Synaptics setting app, as you change any configuration using the app (through Control Panel-> Mouse). So when it's not working, check the registry again.