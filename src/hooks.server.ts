import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const user = event.cookies.get("session");
  event.locals.user = user ? JSON.parse(user) : null;

  if (event.url.pathname.startsWith("/dashboard")) {
    if (!event.locals.user) {
      throw redirect(303, "/login");
    }
  }

  return resolve(event);
};
