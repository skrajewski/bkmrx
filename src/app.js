const express = require('express');
const api = require('./api');
const browser = require('./browser/browser');
const app = express();
const mustacheExpress = require('mustache-express');

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/../views');
app.use(express.static('assets'));

app.use('/browser', browser);
app.use('/', api);

module.exports = app;