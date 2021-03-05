function getDefaultDatabaseFile() {
    const homedir = require('os').homedir();
    const path = require('path');
    const filename = 'bkmrx.md';

    return path.join(homedir, filename);
}

module.exports = {
    isOfflineMode: function isOfflineMode() {
        return process.env.OFFLINE_MODE === true;
    },
    getDbFilePath: function getDbFilePath() {
        return process.env.FILE_PATH || getDefaultDatabaseFile();
    }
};