# WCAG Demo Website — Updated Project Roadmap

## Project Overview

A 30-minute class presentation on **Accessibility and Inclusiveness in Website Design**. The centerpiece is an interactive demo website that recreates the actual **Wikipedia article for "Web Content Accessibility Guidelines"** — but launches in an aggressively broken, inaccessible state. Students flip toggles in a side panel to fix one WCAG standard at a time, watching the page transform from hostile to clean. Fake toggles are mixed in; students must guess which are real vs. made up before a scored reveal.

**Repository:** https://github.com/RPlante28/WCAG_DEMO
**Live site:** https://rplante28.github.io/WCAG_DEMO/

---

## What's Been Built

### ✅ Clean Wikipedia Base Page (`demo.html` + `css/demo.css`; legacy `styles.css` imports `css/demo.css`)
A faithful recreation of the real Wikipedia WCAG article using the Vector 2022 skin:
- Sticky header with Wikipedia logo, search bar, user links
- CSS Grid two-column layout with sticky TOC sidebar on the left
- Full article content: History (with 4 subsections), Versions (WCAG 1.0 + 2.0), complete WCAG 2 Guidelines table with color-coded conformance levels (bronze A, silver AA, gold AAA), Legislation by Country (7 subsections), References (43 entries), External Links
- All internal anchor links working (#History, #Australia, #ref1, etc.)
- External links pointing to real Wikipedia articles and W3C pages
- Proper semantic HTML: `<header>`, `<main>`, `<nav>`, `<footer>`, real headings, `<table>` with `<caption>` and `scope`, labeled forms
- Categories bar, footer with Wikimedia/MediaWiki logos

### ✅ Roadmap (`roadmap_v2.md`; older notes may be in other files)

### ✅ Research Completed
- WCAG 2 standards via W3C and Wikipedia
- Common accessibility settings and features
- IBM "Inclusion by Design" video themes (information architecture, visual contrast, clean layout, designing for everyone)

---

## What Needs to Be Built

### Phase 1 — Demo Layer (toggle panel + broken states) — **in progress / largely implemented**

Take the clean Wikipedia base and layer on:

**Toggle Panel UI** (fixed sidebar, right side) — **done**
- 18 toggles total: 13 real WCAG standards + 5 fakes
- Toggle switch UI with descriptions
- "Reveal Answers" button with scored results modal

**13 Real Toggles:**

| # | Toggle | WCAG | What It Fixes |
|---|--------|------|---------------|
| 1 | Color Contrast | 1.4.3 | Ghost-gray text → proper black text, blue links |
| 2 | Focus Indicators | 2.4.7 | No outlines → visible blue focus rings |
| 3 | Alt Text | 1.1.1 | Empty alt attrs + red "NO ALT TEXT" overlays → proper descriptions |
| 4 | Semantic HTML | 1.3.1 | Styled divs → real headings, landmarks, nav roles |
| 5 | Tab Order | 2.4.3 | Scrambled tabindex values → natural reading order |
| 6 | Skip Navigation | 2.4.1 | No bypass → working "Skip to content" link |
| 7 | Form Labels | 3.3.2 | Placeholder-only inputs → proper `<label>` elements |
| 8 | Error Identification | 3.3.1 | Silent form failure → clear error messages |
| 9 | Video Captions | 1.2.2 | Uncaptioned video → caption indicator |
| 10 | Pause/Stop/Hide | 2.2.2 | Flashing banner, 2 tickers, shaking icons, glowing ad, pulsing timer → all removed |
| 11 | Keyboard Accessible | 2.1.1 | Unreachable div-buttons → proper roles + keyboard access |
| 12 | Language of Page | 3.1.1 | Missing `lang` attr → `lang="en"` with visual badge |
| 13 | Text Spacing | 1.4.12 | Cramped 13px/1.1 justified text → comfortable 14px/1.6 left-aligned |

**5 Fake Toggles:**

| # | Toggle | Why It's Fake |
|---|--------|---------------|
| 14 | Colorblind Simulation Mode | Applies a deuteranopia filter — useful dev tool, not a WCAG requirement |
| 15 | Hover-to-Reveal Alt Text | Hides alt behind hover — screen readers never hover |
| 16 | All Links Open in New Tab | Adds target="_blank" everywhere — an anti-pattern, not a standard |
| 17 | Hidden Text is Always Bad | Removes .sr-only text — actually makes page LESS accessible |
| 18 | All Text Must Be Left-Aligned | Forces everything left — breaks visual hierarchy, no WCAG requirement |

**Broken State Elements to Add:** — **implemented on `demo.html`**
- Cookie consent popup blocking the page (nearly invisible dismiss button)
- Flashing seizure-risk banner (fast color cycling)
- Two scrolling tickers going opposite directions
- Walls of dense justified text with no paragraph spacing (via Text Spacing toggle off)
- Red "NO ALT TEXT" overlays on images
- Countdown timer pressuring form completion
- Glowing/pulsing sidebar ad
- Horizontal scroll container hiding important content
- Shaking warning icons, bouncing arrows
- Sarcastic fine print under the form

**Key Design Principle:** When all 13 real toggles are ON, the page should look like the clean Wikipedia base — a properly designed, accessible, readable page. The toggles don't just "fix issues" — they restore the page to what good design looks like.

---

### Phase 2 — Additional Pages

| Page | Purpose | Status |
|------|---------|--------|
| `demo.html` | Interactive toggle demo (Wikipedia recreation); primary entry for the project | **Base + demo layer** (`css/toggles.css`, `js/toggles.js`) |
| `good-example.html` | A properly accessible site with annotations explaining what's right | Not started |
| `bad-example.html` | An intentionally bad accessibility attempt with callouts | Not started |

*(Optional: for GitHub Pages default document, copy or symlink `demo.html` → `index.html`, or set Pages to serve `demo.html`.)*

---

### Phase 3 — Polish & Testing

- [ ] Test keyboard-only navigation across all pages
- [ ] Test with a screen reader (NVDA on Windows, VoiceOver on Mac)
- [ ] Check contrast ratios with WebAIM Contrast Checker
- [ ] Responsive/mobile check
- [ ] Final review of real vs. fake toggle balance
- [ ] Verify all toggles restore to clean Wikipedia state when ON
- [ ] Enable GitHub Pages (Settings → Pages → main branch, / root)

---

### Phase 4 — Presentation Prep

- [ ] Prepare slide deck with required slides:
  - Meeting days/times for group work
  - Responsibilities assigned to each person
  - AI prompts used (Claude conversations in this project)
- [ ] Rehearse 30-minute walkthrough
- [ ] Plan guided discussion questions for the class
- [ ] Post a relevant article or video link to the course site
  - Suggested: IBM "Inclusion by Design" video or W3C WAI introduction

---

## Suggested Team Responsibilities

*(Fill in names)*

| Task | Assignee |
|------|----------|
| Demo page — broken states + toggle panel HTML | |
| Demo page — toggle JS logic (13 real) | |
| Demo page — toggle JS logic (5 fakes + reveal) | |
| Good example page | |
| Bad example page | |
| CSS / overall visual polish | |
| Screen reader + keyboard testing | |
| Slide deck + presentation structure | |
| Course site article/video posting | |

---

## File Structure

```
WCAG_DEMO/
├── demo.html               ← Interactive demo (Wikipedia recreation); main entry
├── good-example.html       ← Accessible example with annotations
├── bad-example.html        ← Bad accessibility example with callouts
├── styles.css              ← Imports css/demo.css (backward compat)
├── css/
│   ├── demo.css            ← Wikipedia Vector 2022 skin styles
│   └── toggles.css         ← Demo panel, broken/fixed states, modal
├── js/
│   └── toggles.js          ← Toggle logic, reveal, timer, cookie, form
├── roadmap_v2.md           ← This file
└── README.md               ← Project description for GitHub
```

---

## AI Prompts Log

*(Required for the slide deck — log all prompts used)*

- Initial concept planning: brainstormed toggle-based demo with real vs. fake WCAG standards
- WCAG standards research: fetched W3C and Wikipedia pages for accurate criterion numbers
- Toggle brainstorming: generated 4 original fake standards, then expanded to 5
- IBM video integration: added Language of Page and Text Spacing toggles based on "Inclusion by Design" themes
- Wikipedia recreation: built full Vector 2022 skin layout with complete WCAG article content
- Broken state design: designed 10+ visual/interaction violations for the demo layer
- Restoration design: ensured all real toggles restore page to clean, accessible Wikipedia state
- Implementation pass: added `css/toggles.css`, `js/toggles.js`, wired `demo.html` (panel, cookie, distractions, form, video, captions badge, alt overlays); moved base skin to `css/demo.css` with `styles.css` import shim; removed spare `index.html` — use `demo.html` as the main page

---

## Key Resources

- [WCAG 2.2 Full Standard](https://www.w3.org/TR/WCAG22/)
- [WCAG 2 Overview (W3C)](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [WCAG at a Glance](https://www.w3.org/WAI/standards-guidelines/wcag/glance/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [WAVE Accessibility Evaluator](https://wave.webaim.org/)
- [NVDA Screen Reader (free)](https://www.nvaccess.org/)
- [MDN Web Accessibility Docs](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [IBM Inclusion by Design](https://www.youtube.com/watch?v=RFl3DQj9jrQ) — video on inclusive design principles
