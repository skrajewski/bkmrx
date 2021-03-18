const request = require('supertest');
const { isOfflineMode, getDbFilePath } = require('../../src/settings');
const { writeFile, unlink} = require('fs/promises');
const path = require('path');
const tempDb = path.join(__dirname, 'test.md');

jest.mock('./../../src/settings');
getDbFilePath.mockReturnValue(tempDb);
isOfflineMode.mockReturnValue(true);


/**
 * DB path, which should be actually mocked, it's needed in the moment
 * of require app and cannot be mocked afterwards.
 * 
 * It looks like a design problem, feedback would be appreciated.
 */
const app = require('../../src/web');

afterAll(async () => {
    jest.clearAllMocks();
    await unlink(tempDb);
});

describe('test the get endpoint to retrieve list of links', () => {
    it('should respond with empty list if there is no links in db', async () => {
        await writeFile(tempDb, '');

        const res = await request(app)
            .get('/api/link')
            .send(); 

        expect(res.statusCode).toEqual(200);
        expect(res.body).toStrictEqual([]);
    });

    it('should respond with links from db', async () => {
        await writeFile(tempDb, '- 2021-02-12 12:00 # https://example.com # Example site @example @blog\n- 2021-02-12 15:00 # https://test.com # @test');
    
        const res = await request(app)
            .get('/api/link')
            .send();
    
        expect(res.statusCode).toEqual(200);
        expect(res.body).toStrictEqual([
            {
                url: 'https://test.com',
                title: '',
                tags: ['test'],
                createdAt: '2021-02-12T15:00:00.000Z'
            },
            {
                url: 'https://example.com',
                title: 'Example site',
                tags: ['example', 'blog'],
                createdAt: '2021-02-12T12:00:00.000Z'
            }
        ]);
    });
})
