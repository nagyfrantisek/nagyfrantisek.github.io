---
title: "Redis server for Nextcloud"
date: 2023-07-26T18:51
thumb: "redis-nextcloud.jpg"
tags: 
    - nextcloud
    - selfhosted
---

How to install Redis for Nextcloud on Ubuntu:

```sudo apt install redis-server```

```sudo nano /etc/redis/redis.conf```

Change bind ```127.0.0.1``` to ```bind 0.0.0.0```

```sudo service redis-server restart```

```sudo apt install php-redis```

```
sudo systemctl status redis
```
Edit nextcloud's config.php, and add:
```
'memcache.local' => '\\OC\\Memcache\\Redis',
'memcache.distributed' => '\\OC\\Memcache\\Redis',
'filelocking.enabled' => 'true',
'memcache.locking' => '\\OC\\Memcache\\Redis',
'redis' =>
array (
'host' => 'localhost',
'port' => 6379,
'timeout' => 0.0,
),
```