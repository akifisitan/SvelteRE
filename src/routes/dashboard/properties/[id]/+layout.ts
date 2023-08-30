import * as api from "$lib/api";
import { error } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";
import type { DetailedProperty } from "$lib/types";

export const load: LayoutLoad = async ({ fetch, params }) => {
  const response = await api.get(fetch, `Property/getById?id=${params.id}`);

  if (response.status !== 200) {
    throw error(404, "Not found");
  }

  return { property: response.data as DetailedProperty };
};
