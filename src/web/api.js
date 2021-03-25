const express = require('express');
const { checkSchema, validationResult } = require('express-validator');
const { DB } = require('../storage');
const { addLink } = require('../LinkManager');
const oapi = require('./openapi');

const router = express.Router();

router.use(express.json());

router.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Charset', 'utf-8');
  next();
});

router.get('/', (req, res) => {
  res.json({ status: 'OK' });
});

router.get(
  '/links',
  oapi.path({
    summary: 'Get links',
    description: 'Get list of links',
    responses: {
      200: {
        description: 'Successful',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: oapi.component('schemas', 'Link'),
            },
          },
        },
      },
    },
  }),
  async (req, res) => {
    res.json(await DB.getAll());
  },
);

router.post(
  '/links',
  oapi.path({
    summary: 'Add link',
    description: 'Add new link to the database',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: oapi.component('schemas', 'Link'),
        },
      },
    },
    responses: {
      204: {
        description: 'Successful',
      },
      400: {
        description: 'Validation error',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                errors: {
                  type: 'array',
                  items: oapi.component('schemas', 'Error'),
                },
              },
            },
          },
        },
      },
    },
  }),
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
