import { cacheExchange, createClient, debugExchange, fetchExchange } from "urql";
import { config } from "../config/env";
import { simpleGetExchange } from "./simpleGetExchange";

const endpoint = config.wpGraphQLEndpoint || "/graphql";

export const graphqlClientPublic = createClient({
  url: endpoint,
  exchanges: [debugExchange, cacheExchange, simpleGetExchange, fetchExchange],
  fetchOptions: () => ({
    credentials: "omit",
    headers: {
      "Accept": "application/json",
    },
  }),
});
