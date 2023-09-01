import * as api from "$lib/api";
import type { DetailedProperty } from "$lib/types";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const ssr = false;

export const load: PageLoad = async ({ fetch, params }) => {
  const { data, status } = await api.get(fetch, `Property/getById?id=${params.id}`);

  if (status !== 200) {
    throw error(404, "Not found");
  }

  return { property: data as DetailedProperty };
};
