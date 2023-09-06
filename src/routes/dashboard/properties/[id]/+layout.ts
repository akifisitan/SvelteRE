import * as api from "$lib/api";
import { error } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";
import type { DetailedProperty } from "$lib/types";

export const load: LayoutLoad = async ({ fetch, params }) => {
  const response = await api.get(fetch, `Property/getById?id=${params.id}`);
  switch (response.status) {
    case 200:
      break;
    case 401:
      throw error(401, "Unauthorized");
    case 403:
      throw error(403, "Forbidden");
    case 404:
      throw error(404, "Not found");
    default:
      throw error(response.status, "Unknown error");
  }
  return { property: response.data as DetailedProperty };
};
