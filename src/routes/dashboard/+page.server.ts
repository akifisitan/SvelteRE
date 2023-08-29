import { redirect } from "@sveltejs/kit";
import * as api from "$lib/api";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, locals, route }) => {
  if (!locals.user) throw redirect(302, `/login`);

  const response = await api.get(fetch, "Property/getUserShowcaseData", locals.user.token);

  return { propertyList: response.data, currentRoute: route.id };
};
