# Digital Fluid Headless Frontend

Modern React + TypeScript frontend for a headless WordPress backend (WPGraphQL). The app emphasizes modular features, predictable data flow, and a documented design system inspired by ocean gradients with gold accents.

## Quick Start
- Prerequisites: Node.js >= 20.
- Install deps: `npm install`.
- Environment: copy `.env.example` to `.env` and set:
  - `VITE_SERVER` to your WP host (e.g., `https://your-site.com`)
  - `VITE_GQL` to the GraphQL path (default `/wp/?graphql`)
- Dev server: `npm run dev` (Vite proxies `/graphql` to `${VITE_SERVER}${VITE_GQL}` for local CORS-free calls).
- Build: `npm run build` and preview with `npm run preview`.
- Quality: `npm run lint` and `npm run typecheck`.

## Architecture
- Tech: React 18, TypeScript (strict), Vite, React Router, URQL GraphQL client (WPGraphQL), Tailwind for design tokens.
- Data flow: UI ➜ Hooks ➜ Services ➜ API ➜ Backend; responses return through the same layers with mapping/validation.
- Folders (`src/`):
  - `main.tsx`, `App.tsx` – app bootstrap and shell routing host.
  - `config/` – environment/config helpers.
  - `graphql/` – URQL client and shared operations (`client.ts`, `queries/`).
  - `router/` – route definitions/guards.
  - `modules/` – feature modules (e.g., blog, courses): `components/` (presentational) and `pages/` (route-level wiring).
  - `ui/` – shared UI primitives/layouts.
  - `i18n/` – locale config, provider, hooks, services, translations.
  - `domain/`, `utils/` – pure types/helpers when needed.

## Conventions
- Separation of concerns: components are presentational; logic in hooks; data access in services; network in API layer.
- Naming: components `PascalCase`, hooks `useX`, services `<noun>Service` or `<verbNoun>`, DTO vs domain types differentiated (e.g., `PostDto`, `Post`).
- Exports: prefer named; avoid `any`; keep TypeScript strict.
- GraphQL: keep queries minimal and typed; narrow responses at service boundaries.
- i18n: default locale `he` (RTL); supported `he`, `en`. `LanguageProvider` sets `lang`/`dir` on `<html>` and persists `user-locale`. UI copy must use `useTranslation`; server content stays as-is. Use translation keys for enums/labels instead of hard-coded strings.
- Styling: respect logical properties for RTL/LTR (e.g., padding-inline). Keep components small; extract hooks/subcomponents as they grow. Treat lint warnings as errors.
- Testing: co-located `*.test.ts[x]` for hooks/services/domain and critical UI states (loading/error/empty). Describe behaviors, not implementation details.

## Design System (Digital-Fluid, Ocean + Gold)
- Palette: use only CSS variables defined in `:root` (`--ocean-*`, `--aqua-*`, `--violet-*`, `--gold-*`, `--neutral-d-*`, `--surface-glow-*`). No hex literals.
- Headings: all h1–h6 (global and post content) use gold accent (`--gold-300`).
- Backgrounds/surfaces: palette-based gradients for app/root and sections; custom gradients/glows must reference palette variables (or `color-mix` with them).
- Components: each styled component keeps its own CSS file (e.g., `PostDetailPage.css`). Links, blockquotes, tables, code blocks, images, dividers, and list text must also use palette variables for colors/borders/backgrounds.
- Layout direction: base shell `.app-shell`, `max-width: 1120px`, generous 2.5–4rem rhythm, dark translucent header with `border-neutral-d-700`.
- Typography: Space Grotesk for English headings; Heebo for body/Hebrew. Tokens: H1 `text-4xl md:text-5xl`, H2 `text-3xl md:text-4xl`, SectionTitle `text-2xl`, Body `text-base leading-relaxed text-neutral-d-200`, MicroLabel `text-xs uppercase text-gold-300`.
- Motion: subtle entrance fades and aqua hover glows; gold accents stay static.

## WordPress / GraphQL
- Backend: WPGraphQL endpoint provided by `VITE_SERVER` + `VITE_GQL`.
- Local dev: React client calls same-origin `/graphql`; Vite proxies to the configured WP host to avoid CORS (includes credentials as needed).
- Production: `VITE_SERVER` must point to the live WPGraphQL URL (e.g., `https://digital-fluid-headless.42web.io/wp/?graphql`); ensure the host serves that path directly or via reverse proxy.

## Contribution & Workflow
- Commit messages follow Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`, `build:`, `ci:`).
- Keep PRs small; include summary, risks, screenshots (for UI), and testing notes. Call out breaking changes and update docs.
- Merge to `dev` regularly.

## License
MIT
