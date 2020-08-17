---
title: "ssh"
date: 2020-07-23T17:40:32+02:00
draft: false
---

### SSH Port forwarding
-L Specifies that the given port on the local (client) 
host is to be forwarded to the given host and port on the remote side.
```
ssh -L 9200:localhost:9200 user@server
```


