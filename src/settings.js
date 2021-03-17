const getDefaultDatabaseFile = () => {
    const homedir = require('os').homedir();
    const path = require('path');
    const filename = 'bkmrx.md';

    return path.join(homedir, filename);
};

const isOfflineMode = () => process.env.OFFLINE_MODE === true;

const getDbFilePath = () => process.env.FILE_PATH || getDefaultDatabaseFile(); 

module.exports = {
    isOfflineMode,
    getDbFilePath
};
