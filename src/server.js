const http = require('http');
const app = require('./web');
const { getDbFilePath } = require('./settings');

const server = http.createServer(app);

module.exports = function serve(host, port) {
  server.listen(port, host, () => {
    // const host = server.address().address;
    // const { port } = server.address();

    console.log('bkmrx serves UI on http://%s:%s', host, port);
    console.log(`Used file: ${getDbFilePath()}`);
  });
};
