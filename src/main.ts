import "./index.css";
import router from "./routes";
import { setup } from "@storybook/vue3";
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { AxiosPlugin } from "./axios";

const pinia = createPinia();

setup((app) => {
  app.use(pinia).use(router).use(VueQueryPlugin).use(AxiosPlugin).mount("#app");
});

const app = createApp(App);

app.use(pinia).use(router).use(VueQueryPlugin).use(AxiosPlugin).mount("#app");
