import type { ShowcaseProperty } from "$lib/types";
import type { PageLoad } from "./$types";
import * as api from "$lib/api";

export const load: PageLoad = async ({ fetch }) => {
  const { data, status } = await api.get(fetch, "Property/getAllShowcaseData", null);

  return {
    propertyList: (data as Array<ShowcaseProperty>) ?? [],
    status,
  };
};
