import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import * as api from "$lib/api";
import type { UserInfo, LoginResponse } from "$lib/types";

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) throw redirect(303, "/");
};

export const actions: Actions = {
  default: async ({ fetch, cookies, request }) => {
    const data = await request.formData();
    const body = {
      username: data.get("username") as string,
      password: data.get("password") as string,
    };
    const response = await api.post(fetch, "api/Authenticate/login", undefined, body);

    if (response.data) {
      const userInfo: UserInfo = {
        username: data.get("username") as string,
        roles: response.data.roles,
        token: response.data.token,
      };
      cookies.set("session", JSON.stringify(userInfo), {
        path: "/",
        expires: new Date(response.data.expiration),
      });

      throw redirect(303, "/");
    } else {
      return fail(401, { error: "Invalid credentials" });
    }
  },
};
