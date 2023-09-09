import type { ShowcaseProperty } from "$lib/types";
import type { PageLoad } from "./$types";
import * as api from "$lib/api";
import { error } from "@sveltejs/kit";

const pageSize = 10;

export const load: PageLoad = async ({ fetch, url }) => {
  const [types, statuses, currencies] = await Promise.all([
    api.get(fetch, "PropertyType/list"),
    api.get(fetch, "PropertyStatus/list"),
    api.get(fetch, "Currency/list"),
  ]);

  if (!types.data || !statuses.data || !currencies.data) {
    throw error(500, "Could not download dropdown items");
  }

  const queryParams = url.search.slice(1);
  const completeQueryParams = queryParams.length > 0 ? "&" + queryParams : "";

  const { data, status } = await api.get(
    fetch,
    `Property/getPaginated?pageSize=${pageSize}&${completeQueryParams}`,
    null
  );

  if (!data) {
    throw error(500, "Could not download properties");
  }

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
