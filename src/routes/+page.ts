import type { ShowcaseProperty } from "$lib/types";
import type { PageLoad } from "./$types";
import * as api from "$lib/api";
import { error } from "@sveltejs/kit";

export const load: PageLoad = async ({ fetch, url }) => {
  const [types, statuses, currencies] = await Promise.all([
    api.get(fetch, "PropertyType/list"),
    api.get(fetch, "PropertyStatus/list"),
    api.get(fetch, "Currency/list"),
  ]);

  if (!types.data || !statuses.data || !currencies.data) {
    throw error(500, "Could not download dropdown items");
  }

  const { data, status } = await api.get(fetch, `Property/getPaginated${url.search}`, null);

  return {
    propertyList: (data.items as Array<ShowcaseProperty>) ?? [],
    types: types.data,
    statuses: statuses.data,
    currencies: currencies.data,
    currentPage: data.currentPage,
    maxPage: data.numberOfPages as number,
    status,
  };
};
