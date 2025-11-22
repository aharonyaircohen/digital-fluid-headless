# Courses List (WPGraphQL)

## Goal
- Render a responsive grid of courses on `/courses`, powered by WPGraphQL (course CPT + Course Fields ACF group).

## Requirements
- Data source: WPGraphQL `courses` query with fields (`id`, `slug`, `title`, `featuredImage`, `courseFields { shortDescription, price, durationMinutes, level, isFree }`).
- Fetch all courses (paginate in 50-item batches using `pageInfo`).
- Presentational only: cards are clickable to `/courses/:slug`.
- States: loading skeletons, error banner (with retry), empty state message.
- Styling: Minimal Digital-Fluid design (ocean/aqua/violet palette, rounded-2xl, subtle border/shadow, hover scale/outline).

## Dependencies
- Apollo client (`src/graphql/client.ts`), query document (`src/graphql/queries/courses.ts`).
- Courses service/hook (`src/modules/courses/services/coursesService.ts`, `src/modules/courses/hooks/useCourses.ts`).
- Presentational components under `src/modules/courses/components/`.
- Route wiring in `src/router/index.tsx` and nav in `src/App.tsx`.

## Data Flow
- `CoursesPage` → `useCourses` hook → `fetchCourses` service → `apolloClient` → WPGraphQL → map DTO→domain → hook state → `CoursesGrid`/`CourseCard`.

## Components
- `CoursesPage` (state orchestration, error/empty/skeleton handling).
- `CoursesGrid` (responsive grid).
- `CourseCard` (course presentation).
- `CourseSkeletonCard` (loading skeleton UI).

## Hooks/Services
- `useCourses` — fetches courses, exposes `courses`, `status`, `error`, `retry`.
- `fetchCourses` — executes paginated query, maps GraphQL DTO to domain model.

## State
- Local React state within `useCourses` for data/status/error.
- Apollo cache `cache-first` per page batch; aggregated client-side.

## Validation
- Required fields: `id` used as key; `title` fallback to "Untitled course".
- Level normalized to `beginner | intermediate | advanced | unspecified`.
- Image alt fallback to title.

## Edge Cases
- Loading: skeleton cards.
- Error: banner with retry.
- Empty: centered message.

## TODOs
- Add filters/sorting toolbar (level, price, duration).
- Add course detail route and data reuse via Apollo cache.
- Refine price currency from server config.

## Done Criteria
- `/courses` route renders live courses via WPGraphQL.
- Hover/focus interactions align with design system.
- Loading/error/empty handled gracefully.
