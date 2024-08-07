import { defineStore } from "pinia";
import { ref } from "vue";

type Severity = "warning" | "error" | "success";

interface ShowOptions {
  message: string;
  severity?: Severity;
  duration?: number;
}

export const useToast = defineStore("toast", () => {
  const message = ref("");
  const showing = ref(false);
  const severity = ref<Severity>("success");
  const timeout = ref<any | null>(null);

  const toast = (options: ShowOptions) => {
    message.value = options.message;
    showing.value = true;
    severity.value = options.severity ?? "success";

    if (timeout.value !== null) {
      clearTimeout(timeout.value);
    }

    timeout.value = setTimeout(() => {
      showing.value = false;
      message.value = "";
      severity.value = "success";
      timeout.value = null;
    }, options.duration ?? 1500);
  };

  return {
    showing,
    severity,
    message,
    toast,
  };
});
