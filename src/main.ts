import "floating-vue/dist/style.css";
import "./assets/scss/index.scss";
import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import colors from "./assets/colors/colors.json";
import cssVars from "css-vars-ponyfill";
import FloatingVue from "floating-vue";
import FloatingVueConfig from "./configs/floatingVueConfig";
import en from "./assets/localization/en.json";
import ru from "./assets/localization/ru.json";

const locales = {
    en: en,
    ru: ru,
};

const i18n = createI18n({
    legacy: false,
    locale: "en",
    fallbackFormat: "en",
    messages: locales,
});

createApp(App)
    .use(VueQueryPlugin)
    .use(FloatingVue, FloatingVueConfig)
    .use(i18n)
    .mount("#app");

cssVars({
    variables: colors,
});
