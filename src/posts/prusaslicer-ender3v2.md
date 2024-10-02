---
title: "Prusaslicer Ender-3 V2 beállítások"
date: 2024-01-12T20:10
thumb: "3dprinter.jpg"
tags: 
    - 3d print
---
A PrusaSlicer beállítása az Ender 3 V2-höz viszonylag egyszerű, és ezek a paraméterek egy jó alapot adnak. Az anyagtól függően finomhangolásra is szükség lehet, különösen a hőmérséklet és visszahúzás (retraction) beállításoknál.

## Printer bed size:
   - X: 220 mm
   - Y: 220 mm
   - Z: 250 mm

## Extruder:
   - Retraction 3mm
   - Retraction speed: 60mm/s

## Start G-code:
```
G90 ; use absolute coordinates
M83 ; extruder relative mode
M104 S[first_layer_temperature] ; set extruder temp
M140 S[first_layer_bed_temperature] ; set bed temp
M190 S[first_layer_bed_temperature] ; wait for bed temp
M109 S[first_layer_temperature] ; wait for extruder temp
G28 ; home all
M420 S1 Z2 ; Enable ABL using saved Mesh and Fade Height
;G29 ; ABL
G1 Z2 F240
G1 X3 Y10 F3000
G1 Z0.28 F240
G92 E0
G1 Y190 E15 F1500 ; intro line
G1 X3.3 F5000
G92 E0
G1 Y10 E15 F1200 ; intro line
G92 E0
```

## End G-code:
```
{if max_layer_z < max_print_height}G1 Z{z_offset+min(max_layer_z+2, max_print_height)} F600 ; Move print head up{endif}
G1 X5 Y{print_bed_max[1]*0.8} F{travel_speed*60} ; present print
{if max_layer_z < max_print_height-10}G1 Z{z_offset+min(max_layer_z+10, max_print_height-10)} F600 ; Move print head further up{endif}
M140 S0 ; turn off heatbed
M104 S0 ; turn off temperature
M107 ; turn off fan
M84 X Y E ; disable motors
```
## Before layer change G-code
```
G92 E0
{if layer_num==1}M221 S95{endif}
```

## Color change G-code
```
M600
```