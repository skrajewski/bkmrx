const express = require('express');
const api = require('./api');
const browser = require('./browser');
const app = express();
const mustacheExpress = require('mustache-express');

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', `${__dirname}/../../views`);
app.use(express.static('assets'));

app.use('/', browser);
app.use('/api', api);

module.exports = app;