const { homedir } = require('os');
const { join } = require('path');

const defaultFileName = 'bkmrx.md';

const getDefaultDatabaseFile = () => join(homedir, defaultFileName);

const isOfflineMode = () => process.env.OFFLINE_MODE === true;

const getDbFilePath = () => process.env.FILE_PATH || getDefaultDatabaseFile();

module.exports = {
  isOfflineMode,
  getDbFilePath,
};
