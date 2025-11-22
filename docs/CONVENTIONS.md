# Conventions and Standards

## Naming
- Components: `PascalCase` files/exports (e.g., `PostsList.tsx`).
- Hooks: `useX.ts` file and `useX` export.
- Services: `<noun>Service.ts` or `<verbNoun>.ts` with functions like `fetchPosts`.
- Types/Interfaces: `PascalCase`; disambiguate DTOs vs domain (e.g., `PostDto`, `Post`).
- Constants: `SCREAMING_SNAKE_CASE`.
- Tests: mirror source with `.test.ts` / `.test.tsx`.
- Routes/pages: `PascalCase` components inside `pages/`.

## React/TypeScript Practices
- TypeScript strict mode must remain on.
- UI components are presentational: no data fetching or business logic.
- Logic belongs in hooks; data access in services; network in API layer.
- Prefer named exports; default only for app entry points if needed.
- Define props with `type`/`interface`; never `any` unless unavoidable with justification.
- Narrow GraphQL responses at service boundary; avoid non-null assertions.
- Text content must come from `useTranslation` instead of hard-coded strings in components.
- Respect logical properties for layout where applicable (e.g., padding-inline, margin-inline) to keep RTL/LTR compatibility; avoid directional-only CSS unless necessary.

## Style and Lint
- Follow ESLint + Prettier configs; do not add conflicting rules.
- Keep components small; extract hooks/subcomponents when growing.
- No unused variables/exports; treat lint warnings as errors.

## Git and merging
- Commit messages: Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`, `build:`, `ci:`).
- merge onto `dev` regularly.

## Code Review Expectations
- Small, focused PRs.
- Include summary, risks, screenshots (for UI), and testing notes.
- Call out breaking changes.
- Ensure docs are updated.

## Testing
- Test hooks logic, services, domain functions, and critical UI states (loading/error/empty).
- Colocate tests or use `__tests__` mirroring source; name as `*.test.ts[x]`.
- Describe behaviors, not implementation details.

## Extensibility / Debt Avoidance
- No cross-feature coupling; share via `ui`, `domain`, `utils`, or generic GraphQL.
- Add domain types/mappers for new APIs; avoid leaking DTOs into UI.
- Keep GraphQL queries minimal and typed.
- Update documentation when behavior or structure changes.
- Locale persistence: always check and update `localStorage` (`user-locale`) via the i18n provider; do not duplicate persistence logic elsewhere.

## Code Quality Principles
- Single responsibility per module.
- Pure functions preferred; isolate side effects.
- Readability and maintainability over premature optimization.
- Handle errors explicitly; surface user-friendly states.
