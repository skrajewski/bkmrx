# bkmrx 

> Keep your bookmarks in the Markdown file, manage them by bkmrx.

A bkmrx is a tool for collecting URLs, like any other bookmarking tool, but uses a Markdown-powered text file as a database.

It could work as a tool to manipulate data or daemon serving API and simple UI.

## Principles

1. Store data in a human-readable, Markdown powered text file
   - Database file should be usable without bkmrx
   - Database file should be easy to modify without using bkmrks
2. Privacy first
   - User owns its data
   - bkmrx does not tie a user to any third-party service
   - Database file could be stored locally or in a cloud storage
3. Easy to manipulate
   - Other tools can use a database file or API exposed by bkmrx

## Why another tool for bookmarks?

I found that plaintext is the most durable, portable, and long-lasting format to store data and knowledge. It's easy to modify, encrypt, archive, and so on.

My workflow relies heavily on many plaintext files, and one of them is the `urlx.md` file, where I collect interesting URLs that I can use in the future. Please be aware that this is something different than _Read Later_ list. Entries from _Read Later_ are etheral, but if something is valuable, it lays in my `urlx` list. 

bkmrx can help me manage this list. Of course, collecting links in plaintext should not require any special tool, and it's still the truth. However, bkmrx is a companion that helps me manage my _database of links_ and browse it.

If you're fine with using bookmarks in your browser and you're struggling to get the idea – that's fine. Probably bkmrx is not for you – and that's OK!

## The structure of the record

Each record consists of the date, URL, title or description, and optional tags.

Here's an example:

```md
- 2021-03-01 10:44 # https://szymonkrajewski.pl/taking-notes-in-plaintext/ # Why it's worth taking notes in plaintext @article @plaintext
```

Many markdown editors can parse URLs, making them clickable, so ultimately, it should be a simple, bullet prefixed record, as follows:

- 2021-03-01 10:44 # https://szymonkrajewski.pl/taking-notes-in-plaintext/ # Why it's worth taking notes in plaintext @article @plaintext

First is a DateTime in format `yyyy-mm-dd HH:ii`. The _ISO 8601_ is more precise and standardized, however, I found it harder to type and read in a text file.

URL is placed between two `#` characters, and this is all that bkmrx needs to parse the record. No title or tags are needed, so minimal record looks as follows:

```
- 2021-03-01 10:44 # https://szymonkrajewski.pl/taking-notes-in-plaintext/ # 
```

After the second `#` is a description place. The description is a piece of text that gives you more information about the URL. Usually, it will be a article's title or something from the page itself.

The description can contain tags. Tag begins with the `@` character and has a special meaning for bkmrx. Every tag is removed from the description and is presented internally in the collection of tags. In the future, it will be an option to filter entries by tags. Since the `@` symbol is reserved, you should not use it in a description for other purposes than tagging.

The tag should be simple. It should not contains spaces, special characters, and so on. You can use letters, numbers, and the hyphen character, so the tag `@personal-blog` is perfectly valid (as well as `@PersonalBlog`).

This syntax and set of rules is a tradeoff between text easy to read by humans and easy to parse by machine.

## Functionalities

- [x] Store data in a flat human-readable Markdown file
- [x] Add a new entry using the CLI command
- [x] Expose API endpoint for retrieving all links 
- [x] Retrieve `title` from page if possible
- [x] Store tags provided by a user for the entry
- [x] Expose CLI interface for adding a link with tags
- [ ] Expose API endpoint for adding a link with tags
- [ ] Detect duplicates and add `@refreshed` tag to an existing entry, merge other tags
- [ ] Expose collected links through API with filtering options (tags)
- [ ] Expose collected links through the simple website with filtering options (partially done)
- [ ] Generate simple HTML page with collected links
- [ ] Remove link from storage using CLI
- [ ] Remove link from storage using API
- [ ] Update tags for entry using CLI
- [ ] Update tags for entry using API

## Further plans

- Add more commands to manipulate data, e.g., removing or updating
- Add more API endpoints to manage and browse data
- Expose an optional interface for Alfred integration (or use API)
- More configuration options: offline mode, toggle API/UI – probably by the external configuration file
- Detect errors in DB file and notify user, but allow parse as many entries as possible
- Support YAML Front Matter

## License

bkmrx is open-sourced software licensed under the [MIT license](LICENSE.txt).