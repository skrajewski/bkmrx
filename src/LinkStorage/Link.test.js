const { prepareLink } = require('./Link');

test('it should throw error when url is not valid', () => {
    expect(() => prepareLink('htxs:/cffd dsf', [])).toThrowError('Link "htxs:/cffd dsf" is not a valid URL.');
});

test('it should return object with current date when url is valid', () => {
    const mockedDate = new Date('2021-02-10T15:00:00Z');
    const dateSpy = jest.spyOn(global, 'Date').mockImplementation(() => mockedDate);

    expect(prepareLink('https://example.com/')).toStrictEqual({
        url: 'https://example.com/',
        title: '',
        tags: [],
        createdAt: new Date('2021-02-10T15:00:00.000Z')
    });

    dateSpy.mockRestore();
});

test('it should normalize tags by replacing spaces with hyphens', () => {
    const mockedDate = new Date('2021-02-10T15:00:00Z');
    const dateSpy = jest.spyOn(global, 'Date').mockImplementation(() => mockedDate);

    expect(prepareLink('https://example.com/', 'Sample title', ['dev', 'js', 'invalid tag'])).toStrictEqual({
        url: 'https://example.com/',
        title: 'Sample title',
        tags: ['dev', 'js', 'invalid-tag'],
        createdAt: new Date('2021-02-10T15:00:00.000Z')
    });

    dateSpy.mockRestore();
});


test('it should normalize tags by removing special characters', () => {
    const mockedDate = new Date('2021-02-10T15:00:00Z');
    const dateSpy = jest.spyOn(global, 'Date').mockImplementation(() => mockedDate);

    expect(prepareLink('https://example.com/', 'Sample title', ['dev', 'js', 'here#I@am'])).toStrictEqual({
        url: 'https://example.com/',
        title: 'Sample title',
        tags: ['dev', 'js', 'hereIam'],
        createdAt: new Date('2021-02-10T15:00:00.000Z')
    });

    dateSpy.mockRestore();
});