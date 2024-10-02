---
title: "Vim alapok"
date: 2024-09-26T09:00
thumb: "vim.png"
tags: 
    - unix
    - vim
    - editor
---

A Vim egy rendkívül hatékony szövegszerkesztő, amelyet a parancssoros környezetben használnak, főként Linux és Unix rendszereken. A **Vim** (Vi IMproved) az eredeti **Vi** szövegszerkesztő kibővített változata. Ez a tutorial bemutatja a Vim alapjait.

## Vim alapok

A Vim különböző **módokkal** rendelkezik, amelyek különböző funkciókat biztosítanak:

1. **Normál mód (Normal Mode)**: Ez az alapértelmezett mód, ahol parancsokat adhatsz meg a szöveg szerkesztésére.
2. **Beszúrás mód (Insert Mode)**: Ebben a módban szöveget tudsz beírni.
3. **Vizuális mód (Visual Mode)**: Ebben a módban kijelölheted a szöveget.
4. **Parancs mód (Command Mode)**: A fájlkezelő és más speciális parancsok ebben a módban érhetők el.

### Vim indítása

A Vim elindításához egyszerűen írd be a terminálba:

```bash
vim fájlneve.txt
```

Ha nincs megadva fájlnév, a Vim egy üres fájlt fog megnyitni.

### Beszúrás módba lépés

A beszúrás módban szöveget adhatsz hozzá a fájlhoz. Az alábbi parancsokkal léphetsz be a beszúrás módba:

- `i`: szöveg beszúrása a kurzor előtt
- `a`: szöveg beszúrása a kurzor után
- `I`: szöveg beszúrása a sor elejére
- `A`: szöveg beszúrása a sor végére
- `o`: új sor beszúrása a kurzor alá
- `O`: új sor beszúrása a kurzor fölé

A beszúrás módból az **Esc** gomb megnyomásával térhetsz vissza a normál módba.

### Szövegszerkesztés a normál módban

A normál módban különböző parancsokkal szerkesztheted a szöveget:

- `x`: karakter törlése a kurzor alatt
- `dw`: egy szó törlése a kurzor helyétől
- `dd`: sor törlése
- `u`: visszavonás
- `Ctrl+r`: visszavonás visszavonása (redo)
- `p`: a vágólap tartalmának beillesztése a kurzor után

### Mozgás a szövegben

A normál módban a kurzort különböző irányokba mozgathatod a következő billentyűkkel:

- `h`: balra mozog
- `j`: lefelé mozog
- `k`: felfelé mozog
- `l`: jobbra mozog

Gyorsabb mozgás:

- `w`: következő szó elejére ugrik
- `b`: előző szó elejére ugrik
- `0`: sor elejére ugrik
- `$`: sor végére ugrik
- `gg`: fájl elejére ugrik
- `G`: fájl végére ugrik
- `nG`: az `n`-edik sorba ugrik (például `10G` a 10. sorba ugrik)

### Kijelölés és másolás

A szöveget kijelölheted és másolhatod a vizuális módban:

- `v`: karakteralapú kijelölés indítása
- `V`: sor alapú kijelölés indítása
- `Ctrl+v`: blokk alapú kijelölés (vizuális blokk mód)
- `y`: másolás (yank)
- `d`: kivágás (delete)
- `p`: beillesztés

### Keresés

A szövegben kereshetsz is:

- `/szó`: keresés a fájlban
- `n`: a következő találat
- `N`: az előző találat

### Kilépés és mentés

- A fájl mentése: `:w` (write)
- A fájl mentése és kilépés: `:wq` vagy `ZZ`
- Kilépés mentés nélkül: `:q!`

### Haladó parancsok

- **Többszörös parancsok**: Az ismétléshez add meg a parancs előtt az ismétlésszámot. Például, `3dw` három szót töröl, `5j` öt sort lép lefelé.
- **Globális keresés és csere**: A fájlban egy szövegrészletet lecserélhetsz a következő paranccsal:

  ```
  :%s/régi_szöveg/új_szöveg/g
  ```

- **Makrók rögzítése és lejátszása**: A makrók automatizálást tesznek lehetővé. A rögzítéshez nyomd meg a `q`-t, majd egy tetszőleges betűt, amivel azonosítod a makrót, pl. `q a`. Ezután hajtsd végre a műveleteket. A makró lejátszása `@a` lesz (ahol `a` a rögzített makró azonosítója).

## Gyakorlati példa

1. Nyiss meg egy fájlt: `vim test.txt`
2. Lépj be beszúrás módba: nyomd meg az `i`-t, majd írj be egy pár sort.
3. Térj vissza normál módba az **Esc**-pel.
4. Mentsd el a fájlt: `:w`
5. Lépj ki a Vim-ből: `:q`

## Hasznos beállítások

A Vim konfigurációja egy `.vimrc` fájlban történik, amely a felhasználó **home** könyvtárában található. Példa egy egyszerű `.vimrc` fájlra:

```vim
set number            " Sorok számozása
set relativenumber    " Relatív számozás
syntax on             " Szintaxis kiemelés bekapcsolása
set tabstop=4         " Tabulátor méretének beállítása
set shiftwidth=4      " Automatikus behúzás mérete
set expandtab         " Tabulátorokat szóközökre cseréli
```

Ezek a beállítások javítják a szerkesztési élményt és személyre szabhatók.


Az első lépések megtétele után érdemes elmélyülni a haladó funkciókban, mint a makrók, a keresési minták és a bővítmények használata.