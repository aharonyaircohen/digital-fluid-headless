# Architecture Overview

## Purpose
- scalable, modular React + TypeScript frontend for a headless WordPress backend via WPGraphQL.
- Priorities: separation of concerns, composability by feature, predictable data flow, and ease of extension.

## Tech Stack
- UI: React 18, Resact Router.
- Language: TypeScript (strict mode).
- Build/Dev: Vite + @vitejs/plugin-react.
- API: Apollo Client over GraphQL (WPGraphQL endpoint).
- State: Apollo cache for remote data; React hooks for local/feature state.
  - Future-friendly for additional global state if required (e.g., Zustand/Redux) but not assumed.

### API Access
- Local dev: React client calls same-origin `/graphql`; Vite proxies this path to the real WPGraphQL endpoint from `VITE_WPGRAPHQL_ENDPOINT` in `.env` (including its required `?graphql` search) to dodge CORS with credentials.
- Prod/build: `VITE_WPGRAPHQL_ENDPOINT` must point to the live WPGraphQL URL (`https://thedigitalreality.net/core/?graphql` today); ensure the host serves that path directly or through its own reverse proxy.

## Folder Structure
- Root:
  - `src/`
    - `main.tsx` — application bootstrap.
    - `App.tsx` — shell layout + route host.
    - `config/` — environment and configuration helpers.
    - `graphql/` — API client and GraphQL operations.
      - `client.ts` — Apollo client setup (link/cache).
      - `queries/` — shared GraphQL queries/mutations.
    - `router/` — routing configuration and guards.
    - `modules/` — feature modules (blog, courses, future features).
      - `<feature>/components/` — presentational components (no data fetching).
      - `<feature>/pages/` — route-level components wiring hooks/services.
    - `ui/` — shared UI primitives and layout pieces.
  - `docs/` — architecture, conventions, features, devlog, Codex prompt.
  - Tooling/config: `package.json`, `tsconfig*.json`, `vite.config.ts`, `.eslintrc.cjs`, `.prettierrc`, `.editorconfig`, `.env.example`.
  - `public/` (optional) — static assets.

## Layers and Responsibilities
- **UI components**: microcomponent architecture, Presentational only; receive data via props; no side effects or data access.
- **Pages**: Route-level composition; connect hooks/services to UI; minimal logic.
- **Hooks**: Encapsulate view/business logic and state; orchestrate services; react-friendly side effects.
- **Services**: Data access and operations; call API helpers/adapters; pure/testable.
- **API**: GraphQL client setup and operations; responsible for backend communication.
- **Domain**: Types, mappers, validation; framework-agnostic; pure TypeScript.
- **Utils**: Generic helpers with no domain or framework coupling.
- **i18n**: Locale + direction management and translation loading. Context/provider sets `lang`/`dir` on `<html>` and persists user preference. Hooks expose locale and translation helpers. Services handle loading translation resources.

## Data Flow
UI ➜ Hooks ➜ Services ➜ API ➜ Backend  
Backend response ➜ API ➜ Services (mapping/validation) ➜ Hooks (state) ➜ UI render

## Component Isolation & Feature Boundaries
- Each feature lives in `src/modules/<feature>/`.
- Avoid cross-feature deep imports; share via `src/ui`, `src/domain` (if added), `src/utils`, or `src/graphql` only when generic.
- Keep GraphQL documents near their feature unless shared widely.
- Use lazy-loaded routes for feature pages when feasible.

## Internationalization (i18n) Layer
- Location: `src/i18n/` with config (`config/types.ts`, `config/i18n.ts`), provider (`providers/LanguageProvider.tsx`), hooks (`hooks/useLocale.ts`, `hooks/useTranslation.ts`), services (`services/translationLoader.ts`), and locale resources (`translations/`).
- Responsibilities:
  - `LanguageProvider` resolves initial locale (localStorage ➜ default), sets `lang`/`dir` on the document element, and persists locale changes.
  - `translationLoader` service centralizes loading of translation dictionaries via dynamic imports with fallback to the default locale.
  - Hooks expose locale/direction (`useLocale`) and translation (`useTranslation`) with fallback and missing-key warnings.
- Default locale: `he` (RTL). Supported locales: `he`, `en`.
- UI copy must come from i18n translations; server-sourced content (e.g., WPGraphQL/REST data) must remain in its original language and must not be translated.
- Enumerations/const labels (e.g., level badges, status names) shown in the UI must map to i18n keys rather than hard-coded strings; use code values only as selectors for translations.

## Philosophy
- Separation of concerns keeps changes targeted and testable.
- Stability via strict typing, predictable data flow, minimal global state.
- Modularity through feature folders and reusable primitives.
- Future scaling supported by clear boundaries, Apollo cache policies, and documented standards.
