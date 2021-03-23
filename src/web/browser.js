const express = require('express');

const router = express.Router();
const format = require('date-fns/format');
const { DB } = require('../storage');

router.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Charset', 'utf-8');
  res.set('Cache-Control', 'no-store');
  next();
});

router.get('/', async (req, res) => {
  let links = await DB.getAll();

  const renderDate = function renderDate() {
    return format(this.createdAt, 'yyyyMMdd');
  };

  const parsedTitle = function parsedTitle() {
    return this.title || '<em>Missing title</em>';
  };

  links = links.map((link) => ({ ...link, date: renderDate, parsedTitle }));

  res.render('browser', { links });
});

module.exports = router;
