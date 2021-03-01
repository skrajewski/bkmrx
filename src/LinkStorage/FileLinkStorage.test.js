const FileLinkStorage = require('./FileLinkStorage');
const { prepareLink } = require('./Link');
const fs = require('fs');

jest.mock('fs');

test('it should add new markdown line to db file', () => {
    const storage = new FileLinkStorage('test.md');

    storage.add(prepareLink('http://test.com', ['dev', 'js'], new Date('2021-02-10T15:00:00Z')));

    expect(fs.appendFile).toHaveBeenCalledWith('test.md', "- 2021-02-10 15:00 # http://test.com # @dev @js", expect.anything());
});

