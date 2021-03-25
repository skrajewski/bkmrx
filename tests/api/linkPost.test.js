const request = require('supertest');
// eslint-disable-next-line import/no-unresolved
const { writeFile, unlink } = require('fs/promises');
const path = require('path');
const { isOfflineMode, getDbFilePath } = require('../../src/settings');

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
const app = require('../../src/web').createApp();

afterAll(async () => {
  jest.clearAllMocks();
  try {
    await unlink(tempDb);
  } catch (e) {
    // no need to take action
  }
});

describe('test the post endpoint to add link to db', () => {
  it('should respond with no content and link should be added to db without tags', async () => {
    await writeFile(tempDb, '');

    const res = await request(app)
      .post('/api/links')
      .send({
        url: 'https://example.com',
        title: 'Example Page',
        tags: [],
      });

    expect(res.statusCode).toEqual(204);

    const check = await request(app)
      .get('/api/links')
      .send();

    expect(check.body).toEqual([{
      url: 'https://example.com',
      title: 'Example Page',
      tags: [],
      createdAt: expect.any(String),
    }]);
  });

  it('should respond with no content and link to existing db', async () => {
    await writeFile(tempDb, '- 2021-02-12 12:00 # https://example.com # Example site @example @blog\n- 2021-02-12 15:00 # https://test.com # @test\n');

    const res = await request(app)
      .post('/api/links')
      .send({
        url: 'https://example.com',
        title: 'Example Page',
        tags: ['test'],
      });

    expect(res.statusCode).toEqual(204);

    const check = await request(app)
      .get('/api/links')
      .send();

    expect(check.statusCode).toEqual(200);
    expect(check.body).toEqual([
      {
        url: 'https://example.com',
        title: 'Example Page',
        tags: ['test'],
        createdAt: expect.any(String),
      },
      {
        url: 'https://test.com',
        title: '',
        tags: ['test'],
        createdAt: '2021-02-12T15:00:00.000Z',
      },
      {
        url: 'https://example.com',
        title: 'Example site',
        tags: ['example', 'blog'],
        createdAt: '2021-02-12T12:00:00.000Z',
      },
    ]);
  });

  it('should respond with validation errors if url is not provided', async () => {
    await writeFile(tempDb, '');

    const res = await request(app)
      .post('/api/links')
      .send({
        url: '',
        title: '',
        tags: [],
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toStrictEqual({
      errors: [
        {
          location: 'body',
          msg: 'You must provide a valid URL',
          param: 'url',
          value: '',
        },
      ],
    });
  });

  it('should respond with validation errors if specified title is not string', async () => {
    await writeFile(tempDb, '');

    const res = await request(app)
      .post('/api/links')
      .send({
        url: 'https://example.com',
        title: 12345,
        tags: [],
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toStrictEqual({
      errors: [
        {
          location: 'body',
          msg: 'You must provide a valid title',
          param: 'title',
          value: 12345,
        },
      ],
    });
  });

  it('should respond with validation errors if specified tags is not an array', async () => {
    await writeFile(tempDb, '');

    const res = await request(app)
      .post('/api/links')
      .send({
        url: 'https://example.com',
        title: '',
        tags: 'tag',
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toStrictEqual({
      errors: [
        {
          location: 'body',
          msg: 'Tags should be an array of strings',
          param: 'tags',
          value: 'tag',
        },
      ],
    });
  });

  it('should respond with validation errors if tag is not string', async () => {
    await writeFile(tempDb, '');

    const res = await request(app)
      .post('/api/links')
      .send({
        url: 'https://example.com',
        title: '',
        tags: [123],
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toStrictEqual({
      errors: [
        {
          location: 'body',
          msg: 'Tag should be a valid string',
          param: 'tags[0]',
          value: 123,
        },
      ],
    });
  });
});
