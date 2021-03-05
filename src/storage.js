const { FileLinkStorage } = require('./LinkStorage');

const DB = new FileLinkStorage('db.md');

module.exports = { DB };
