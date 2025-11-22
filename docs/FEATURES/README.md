# Features Documentation Guide

Each feature must have its own markdown spec under `docs/FEATURES/`.

## Required Sections
- **Title**: Feature name.
- **Goal**: User/business outcome delivered.
- **Requirements**: Functional and non-functional bullets.
- **Dependencies**: APIs, services, shared UI, domain types, external systems.
- **Data Flow**: Text diagram from UI to backend and back.
- **Components**: Pages and presentational components involved.
- **Hooks/Services**: Custom hooks and service functions.
- **State**: What is stored, where, and why (local state, Apollo cache, etc.).
- **Validation**: Input/business rules.
- **Edge Cases**: Empty/error/loading/permission and other boundary scenarios.
- **TODOs**: Pending tasks with owners if known.
- **Done Criteria**: Checklist gates for completion.

## Authoring Rules
- Be specific and testable; avoid vague statements.
- Link to related tickets or docs when relevant.
- Update the spec when scope changes or implementation diverges.
- Reflect actual data contracts (fields, types, error shapes).
