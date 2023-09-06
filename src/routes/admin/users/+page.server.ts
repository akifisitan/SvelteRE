import type { ShowcaseProperty } from "$lib/types";
import type { PageServerLoad } from "./$types";
import * as api from "$lib/api";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ fetch, locals }) => {
  const { data, status } = await api.get(fetch, "api/Authenticate/users/list", locals.user?.token);

  console.log(data);

  switch (status) {
    case 200:
      break;
    case 401:
      throw error(401, "Unauthorized");
    case 403:
      throw error(403, "Forbidden");
    case 404:
      throw error(404, "Not found");
    default:
      throw error(status, "Unknown error");
  }

  return {
    users: data ?? [],
  };
};
