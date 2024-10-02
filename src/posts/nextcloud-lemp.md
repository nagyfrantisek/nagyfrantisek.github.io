---
title: "Nextcloud telepítése LEMP szerverre"
date: 2023-06-20T15:23
thumb: "nextcloud.jpg"
tags: 
    - nextcloud
    - selfhosted
---
Az alábbi lépésről lépésre bemutatott tutorial segítségével telepíthetsz egy **Nextcloud** szervert egy **Ubuntu** alapú rendszeren, **Nginx** webszerver használatával.

### 1. **Szükséges csomagok telepítése**
Győződj meg róla, hogy a rendszered naprakész, és van hozzáférésed egy terminálhoz.

1. Frissítsd a rendszert és telepítsd a szükséges csomagokat:
   ```bash
   sudo apt update && sudo apt upgrade -y
   sudo apt install nginx mariadb-server php-fpm unzip curl -y
   ```

2. Engedélyezd az Nginx automatikus indítását:
   ```bash
   sudo systemctl enable nginx
   sudo systemctl start nginx
   ```

### 2. **MariaDB telepítése és konfigurálása**
A Nextcloud működéséhez szükség van egy adatbázisra. Ehhez MariaDB-t fogunk használni.

1. Indítsd el a MariaDB-t:
   ```bash
   sudo systemctl start mariadb
   ```

2. Futtasd a biztonsági scriptet:
   ```bash
   sudo mysql_secure_installation
   ```
   Ezt követően válaszolj a kérdésekre a biztonság növelése érdekében:
   - Nyomj Entert a jelenlegi root jelszó kihagyásához (alapértelmezett jelszó nincs).
   - Válaszolj 'Y'-nal az új root jelszó beállításához.
   - A további kérdéseknél mindegyikre 'Y' válasz javasolt.

3. Lépj be a MariaDB shell-be:
   ```bash
   sudo mysql -u root -p
   ```

4. Hozz létre egy adatbázist és felhasználót a Nextcloud számára:
   ```sql
   CREATE DATABASE nextcloud;
   CREATE USER 'nextclouduser'@'localhost' IDENTIFIED BY 'jelszo';
   GRANT ALL PRIVILEGES ON nextcloud.* TO 'nextclouduser'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

### 3. **PHP telepítése és konfigurálása**
A Nextcloudnak szüksége van PHP-re. Telepítsük a szükséges PHP modulokat.

1. Telepítsd a PHP és a szükséges bővítményeket:
   ```bash
   sudo apt install php-fpm php-mysql php-xml php-mbstring php-curl php-gd php-zip php-intl php-imagick php-bcmath php-gmp -y
   ```

2. Nyisd meg a PHP konfigurációs fájlt a szerkesztéshez:
   ```bash
   sudo nano /etc/php/8.1/fpm/php.ini
   ```

   A következő beállításokat módosítsd:

   - `memory_limit = 512M`
   - `upload_max_filesize = 100M`
   - `post_max_size = 100M`
   - `max_execution_time = 300`

3. Indítsd újra a PHP-FPM szolgáltatást:
   ```bash
   sudo systemctl restart php8.1-fpm
   ```

### 4. **Nextcloud letöltése és telepítése**

1. Töltsd le a Nextcloud legújabb verzióját:
   ```bash
   cd /var/www/
   sudo curl -o nextcloud.zip https://download.nextcloud.com/server/releases/latest.zip
   sudo unzip nextcloud.zip
   sudo chown -R www-data:www-data nextcloud/
   sudo chmod -R 755 nextcloud/
   ```

### 5. **Nginx konfigurálása**

1. Hozz létre egy új Nginx konfigurációs fájlt:
   ```bash
   sudo nano /etc/nginx/sites-available/nextcloud
   ```

2. Másold be a következő konfigurációt a fájlba:

   ```nginx
   server {
       listen 80;
       server_name nextcloud.example.com;

       root /var/www/nextcloud;
       index index.php index.html index.htm;

       location / {
           try_files $uri $uri/ /index.php$request_uri;
       }

       location ~ ^/\.well-known/acme-challenge/ {
           allow all;
       }

       location ~ ^/(?:build|tests|config|lib|3rdparty|templates|data)/ {
           deny all;
       }

       location ~ \.php$ {
           fastcgi_split_path_info ^(.+\.php)(/.+)$;
           fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
           fastcgi_index index.php;
           fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
           include fastcgi_params;
       }

       location ~ /\.ht {
           deny all;
       }

       client_max_body_size 100M;
       fastcgi_buffers 64 4K;
   }
   ```

3. Kapcsold be az új konfigurációt:
   ```bash
   sudo ln -s /etc/nginx/sites-available/nextcloud /etc/nginx/sites-enabled/
   ```

4. Teszteld az Nginx konfigurációt és indítsd újra a szervert:
   ```bash
   sudo nginx -t
   sudo systemctl restart nginx
   ```

### 6. **SSL telepítése Let’s Encrypt-tel**
A biztonságos kapcsolat érdekében telepítünk egy ingyenes SSL tanúsítványt a Let's Encrypt segítségével.

1. Telepítsd a `certbot` csomagot:
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   ```

2. Futtasd a `certbot` parancsot az SSL tanúsítvány megszerzéséhez:
   ```bash
   sudo certbot --nginx -d nextcloud.example.com
   ```

3. Kövesd a kérdéseket, és végül az Nginx-et újraindítja automatikusan.

### 7. **Nextcloud telepítési folyamat befejezése**
Nyisd meg a böngészőt és látogasd meg a szerveredet a domain névvel (pl. `https://nextcloud.example.com`), majd kövesd az utasításokat a telepítő varázslóban:

1. Adj meg egy adminisztrátori felhasználónevet és jelszót.
2. Állítsd be az adatbázis kapcsolatot:
   - Adatbázis típus: **MySQL/MariaDB**
   - Adatbázis név: `nextcloud`
   - Felhasználónév: `nextclouduser`
   - Jelszó: az előzőleg megadott jelszó
   - Szerver: `localhost`

Kattints a **Telepítés** gombra, és készen is van a Nextcloud szervered!

### 8. **További konfigurációk**
- **Cron beállítása**: A Nextcloud időzített feladataihoz állíts be egy cron jobot.
   ```bash
   sudo crontab -u www-data -e
   ```
   Adj hozzá egy cron bejegyzést:
   ```bash
   */5 * * * * php -f /var/www/nextcloud/cron.php
   ```