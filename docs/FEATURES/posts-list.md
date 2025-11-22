# Posts List (WPGraphQL Demo)

## Goal
- Demonstrate authenticated data fetching from the WordPress GraphQL endpoint by listing post titles.

## Requirements
- Query `https://digital-fluid-headless.42web.io/wp/graphql` using Apollo Client.
- Fetch post ids/slugs/titles/excerpt/date/featured image/primary category; render card grid with title, meta, excerpt, and call-to-action.
- Surface loading, error, and empty states.
- Keep fetched content as-is (no translations on titles/excerpts); local UI copy is localized.
- Use cache-first behavior; no polling or client-side filtering; fetch all pages in 50-item batches using GraphQL pagination.

## Dependencies
- Apollo client configuration (`src/graphql/client.ts`, `config/env.ts` with `VITE_SERVER`).
- GraphQL document `src/graphql/queries/posts.ts`.
- Blog feature types/hooks/services under `src/modules/blog/`.

## Data Flow
- `PostsPage` (UI) → `usePosts` hook → `fetchPosts` service → `apolloClient` → WPGraphQL `posts` query → map `PostDto` to `Post` → hook state → `PostsList` presentational render.
- `PostDetailPage` → `usePost` → `fetchPostBySlug` → `apolloClient` → WPGraphQL `post(id: $slug, idType: SLUG)` → map `PostDetailsDto` to plaintext `PostDetails`.

## Components
- `PostsPage` (route-level render and states).
- `PostsList` (presentational grid wrapper).
- `PostCard` (presentational card).
- `PostDetailPage` (single post view with plaintext content).

## Hooks/Services
- `usePosts` (loads posts, exposes status/error/posts).
- `fetchPosts` in `postsService` (executes GraphQL query and mapping).
- `usePost` (loads a single post by slug, exposes status/error/post).
- `fetchPostBySlug` in `postDetailsService` (fetches and maps a single post).

## State
- Local React state inside `usePosts` for `posts`, `status`, and `error`.
- Local React state inside `usePost` for `post`, `status`, and `error`.
- Apollo cache default policy (`cache-first`) stores query response.

## Validation
- Require `id` for list keys; map nullable fields with safe fallbacks (`title ?? "Untitled"`).

## Edge Cases
- Loading: `blog.posts.loading`.
- Error: show localized message plus error string if present.
- Empty: localized empty message when no nodes returned.

## TODOs
- Add pagination or filtering when API requirements expand.
- Style list with richer cards once design is available.

## Done Criteria
- Titles render from live WPGraphQL endpoint.
- Loading/error/empty states visible.
- Data access isolated to service/hook per architecture.
- Docs and env example reflect endpoint.
