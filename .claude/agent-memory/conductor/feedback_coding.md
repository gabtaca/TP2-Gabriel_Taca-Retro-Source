---
name: feedback-coding
description: Coding patterns and constraints confirmed through this project
metadata:
  type: feedback
---

**Surgical edits only — do not refactor adjacent code.**
**Why:** User reverted a mobile layout change that broke CRT visibility; scope creep creates regressions.
**How to apply:** Touch only the class/element asked about. Read before writing every time.

---

**BEM naming with SCSS nesting matches existing codebase conventions.**
**Why:** Pre-existing code uses this pattern consistently (`.arcade-body__nav`, `.page-crt`, etc.).
**How to apply:** New component classes must follow `block__element--modifier` pattern.

---

**Use `clamp()` for responsive heights, not media-query-only approaches.**
**Why:** CRT screens at different resolutions (1080p vs 4K) require proportional scaling.
**How to apply:** New height values: `clamp(min, vh%, max)`.

---

**Use `useNavigate()` not `window.location.href` for internal routing.**
**Why:** `window.location.href` causes a full-page reload, hitting the server directly, which causes 404s on SPA routes when the server has no fallback configured.
**How to apply:** Always use React Router's navigate() for internal links.

---

**Arcade events pattern: register-once `useEffect` with stable `useRef` refs.**
**Why:** Confirmed pattern in ProductsPage — prevents stale closures without re-registering on every state change.
**How to apply:** See ProductsPage.jsx for the template (viewRef, selectedIndexRef, filteredRef pattern).

---

**`position: relative` is needed on scroll containers for absolutely-positioned overlays.**
**Why:** `.page-crt` has `overflow-y: auto` — children with `position: absolute` are clipped by the scroll. Solution: wrapper div with `position: relative`, absolutely position the overlay outside the scroll container.
**How to apply:** Use `.page-crt-wrap` (already implemented) for any overlay on the CRT.

---

**Mobile revert rule: if a mobile layout change breaks CRT visibility, revert fully.**
**Why:** User explicitly reverted a "full screen mobile" attempt that made the CRT invisible.
**How to apply:** Be conservative with mobile height/flex changes. Prefer smaller clamp values over flex fill approaches.
