const { isURL } = require('validator');

const sanitizeTag = tag => tag.replace(' ', '-').replace(/[^A-Za-z0-9\-]/g, '');

function prepareLink(url, title = '', tags = [], createdAt = null) {
    if (!isURL(url)) {
        throw new Error(`Link "${url}" is not a valid URL.`);
    }

    return {
        url,
        title,
        tags: tags.map(sanitizeTag),
        createdAt: createdAt || new Date()
    };
}

module.exports = {
    prepareLink,
    sanitizeTag
};
