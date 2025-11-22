type RawEnv = {
  VITE_WPGRAPHQL_ENDPOINT?: string;
};

const rawEnv = import.meta.env as RawEnv;
const isBrowser = typeof window !== "undefined";

export const config = {
  wpGraphQLEndpoint: rawEnv.VITE_WPGRAPHQL_ENDPOINT ?? "",
} as const;