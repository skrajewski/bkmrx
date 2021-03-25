const { fromMarkdown, toMarkdown } = require('../../src/LinkStorage/LinkBetweenMarkdown');

describe('Parse Link object to Markdown representation', () => {
  test('it should parse link to valid markdown entry with title and tags', () => {
    const link = {
      url: 'http://example.com',
      title: 'Example Page',
      tags: ['blog', 'personal'],
      createdAt: new Date('2021-01-01T15:00:00Z'),
    };

    expect(toMarkdown(link)).toBe('- 2021-01-01 15:00 # http://example.com # Example Page @blog @personal');
  });

  test('it should parse link to valid markdown entry with title without tags', () => {
    const link = {
      url: 'http://example.com',
      title: 'Example Page',
      tags: [],
      createdAt: new Date('2021-01-01T15:00:00Z'),
    };

    expect(toMarkdown(link)).toBe('- 2021-01-01 15:00 # http://example.com # Example Page');
  });

  test('it should parse link to valid markdown entry with tags without title', () => {
    const link = {
      url: 'http://example.com',
      title: '',
      tags: ['personal', 'data'],
      createdAt: new Date('2021-01-01T15:00:00Z'),
    };

    expect(toMarkdown(link)).toBe('- 2021-01-01 15:00 # http://example.com # @personal @data');
  });

  test('it should parse link to valid markdown entry with no tags and title', () => {
    const link = {
      url: 'http://example.com',
      title: '',
      tags: [],
      createdAt: new Date('2021-01-01T15:00:00Z'),
    };

    expect(toMarkdown(link)).toBe('- 2021-01-01 15:00 # http://example.com #');
  });

  test('it should parse link to valid markdown even if url contains fragment character', () => {
    const link = {
      url: 'http://example.com#fragment',
      title: 'Example Page',
      tags: [],
      createdAt: new Date('2021-01-01T15:00:00Z'),
    };

    expect(toMarkdown(link)).toBe('- 2021-01-01 15:00 # http://example.com#fragment # Example Page');
  });
});

describe('Process markdown entry to Link representaion', () => {
  test('it should process markdown entry to link with title and tags', () => {
    const line = '- 2021-01-01 15:00 # http://example.com # Example Page @blog @personal';

    expect(fromMarkdown(line)).toStrictEqual({
      url: 'http://example.com',
      title: 'Example Page',
      tags: ['blog', 'personal'],
      createdAt: new Date('2021-01-01T15:00:00Z'),
    });
  });

  test('it should process markdown entry to link with title and no tags', () => {
    const line = '- 2021-01-01 15:00 # http://example.com # Example Page';

    expect(fromMarkdown(line)).toStrictEqual({
      url: 'http://example.com',
      title: 'Example Page',
      tags: [],
      createdAt: new Date('2021-01-01T15:00:00Z'),
    });
  });

  test('it should process markdown entry to link with tags and no title', () => {
    const line = '- 2021-01-01 15:00 # http://example.com # @personal @data';

    expect(fromMarkdown(line)).toStrictEqual({
      url: 'http://example.com',
      title: '',
      tags: ['personal', 'data'],
      createdAt: new Date('2021-01-01T15:00:00Z'),
    });
  });

  test('it should process markdown entry to link with no tags and title', () => {
    const line = '- 2021-01-01 15:00 # http://example.com #';

    expect(fromMarkdown(line)).toStrictEqual({
      url: 'http://example.com',
      title: '',
      tags: [],
      createdAt: new Date('2021-01-01T15:00:00Z'),
    });
  });

  test('it should process markdown entry to valid link even if url contains fragment character', () => {
    const line = '- 2021-01-01 15:00 # http://example.com#fragment # See you soon';

    expect(fromMarkdown(line)).toStrictEqual({
      url: 'http://example.com#fragment',
      title: 'See you soon',
      tags: [],
      createdAt: new Date('2021-01-01T15:00:00Z'),
    });
  });
});
