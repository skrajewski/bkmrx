const fs = require('fs');
const format = require('date-fns/format');
const parse = require('date-fns/parse');
const { prepareLink } = require('./Link');

const inlineTags = tags => tags.map(t => `@${t}`).join(' ');
const formatDate = date => format(date, 'yyyy-MM-dd HH:mm');

const toMarkdownLine = link => `- ${formatDate(link.createdAt)} # ${link.url} # ` + inlineTags(link.tags);

const cleanUpDate = datePart => datePart.replace('- ', '').trim();

const parseDate = dateString => parse(dateString, 'yyyy-MM-dd HH:mm', new Date());

const cleanAndParseDate = datePart => parseDate(cleanUpDate(datePart));

const fromMarkdownLine = line => {
    const parts = line.split('#');
    const data = cleanAndParseDate(parts[0]);
    const tags = parts[2].match(/\@([A-Za-z0-9\-]+)/g) || [];

    return prepareLink(parts[1].trim(), tags, data)
};

class FileLinkStorage {
    constructor(filename) {
        this.db = filename;
    }

    add(link) {
        const line = toMarkdownLine(link) + '\n';
        
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

                data = data.trim().split('\n');

                const links = data.map(fromMarkdownLine);

                resolve(links);
            });
        });
    }
}

module.exports = FileLinkStorage;