---
name: project-retrosource
description: Retro-Source arcade shop — Vite + React + SCSS, active codebase in src/ only
metadata:
  type: project
---

**Retro-Source** — arcade-themed pixel game shop, school integration project (session 4).

**Critical constraint**: `app/` is the OLD Shopify Hydrogen app — NEVER edit it. All work is in `src/`.

**Stack**: Vite + React, SCSS 7-1 architecture, React Router v6, custom arcade events (`arcadeNavigation`, `arcadeButtonPress`).

**Key design system**:
- Colors: `$game-lines: #b91c1c` (red), `$ctr-text: #1a2e05` (dark green on CRT), `$body-bg: #2e2e2e` (charcoal)
- Fonts: Silkscreen (`$font-secondary`), Jersey25 (`$font-display`)
- CRT screen via `@include crt-screen` mixin; page layout via `.page-crt` inside `.page-crt-wrap`
- Shared arcade hint components: `.arcade-nav-hint`, `.arcade-nav-btn`, `.arcade-action-hint`

**Deployment**: Commits reference Vercel but prod server shows `nginx/1.31.1` — host is unconfirmed. SPA fallback may not be configured.

**Why:** Portfolio project for school; visual polish and mobile behavior are priorities.
**How to apply:** Always run `npm run build` to verify after changes. Never touch `app/`.
