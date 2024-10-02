---
title: "Bash Script To Rename File Name To Lowercase"
date: 2019-01-16T10:00
thumb: "linux.jpg"
tags: 
    - commandline
    - terminal
    - linux
    - bash
    - script
---

This script use tr command to convert uppercase file name to a lowercase file name.

Bash script:
```
#!/bin/bash
for filename in *
do
   n=`echo $filename | tr '[:upper:]' '[:lower:]'`
   mv $filename $n
done
```