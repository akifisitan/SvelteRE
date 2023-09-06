import { writable } from "svelte/store";
interface Message {
  text: string;
  type: "success" | "error";
}

function createToast() {
  const { subscribe, set, update } = writable<Message | null>(null);

  return {
    subscribe,
    message: (message: Message) => set(message),
    reset: () => set(null),
  };
}

export const message = writable<Message | null>(null);
export const toast = createToast();
