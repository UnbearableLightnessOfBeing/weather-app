const host = new URL("", import.meta.url).origin;

const base = import.meta.env.BASE_URL;

const getIconUrl = (code: number) => {
    return `${host}${base}/day/${code}-light.svg`;
};

export const useConditionIcons = () => {
    return {
        getIconUrl,
    };
};
