const { program } = require('commander');
const manager = require('./LinkManager');
var pjson = require('./../package.json');

program
    .name(pjson.name)
    .version(pjson.version)
    
program
    .command('add <url>')
    .description('add url to database')
    .option('-t, --tags <tag...>', 'specify tags')
    .option('-d, --desc <description>', 'title or description')
    .option('--offline', 'avoid any network connections, e.g. for title retrieving')
    .on('option:offline', function () {
        process.env.OFFLINE_MODE = true;
    })
    .action((url, option) => {
        manager.addLink(url, option.desc, option.tags);
    });

program.command('serve')
    .description('serve API and web UI')
    .option('-p, --port <port>', 'specify port', '3030')
    .option('-h, --host <host>', 'specify host', '127.0.0.1')
    .action((option) => {
        require('./server')(option.host, option.port);
    });
    
program.parse(process.argv);
