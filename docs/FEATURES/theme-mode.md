# Theme Mode (Light/Dark/System)

## Goal
Provide automatic and user-selectable light/dark themes that respect OS preference, persist choices, and switch smoothly without initial flash.

## Requirements
- Modes: `System` (default on first visit), `Light`, `Dark`.
- Auto-detect `prefers-color-scheme`; when in `System`, react to OS changes in real time.
- Persist user choice in localStorage when available; fallback to `System` when storage is blocked.
- Prevent first-paint flash: apply the resolved theme before React mounts.
- Smooth transitions (≈240ms) on user-initiated theme changes.
- Selector available in desktop header and mobile menu; fully keyboard/screen-reader accessible.

## Dependencies
- Browser APIs: `localStorage` (optional), `matchMedia("(prefers-color-scheme: dark)")`.
- UI: theme palette variables from `src/styles/globals.css`.
- Provider: `ThemeProvider` (`src/theme/ThemeProvider.tsx`).
- Hook: `useTheme` (`src/theme/hooks/useTheme.ts`).

## Data Flow
UI (ThemeSelector) ➜ `useTheme().setMode(mode)` ➜ `ThemeProvider` updates mode/resolved theme, persists preference, applies `data-theme` + `color-scheme` on `document.documentElement` ➜ CSS variables/theme surfaces update ➜ UI re-renders with new theme.

## Components
- `ThemeProvider`: owns mode (`system|light|dark`), listens to OS changes, applies `data-theme` and transition class for smooth swaps, persists preference.
- `ThemeSelector`: presentational control in desktop nav and mobile menu; exposes Auto/Light/Dark with icons, radio semantics, and focus outlines.
- Inline preflight script (`index.html`): resolves stored/system theme before app render to avoid flash.

## Edge Cases
- Storage blocked/unavailable ➜ behave as `System` without errors or persistence.
- System preference changes while in `System` ➜ theme updates immediately (with transition).
- Initial load uses inline script + provider hydration to avoid double transitions.

## Done Checklist
- [x] Theme applies correctly on first paint without flashing incorrect mode.
- [x] User selection persists and overrides OS; `System` follows OS changes live.
- [x] Selector is present on desktop and mobile, with keyboard + ARIA support.
- [x] Visual transitions run on theme changes (not on initial load).
- [x] Docs updated (this feature spec).
