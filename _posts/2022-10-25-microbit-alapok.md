---
title: "Micro:bit alapok - Python"
layout: post
date: 2022-10-25 21:50
image: /assets/images/markdown.jpg
headerImage: false
tag:
- microbit
- python
category: blog
author: nagy
description: Micro:bit alapok - Python
---
A [python.microbit.org](https://python.microbit.org) oldalon elérhető micro:bit Python Editor kifejezetten a szövegalapú kódolásban járatlanok számára készült.

## Hello World!

Egy új nyelven való programozás hagyományos módja az, hogy a számítógép azt mondja: "Hello, World!".

```python
from microbit import *

#egyszerű scrollozó szöveg kiírása
display.scroll("Hello World!")
```
![Markdown Image][/assets/images/microbit/helloworld.gif]