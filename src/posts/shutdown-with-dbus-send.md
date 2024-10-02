---
title: "Shutdown/reboot with dbus-send"
date: 2019-01-16T10:00
thumb: "terminal.jpg"
tags: 
    - commandline
    - terminal
    - linux
    - bash
    - script
---

D-Bus is a message bus system, a simple way for applications to talk to one another. In addition to interprocess communication, D-Bus helps coordinate process lifecycle; it makes it simple and reliable to code a "single instance" application or daemon, and to launch applications and daemons on demand when their services are needed.

The dbus-send command is used to send a message to a D-Bus message bus.

If you have dbus-send installed, you can shutdown via dbus without the need to escalate to root privileges.

Bash script:
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