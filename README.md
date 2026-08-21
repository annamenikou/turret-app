# Turret Training — Field Reference App

> **Simple things done well, save lives.**

A mobile-first web application that puts pre-hospital emergency protocols in the pockets of first responders. Built as a field reference tool for [Turret Training Ltd](https://turretmedtraining.com), a UK-based security and pre-hospital trauma training company.

The app covers the **C-ABCDE** emergency assessment framework, **D13** course resources, and company information — designed to load fast, work offline, and stay readable under pressure.


## Why this exists

When someone is injured on scene, a responder needs the right protocol in seconds, not a spinning loader on a bad signal. This app is built around three non-negotiables:

- **Offline-first** — clinical protocols must be available with no connection.
- **Fast and legible** — large touch targets, high contrast, no clutter.
- **Simple** — vanilla HTML and CSS, no JavaScript framework, nothing to break in the field.

## Features

- **C-ABCDE emergency guides** — seven guide pages covering the full assessment sequence, each with a distinct accent colour and consistent layout.
- **Colour-coded navigation spine** — a persistent `C · A · B · C · D · E` bar on every page, highlighting the current step so responders always know where they are in the sequence.
- **D13 course resources** — a landing page for course materials and references.
- **About / company info** — accreditations, contact details, and a keep-in-touch bar.
- **Mobile-first design** — capped at a 480px reading width, optimised for one-handed use on a phone.

## The C-ABCDE framework

The app is organised around the standard pre-hospital assessment sequence. Each letter has its own page and accent colour:

| Step | Page | Focus | Accent |
|------|------|-------|--------|
| **C** | `catastrophic.html` | Catastrophic bleeding | Red |
| **A** | `airway.html` | Airway | Amber |
| **B** | `breathing.html` | Breathing | Blue |
| **C** | `circulation.html` | Circulation | Crimson |
| **D** | `disability.html` | Disability | Purple |
| **E** | `exposure.html` | Exposure | Green |

The two "C" entries are resolved by **position** in the spine, not by letter value, so highlighting is always unambiguous.


## Roadmap

- [ ] Add clinical protocol content (triage flowcharts, injury-category protocols) sourced from certified course materials — currently placeholder entries in `content.json`.
- [ ] Replace the placeholder SVG emblem on the homepage with the real logo asset (one-line swap is already documented in `index.html`).
- [ ] Integrate accreditation logos (RCSEd, OSPAs, IOHT) and med-bag product info into the About / course pages.
- [ ] Retrieve and add the eight blog post pages (URLs preserved in the asset manifest).
- [ ] Wire up the service worker and manifest for full PWA / installable behaviour.

---

## ⚠️ Medical disclaimer

This app is a **field reference aid for trained responders**, built from Turret Training course materials. It is **not** a substitute for certified training, clinical judgement, or professional medical direction. Protocols should only be applied by individuals qualified to do so. Nothing here constitutes medical advice to the general public.

---

## License & ownership

Content and branding © Turret Training Ltd. All rights reserved unless stated otherwise.
