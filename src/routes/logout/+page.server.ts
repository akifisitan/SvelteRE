import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { invalidateAll } from "$app/navigation";

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
