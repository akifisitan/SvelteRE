import { error, json } from "@sveltejs/kit";

const base = "http://localhost:5000";

async function send({ method, path, data, token }) {
  const options = { method, headers: {} };

  if (data) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${base}/${path}`, options);
  if (response) {
    const text = await response.text();
    return { data: text ? JSON.parse(text) : null, status: response.status };
  }
  throw error(`Cannot access the server`);
}

export function get(path, token) {
  return send({ method: "GET", path, token });
}

export function del(path, token) {
  return send({ method: "DELETE", path, token });
}

export function post(path, data, token) {
  return send({ method: "POST", path, data, token });
}

export function put(path, data, token) {
  return send({ method: "PUT", path, data, token });
}
