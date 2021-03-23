const fs = require('fs');
const { fromMarkdown, toMarkdown } = require('./LinkBetweenMarkdown');

class FileLinkStorage {
  constructor(filename) {
    this.db = filename;
  }

  add(link) {
    const line = `${toMarkdown(link)}\n`;

    return new Promise((resolve, reject) => {
      fs.appendFile(this.db, line, (err) => {
        if (err) {
          reject(err);
        }

        resolve();
      });
    });
  }

  getAll() {
    const fromMarkdownButIgnoreInvalidLines = (line) => {
      try {
        return fromMarkdown(line);
      } catch (e) {
        console.error(`This line is not a valid entry: ${line}.`);
        return '';
      }
    };

    return new Promise((resolve, reject) => {
      fs.readFile(this.db, 'utf-8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        if (data.length === 0) {
          resolve([]);
          return;
        }

        const parsedData = data
          .trim()
          .split('\n')
          .map(fromMarkdownButIgnoreInvalidLines)
          .filter((n) => n)
          .sort((a, b) => b.createdAt - a.createdAt);

        resolve(parsedData);
      });
    });
  }

  exists(url) {
    return new Promise((resolve, reject) => {
      fs.readFile(this.db, 'utf-8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        if (data.length === 0) {
          resolve([]);
          return;
        }

        resolve(data.trim().split('\n').some((e) => fromMarkdown(e).link === url));
      });
    });
  }
}

module.exports = FileLinkStorage;
