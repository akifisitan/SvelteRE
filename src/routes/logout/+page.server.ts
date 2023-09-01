import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  throw redirect(303, "/");
};

export const actions: Actions = {
  default: async ({ cookies, locals }) => {
    cookies.delete("session", { path: "/" });
    locals.user = null;
    throw redirect(303, "/");
  },
};
