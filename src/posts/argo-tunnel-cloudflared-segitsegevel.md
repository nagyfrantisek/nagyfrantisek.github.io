---
title: "Argo Tunnel cloudflared segítségével"
date: 2024-09-15T08:45
thumb: "network.png"
tags: 
    - selfhosted
    - linux
---
Az Argo Tunnel lehetővé teszi, hogy a Cloudflare hálózaton keresztül biztonságosan hozzáférj egy szerverhez anélkül, hogy közvetlenül ki kellene tenni azt az internetre. A `cloudflared` CLI eszközzel állíthatod be és kezelheted az Argo Tunnel-t.

### 1. Lépés: Cloudflare fiók és domain beállítása
Először szükséged lesz egy Cloudflare fiókra és egy domainre, amit a Cloudflare DNS szervereire irányítottál. 

- A domain DNS beállításai között győződj meg róla, hogy a domain Cloudflare DNS szerverekre mutat.

### 2. Lépés: `cloudflared` telepítése
Telepítsd a `cloudflared` eszközt a gépedre. A telepítési lépések operációs rendszertől függően változnak. Debian alapú rendszereken a köv. módon telepíthető:

```bash
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb
```

### 3. Lépés: Cloudflare hitelesítő kulcs (Token) beszerzése
Ahhoz, hogy kapcsolatot létesíthess a Cloudflare és a szerver között, hitelesítési kulcsra lesz szükséged.

1. Nyisd meg a Cloudflare dashboardot, válaszd ki a megfelelő domaint.
2. Navigálj a **Zero Trust Dashboard**-ra, és ott kattints az **Access** menüpontra.
3. Itt válaszd ki az **Tunnels** opciót és kattints a **Create a Tunnel** gombra.
4. Adj egy nevet a tunnelnek, majd futtasd ezt a parancsot a saját szervereden, hogy megkapd a szükséges hitelesítési fájlokat:
   ```bash
   cloudflared tunnel login
   ```

### 4. Lépés: Tunnel létrehozása
Miután hitelesítetted magad, létre kell hoznod a Tunnel-t. Ehhez használd az alábbi parancsot:

```bash
cloudflared tunnel create <tunnel-nev>
```

Ez létrehozza a Tunnel-t a megadott névvel. Jegyezd meg a Tunnel UUID-t, amit a Cloudflare visszaad, mert erre később szükséged lesz.

### 5. Lépés: Konfigurációs fájl beállítása
Készíts egy `config.yml` fájlt a `cloudflared` konfigurációhoz. Helyezd ezt a fájlt a `/etc/cloudflared/` könyvtárba.

Példa `config.yml` fájl:
```yaml
tunnel: <tunnel-uuid>
credentials-file: /etc/cloudflared/<tunnel-uuid>.json

ingress:
  - hostname: <subdomain>.yourdomain.com
    service: http://localhost:8080
  - service: http_status:404
```

Ebben a fájlban:
- A `tunnel` mezőbe a tunnel UUID kerül.
- A `hostname` mezőbe a Cloudflare DNS aldomain, ami a szerveredre fog mutatni.
- A `service` mezőbe azt a helyi szolgáltatást kell megadnod, amit a tunnel-ön keresztül el akarsz érni, pl. `http://localhost:8080` a helyi szerver elérési útja.

### 6. Lépés: Tunnel futtatása
Miután elkészítetted a konfigurációs fájlt, elindíthatod a tunnel-t:

```bash
cloudflared tunnel run <tunnel-nev>
```

Ez elindítja a tunnel-t, és a Cloudflare elkezdi továbbítani a kéréseket a szervered felé.

### 7. Lépés: DNS bejegyzés létrehozása
Annak érdekében, hogy a forgalom a tunnel-en keresztül érkezzen, hozz létre egy CNAME DNS bejegyzést a Cloudflare DNS felületén:

1. Menj a **DNS** részhez a Cloudflare dashboardban.
2. Hozz létre egy új CNAME rekordot, ahol a név a beállított aldomain (pl. `subdomain.yourdomain.com`), és a cél a `uuid.cfargotunnel.com`, ahol az `uuid` a tunnel UUID-je.

### 8. Lépés: Tunnel daemon-ként futtatása (opcionális)
Ha szeretnéd, hogy a tunnel automatikusan induljon a rendszer indulásakor, futtathatod daemon-ként.
Használd a `systemd`-t a szolgáltatás telepítéséhez:
```bash
sudo cloudflared service install
```

Indítsd el a szolgáltatást:
```bash
sudo service cloudflared start
```

A `cloudflared` segítségével könnyen kezelheted a tunnel-t és ellenőrizheted annak működését.