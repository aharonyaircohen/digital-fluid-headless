# Contributing Guide

## Workflow
1. Start from `dev` branch.
3. Develop and rebase regularly onto `dev`.
5. After review and merge into `dev`, changes flow to `main` via release/merge.

## Steps
1. **init**  
   `git checkout dev && git pull`  
2. **Install and verify**  
   `npm install`  
   Run `npm run lint` and `npm run typecheck` (add tests when present).
3. **Keep updated**  
   `git fetch origin`  
   `git rebase origin/dev`
4. **Submit PR**  
   - Target: `dev`  
   - Title: Conventional Commit style summary.  
   - Include summary, testing notes, screenshots (if UI), risks, and doc updates.
5. **PR checklist**  
   - [ ] Lint/typecheck pass  
   - [ ] Tests added/updated (when available)  
   - [ ] Docs updated (Architecture/Conventions/Feature spec) if behavior changes  
   - [ ] No unresolved comments  

## Documentation Rule
Update relevant docs when adding/modifying features:
- Architecture or Conventions if patterns change.
- Feature specs under `docs/FEATURES/`.
- DevLog entry for notable changes.

## Etiquette
- Keep PRs small and focused.
- Call out breaking changes explicitly.
- Tag reviewers familiar with the area.
