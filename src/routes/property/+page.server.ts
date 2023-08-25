import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ locals, params }) => {
  if (!locals.user) throw redirect(302, `/login`);
};
