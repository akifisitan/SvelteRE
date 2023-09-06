import * as api from "$lib/api";
import type { PageLoad } from "./$types";

const obj = { types: "PropertyType", statuses: "PropertyStatus", currencies: "Currency" };
const map = new Map<string, string>(Object.entries(obj));

export const load: PageLoad = async ({ fetch, url, params }) => {
  const path = map.get(params.entity);
  const response = await api.get(fetch, `${path}/list`);

  return { entities: response.data, path, entity: params.entity };
};
