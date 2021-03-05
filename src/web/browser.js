const express = require('express');
const router = express.Router();
const { DB } = require('../storage');
const format = require('date-fns/format');

router.use(function (req, res, next) {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Charset', 'utf-8');
    res.set('Cache-Control', 'no-store')
    next();
});

router.get('/', async function (req, res) {
    let links = await DB.getAll();

    const renderDate = function () {
        return format(this.createdAt, "yyyyMMdd");
    };

    const parsedTitle = function () {
        return this.title || "<em>Missing title</em>";
    };

    links = links.map(link => ({...link, date: renderDate, parsedTitle}));

    res.render('browser', {links});
});

module.exports = router;
