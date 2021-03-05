const app = require('./web');
const http = require('http');
const { getDbFilePath } = require('./settings');
const server = http.createServer(app);

module.exports = function serve(host, port) {
    server.listen(port, host, function () {
        const host = server.address().address;
        const port = server.address().port;
    
        console.log("bkmrx serves UI on http://%s:%s", host, port);
        console.log(`Used file: ${getDbFilePath()}`)
    });
};
