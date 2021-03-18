const pipe = async (stack, context) => {
    const execute = (context) => {
        let prevIndex = -1;

        const runner = async (innerContext, index) => {
            if (index == prevIndex) {
                throw new Error('next() called more than once');
            }

            prevIndex = index;

            const middleware = stack[index];

            if (middleware) {
                return await middleware(innerContext, (ctx) => runner(ctx, index + 1));
            }
        }

        return runner(context, 0);
    };

    return execute(context);
};

const createPipe = (stack) => (context) => pipe(stack, context);

module.exports = { pipe, createPipe };
