import colors from "../assets/colors/colors.json";

export const scalesConfiguration = {
    y: {
        display: false,
        beginAtZero: true,
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

export const scalesConfigurationSecond = {
    y: {
        display: false,
        beginAtZero: true,
        grace: "135%",
    },
    x: {
        grid: {
            display: true,
        },
        border: {
            color: colors["basic-light-dull"],
            width: 3,
        },
        ticks: {
            display: false,
        },
    },
};
