# DevLog

Use this template for each entry:

- **Date**: YYYY-MM-DD
- **Summary**: Short description of the change.
- **Files Modified**: List of key files/paths.
- **Reasoning**: Why this change was made.
- **Future Steps**: Next actions or follow-ups.

---

### Entry 2024-04-04
- **Summary**: Added initial architecture, conventions, features guidance, and contributing docs for the React + WPGraphQL starter.
- **Files Modified**: `docs/ARCHITECTURE.md`, `docs/CONVENTIONS.md`, `docs/FEATURES/README.md`, `docs/FEATURES/example-feature.md`, `docs/DEVLOG.md`, `docs/CODEX_PROMPT.md`, `CONTRIBUTING.md`
- **Reasoning**: Establish project standards and onboarding references before feature development.
- **Future Steps**: Extend testing strategy once a test runner/framework is added; keep devlog updated with subsequent changes.

### Entry 2025-11-22
- **Summary**: Added dual-language (he/en) support with LTR/RTL direction handling and navigation language selector, plus completed translations.
- **Files Modified**: `src/App.tsx`, `src/ui/layout/app-shell/AppHeader.tsx`, `src/ui/layout/app-shell/DesktopNav.tsx`, `src/ui/layout/app-shell/MobileMenu.tsx`, `src/ui/layout/app-shell/LanguageSelector.tsx`, `src/i18n/translations/en.json`, `src/i18n/translations/he.json`, `src/modules/blog/pages/PostDetailPage.tsx`, `src/modules/courses/pages/CourseDetailPage.tsx`, `docs/FEATURES/language-toggle.md`, `docs/DEVLOG.md`
- **Reasoning**: Deliver full RTL/LTR i18n coverage with a user-facing language dropdown and complete copy for both locales.
- **Future Steps**: Add tests for locale persistence and selector behavior; consider auto `dir` handling for mixed-language content blocks.

### Entry 2025-02-07
- **Summary**: Routed dev GraphQL calls to same-origin `/api/graphql` and rewired the Vite proxy to hit the remote `/?graphql` endpoint, avoiding credentialed CORS failures; clarified env usage.
- **Files Modified**: `src/config/env.ts`, `.env.example`, `docs/ARCHITECTURE.md`, `docs/DEVLOG.md`, `vite.config.ts`
- **Reasoning**: The WPGraphQL endpoint only works at `/?graphql` and returns `Access-Control-Allow-Origin: *`, so a same-origin proxy is required for credentialed requests during local dev.
- **Future Steps**: Reuse the `/api/graphql` proxy pattern for any additional endpoints; ensure production hosting fronts the same path or adds its own reverse proxy.
