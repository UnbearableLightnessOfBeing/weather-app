import day1000 from "/day/1000-day.svg";
import day1003 from "/day/1003-day.svg";

const fallbackIcon = day1000;

const dayIcons = [
    {
        code: 1000,
        icon: day1000,
    },
    {
        code: 1003,
        icon: day1003,
    },
];

export const useConditionIcons = () => {
    const getIcon = (isDay: boolean, code: number): string => {
        const icon = dayIcons.find((item) => item.code === code);
        if (icon) {
            return icon.icon;
        } else return fallbackIcon;
    };

    return {
        getIcon,
    };
};
