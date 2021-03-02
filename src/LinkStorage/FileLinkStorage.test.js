const FileLinkStorage = require('./FileLinkStorage');
const { prepareLink } = require('./Link');
const fs = require('fs');


jest.mock('fs');

describe('add new markdown formatted line to db file', () => {
    it('should add entry without tags', () => {
        const storage = new FileLinkStorage('test.md');

        storage.add(prepareLink('http://test.com', [], new Date('2021-02-10T15:00:00Z')));
    
        expect(fs.appendFile).toHaveBeenCalledWith('test.md', "- 2021-02-10 15:00 # http://test.com # ", expect.anything());
    });

    it('should add entry with tags', () => {
        const storage = new FileLinkStorage('test.md');

        storage.add(prepareLink('http://test.com', ['dev', 'js'], new Date('2021-02-10T15:00:00Z')));
        
        expect(fs.appendFile).toHaveBeenCalledWith('test.md', "- 2021-02-10 15:00 # http://test.com # @dev @js", expect.anything());
    });
});

describe('get all entries from file', () => {
    it('should return empty array if there are no entries in db file', () => {

        let mockedData = "- 2021-03-01 12:22 # https://czasgentlemanow.pl/2021/02/robic-mniej/ # ";
        fs.readFile = jest.fn().mockImplementation((file, mode, cb) => cb(null,  mockedData));

        const storage = new FileLinkStorage('test.md');

        storage.getAll().then(data => {
            expect(data).toBe([]);
        });
    });
});
