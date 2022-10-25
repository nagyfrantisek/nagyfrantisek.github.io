---
title: "Szóközök cseréje"
layout: post
date: 2022-10-25 10:37
image: /assets/images/markdown.jpg
headerImage: false
tag:
- bash
- script
- linux
category: blog
author: nagy
description: Szóközök cseréje
---

## Bash script:

```
#!/bin/bash

ls | while read -r FILE
do
    mv -v "$FILE" `echo $FILE | tr ' ' '_' `
done   

```
