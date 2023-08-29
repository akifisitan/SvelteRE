import { error } from "@sveltejs/kit";

const base = "http://127.0.0.1:5148";

async function send(
  fetch: Function,
  method: string,
  path: string,
  token?: string | null,
  data?: object | null,
  form?: FormData | null
) {
  const options = { method, headers: {} };

  if (data) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  if (form) {
    options.body = form;
  }

  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${base}/${path}`, options);
    if (response) {
      const text = await response.text();
      return { data: text ? JSON.parse(text) : null, status: response.status };
    }
    return { data: null, status: response.status };
  } catch (e: any) {
    if (e.message === "fetch failed") {
      throw error(503, { message: "Server is offline" });
    }
    throw error(500, { message: e.message });
  }
}

export function get(fetch: Function, path: string, token?: string | null) {
  return send(fetch, "GET", path, token);
}

export function del(fetch: Function, path: string, token?: string | null) {
  return send(fetch, "DELETE", path, token);
}

export function post(
  fetch: Function,
  path: string,
  token?: string | null,
  data?: object | null,
  form?: FormData | null
) {
  return send(fetch, "POST", path, token, data, form);
}

export function put(
  fetch: Function,
  path: string,
  token?: string | null,
  data?: object | null,
  form?: FormData | null
) {
  return send(fetch, "PUT", path, token, data, form);
}
