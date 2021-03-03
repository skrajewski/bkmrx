const LinkManager = require('./LinkManager');
const { DB } = require('../storage');
const { fetchTitle } = require('../TitleFetcher');
const { isOfflineMode} = require('./../settings');

jest.mock('../storage');
jest.mock('../TitleFetcher');
jest.mock('../settings');

describe('Add new entry to database', () => {
    let dateSpy;

    beforeEach(() => {
        const mockedDate = new Date('2021-02-10T15:00:00Z');
        dateSpy = jest.spyOn(global, 'Date').mockImplementation(() => mockedDate);
    });

    afterEach(() => {
        dateSpy.mockRestore()
        jest.clearAllMocks();
    });

    it('should add new url to database with title provided by user', async () => {
        isOfflineMode.mockReturnValue(false);
        
        await LinkManager.addLink('http://example.com', 'Example Page', ['example']);

        expect(isOfflineMode).toBeCalledTimes(0);
        expect(DB.add).toBeCalledTimes(1);
        expect(DB.add).toBeCalledWith({
            url: 'http://example.com',
            title: 'Example Page',
            tags: ['example'],
            createdAt: new Date('2021-02-10T15:00:00Z')
        });
    });

    it('should add new url to database with title retrieved from web page', async () => {        
        fetchTitle.mockReturnValue(Promise.resolve('Title from webpage'));
        isOfflineMode.mockReturnValue(false);

        await LinkManager.addLink('http://example.com', '', ['example']);

        expect(isOfflineMode).toBeCalledTimes(1);
        expect(fetchTitle).toBeCalledTimes(1);
        expect(fetchTitle).toBeCalledWith('http://example.com');

        expect(DB.add).toBeCalledTimes(1);
        expect(DB.add).toBeCalledWith({
            url: 'http://example.com',
            title: 'Title from webpage',
            tags: ['example'],
            createdAt: new Date('2021-02-10T15:00:00Z')
        });
    });

    it('should add new url to database without retriving title due to offline mode', async () => {
        isOfflineMode.mockReturnValue(true);

        await LinkManager.addLink('http://example.com', '', ['example']);
        
        expect(isOfflineMode).toBeCalledTimes(1);
        expect(fetchTitle).toBeCalledTimes(0);

        expect(DB.add).toBeCalledTimes(1);
        expect(DB.add).toBeCalledWith({
            url: 'http://example.com',
            title: '',
            tags: ['example'],
            createdAt: new Date('2021-02-10T15:00:00Z')
        });
    });
});
