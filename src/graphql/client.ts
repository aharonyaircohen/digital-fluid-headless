import { cacheExchange, createClient, debugExchange, fetchExchange } from "urql";
import { config } from "../config/env";

const endpoint = config.wpGraphQLEndpoint || "/graphql";

export const graphqlClientPublic = createClient({
  url: endpoint,
  exchanges: [debugExchange, cacheExchange, fetchExchange],
  fetchOptions: () => ({
    credentials: "omit",
  }),
});

export const graphqlClientAuth = createClient({
  url: endpoint,
  exchanges: [debugExchange, cacheExchange, fetchExchange],
  fetchOptions: () => ({
    credentials: "include",
  }),
});
