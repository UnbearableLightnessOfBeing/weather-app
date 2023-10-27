import { useAppUrl } from "./useAppUrl";

export const useConditionIcons = () => {
    const { host, base } = useAppUrl();

    const getIconUrl = (code: number, isDay: boolean = true) => {
        return `${host}${base}/${isDay ? "day" : "night"}/${code}-light.svg`;
    };

    return {
        getIconUrl,
    };
};
