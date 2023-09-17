import type { Toast } from "./types";

import { toast as svelteToast } from "svelte-french-toast";

export function prepareToast(toast: Toast) {
  localStorage.setItem("toast", JSON.stringify(toast));
}

export function clearToast() {
  localStorage.removeItem("toast");
}

export function handleStoredToast() {
  try {
    const toast = localStorage.getItem("toast");
    if (!toast) return false;
    localStorage.removeItem("toast");

    const toastData = JSON.parse(toast);
    switch (toastData.type) {
      case "success":
        svelteToast.success(toastData.message);
        break;
      case "error":
        svelteToast.error(toastData.message);
        break;
    }
    return true;
  } catch (e) {
    return false;
  }
}
