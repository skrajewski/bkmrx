const express = require('express');
const router = express.Router();
const { DB } = require('../storage');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

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

router.post('/link', jsonParser, async function (req, res) {
    const { addLink } = require('./../LinkManager');
    const {title, tags, url} = req.body;

    await addLink(url, title, tags);

    console.log(`New entry added thourgh API: ${url}`);

    res.status(204);
});


module.exports = router;
