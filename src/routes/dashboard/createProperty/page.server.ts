import { redirect, type Actions, error, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import * as api from "$lib/api";

export const load: PageServerLoad = async ({ fetch, locals }) => {
  if (!locals.user) throw redirect(302, `/login`);

  const [types, statuses, currencies] = await Promise.all([
    api.get(fetch, "PropertyType/list"),
    api.get(fetch, "PropertyStatus/list"),
    api.get(fetch, "Currency/list"),
  ]);

  if (!types.data || !statuses.data || !currencies.data) {
    throw error(500, "Could not download dropdown items");
  }

  return { types: types.data, statuses: statuses.data, currencies: currencies.data };
};

export const actions: Actions = {
  default: async ({ fetch, request, locals }) => {
    if (!locals.user) throw redirect(302, "/login");
    const form = await request.formData();
    const response = await api.post(fetch, "Property", locals.user.token, null, form);

    if (response.data) {
      throw redirect(302, "/dashboard");
    } else {
      return fail(400, { error: "Bad parameters" });
    }
  },
};
