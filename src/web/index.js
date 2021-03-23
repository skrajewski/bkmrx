const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require('path');
const api = require('./api');
const browser = require('./browser');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.normalize(`${__dirname}/../../views`));
app.use(express.static(path.normalize(`${__dirname}/../../assets`)));

app.use('/', browser);
app.use('/api', api);

module.exports = app;
