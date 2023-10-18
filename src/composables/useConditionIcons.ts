const host = new URL("", import.meta.url).origin;
const base = import.meta.env.BASE_URL;

const getIconUrl = (code: number, isDay: boolean = true) => {
    return `${host}${base}/${isDay ? "day" : "night"}/${code}-light.svg`;
};

export const useConditionIcons = () => {
    return {
        getIconUrl,
    };
};
