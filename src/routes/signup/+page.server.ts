import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import * as api from "$lib/api";

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) throw redirect(303, "/");
};

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const body = {
      username: data.get("username") as string,
      password: data.get("password") as string,
      email: data.get("email") as string,
    };
    const response = await api.post(fetch, "api/Authenticate/register", undefined, body);

    if (response.data) {
      throw redirect(303, "/login?accountCreated");
    } else {
      return fail(400, { error: "An error occurred" });
    }
  },
};
