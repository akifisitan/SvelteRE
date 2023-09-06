import type { ParamMatcher } from "@sveltejs/kit";

export const match: ParamMatcher = (param) => {
  return ["currencies", "types", "statuses"].includes(param);
};
