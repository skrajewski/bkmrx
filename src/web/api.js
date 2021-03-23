const express = require('express');

const router = express.Router();
const { checkSchema, validationResult } = require('express-validator');
const { DB } = require('../storage');
const { addLink } = require('../LinkManager');

router.use(express.json());

router.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Charset', 'utf-8');
  next();
});

router.get('/', (req, res) => {
  res.json({ status: 'OK' });
});

router.get('/links', async (req, res) => {
  const list = await DB.getAll();

  res.json(list);
});

router.post(
  '/links',
  checkSchema({
    url: {
      in: ['body'],
      isURL: true,
      errorMessage: 'You must provide a valid URL',
    },
    title: {
      optional: {
        options: {
          nullable: true,
        },
      },
      isString: true,
      errorMessage: 'You must provide a valid title',
    },
    tags: {
      in: ['body'],
      optional: {
        options: {
          nullable: true,
        },
      },
      isArray: true,
      errorMessage: 'Tags should be an array of strings',
    },
    'tags.*': {
      in: ['body'],
      isString: true,
      errorMessage: 'Tag should be a valid string',
    },
  }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { title = '', tags = [], url } = req.body;

    await addLink(url, title, tags);

    console.log(`New entry added thourgh API: ${url}`);

    res.status(204);
    res.send();
  },
);

module.exports = router;
