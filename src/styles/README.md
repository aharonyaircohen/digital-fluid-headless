## v0.1.0 – Digital Fluid Headless Starter

**Working spec (MVP)**

### 1. Project overview

**Name (working):** `digital-fluid-headless`
**Tagline:**

> Headless WordPress starter using React, TypeScript, Vite, WPGraphQL and TailwindCSS – with a minimal digital-fluid design system and AI-ready prompts.

**Goal:**
Provide a clean, opinionated starter for building modern headless WordPress frontends with:

* WPGraphQL as the only data source
* React + TypeScript + Vite as the frontend stack
* TailwindCSS with a minimal, fluid, modern design system
* Ready-made blog UI (post list + single post)
* Built-in dark/light mode
* AI prompt specification to let LLMs work on the codebase safely

**Non-goals for v0.1.0:**

* No authentication / login flows
* No dashboard / admin UI
* No course-specific logic (LMS, LearnDash, etc.)
* No e-commerce
* No page builder integration
* No complex layouts beyond blog list + single

---

### 2. Tech stack

* **Frontend:** React + TypeScript + Vite
* **Styling:** TailwindCSS, with a custom “Minimal Digital-Fluid Interface” theme:

  * Ocean / aqua / violet color palette
  * Heebo (Hebrew) + Space Grotesk (Latin)
  * Soft gradients, subtle animations, spacious layout
* **Data layer:** WPGraphQL endpoint (single URL, configurable via environment variable)
* **Icons:** lucide-react
* **State management:** React Query or a minimal custom data layer (TBD – but simple)

---

### 3. Core features in v0.1.0

#### 3.1. Basic project structure

* Vite + React + TypeScript scaffold
* Tailwind configured with:

  * Custom color tokens: `df-primary`, `df-secondary`, `df-accent`, `df-bg`, `df-surface`, `df-border`
  * Typography scale tuned for reading
  * Spacing system for “airy” layout
* Base layout components:

  * `<AppLayout>` – header, main, footer
  * `<PageWrapper>` – max-width container and responsive paddings
  * `<Card>` – generic surface block used in lists

#### 3.2. WPGraphQL integration

* Single configuration file for API endpoint (env var, e.g. `VITE_SERVER`)
* Minimal GraphQL client (fetch/urql/apollo – but abstracted in a small utility)
* Example queries:

  * Get posts list (title, slug, excerpt, date, featured image)
  * Get single post by slug

#### 3.3. Pages (routes)

* `/` – Simple landing page with short description of the starter and link to `/blog`
* `/blog` – Post list:

  * Grid or list of posts
  * Title, date, excerpt, “Read more”
  * Uses digital-fluid cards
* `/blog/:slug` – Single post:

  * Title, date, content
  * Optional featured image
  * Clean typography + reading layout
* `*` – 404 page with basic styling

#### 3.4. Dark / light mode

* Automatic theme detection from system preference (`prefers-color-scheme`)
* Manual toggle (icon button in the header)
* Smooth transition animation between modes
* Mode persisted in localStorage
* Tailwind classes wired to CSS variables so both modes share the same components

---

### 4. Design system – v0.1.0 scope

* Base tokens:

  * Colors for background, surface, text, accent, border, success/error/info
  * Radii (e.g. `rounded-2xl`)
  * Shadows (subtle, soft)
  * Transitions (for hover/active, theme switch)
* Typography:

  * Heading sizes (h1–h4)
  * Body text
  * Caption / meta text (date, tags)
* Components:

  * `<Button>` – primary / ghost
  * `<Tag>` – for categories/tags (even if not fully wired yet)
  * `<Badge>` – for small labels
  * `<Section>` – wrapper for page sections

---

### 5. AI prompt specification (AI-PROMPT-SPEC.md)

v0.1.0 includes a basic AI spec file that defines:

* Short description of the project
* Rules for AI tools:

  * Don’t change architecture
  * Don’t remove Tailwind / design tokens
  * Keep WPGraphQL as the data source
* Structure of a task prompt:

  * Context about the feature
  * Which files to touch
  * Expected UI/UX behavior
* 2–3 example prompts:

  * “Add a new static About page using existing layout”
  * “Extend blog list to show post tags returned from WPGraphQL”

---

### 6. Configuration assumptions

* Environment variables:

  * `VITE_SERVER` – required
* WP side:

  * WPGraphQL installed and active
  * `post` type available with title, slug, content, excerpt, date, featured image
* No auth required for reading posts

---

### 7. Deliverables for v0.1.0

To consider v0.1.0 **done**, we need:

1. **Working repo** with:

   * React + TS + Vite
   * Tailwind with custom theme
   * WPGraphQL client
   * Blog list and single post pages wired to real endpoint
   * Dark/light mode

2. **Docs:**

   * `README.md` – short product-style README:

     * What / Why / Features / Getting Started / Screenshots / Demo link
   * `AI-PROMPT-SPEC.md` – basic AI guidelines & examples

3. **Visuals:**

   * 2 screenshots:

     * Blog list page
     * Single post page

4. **Meta:**

   * Repo topics set
   * Initial release: `v0.1.0`

