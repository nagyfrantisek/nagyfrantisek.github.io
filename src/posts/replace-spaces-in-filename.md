---
title: "How to replace spaces in file names using a bash script"
date: 2022-10-25T10:37
thumb: "linux.jpg"
tags: 
    - linux
    - commandline
    - script 
---

As Linux users, we frequently encounter issues when file commands or applications stop working because of a space in a filename. This can often be caused by file operations or habits like saving files with spaces in their names. In this article, we’ll explore several methods for renaming such files by removing or replacing the spaces in the filename.

## Bash script:

```
#!/bin/bash

ls | while read -r FILE
do
    mv -v "$FILE" `echo $FILE | tr ' ' '_' `
done   

```