import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import * as api from "$lib/api";

export const load: PageServerLoad = async ({ locals, params, route }) => {
  if (!locals.user) throw redirect(302, `/login`);

  const response = await api.get("Property/getAllByUserId", locals.user.token);

  return { propertyList: response.data, currentRoute: route.id };
};
