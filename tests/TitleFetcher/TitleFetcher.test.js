const fetch = require('node-fetch');

const { Response } = jest.requireActual('node-fetch');
const { fetchTitle } = require('../../src/TitleFetcher/TitleFetcher');

jest.mock('node-fetch');

afterEach(() => {
  jest.clearAllMocks();
});

test('it should retrieve title from HTML page', async () => {
  fetch.mockReturnValue(Promise.resolve(new Response('<head><title>Awesome page – Hosted somewhere in the galaxy</title></head><body>Example</body>')));

  const title = await fetchTitle('http://example.com');

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith('http://example.com');
  expect(title).toBe('Awesome page – Hosted somewhere in the galaxy');
});

test('it should remove `at` symbols from title to prevent parsing them as tags', async () => {
  fetch.mockReturnValue(Promise.resolve(new Response('<head><title>Contact us: test@email.com</title></head>>')));

  const title = await fetchTitle('http://example.com');

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith('http://example.com');
  expect(title).toBe('Contact us: test&commat;email.com');
});

test('it should remove `#` symbols from title to prevent parsing erros', async () => {
  fetch.mockReturnValue(Promise.resolve(new Response('<head><title>About Us # Awesome Blog</title></head>>')));

  const title = await fetchTitle('http://example.com');

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith('http://example.com');
  expect(title).toBe('About Us &num; Awesome Blog');
});

test('it should return title even if title tag contains extra attributes', async () => {
  fetch.mockReturnValue(Promise.resolve(new Response('<head><title data-lang="en">This is my page</title></head>>')));

  const title = await fetchTitle('http://example.com');

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith('http://example.com');
  expect(title).toBe('This is my page');
});

test('it should throw error if fetcher is unable to retrieve title', () => {
  fetch.mockReturnValue(Promise.reject(new Error('Dummy error')));

  return expect(fetchTitle('http://plecom')).rejects.toThrowError('Dummy error');
});

test('it should throw error if fetcher html contains no title tag', async () => {
  fetch.mockReturnValue(Promise.resolve(new Response('<head><head><body><h1>Hello World</h1></body>')));

  await expect(fetchTitle('http://example.com')).rejects.toThrowError('Unable to parse the title tag');

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith('http://example.com');
});
