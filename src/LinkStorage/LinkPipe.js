const { isURL } = require('validator');
const TitleFetcher = require('./../TitleFetcher');
const { isOfflineMode } = require('./../settings');

const validateUrl = (obj, next) => {
    if (!("url" in obj)) {
        throw new Error(`Object does not contain url property.`);
    }

    if (!isURL(obj.url)) {
        throw new Error(`Link "${url}" is not a valid URL.`);
    }

    return next(obj);
};

const fetchTitle = async (obj, next) => {
    if (obj.title !== "") {
        return next(obj);
    }

    if (!isOfflineMode()) {
        try {
            obj.title = await TitleFetcher.fetchTitle(obj.url);
        } catch (err) {
            console.error(err);
        }
    }

    return next(obj);
};

module.exports = {
    validateUrl,
    fetchTitle
};
