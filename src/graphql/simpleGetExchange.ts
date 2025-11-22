import { makeOperation } from '@urql/core';
import type { Exchange } from '@urql/core';
import { print } from 'graphql';
import { pipe, map } from 'wonka';

/**
 * Simple GET exchange that formats GraphQL queries for WordPress GraphQL
 * with ?graphql parameter (no POST support on 42web.io)
 */
export const simpleGetExchange: Exchange = ({ forward }) => {
  return operations$ => {
    return pipe(
      operations$,
      map(operation => {
        // Only modify query operations, skip mutations
        if (operation.kind !== 'query') {
          return operation;
        }

        const { query, variables } = operation;
        const queryValue = query as unknown;

        // Support both string queries and DocumentNode by printing as needed
        const queryString = typeof queryValue === 'string' ? queryValue : print(query);

        // Build simple GET URL with query parameter
        const url = new URL(operation.context.url, window.location.origin);
        url.searchParams.set('query', queryString);

        if (variables && Object.keys(variables).length > 0) {
          url.searchParams.set('variables', JSON.stringify(variables));
        }

        // Update operation with GET method and new URL
        return makeOperation(operation.kind, operation, {
          ...operation.context,
          url: url.toString(),
          fetchOptions: {
            ...operation.context.fetchOptions,
            method: 'GET',
          },
        });
      }),
      forward
    );
  };
};
