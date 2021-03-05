const { FileLinkStorage } = require('./LinkStorage');
const { getDbFilePath } = require('./settings');

const DB = new FileLinkStorage(getDbFilePath());

module.exports = { DB };
