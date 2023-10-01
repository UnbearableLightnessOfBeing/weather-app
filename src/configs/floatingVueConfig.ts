const config = {
    themes: {
        "custom-tooltip": {
            $extend: "tooltip",
            $resetCss: true,
        },
        "custom-dropdown": {
            $extend: "dropdown",
            $resetCss: true,
            distance: -8,
            placement: "bottom-start",
            autoHide: false,
            triggers: [],
            popperTriggers: [],
            skidding: 20,
        },
    },
};

export default config;
