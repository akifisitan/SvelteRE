// See https://kit.svelte.dev/docs/types#app

import type { UserInfo } from "$lib/types";

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user: UserInfo | null;
    }
    // interface PageData {}
    // interface Platform {}
  }
}

export {};
