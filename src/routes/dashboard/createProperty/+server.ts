import { redirect, type RequestHandler } from "@sveltejs/kit";
import * as api from "$lib/api";

export const POST: RequestHandler = async ({ fetch, request, locals }) => {
  if (!locals.user) throw redirect(302, "/login");
  const form = await request.formData();
  const response = await api.post(fetch, "Property", locals.user.token, null, form);

  if (response.data) {
    throw redirect(302, "/dashboard");
  }

  return new Response();
};
