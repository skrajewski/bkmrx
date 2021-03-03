const app = require('./src/app');
const http = require('http');

const port = process.env.PORT || 3000;

app.set('port', port);

const server = http.createServer(app);

server.listen(port, '0.0.0.0', function () {
    const host = server.address().address;
    const port = server.address().port;

    console.log("App is listening on http://%s:%s", host, port);
});
