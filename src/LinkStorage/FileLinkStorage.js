const fs = require('fs');
const { fromMarkdown, toMarkdown } = require('./LinkBetweenMarkdown');

class FileLinkStorage {
    constructor(filename) {
        this.db = filename;
    }

    add(link) {
        const line = toMarkdown(link) + '\n';
        
        fs.appendFile(this.db, line, (err) => {
            if (err) {
                throw err;
            }
        })
    }

    getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.db, 'utf-8', function (err, data) {
                if (err) {
                    reject(err);
                    return;
                }

                if (data.length === 0) {
                    resolve([]);
                    return;
                }

                data = data
                    .trim()
                    .split('\n')
                    .map(fromMarkdown);

                resolve(data);
            });
        });
    }
}

module.exports = FileLinkStorage;