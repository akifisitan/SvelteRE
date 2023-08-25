import type { ShowcaseProperty } from "$lib/types";
import type { PageServerLoad } from "./$types";
import * as api from "$lib/api";

export const load: PageServerLoad = async ({ locals }) => {
  const response = await api.get("Property/getAll", locals.user?.token);

  return { propertyList: (response.data as Array<ShowcaseProperty>) ?? [] };
};
