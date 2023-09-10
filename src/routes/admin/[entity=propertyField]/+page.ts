import * as api from "$lib/api";
import type { PropertyField } from "$lib/types";
import type { PageLoad } from "./$types";

const obj = { types: "PropertyType", statuses: "PropertyStatus", currencies: "Currency" };
const map = new Map<string, string>(Object.entries(obj));

export const load: PageLoad = async ({ fetch, url, params }) => {
  const path = map.get(params.entity);
  const response = await api.get(fetch, `${path}/list`);

  return {
    entities: response.data as PropertyField[],
    path,
    entityName: params.entity.toUpperCase(),
  };
};
