const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require('path');
const api = require('./api');
const openapi = require('./openapi');
const browser = require('./browser');

const createApp = () => {
  const app = express();

  app.engine('mustache', mustacheExpress());
  app.set('view engine', 'mustache');
  app.set('views', path.normalize(`${__dirname}/../../views`));
  app.use(express.static(path.normalize(`${__dirname}/../../assets`)));
  app.use('/', browser);

  app.use('/api', api);

  // Bind OpenAPI endpoint and documentation browser
  app.use(openapi);
  app.use('/docs', openapi.redoc);

  return app;
};

module.exports = {
  createApp,
};
