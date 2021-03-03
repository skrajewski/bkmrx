# Link Storage

A Link-Storage is a tool for colleting interesting URLs to articles, videos and other network resources. The purpose of this app is to store a reference to other resources in a human-readable file such as Markdown or txt file.

## Scope projektu

### Collecting data

- [x] Store data in flat human-readable Markdown file
- [x] Retrieve `title` from page if possible
- [x] Store tags provided by user for the entry
- [x] Expose CLI interface for adding link with tags
- [ ] Expose API interface for adding link with tags
- [ ] Detect duplicates and add `@refreshed` tag to existing entry, merge other tags

### Retrieving data

- [/] Load data from human-readable Markdown file
- [ ] Expose collected links through API with filtering options (tags)
- [ ] Expose collected links through simple website with filtering options
- [ ] Generate simple HTML page with collected links
- [ ] Expose interface for Alfred integration (with filtering, JSON powered)

### Manipulating data

- [ ] Remove link from storage using CLI
- [ ] Remove link from storage using API
- [ ] Update tags for entry using CLI
- [ ] Update tags for entry using API

## Addiitonal requirements

- [ ] API interface separated from the App
- [ ] Could work as a daemon or standalone app
- [ ] Configurable through external configuration file
- [ ] Covered by tests
- [/] Offline mode