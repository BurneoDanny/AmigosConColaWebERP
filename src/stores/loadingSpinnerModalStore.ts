import { defineStore } from "pinia";
import { ref } from "vue";

export const useSpinner = defineStore("spinner", () => {
  const open = ref(false);

  const show = () => {
    open.value = true;
  };

  const close = () => {
    open.value = false;
  };

  const wait = async (p: () => Promise<any>) => {
    try {
      show();
      await p();
    } finally {
      close();
    }
  };

  return {
    open,
    show,
    close,
    wait,
  };
});
