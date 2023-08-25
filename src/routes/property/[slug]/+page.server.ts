import * as api from "$lib/api";
import type { PropertyDetails } from "$lib/types";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, params }) => {
  const response = await api.get(fetch, `Property/getById?id=${params.slug}`);

  if (response.status !== 200) {
    throw error(404, "Not found");
  }

  return { property: response.data as PropertyDetails };
};
