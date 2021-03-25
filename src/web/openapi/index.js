const openapi = require('@wesleytodd/openapi');
const pjson = require('../../../package.json');

const oapi = openapi('/api/openapi', {
  openapi: '3.0.0',
  info: {
    title: 'bkmrx',
    description: 'This is the _bkmrx_ API specification. API is currently under development and **may** change in the future.',
    version: pjson.version,
  },
});

oapi.component('schemas', 'Link', {
  type: 'object',
  required: ['url'],
  properties: {
    url: {
      type: 'string',
      example: 'http://example.com/',
    },
    title: {
      type: 'string',
      example: 'Stuff you need to know',
    },
    tags: {
      type: 'array',
      items: {
        type: 'string',
      },
      example: ['blog', 'article'],
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      readOnly: true,
    },
  },
});

oapi.component('schemas', 'Error', {
  type: 'object',
  properties: {
    msg: {
      type: 'string',
    },
    param: {
      type: 'string',
    },
    location: {
      type: 'string',
    },
    value: {
      type: 'any',
      description: 'Value that cause validation error',
    },
  },
});

module.exports = oapi;
