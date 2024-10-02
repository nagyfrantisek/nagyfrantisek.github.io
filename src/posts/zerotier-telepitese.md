---
title: "Zerotier telepítése Ubuntu szerverre"
date: 2024-10-01T08:55
thumb: "network.jpg"
tags: 
    - unix
    - selfhosted
    - networking
---
A ZeroTier egy hálózati virtualizációs megoldás, amely lehetővé teszi a privát hálózatok egyszerű létrehozását. Az alábbi lépések bemutatják, hogyan állíthatod be a **ZeroTier** hálózatot egy otthoni Ubuntu szerveren, és hogyan tudsz majd a **macOS** eszközödről biztonságosan csatlakozni a szerverhez a ZeroTier használatával.

### 1. lépés: ZeroTier telepítése az Ubuntu szerverre

Először telepítsük a ZeroTier-t az Ubuntu szerverre. A ZeroTier hivatalos tárolót fogjuk használni a telepítéshez.

1. **Frissítsd a csomaglistát** az Ubuntu szerveren:
   ```bash
   sudo apt update
   ```

2. **Telepítsd a ZeroTier-t** a következő parancsokkal:
   ```bash
   curl -s https://install.zerotier.com | sudo bash
   ```

3. **Indítsd el a ZeroTier szolgáltatást**:
   A telepítés után automatikusan elindul a ZeroTier szolgáltatás, de ellenőrizheted a státuszát:
   ```bash
   sudo systemctl status zerotier-one
   ```
   Ha nem futna, manuálisan elindíthatod:
   ```bash
   sudo systemctl start zerotier-one
   ```

### 2. lépés: ZeroTier hálózat létrehozása

1. Látogass el a [ZeroTier Central](https://my.zerotier.com) oldalra, és hozz létre egy fiókot (ha még nincs).

2. A **ZeroTier Central** irányítópultján kattints a "Create a Network" gombra, hogy létrehozz egy új virtuális hálózatot. Ez létrehoz egy egyedi hálózati azonosítót.

3. A hálózati beállítások között engedélyezheted a **Private** hálózati módot, ami biztosítja, hogy csak az általad engedélyezett eszközök csatlakozhassanak a hálózathoz. A **Network ID** fontos, jegyezd fel ezt az azonosítót, mert erre lesz szükség a csatlakozáshoz.

### 3. lépés: Ubuntu szerver csatlakoztatása a ZeroTier hálózathoz

1. A ZeroTier telepítése után a következő paranccsal csatlakoztathatod az Ubuntu szervert a létrehozott ZeroTier hálózathoz. Használd a korábban feljegyzett **Network ID-t**:
   ```bash
   sudo zerotier-cli join <YOUR_NETWORK_ID>
   ```

2. Ezután térj vissza a **ZeroTier Central** oldalra, és látni fogod a szerveredet a hálózatod tagjaként. Itt kattints az **Authorize** melletti jelölőnégyzetre, hogy engedélyezd a szerver számára a csatlakozást.

3. Ellenőrizd a szerver ZeroTier IP-címét a következő paranccsal:
   ```bash
   ip a | grep zt
   ```
   Ezzel a paranccsal megtalálhatod a ZeroTier interfész nevét és IP-címét, amelyet majd a macOS gépedről elérhetsz.

### 4. lépés: ZeroTier telepítése a macOS eszközre

1. Látogass el a [ZeroTier letöltési oldalára](https://www.zerotier.com/download/), és töltsd le a macOS-hez való ZeroTier One alkalmazást.

2. Telepítsd az alkalmazást a macOS rendszeredre a letöltött `.pkg` fájl segítségével.

3. Miután telepítetted, nyisd meg a ZeroTier alkalmazást, és a menüsávban kattints a ZeroTier ikonra.

4. Válaszd a **Join Network** opciót, és add meg ugyanazt a **Network ID-t**, amelyet az Ubuntu szerver csatlakoztatásához is használtál.

5. Térj vissza a **ZeroTier Central** oldalra, és engedélyezd a macOS gépedet is a hálózathoz való csatlakozásra az **Authorize** opcióval.

### 5. lépés: A hálózat tesztelése és kapcsolódás

1. Miután mind az Ubuntu szerver, mind a macOS géped csatlakozott a ZeroTier hálózathoz, mindkét eszköznek elérhetőnek kell lennie ugyanazon a virtuális hálózaton keresztül.

2. A macOS terminálban ellenőrizheted a ZeroTier által kapott IP-címet:
   ```bash
   ifconfig | grep zt
   ```
   Ez megmutatja a ZeroTier interfészt és az ahhoz társított IP-címet.

3. Most próbáld meg **pingelni** az Ubuntu szerver ZeroTier IP-címét a macOS gépről:
   ```bash
   ping <Ubuntu_ZeroTier_IP>
   ```

4. Ha szeretnél SSH-n keresztül csatlakozni a ZeroTier hálózaton keresztül az Ubuntu szerverhez, használd az SSH parancsot a ZeroTier IP-címével:
   ```bash
   ssh user@<Ubuntu_ZeroTier_IP>
   ```

### 6. lépés: További beállítások (opcionális)

- **Állandó csatlakozás**: Győződj meg róla, hogy mind a macOS, mind az Ubuntu szerver ZeroTier kliense automatikusan indul a rendszer indításakor.
  - **Ubuntu**: Az automatikus indítás alapértelmezett, de ellenőrizheted a beállítást:
    ```bash
    sudo systemctl enable zerotier-one
    ```

- **Tűzfal beállítások**: Ha tűzfalat használsz az Ubuntu szerveren (pl. UFW), engedélyezned kell a ZeroTier interfészen keresztüli forgalmat is. Ehhez az alábbi parancsokat használhatod:
  ```bash
  sudo ufw allow in on zt0
  sudo ufw allow out on zt0
  ```

