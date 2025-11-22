type RawEnv = {
  VITE_SERVER?: string;
  VITE_GQL?: string;
};

const rawEnv = import.meta.env as RawEnv;
const isBrowser = typeof window !== "undefined";

// Use direct endpoint from env; when missing in the browser, you must set both VITE_SERVER and VITE_GQL
const wpGraphQLEndpoint = `${rawEnv.VITE_SERVER ?? ""}${rawEnv.VITE_GQL ?? ""}` || "/api/graphql";

export const config = {
  wpGraphQLEndpoint,
} as const;
