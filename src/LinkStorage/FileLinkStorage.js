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

    return prepareLink(parts[1].trim(), [], data)
};

class FileLinkStorage {
    constructor(filename) {
        this.db = filename;
    }

    add(link) {
        fs.appendFile(this.db, toMarkdownLine(link), (err) => {
            if (err) {
                throw err;
            }

            console.log("Link stored in DB")
        })
    }

    getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.db, 'utf-8', function (err, data) {
                if (err) {
                    reject(err);
                }

                if (!data) {
                    data = "";
                }

                data = data.trim().split('\n');

                const links = data.map(fromMarkdownLine);

                resolve(links);
            });
        });
    }
}

module.exports = FileLinkStorage;