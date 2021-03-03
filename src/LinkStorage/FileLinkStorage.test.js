const FileLinkStorage = require('./FileLinkStorage');
const { prepareLink } = require('./Link');
const fs = require('fs');
const mock = require('mock-fs');

describe('add new markdown formatted line to db file', () => {
    jest.spyOn(fs, 'appendFile').mockImplementation(() => {});

    afterAll(() => jest.clearAllMocks());

    it('should add entry without tags', async () => {
        const storage = new FileLinkStorage('test.md');

        storage.add(prepareLink('http://test.com', 'Test Page', [], new Date('2021-02-10T15:00:00Z')));
    
        expect(fs.appendFile).toHaveBeenCalledWith('test.md', "- 2021-02-10 15:00 # http://test.com # Test Page\n", expect.anything());
    });

    it('should add entry with tags', async () => {
        const storage = new FileLinkStorage('test.md');

        storage.add(prepareLink('http://test.com', 'Test Page', ['dev', 'js'], new Date('2021-02-10T15:00:00Z')));
        
        expect(fs.appendFile).toHaveBeenCalledWith('test.md', "- 2021-02-10 15:00 # http://test.com # Test Page @dev @js\n", expect.anything());
    });
});

describe('get all entries from file', () => {
    afterEach(() => mock.restore());

    it('should return empty array if there are no entries in db file', () => {

        mock({'test.md': ''});

        const storage = new FileLinkStorage('test.md');

        return storage.getAll().then(data => {
            expect(data).toStrictEqual([]);
        });
    });

    it('should return array with processed links from the db file', () => {
        mock({'test.md': '- 2021-02-10 15:00 # http://test.com # \n'});

        const storage = new FileLinkStorage('test.md');

        return storage.getAll().then(data => {
            expect(data).toStrictEqual([{
                createdAt: new Date('2021-02-10T15:00:00Z'),
                title: '',
                url: 'http://test.com',
                tags: []
            }]);
        });
    });

    it('should return array with processed links from the db file with tags', () => {
        mock({'test.md': '- 2021-02-10 15:00 # http://test.com # @dev @js\n- 2021-02-10 15:15 # http://example.com # @dev @php @learn\n'});

        const storage = new FileLinkStorage('test.md');

        return storage.getAll().then(data => {
            expect(data).toStrictEqual([
                {
                    createdAt: new Date('2021-02-10T15:00:00Z'),
                    url: 'http://test.com',
                    tags: ['dev', 'js'],
                    title: ''
                },
                {
                    createdAt: new Date('2021-02-10T15:15:00Z'),
                    url: 'http://example.com',
                    tags: ['dev', 'php', 'learn'],
                    title: ''
                }
            ])
        });
    });
});
