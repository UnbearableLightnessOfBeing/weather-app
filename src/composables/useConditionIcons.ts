const getIconUrl = (code: number) => {
    const base = new URL("", import.meta.url).origin;
    return `${base}/day/${code}-light.svg`;
};

export const useConditionIcons = () => {
    return {
        getIconUrl,
    };
};
