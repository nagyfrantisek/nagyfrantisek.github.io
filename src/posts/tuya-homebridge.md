---
title: "Tuya Homebridge kiegészítő beállítása"
date: 2024-09-14T17:30
thumb: "tuya-homebridge.png"
tags: 
    - homebridge
    - tuya
    - homekit
---
A Tuya Homebridge plugin segítségével egyszerűen irányíthatod a Tuya Cloudhoz csatlakoztatott okoseszközöket a HomeKitben. Ez az útmutató bemutatja, hogyan kell konfigurálni a Tuya Homebridge plugint, hogy csatlakoztathasd az okoseszközöket a Homebridge-hez.

1. Menj a **Tuya Fejlesztői Platformra** és jelentkezz be: [Tuya Developer Platform](https://auth.tuya.com/)

2. Válaszd ki a **Cloud > Development** menüpontot.
![Cloud > Development](/assets/img/tuyahomebride-01.png "Cloud-Development")

3. **Hozz létre egy új projektet**: Create a New project
![Create new project](/assets/img/tuyahomebride-02.png "Create new project")

4. **Engedélyezd az API szolgáltatásokat**: Authorize API services
![API services](/assets/img/tuyahomebride-03.png "API services")

5. **Adj hozzá egy App fiókot**, majd kapcsold össze a mobilalkalmazással. Olvasd be a QR-kódot a Tuya Smart alkalmazással az okostelefonodon. 
![Link app](/assets/img/tuyahomebride-05.png "Link app")

6. Nyisd meg a **Tuya Homebridge plugint** és add meg a config.json fájlban a következő adatokat:
   - **username, password**: a Tuya Smart alkalmazás felhasználóneve és jelszava
   - **accessId, accessKey**: a cloud projekt *access ID* és *access secret* a dev platformról
![API services](/assets/img/tuyahomebride-04.png "API services")
![API services](/assets/img/tuyahomebride-06.png "API services")

7. Indítsd újra a Tuya Homebridge plugint, majd olvasd be a QR-kódot, hogy párosítsd a HomeKit alkalmazással az iOS eszközödön.

Mostantól a HomeKit vezérlőpultján láthatod és irányíthatod az összes okoseszközt, amely a Tuya Smart alkalmazáshoz csatlakozik.