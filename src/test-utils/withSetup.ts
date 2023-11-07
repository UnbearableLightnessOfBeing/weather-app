import { createApp } from "vue";
import { i18n } from "../configs/i18nConfig";
import type { UseLocaleReturnType } from "../composables/useLocale";

export const withSetup = (composable: Function) => {
    let result: UseLocaleReturnType;
    const app = createApp({
        setup() {
            result = composable() as UseLocaleReturnType;
            return () => {};
        },
    });

    app.use(i18n);
    app.mount(document.createElement("div"));

    //@ts-expect-error
    return { result, app };
};
