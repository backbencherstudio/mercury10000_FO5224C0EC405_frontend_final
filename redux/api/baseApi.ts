import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { parseCookies } from "nookies";

/** Match lib/Fetch + service layer: NEXT_PUBLIC_API_ENDPOINT + /api, or explicit RTK base. */
function getBaseUrl(): string | undefined {
  const explicit = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");
  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT?.trim();
  if (endpoint) return `${endpoint.replace(/\/+$/, "")}/api`;
  return undefined;
}

/** Same format as UserService / Fetch (JWT guards usually expect Bearer). */
function bearerAuthorization(token: string) {
  return token.startsWith("Bearer ") ? token : `Bearer ${token}`;
}

export const baseApi = createApi({
  reducerPath: "api",

  tagTypes: ["User", "Leads"],

  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
    credentials: "include",
    prepareHeaders: (headers) => {
      const cookies = parseCookies();
      const token = cookies.accessToken;
      if (token) {
        headers.set("Authorization", bearerAuthorization(token));
      }
      return headers;
    },
  }),

  endpoints: () => ({}),
});