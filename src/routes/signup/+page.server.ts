import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import * as api from "$lib/api";

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) throw redirect(303, "/");
};

function validateEmail(email: string) {
  if (
    !email.match(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
    )
  )
    return { error: "Invalid email address", email: null };
  return { error: null, email: email.trim() };
}

function validateUsername(username: string) {
  if (username.length < 4 || username.length > 12)
    return { error: "Username must be between 4 and 12 characters long", username: null };
  if (!username.match(/^[a-z0-9]+$/g))
    return { error: "Username must only contain lowercase letters and numbers", username: null };
  return { error: null, username: username.trim() };
}

function validatePassword(password: string) {
  if (password.length < 8 || password.length > 12)
    return { error: "Password must be between 8 and 12 characters long", password: null };
  if (!password.match(/[a-z]/g))
    return { error: "Password must contain at least one lowercase letter", password: null };
  if (!password.match(/[A-Z]/g))
    return { error: "Password must contain at least one uppercase letter" };
  if (!password.match(/[0-9]/g))
    return { error: "Password must contain at least one number", password: null };
  if (!password.match(/[.,-;]/g))
    return { error: "Password must contain at least one of . , - or ;" };
  return { error: null, password: password.trim() };
}

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const { email, error: emailError } = validateEmail(data.get("email") as string);
    if (emailError) return fail(400, { emailError });
    const { username, error: usernameError } = validateUsername(data.get("username") as string);
    if (usernameError) return fail(400, { usernameError });
    const { password, error: passwordError } = validatePassword(data.get("password") as string);
    if (passwordError) return fail(400, { passwordError });

    const body = {
      username,
      password,
      email,
    };
    const { status } = await api.post(fetch, "api/Authenticate/register", null, body);

    if (status === 200) throw redirect(303, "/login");

    if (status === 400) return fail(400, { error: "Invalid data" });

    if (status === 409) return fail(409, { error: "Username or email already in use" });
    return fail(500, { error: "An error occurred, please try again later" });
  },
};
