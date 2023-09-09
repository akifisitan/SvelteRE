import type { PageServerLoad } from "./$types";
import * as api from "$lib/api";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ fetch, locals }) => {
  const { data, status } = await api.get(fetch, "User/list", locals.user?.token);

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
