const { pipe } = require('./Pipe');

test('it should pass obj through pipe with one middleware', async () => {
    let text = "Simple Text";

    const returnValue = (obj, next) => obj;

    const result = await pipe([returnValue], text);

    expect(result).toBe("Simple Text");        
});

test('it should pass obj through pipe with two middlewares', async () => {
    let text = "Simple Text";

    const toUppercase = (obj, next) => {
        return next(obj.toUpperCase());
    };

    const returnValue = (obj, next) => obj;

    const result = await pipe([toUppercase, returnValue], text);

    expect(result).toBe("SIMPLE TEXT");        
});