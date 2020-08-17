---
title: "vim"
date: 2020-06-03T17:59:39+02:00
draft: false
---
### How to map save to Ctrl+s

Why? To avoid freezing the terminal by mistake.

in .vimrc
```
noremap <silent> <C-S>          :update<CR>
vnoremap <silent> <C-S>         <C-C>:update<CR>
inoremap <silent> <C-S>         <C-O>:update<CR>
```

in .bashrc or .zshrc

```
stty -ixon
```

### When VIM is frozen, don't accept input, and you can't close it?

Probably you did Ctrl+S by mistake - it freezes your terminal, type Ctrl+Q to get it going again.

