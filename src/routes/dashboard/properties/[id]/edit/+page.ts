import { error } from "@sveltejs/kit";
import * as api from "$lib/api";
import type { PageLoad } from "./$types";

export const ssr = false;

export const load: PageLoad = async ({ fetch }) => {
  const [types, statuses, currencies] = await Promise.all([
    api.get(fetch, "PropertyType/list"),
    api.get(fetch, "PropertyStatus/list"),
    api.get(fetch, "Currency/list"),
  ]);

  if (!types.data || !statuses.data || !currencies.data) {
    throw error(404, "Could not download dropdown items");
  }

  return { types: types.data, statuses: statuses.data, currencies: currencies.data };
};
