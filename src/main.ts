import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
// import { InlineSvgPlugin } from "vue-inline-svg";

createApp(App).use(VueQueryPlugin).mount("#app");
