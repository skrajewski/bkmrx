const express = require('express');
const { InMemoryLinkStorage } = require('./src/LinkStorage');
const router = express.Router();

const storage = new InMemoryLinkStorage();

router.use(function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Charset', 'utf-8');
    next();
});

router.get('/', function (req, res) {
    res.json({'status': 'OK'});
});

router.get('/store', function (req, res) {
    storage.add(req.query.url);
    res.sendStatus(201);
});

router.get('/list', function (req, res) {
    const list = [...storage.getAll()];

    res.json(list);
});

module.exports = router;