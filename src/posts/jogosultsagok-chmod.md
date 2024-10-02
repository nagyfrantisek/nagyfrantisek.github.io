---
title: "Fájlok jogosultsága Linux rendszereken"
date: 2024-09-25T09:20
thumb: "linux.jpg"
tags: 
- linux
---
A `chmod` parancs lehetővé teszi a fájlok és könyvtárak jogosultságainak módosítását. A jogosultságok három kategóriába sorolhatók:

1. **Tulajdonos (user, u)** – akié a fájl/könyvtár
2. **Csoport (group, g)** – azok a felhasználók, akik egy adott csoporthoz tartoznak
3. **Mások (others, o)** – mindenki más

### Jogosultságok típusai:
- **r** (read): olvasási jog
- **w** (write): írási jog
- **x** (execute): futtatási jog

### Jogosultságok numerikus formátuma:
A jogosultságok numerikus értékkel is megadhatók. A számok értelmezése:

| Jogosultság | Bináris érték | Decimális érték |
|-------------|---------------|-----------------|
| - (nincs jog) | 000           | 0               |
| x (futtatás) | 001           | 1               |
| w (írás)     | 010           | 2               |
| wx           | 011           | 3               |
| r (olvasás)  | 100           | 4               |
| rx           | 101           | 5               |
| rw           | 110           | 6               |
| rwx          | 111           | 7               |

A numerikus formátumban három számot kell megadni, amelyek sorrendben a tulajdonos, a csoport, és a mások jogosultságait írják le.

Példák:
- **`chmod 755 [fájl]`**:  
  - Tulajdonos: olvasás, írás, futtatás (7)
  - Csoport: olvasás, futtatás (5)
  - Mások: olvasás, futtatás (5)

- **`chmod 644 [fájl]`**:  
  - Tulajdonos: olvasás, írás (6)
  - Csoport: olvasás (4)
  - Mások: olvasás (4)

### Szimbolikus formátum:
Szimbolikus formátumban is megadhatók a jogosultságok. Az alap szintaxis:  
`chmod [kinek] [művelet] [jogosultság] [fájl]`

- **kinek**:  
  - `u`: tulajdonos
  - `g`: csoport
  - `o`: mások
  - `a`: mindenki (all)

- **művelet**:  
  - `+`: hozzáadás
  - `-`: eltávolítás
  - `=`: pontosan erre beállítás

Példák:
- **`chmod u+x [fájl]`**: a tulajdonos számára futtatási jog hozzáadása
- **`chmod g-w [fájl]`**: a csoporttól az írási jog elvétele
- **`chmod o=r [fájl]`**: mások számára csak olvasási jog megadása

### Speciális jogosultságok:
- **`s` (SetUID/SetGID)**: Ha a tulajdonos számára van futtatási jog beállítva, akkor a fájl futása a tulajdonos jogain történik (nem az aktuális felhasználóé). Csoport esetén ez a GID-hoz hasonlóan működik.
  - Beállítása: `chmod u+s [fájl]` vagy `chmod g+s [fájl]`
  
- **`t` (Sticky bit)**: Ezt leginkább könyvtárakra használják. Ha be van állítva, akkor csak a fájl tulajdonosa (vagy a root) törölheti a fájlt, még akkor is, ha más felhasználónak van írási joga a könyvtárra.
  - Beállítása: `chmod +t [könyvtár]`

### Gyakorlati példák:
1. **`chmod 777 [fájl]`**: Mindenki számára teljes jogosultság (olvasás, írás, futtatás).
2. **`chmod 700 [fájl]`**: Csak a tulajdonosnak van teljes joga (másoknak semmi).
3. **`chmod u+x,g-w,o=r [fájl]`**: A tulajdonos számára futtatási jog, a csoporttól az írási jog eltávolítása, másoknak olvasási jog. 
