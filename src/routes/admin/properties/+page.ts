import type { ShowcaseProperty } from "$lib/types";
import type { PageLoad } from "./$types";
import * as api from "$lib/api";
import { error } from "@sveltejs/kit";

export const load: PageLoad = async ({ fetch, url }) => {
  const { data, status } = await api.get(fetch, `Property/getPaginated?pageSize=100`, null);

  if (!data) {
    throw error(500, "Could not download properties");
  }

  return {
    propertyList: (data.items as Array<ShowcaseProperty>) ?? [],
    maxPage: data.numberOfPages as number,
  };
};
