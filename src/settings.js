module.exports = {
    isOfflineMode: function isOfflineMode() {
        return process.env.OFFLINE_MODE === true;
    }
};