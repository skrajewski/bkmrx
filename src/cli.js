const { program } = require('commander');
const { DB } = require('./storage');
const { prepareLink } = require('./LinkStorage/Link');

program.version('0.0.1');

program
    .command('add <url>')
    .description('Add given url to database')
    .option('-t, --tags <tag...>', 'specify tags')
    .action((url, option) => {
        DB.add(prepareLink(url, option.tags || []));
    });

program
    .command('all')
    .description('Print all colected urls')
    .action(async function() {
        const data = await DB.getAll();
        console.log(data, 'test');
    });

program.parse(process.argv);
