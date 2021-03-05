const express = require('express');
const router = express.Router();
const { DB } = require('../storage');

router.use(function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Charset', 'utf-8');
    next();
});

router.get('/', function (req, res) {
    res.json({'status': 'OK'});
});

router.get('/link', async function (req, res) {
    const list = await DB.getAll();

    res.json(list);
});

module.exports = router;