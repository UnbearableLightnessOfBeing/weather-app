const host = new URL("", import.meta.url).origin;
const base = import.meta.env.BASE_URL;

export const useAppUrl = () => {
    return {
        host,
        base,
    };
};
