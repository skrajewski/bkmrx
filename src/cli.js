const { program } = require('commander');
const manager = require('./LinkManager');

program.version('0.0.1')
    
program
    .command('add <url>')
    .description('Add given url to database')
    .option('-t, --tags <tag...>', 'specify tags')
    .option('-d, --desc <description>', 'title or description')
    .option('--offline', 'Avoid any network connections, e.g. for title retrieving')
    .on('option:offline', function () {
        process.env.OFFLINE_MODE = true;
    })
    .action((url, option) => {
        manager.addLink(url, option.desc, option.tags);
    });


program.command('serve')
    .description('Serve API and web UI')
    .action(() => {
        require('./server')();
    });
program
    .command('all')
    .description('Print all colected urls')
    .action(async function() {
        const data = await DB.getAll();
        console.log(data, 'test');
    });
    
program.parse(process.argv);
