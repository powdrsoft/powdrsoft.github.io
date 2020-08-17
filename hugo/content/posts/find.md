---
title: "find"
date: 2020-07-23T17:40:23+02:00
draft: false
---

Find all .jpg files in the /home and sub-directories
```
find /home -name *.jpg
```

Find an empty file within the current directory
```
find . -type f -empty
```

Find all .db files (ignoring text case) 
modified in the last 7 days by a user named exampleuser
```
find /home -user exampleuser -mtime -7 -iname ".db"
```

Find and Process Files
```
find . -name "*.txt" -exec chmod o+r '{}' \;
```

Find and Delete Files
```
find . -name "*.bak" -delete
```
