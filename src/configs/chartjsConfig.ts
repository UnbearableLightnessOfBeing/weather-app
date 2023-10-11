import colors from "../assets/colors/colors.json";

export const scalesConfiguration = {
    y: {
        display: false,
    },
    x: {
        grid: {
            display: false,
        },
        border: {
            color: colors["basic-light-dull"],
        },
        ticks: {
            color: colors["basic-light-faded"],
            font: {
                size: 12,
                weight: "500",
            },
        },
    },
};
