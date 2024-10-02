---
title: "Docker cheat-sheet"
date: 2024-09-24T18:45
thumb: "docker.png"
tags: 
    - selfhosted
---

A leggyakrabban használt Docker parancsok:

### Futó konténerek listázása

```
docker ps
```

A parancs a Docker konténerek listázására szolgál. Alapértelmezés szerint csak a futó konténereket jeleníti meg. A parancs kimenete tartalmazza a következő információkat a konténerekről:

- **CONTAINER ID**: A konténer azonosítója.
- **IMAGE**: A konténerből indított Docker kép neve.
- **COMMAND**: A konténerben futó parancs.
- **CREATED**: A konténer létrehozásának időpontja.
- **STATUS**: A konténer állapota (pl. fut, leállt, stb.).
- **PORTS**: A konténer által használt portok és azok térképezése a gazdagépre.
- **NAMES**: A konténer neve.


### Összes konténer listázása
```
docker ps -a
```

Ha szeretnéd látni az összes konténert, beleértve a leállítottakat is, akkor a `docker ps -a` parancsot használhatod. Ez a kapcsoló megjeleníti az összes konténert, függetlenül attól, hogy futnak-e vagy sem.


### Konténer indítása
```
docker run <image_name>
```

A parancs egy új konténert hoz létre és elindítja azt egy megadott Docker image-ből. Ha nincs meg a helyi gépen az image, a Docker Hub-ról letölti, majd csatlakoztatja a konzolhoz, így közvetlenül tudsz interakcióba lépni a futó alkalmazással.

### Háttérben futtatás
```
docker run -d <image_name>
```

A parancs ugyanúgy létrehozza és elindítja a konténert, de “detached” (háttér) módban futtatja. Ez azt jelenti, hogy a konténer fut a háttérben, a terminál pedig azonnal visszakapja az irányítást.


### Konténer leállítása
```
docker stop <container_id>
```

A parancs leállít egy futó konténert. Először egy “graceful” (kíméletes) leállítást próbál végrehajtani, amely lehetőséget ad a konténerben futó alkalmazásnak, hogy rendesen befejezze a működését. Ha ez nem sikerül meghatározott időn belül, akkor a Docker kényszerítve állítja le a konténert.


### Konténer törlése
```
docker rm <container_id>
```

A parancs törli a megadott, **leállított** konténert a Dockerből. Ez véglegesen eltávolítja a konténert, de az adatok, fájlok vagy beállítások elveszhetnek, ha azok nem voltak külső volumenhez vagy más tárolási megoldáshoz csatolva. Fontos megjegyezni, hogy a parancs csak **leállított** konténereket tud törölni; futó konténerek esetén először a `docker stop` parancsot kell használni.


### Képfájlok listázása
```
docker images
```

A parancs a helyi gépen tárolt Docker képfájlokat listázza ki. Az eredmény táblázatos formában jelenik meg, amely tartalmazza a képek nevét, címkéjét (tag), az image ID-jét, létrehozásának dátumát, és a fájlméretét. Ez segít áttekinteni, hogy mely képfájlok érhetők el az új konténerek létrehozásához.



### Képfájlok letöltése
```
docker pull <image_name>
```

A parancs egy megadott Docker képet (image) tölt le a Docker Hub-ból (vagy egy másik regisztrációs szolgáltatásból) a helyi gépre.


### Logok megtekintése
```
docker logs <container_id>
```

A parancs lehetővé teszi, hogy megtekinthessük egy adott konténer (container) naplózott (log) üzeneteit.

### Hálózatok kezelése
```
docker network ls
```
A parancs a Docker által kezelt hálózatok listáját jeleníti meg.


### Portmapping
```
docker run -p <host_port>:<container_port> <image_name>
```

A parancs lehetővé teszi egy új konténer indítását egy megadott Docker kép (image) alapján, miközben porttovábbítást (port forwarding) is beállít. A `<host_port>` a gazdagép (host) portja, amelyen a konténer szolgáltatásai elérhetők lesznek, míg a `<container_port>` a konténer belső portja, amelyen a szolgáltatás fut. Ez lehetővé teszi, hogy a gazdagépről elérjük a konténerben futó alkalmazást.
