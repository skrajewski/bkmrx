const fetch = require('node-fetch');

const parseTitle = (body) => {
    let match = body.match(/<title.*>([^<]*)<\/title>/);

    if (!match || typeof match[1] !== 'string') {
        throw new Error('Unable to parse the title tag')
    }
        
    return match[1];
};

const removeSpecialCharacters = (title) => title.replace('@', '&commat;').replace('#', '&num;');

const fetchTitle = (url) => fetch(url)
    .then(res => res.text())
    .then(parseTitle)
    .then(removeSpecialCharacters);

module.exports = { fetchTitle };
