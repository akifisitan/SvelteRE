import type { Toast } from "./types";

export function getToast() {
  const toast = localStorage.getItem("toast");
  if (toast) localStorage.removeItem("toast");

  return toast ? JSON.parse(toast) : null;
}

export function setToast(toast: Toast) {
  localStorage.setItem("toast", JSON.stringify(toast));
}
