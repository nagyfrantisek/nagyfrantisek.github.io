---
title: "Fájlnevek kisbetűssé alakítása"
layout: post
date: 2022-10-13 13:47
image: /assets/images/markdown.jpg
headerImage: false
tag:
- script
- bash
- linux
category: blog
author: nagy
description: Fájlnevek kisbetűssé alakítása
---

## Bash script:

```
#!/bin/bash
for filename in *
do
   n=`echo $filename | tr '[:upper:]' '[:lower:]'`
   mv $filename $n
done    

```
