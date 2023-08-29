import { redirect, type Actions } from "@sveltejs/kit";
import { invalidateAll } from "$app/navigation";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies, locals }) => {
  throw redirect(302, "/");
};

export const actions: Actions = {
  default: async ({ cookies, locals }) => {
    cookies.delete("session", { path: "/" });
    locals.user = null;
    throw redirect(302, "/");
  },
};
