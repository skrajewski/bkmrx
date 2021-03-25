# bkmrx 🔖

> Keep your bookmarks in the Markdown file, manage them by *bkmrx*.

A *bkmrx* is a tool for collecting URLs, like any other bookmarking tool, but uses a Markdown-powered text file as a database.

It could work as a tool to manipulate data or daemon serving API and simple UI.

## Installation and usage

### Install using npm

```bash
npm install -g bkmrx
```

Or run it directly using `npx`

```bash
npx bkmrx
```

### Location of the database file

By default, *bkmrx* uses a file called `bkmrx.md` stored in your user directory. You can change the location of the database file using the environment variable `FILE_PATH`, e.g

```
FILE_PATH=/Users/szymon/Documents/urlx.md bkmrx
```

You can also add this variable to your `.bashrc` file.

### Basic usage

For now, only two commands are supported:

Add new entry to database file:

```bash
bkmrx add <url> -d "optional description" -t tag1 tag2
```

Serve API and simple UI to browse the links database:

```bash
bkmrx serve -p 3031 -h 127.0.0.1
```

Above host and port number are default for *bkmrx*, so you can simply run `bkmrx serve`.

### Access Simple UI

If you _serve_ the UI, you can browse http://127.0.0.1:3031 to see a list of your links. 

The link browser page is simple by default. The *bkmrx* should mainly manage your links database. The UI may evolve in the future but not beyond a simple HTML with some JavaScript attached.

### Working with API

If you run `bkmrx serve`, it exposes API and documentation as well.

- http://127.0.0.1:3031/api – Main API endpoint
- http://127.0.0.1:3031/openapi.json – OpenAPI Specification
- http://127.0.0.1:3031/docs – ReDoc-powered API documentation


Currently, the API is under development. In theory, by exposing functionalities through the API, other developers may connect their apps like custom UIs, desktop apps, browser extensions, and so on to the *bkmrx*. Read more in the [future](#the-future) section.

## Principles

1. Store data in a human-readable, Markdown powered text file
   - Database file should be usable without *bkmrx*
   - Database file should be easy to modify without using *bkmrx*
2. Privacy first
   - User owns its data
   - *bkmrx* does not tie a user to any third-party service
   - Database file could be stored locally or in a cloud storage
3. Easy to manipulate
   - Other tools can use a database file or API exposed by *bkmrx*

## Why another tool for bookmarks?

I found that plaintext is the most durable, portable, and long-lasting format to store data and knowledge. It's easy to modify, encrypt, archive, and so on.

My workflow relies heavily on many plaintext files, and one of them is the `urlx.md` file, where I collect interesting URLs that I can use in the future. Please be aware that this is something different than _Read Later_ list. Entries from _Read Later_ are etheral, but if something is valuable, it lays in my `urlx` list. 

*bkmrx* can help me manage this list. Of course, collecting links in plaintext should not require any special tool, and it's still the truth. However, *bkmrx* is a companion that helps me manage my _database of links_ and browse it.

If you're OK with using bookmarks in your browser and you're struggling to get the idea – that's fine. Probably *bkmrx* is not for you – and that's OK!

## The structure of the record

Each record consists of the date, URL, title or description, and optional tags.

Here's an example:

```md
- 2021-03-01 10:44 # https://szymonkrajewski.pl/taking-notes-in-plaintext/ # Why it's worth taking notes in plaintext @article @plaintext
```

Many markdown editors can parse URLs, making them clickable, so ultimately, it should be a simple, bullet prefixed record, as follows:

- 2021-03-01 10:44 # https://szymonkrajewski.pl/taking-notes-in-plaintext/ # Why it's worth taking notes in plaintext @article @plaintext

First is a DateTime in format `yyyy-mm-dd HH:ii`. The _ISO 8601_ is more precise and standardized. However, I found it harder to type and read in a text file.

URL is placed between two `#` characters, and this is all that *bkmrx* needs to parse the record. No title or tags are needed, so minimal record looks as follows:

```md
- 2021-03-01 10:44 # https://szymonkrajewski.pl/taking-notes-in-plaintext/ # 
```

After the second `#` is a description place. The description is a piece of text that gives you more information about the URL. Usually, it will be an article's title or something from the page itself.

The description can contain tags. Tag begins with the `@` character and has a special meaning for *bkmrx*. Every tag is removed from the description and is presented internally in the collection of tags. In the future, it will be an option to filter entries by tags. Since the `@` symbol is reserved, you should not use it in a description for other purposes than tagging.

The tag should be simple. It should not contains spaces, special characters, and so on. You can use letters, numbers, and the hyphen character, so the tag `@personal-blog` is perfectly valid (as well as `@PersonalBlog`).

This syntax and set of rules is a tradeoff between text easy to read by humans and easy to parse by machine.

## Functionalities

- [x] Store data in a flat human-readable Markdown file
- [x] Add a new entry using the CLI command
- [x] Expose API endpoint for retrieving all links 
- [x] Retrieve `title` from page if possible
- [x] Store tags provided by a user for the entry
- [x] Expose CLI interface for adding a link with tags
- [x] Expose API endpoint for adding a link with tags
- [ ] Detect duplicates and add `@refreshed` tag to an existing entry, merge other tags
- [ ] Expose collected links through API with filtering options (tags)
- [ ] Expose collected links through the simple website with filtering options (partially done)
- [ ] Generate simple HTML page with collected links
- [ ] Remove link from storage using CLI
- [ ] Remove link from storage using API
- [ ] Update tags for entry using CLI
- [ ] Update tags for entry using API

## The Future

I've started with an idea to create a simple manager for my Markdown-powered list of links. I haven't seen any other usage than my specific use-case since I don't know anybody who stores its own bookmarks this way. However, I see a lot of potential with unifying access to so-called _bookmarks_.

That unified access is something I aim for. If *bkmrx* will have to do one thing, I'd like to make it a unified API for various *link storage*. That could be MySQL or MongoDB database, Markdown or Plaintext file, a browser bookmarks file, and third-party services exposing own APIs like Pocket, PinBoard, etc. On top of that, *bkmrx* should expose extra API for plugins to extend their functionality, e.g., automatic synchronization, duplicates or dead-links detection, etc. 

That's an idea. I don't want to do everything I mentioned above, but I want to leave a possibility to extend *bkmrx* or built another software on top of that. It could never happen, but – who knows.

### Other ideas

- Add more commands to manipulate data, e.g., removing or updating
- Add more API endpoints to manage and browse data
- Expose an optional interface for Alfred integration (or use API)
- More configuration options: offline mode, toggle API/UI – probably by the external configuration file
- Detect errors in DB file and notify user, but allow parse as many entries as possible
- Support YAML Front Matter to configure webUI (or maybe a config file?)

## Isn't collecting things bad?

Some people don't use bookmarks. Some people bookmark everything obsessively. We store articles, videos, and other things because we think a specific resource will be helpful * someday*. Ultimately, we end up with a magnitude of links: outdated, obsolete, no-longer-interesting.

By using Markdown, I wanted to keep the list of my bookmarks small enough to browse and search through the list. Using *bkmrx*, I can easily store and browse thousands of links, but it's not what this tool was built for. However, maybe someone finds value in it.

If you find a remedy on the always-full _read-later_ list, that's not the right direction. Try to establish a healthy relationship with the _read-later_ lists first. Without a proper mindset, neither *bkmrx* nor other tools could help you process all this stuff. You can read [more about it on my blog][https://szymonkrajewski.pl/dont-read-later/].
## License

*bkmrx* is open-sourced software licensed under the [MIT license](LICENSE.txt).

