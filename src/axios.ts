import axios from "axios";
import type { App } from "vue";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL ?? "http://localhost:5130",
});

export const AxiosPlugin = {
  install: (app: App) => {
    app.config.globalProperties.$apiClient = apiClient;
  },
};

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $axios: typeof apiClient;
  }
}
