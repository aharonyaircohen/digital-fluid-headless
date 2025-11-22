# Project List Page

## Goal
Provide a page where users can browse a list of projects with key metadata, sort/filter them, and navigate to details.

## Requirements
- Display project title, status, owner, updated date.
- Sorting by updated date (desc default) and title.
- Filtering by status and owner.
- Pagination or lazy load (page size 20).
- Link to project detail page on row click.
- Loading and error states visible and accessible.
- Empty state with guidance.
- Works on mobile and desktop.

## Dependencies
- API: `GET projects` GraphQL query (fields: `id`, `slug`, `title`, `status`, `ownerName`, `updatedAt`).
- Services: `fetchProjects` service calling GraphQL client.
- Hooks: `useProjects` for fetching, `useProjectFilters` for local filter state.
- Shared UI: table/list component, pagination controls, dropdown/select components.

## Data Flow
UI (ProjectListPage) ➜ `useProjects` hook ➜ `fetchProjects` service ➜ GraphQL client ➜ WPGraphQL backend  
Response ➜ service maps DTO ➜ hook stores state ➜ UI renders list

## Components
- `ProjectListPage` (page)
- `ProjectTable` (presentational)
- `ProjectFilters` (presentational)
- `EmptyState`, `ErrorState`, `LoadingState` (shared UI)

## Hooks / Services
- `useProjects(params)` — orchestrates fetch, pagination, sorting, filtering.
- `useProjectFilters()` — manages filter state.
- `fetchProjects(params)` — service; returns typed data and errors.

## Wireframe-Level Description
- Header with title and actions bar.
- Filters row: status dropdown, owner dropdown, sort select.
- List/table: rows with title (link), status pill, owner, updated date.
- Footer with pagination controls.

## Validation Rules
- Status filter must be one of allowed statuses.
- Sort keys limited to `updatedAt` or `title`; direction `asc|desc`.
- Page size positive integer; max 100.
- Handle missing optional fields gracefully (fallback text).

## Edge Cases
- Empty data set ➜ show empty state with "Create new project" CTA.
- Network error ➜ error state with retry action.
- Partial data (missing owner/status) ➜ display placeholders.
- Slow network ➜ keep spinner/skeleton visible.
- Pagination beyond bounds ➜ clamp to last page.
- Unauthorized ➜ show access error and do not retry automatically.

## Done Checklist
- [ ] GraphQL query implemented and typed.
- [ ] Service maps DTO to domain types with null safety.
- [ ] Hook covers loading, error, empty, and success states.
- [ ] UI renders list, filters, sorting, pagination; responsive layout.
- [ ] Accessibility checked (focus order, labels, keyboard).
- [ ] Tests for hook logic and service mapping.
- [ ] Docs updated (feature spec, changelog/devlog).
- [ ] PR reviewed and merged to staging.
