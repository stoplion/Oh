# Command Line Bookmarking

[![Image from Gyazo](https://i.gyazo.com/02ce5034be5bce22c096387bc2480ed4.gif)](https://gyazo.com/02ce5034be5bce22c096387bc2480ed4)

[![Image from Gyazo](https://i.gyazo.com/fd04fd72ecfcbf24b97a27f129f604dd.gif)](https://gyazo.com/fd04fd72ecfcbf24b97a27f129f604dd)

[![Image from Gyazo](https://i.gyazo.com/1f09523feb53fed222568b6c0e4a578c.gif)](https://gyazo.com/1f09523feb53fed222568b6c0e4a578c)

---

## Start using this thing

```
// Kick it off by initializing

$ npm install -g @stoplion/oh
$ oh init
```

```
// Add some bookmarks with aliases
// oh add <alias> <url>

$ oh add g google.com
$ oh add hn https://news.ycombinator.com/
$ oh add red https://reddit.com/
$ oh add trel https://trello.com/
```

```
// Last all your bookmarks

$ oh ls
┌───────┬───────────────────────────────┬──────┐
│ alias │ url                           │ tags │
├───────┼───────────────────────────────┼──────┤
│ g     │ google.com                    │      │
├───────┼───────────────────────────────┼──────┤
│ hn    │ https://news.ycombinator.com/ │      │
├───────┼───────────────────────────────┼──────┤
│ red   │ https://reddit.com/           │      │
├───────┼───────────────────────────────┼──────┤
│ trel  │ https://trello.com/           │      │
└───────┴───────────────────────────────┴──────┘
```

```
// Open a bookmark in the browser
// oh <alias>

$ oh red
$ oh g
$ oh trel
$ oh hn
```

```
Tag a bookmark.
(More features with tagging comming soon!)

// oh tag <alias> <tags>

$ oh tag red reading news

┌───────┬───────────────────────────────┬───────────────┐
│ alias │ url                           │ tags          │
├───────┼───────────────────────────────┼───────────────┤
│ g     │ google.com                    │               │
├───────┼───────────────────────────────┼───────────────┤
│ hn    │ https://news.ycombinator.com/ │               │
├───────┼───────────────────────────────┼───────────────┤
│ red   │ https://reddit.com/           │ reading, news │
├───────┼───────────────────────────────┼───────────────┤
│ trel  │ https://trello.com/           │               │
└───────┴───────────────────────────────┴───────────────┘
```

```
// List all tags

$ oh tags

┌─────────┬───────┐
│ tags    │ count │
├─────────┼───────┤
│ reading │ 2     │
├─────────┼───────┤
│ news    │ 1     │
└─────────┴───────┘
```

```
// Search bookmarks by tags

$  oh search -t news

┌───────┬─────────────────────┬───────────────┐
│ alias │ url                 │ tags          │
├───────┼─────────────────────┼───────────────┤
│ red   │ https://reddit.com/ │ reading, news │
└───────┴─────────────────────┴───────────────┘

```

---

## Features coming soon

```
- [x] Filter search by tag
- [ ] Filter search by url and alias
- [ ] Open with other browsers
- [ ] Open with incognito
- [ ] Open with different profiles
- [ ] Autocomplete
```

# Made with opensource

- [Commander](https://www.npmjs.com/package/commander)
- [Shelljs](https://www.npmjs.com/package/shelljs)
- [Better-Opn](https://www.npmjs.com/package/better-opn)
- [Cli-Table](https://www.npmjs.com/package/cli-table)
