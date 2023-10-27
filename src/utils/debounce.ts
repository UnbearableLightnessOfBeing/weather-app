export const createDebounce = (fn: Function, ms: number) => {
    let timeout: number = 0;

    return (...args: unknown[]) => {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            fn(...args);
        }, ms);
    };
};
