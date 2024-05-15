import "./index.css";
import router from "./routes";
 import { setup } from "@storybook/vue3";
import { createApp } from "vue";
import App from "./App.vue";

setup((app) => {
  app.use(router).mount("#app");
});

const app = createApp(App);
app.use(router).mount("#app");
