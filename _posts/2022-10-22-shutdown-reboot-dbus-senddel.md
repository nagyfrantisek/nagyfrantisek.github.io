---
title: "Shutdown/reboot dbus-senddel"
layout: post
date: 2022-10-22 17:32
image: /assets/images/markdown.jpg
headerImage: false
tag:
- bash
- script
- linux
category: blog
author: nagy
description: Shutdown/reboot dbus-senddel
---

## Bash script:

```
#!/bin/sh
#shutdown script
xmessage "Are you sure you want to shut down your computer?" -center -title "Take action" -default "Cancel" -buttons "Cancel":1,"Reboot":2,"Shutdown":3 

case $? in
    1)
        echo "Exit";;
    2)
        dbus-send --system --print-reply --dest="org.freedesktop.ConsoleKit" /org/freedesktop/ConsoleKit/Manager org.freedesktop.ConsoleKit.Manager.Restart;;
    3)
        dbus-send --system --print-reply --dest="org.freedesktop.ConsoleKit" /org/freedesktop/ConsoleKit/Manager org.freedesktop.ConsoleKit.Manager.Stop;;
esac
```