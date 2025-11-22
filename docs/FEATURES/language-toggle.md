# Language Toggle & i18n

## Goal
- Allow users to switch between Hebrew (RTL) and English (LTR) UI copy while persisting their preference and keeping document language/direction accurate.

## Requirements
- Dropdown selector available in the desktop header and mobile menu for switching locales.
- Supported locales: `he` (default, RTL) and `en` (LTR); switching updates `lang` and `dir` on `<html>`.
- All UI copy sourced from `src/i18n/translations/*.json` with no empty values; missing keys fall back to the default locale with a warning.
- Locale preference is stored in `localStorage` under `user-locale`.

## Dependencies
- `LanguageProvider`, `useLocale`, `useTranslation` from `src/i18n`.
- `translationLoader` service (dynamic imports from `src/i18n/translations`).
- Shell components: `AppHeader`, `DesktopNav`, `MobileMenu`, `LanguageSelector`.
- Browser `localStorage` for persistence; React Router for navigation context.

## Data Flow
- UI (`LanguageSelector` in header/menu) ➜ `useLocale.setLocale` ➜ `LanguageProvider` updates state ➜ writes `lang`/`dir` on document + persists `user-locale` ➜ components rerender ➜ `useTranslation` loads dictionaries via `translationLoader` ➜ UI renders translated copy.

## Components
- `LanguageSelector` (`src/ui/layout/app-shell/LanguageSelector.tsx`): presentational select with compact/menu variants; optional label visibility for menu embedding.
- `DesktopNav` and `MobileMenu`: host the selector and surface translated section labels.
- Existing navigation elements (links, auth actions) consume `useTranslation` for labels.

## Hooks/Services
- `useLocale`: exposes `{ locale, direction, setLocale }`; guards unsupported locales.
- `useTranslation`: loads locale + default dictionaries, provides `t(key, vars?)` with interpolation and missing-key warnings.
- `translationLoader`: dynamic import per locale with fallback to default on failure.

## State
- `locale` in `LanguageProvider` (React state) with persistence to `localStorage`.
- Translation dictionaries cached in component state within `useTranslation`.
- UI state: selector value reflects `locale`; document `lang`/`dir` kept in sync.

## Validation
- `setLocale` ignores values outside `SUPPORTED_LOCALES`.
- Missing translation key surfaces `MISSING KEY` placeholder and console warning; default locale is used as fallback.
- Document `dir` derives from locale config to keep layout direction consistent.

## Edge Cases
- Translation file missing or import failure: falls back to default locale dictionary.
- Server-rendered content (WP data) remains in its original language; UI chrome still follows selected locale and direction.
- Mobile menu uses logical inset/transform to respect RTL/LTR when sliding in.

## TODOs
- Add unit tests for `LanguageSelector` and `LanguageProvider` initialization/persistence.
- Consider `dir="auto"` on dynamic content blocks if mixed-language posts become common.
- Add CI checks for missing/empty translation values.

## Done Criteria
- Language selector visible and functional on desktop header and mobile menu.
- Switching updates UI copy, document `lang`/`dir`, and persists across reloads.
- En/He translation files contain values for all referenced keys (no blanks).
- Navigation labels and loaders reflect the chosen locale without layout regressions.
