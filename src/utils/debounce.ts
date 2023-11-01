export const createDebounce = (fn: Function, ms: number) => {
    let timeout: NodeJS.Timeout;

    return (...args: unknown[]) => {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            fn(...args);
        }, ms);
    };
};
