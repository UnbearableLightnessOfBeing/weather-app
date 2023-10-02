const config = {
    themes: {
        "custom-tooltip": {
            $extend: "tooltip",
            $resetCss: true,
        },
        "custom-dropdown": {
            $extend: "dropdown",
            $resetCss: true,
            distance: 1,
            placement: "bottom-start",
            autoHide: false,
            triggers: [],
            popperTriggers: [],
            skidding: 0,
        },
    },
};

export default config;
