import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) throw redirect(302, `/login`);
};

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    data.get("stuff");
  },
};
