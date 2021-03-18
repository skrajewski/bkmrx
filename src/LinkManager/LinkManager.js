const { fetchTitle } = require('./../TitleFetcher');
const { DB } = require('./../storage');
const { prepareLink } = require('../LinkStorage/Link');
const settings = require('./../settings');

async function addLink(url, title, tags) {
    // support offline mode
    if (!title && !settings.isOfflineMode()) {
        try {
            title = await fetchTitle(url);
        } catch (e) {
            console.error(`Unable to retrieve title for url: ${url}. Processing without description.`);
        }
    }
    
    // todo: duplicate detection

    return DB.add(prepareLink(url, title, tags));
}

module.exports = {
    addLink
};
