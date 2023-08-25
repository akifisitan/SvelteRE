import type { PageServerLoad } from "../../$types";
import * as api from "$lib/api";
import type { PropertyDetails } from "$lib/types";
import { error, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals, params }) => {
  if (!locals.user) throw redirect(302, `/login`);
  const response = await api.get(`Property/getById?id=${params.slug}`, locals.user.token);
  console.log(response);

  if (response.status !== 200) {
    throw error(404, "Not found");
  }

  return { property: response.data as PropertyDetails };
};
