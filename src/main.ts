import "floating-vue/dist/style.css";
import "./assets/scss/index.scss";
import { createApp } from "vue";
import App from "./App.vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import colors from "./assets/colors/colors.json";
import cssVars from "css-vars-ponyfill";
import FloatingVue from "floating-vue";
import FloatingVueConfig from "./configs/floatingVueConfig";

createApp(App)
    .use(VueQueryPlugin)
    .use(FloatingVue, FloatingVueConfig)
    .mount("#app");

cssVars({
    variables: colors,
});
