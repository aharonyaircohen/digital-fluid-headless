Minimal Digital-Fluid Interface — Design System (v2, with Gold Accents)
1) Overview

Deep, layered atmosphere inspired by ocean gradients and digital grids.

Fluid motion cues with restrained animations; nothing flashy.

High-contrast text on dark surfaces for clarity and focus.

Geometric structure with generous spacing; calm but sharp.

Highlights use aqua/violet for actions + information, and gold for meaning accents.

2) Colors
Primary families

Ocean (ocean-900/800/700/600/500) – dark bases, backgrounds, deep panels.

Aqua (aqua-400/300/200) – actions, primary highlights, focus states.

Violet (violet-400/300) – geometric and informational micro-accents.

Neutral-D (neutral-d-50...900) – typography, borders, subtle surfaces.

Gold Warm Accents (NEW)

Used only for meaning-based emphasis and fine highlights:

gold-500 – #E8B46A

gold-400 – #F2C98B

gold-300 – #FFDFAE

Usage:

micro-labels, thin dividers, state markers

geometric icons

minimal highlights in hero/vision/footer

Recommended usage

Backgrounds: bg-ocean-900, bg-ocean-800, ocean gradients

Cards: bg-ocean-800/60 + border-neutral-d-700/60

Actions: bg-aqua-400, text-aqua-200

Info accents: text-violet-400, border-violet-300

Meaning accents: text-gold-300/400, border-gold-300/20, subtle gradient lines

Example combinations

Section card: bg-ocean-800, border neutral-d-700/60, accents aqua-300

Hero vertical line: bg-gradient-to-b from-gold-300/15 to-gold-500/25

Icon accents: text-gold-400

3) Typography

Body & Hebrew: Heebo

Digital English headings: Space Grotesk

Token	Tailwind Classes
H1	text-4xl md:text-5xl font-semibold tracking-tight
H2	text-3xl md:text-4xl font-semibold
SectionTitle	text-2xl font-semibold
Body	text-base leading-relaxed text-neutral-d-200
MicroLabel	text-xs uppercase tracking-wide text-gold-300
4) Layout

Base shell: .app-shell

Header: dark translucent with border-neutral-d-700

Main: .page-container + vertical stack of .section-blocks

Max width: 1120px

Rhythm: 2.5–4rem gaps

5) Sections
Hero

Background: gradient-surface

Vertical split line: gold accent (from-gold-300/15 to-gold-500/25)

Optional micro-label (top-right): text-gold-300

Structure: 1 column mobile, 2 columns desktop

Vision

Cards: bg-ocean-800/60, subtle borders

Icon geometry (triangle/circle/square): gold accent (text-gold-400)

Bullet markers: bg-gold-400/40

SectionTitle remains ocean-neutral

Feature Preview

Code snippet: gold highlight for status tokens

Right-side placeholder card: border-gold-300/15

Footer

Top divider: border-t border-gold-300/20

Version tag: text-gold-300/80

6) Interactions & Animations

Hover glow: aqua tones

Entrance fade: animate-fade-in-up

Hero/large panels: optional animate-fluid-gradient

Do not animate gold accents; they must remain still and subtle.

7) Accessibility

High contrast: light neutrals on ocean backgrounds

Gold accents only for small UI details and headers, not for body text

Focus indicators remain aqua for clarity



must:
- All colors must come from the design-system palette variables (:root): --ocean-*, --aqua-*, --violet-*, --gold-*, --neutral-d-*, --surface-glow-*. No hard-coded color literals in CSS.
- All headings (global and post content h1–h6) use the gold accent (--gold-300), including nested elements.
- every component which inplement styling must have its implementation in its own CSS file (eg: PostDetailPage.css).
- Custom gradients and surfaces must reference the palette variables (and color-mix with them) for backgrounds, glows, and panels.
- all Links, blockquotes, tables, code blocks, images, dividers, and list text content must use palette variables for color, borders, and backgrounds, even in posts.
- App/root backgrounds and section blocks use palette-based gradients (no hex literals).
- palette variables live in :root (globals.css) and must be used in component CSS (e.g., PostDetailPage.css, etc.) with no hex literals.