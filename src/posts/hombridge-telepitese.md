---
title: "Homebridge telepítése"
date: 2024-08-01T14:25
thumb: "homebridge.png"
tags: 
    - selfhosted
    - linux
    - homebridge
---
Homebridge telepítése Dockerben egy Ubuntu rendszeren viszonylag egyszerű, és a Docker használata biztosítja, hogy a Homebridge elkülönített környezetben fusson, minimalizálva az Ubuntu rendszeren bekövetkező változásokat.

### 1. Előfeltételek

- Friss Ubuntu rendszer.
- Rendszergazdai jogosultságok a `sudo` használatához.
- Telepített Docker.
  
### 2. Docker telepítése Ubuntu-ra

Ha a Docker még nincs telepítve az Ubuntu rendszeren, kövesd az alábbi lépéseket:

#### 2.1 Docker telepítése

1. **Rendszer frissítése:**
   ```bash
   sudo apt update
   sudo apt upgrade
   ```

2. **Szükséges csomagok telepítése:**
   ```bash
   sudo apt install apt-transport-https ca-certificates curl software-properties-common
   ```

3. **Docker GPG kulcs és repository hozzáadása:**
   ```bash
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
   sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
   ```

4. **Docker telepítése:**
   ```bash
   sudo apt update
   sudo apt install docker-ce
   ```

5. **Docker indítása és automatikus indulás beállítása:**
   ```bash
   sudo systemctl start docker
   sudo systemctl enable docker
   ```

6. **Ellenőrizd, hogy a Docker megfelelően telepítve lett-e:**
   ```bash
   docker --version
   ```

#### 2.2 Docker Compose telepítése (opcionális, de hasznos lehet)

1. **Docker Compose telepítése:**
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   ```

2. **Futtatási jog megadása:**
   ```bash
   sudo chmod +x /usr/local/bin/docker-compose
   ```

3. **Ellenőrizd, hogy a Docker Compose megfelelően telepítve lett-e:**
   ```bash
   docker-compose --version
   ```

### 3. Homebridge telepítése Docker konténerben

Most, hogy a Docker készen áll, folytathatjuk a Homebridge telepítését.

#### 3.1 Homebridge Docker konténer futtatása

1. **Homebridge hivatalos Docker kép letöltése és futtatása:**
   Az alábbi parancs futtatja a Homebridge-t egy Docker konténerben:
   ```bash
   sudo docker run -d \
     --name homebridge \
     --restart=always \
     -e TZ=Europe/Budapest \
     -p 8581:8581 \
     -v /path/to/homebridge:/homebridge \
     oznu/homebridge
   ```

   **Parancs magyarázata:**
   - `-d`: háttérben futtatja a konténert (detached mód).
   - `--name homebridge`: nevet ad a konténernek.
   - `--restart=always`: a konténer automatikusan újraindul, ha leáll, vagy ha a gép újraindul.
   - `-e TZ=Europe/Budapest`: beállítja az időzónát.
   - `-p 8581:8581`: a Homebridge webszervert a 8581-es porton érheted el.
   - `-v /path/to/homebridge:/homebridge`: a konfigurációs fájlok és kiegészítők megőrzése érdekében a `/path/to/homebridge` mappát csatolja a konténerhez. Ezt a mappát cseréld le a megfelelő útvonalra a saját rendszeredben.

2. **Konfigurációs fájl ellenőrzése és testreszabása:**
   A Homebridge Docker konténer konfigurációs fájljai a megadott mappában (pl. `/path/to/homebridge`) találhatóak, és a `config.json` fájl szerkesztésével testreszabhatod a Homebridge működését és kiegészítőit.

#### 3.2 Docker Compose használata (opcionális)

Ha szereted a Docker Compose-t használni a konténerek menedzselésére, létrehozhatsz egy `docker-compose.yml` fájlt a Homebridge-hez.

1. **Létrehozás és szerkesztés:**
   Hozz létre egy új mappát, és hozz létre egy `docker-compose.yml` fájlt a következő tartalommal:

   ```yaml
   version: '2'
   services:
     homebridge:
       image: oznu/homebridge
       container_name: homebridge
       restart: always
       environment:
         - TZ=Europe/Budapest
       ports:
         - 8581:8581
       volumes:
         - ./homebridge:/homebridge
   ```

2. **Homebridge indítása Docker Compose segítségével:**
   A következő parancs segítségével indíthatod a konténert:
   ```bash
   sudo docker-compose up -d
   ```

### 4. Homebridge elérése és konfigurálása

1. Miután a Homebridge Docker konténer fut, a webes felületet elérheted böngészőből az alábbi URL-en:
   ```
   http://<your-server-ip>:8581
   ```
   Például:
   ```
   http://localhost:8581
   ```

2. A Homebridge UI használatával telepíthetsz kiegészítőket és konfigurálhatod az okos eszközeidet. Az alapértelmezett bejelentkezési adatok:
   - Felhasználónév: `admin`
   - Jelszó: `admin`

3. **HomeKit integráció**: A Homebridge-t mostantól hozzáadhatod az Apple HomeKit rendszeréhez. A Homebridge webes felületén egy QR-kódot látsz, amelyet a Home alkalmazásban beolvashatsz.

### 5. Homebridge frissítése

A Homebridge frissítése egyszerű, mivel Docker konténert használsz. Csak állítsd le a futó Homebridge konténert, távolítsd el a régi képet, és húzd le a legújabbat:

```bash
sudo docker stop homebridge
sudo docker rm homebridge
sudo docker pull oznu/homebridge
```

Ezután futtasd újra a konténert az eredeti paranccsal vagy Docker Compose használatával.