import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import * as api from "$lib/api";
import type { UserInfo } from "$lib/types";

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) throw redirect(303, "/");
};

export const actions: Actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData();
    const body = {
      username: data.get("username") as string,
      password: data.get("password") as string,
    };
    const response = await api.post(fetch, "api/Authenticate/login", null, body);
    if (response.status === 200) {
      const userInfo: UserInfo = {
        username: data.get("username") as string,
        roles: response.data.roles,
        token: response.data.token,
      };
      cookies.set("session", JSON.stringify(userInfo), {
        path: "/",
        httpOnly: true,
        expires: new Date(response.data.expiration),
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });

      throw redirect(303, "/");
    }
    if (response.status === 401) {
      return fail(401, { error: "Invalid credentials" });
    }
    return fail(500, { error: "An error occurred, please try again later" });
  },
};
