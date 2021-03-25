const http = require('http');
const { createApp } = require('./web');
const { getDbFilePath } = require('./settings');

module.exports = function serve(host, port, options = { api: false }) {
  const server = http.createServer(
    createApp(options),
  );

  server.listen(port, host, () => {
    // const host = server.address().address;
    // const { port } = server.address();

    console.log('bkmrx serves UI on http://%s:%s', host, port);

    if (options.api) {
      console.log('bkmrx serves API on http://%s:%s/api/', host, port);
      console.log('API documentation is available on http://%s:%s/docs', host, port);
    }

    console.log(`Used file: ${getDbFilePath()}`);
  });
};
