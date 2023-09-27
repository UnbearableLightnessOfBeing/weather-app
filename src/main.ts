import { createApp } from "vue";
import "./assets/scss/main.scss";
import App from "./App.vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import colors from "./assets/colors/colors.json";
import cssVars from "css-vars-ponyfill";

createApp(App).use(VueQueryPlugin).mount("#app");

cssVars({
    variables: colors,
});
