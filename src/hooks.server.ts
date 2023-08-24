import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const user = event.cookies.get("session");
  event.locals.user = user ? JSON.parse(user) : null;
  console.log(`Logged in user as user: ${event.locals.user?.username ?? "none"}`);

  return resolve(event);
};
