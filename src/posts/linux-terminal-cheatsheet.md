---
title: "Linux terminal cheat-sheet"
date: 2024-09-25T08:15
thumb: "terminal1.png"
tags: 
    - linux
---

Egy magyar nyelvű cheat sheet a legfontosabb Linux parancsokkal és azok rövid magyarázatával:

## Alapvető parancsok:
- `pwd`  
  **Jelenlegi könyvtár megjelenítése**  
  Megmutatja a terminál aktuális könyvtárának elérési útját.

- `ls`  
  **Lista a könyvtár tartalmáról**  
  Listázza a fájlokat és könyvtárakat. Hasznos kapcsolók:
  - `-l`: részletes lista (méret, jogosultságok, dátum)
  - `-a`: rejtett fájlokat is megjeleníti

- `cd [könyvtár]`  
  **Könyvtár váltása**  
  Váltás az adott könyvtárba. Például: `cd /home/user`.

- `mkdir [könyvtár neve]`  
  **Új könyvtár létrehozása**  
  Új könyvtár készítése az aktuális könyvtárban.

- `rmdir [könyvtár neve]`  
  **Könyvtár törlése**  
  Csak üres könyvtárat lehet vele törölni.

- `rm [fájl neve]`  
  **Fájl törlése**  
  Fájl törlése. Ha egy könyvtárat is törölni szeretnél a fájlokkal együtt, használd az `-r` kapcsolót (pl.: `rm -r [könyvtár neve]`).

- `cp [forrás] [cél]`  
  **Fájl másolása**  
  Fájl másolása egyik helyről a másikra. Ha könyvtárat másolnál: `cp -r [forrás] [cél]`.

- `mv [forrás] [cél]`  
  **Fájl áthelyezése vagy átnevezése**  
  Áthelyez egy fájlt/könyvtárat, vagy átnevezi.

## Fájl tartalommal kapcsolatos parancsok:
- `cat [fájl neve]`  
  **Fájl tartalmának megtekintése**  
  Megjeleníti egy fájl tartalmát.

- `less [fájl neve]`  
  **Fájl olvasása**  
  A fájl tartalmát lapozható formában jeleníti meg. Kilépés: `q`.

- `head [fájl neve]`  
  **Fájl elejének megtekintése**  
  Megjeleníti az első 10 sort. Az `-n` kapcsolóval megadhatod, hány sort akarsz látni (pl. `head -n 20 [fájl neve]`).

- `tail [fájl neve]`  
  **Fájl végének megtekintése**  
  Az utolsó 10 sort jeleníti meg. Az `-n` kapcsoló itt is használható.

## Jogosultságok és tulajdonjog:
- `chmod [jogosultságok] [fájl neve]`  
  **Fájl jogosultságainak módosítása**  
  Például: `chmod 755 [fájl]` (tulajdonosnak teljes jog, másoknak olvasási és futtatási jog).


- `chown [felhasználó]:[csoport] [fájl neve]`  
  **Fájl tulajdonosának módosítása**  
  Például: `chown root:root [fájl]`.

## Rendszerinformációk:
- `df -h`  
  **Lemezhasználat megjelenítése**  
  Kiírja a lemezek használatát emberileg olvasható formában.

- `du -sh [könyvtár vagy fájl]`  
  **Tárhelyhasználat méretének megjelenítése**  
  Megmutatja a fájl vagy könyvtár méretét.

- `free -h`  
  **Memóriahasználat megjelenítése**  
  Az elérhető és használt memória méretének megtekintése.

- `top`  
  **Futó folyamatok megtekintése**  
  Valós idejű lista a rendszer futó folyamatairól.

## Folyamatok kezelése:
- `ps`  
  **Folyamatok listázása**  
  Az aktuális felhasználóhoz tartozó folyamatok listázása.

- `kill [folyamat ID]`  
  **Folyamat leállítása**  
  Egy folyamat leállítása az azonosító (PID) alapján.

- `killall [folyamat neve]`  
  **Folyamatok leállítása név alapján**  
  Minden folyamat leállítása, amely az adott néven fut.

## Hálózati parancsok:
- `ping [cím]`  
  **Kapcsolat tesztelése**  
  Kapcsolat tesztelése egy másik gép felé.

- `ifconfig` vagy `ip a`  
  **Hálózati interfészek megjelenítése**  
  Megjeleníti a hálózati kártyák adatait.

- `curl [URL]`  
  **URL lekérdezése**  
  Hasznos webes lekérdezésekhez.

- `wget [URL]`  
  **Fájl letöltése**  
  Egy fájl letöltése a megadott URL-ről.

## Egyéb hasznos parancsok:
- `grep [kifejezés] [fájl]`  
  **Keresés fájlban**  
  Kifejezés keresése fájlban. Pl.: `grep "keresett szöveg" fájl.txt`.

- `find [könyvtár] -name [fájlnév]`  
  **Fájl keresése**  
  Keresés fájlnév alapján az adott könyvtárban és annak almappáiban.

- `history`  
  **Korábbi parancsok listázása**  
  Megjeleníti a korábban használt parancsokat.

- `alias [rövid név]='[parancs]'`  
  **Alias létrehozása**  
  Rövidebb parancsnevek létrehozása. Pl.: `alias ll='ls -l'`.

## Tömörítés és archíválás:
- `tar -czvf [archívum.tar.gz] [fájl/könyvtár]`  
  **Tömörítés tar.gz formátumba**  
  Tömörít egy fájlt vagy könyvtárat.

- `tar -xzvf [archívum.tar.gz]`  
  **Archívum kicsomagolása**  
  Tömörített fájl kicsomagolása.

Ez a cheat sheet a legfontosabb Linux parancsokat tartalmazza, amelyek segítenek a terminál használatában.