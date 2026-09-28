---
id: SPEC-tales-by-xero
companions:
  - ../../planning-artifacts/prds/prd-websiteDraft-2026-09-28/prd.md
  - ../../planning-artifacts/prds/prd-websiteDraft-2026-09-28/addendum.md
  - ../../planning-artifacts/ux-designs/ux-websiteDraft-2026-09-28/DESIGN.md
  - ../../planning-artifacts/ux-designs/ux-websiteDraft-2026-09-28/EXPERIENCE.md
  - ../../planning-artifacts/architecture/architecture-websiteDraft-2026-09-28/ARCHITECTURE-SPINE.md
sources: []
---

> **Canonical contract.** This SPEC and the files in `companions:` are the complete, preservation-validated contract for what to build, test, and validate.

# Tales by Xero Public Portfolio Website

## Why

Tales by Xero needs a public, high-quality discovery space for its Daggerheart-compatible adventures, campaign material, and physical-play resources. Marketplace listings alone cannot communicate the creator's playtested practice, creative intent, or the practical fit of a work for a session. The site turns DriveThruRPG and organic-search arrivals into confident, informed discovery while remaining a portfolio rather than a second shop.

## Capabilities

- **CAP-1: Saffron Myth Theatre public stage**
  - **intent:** Visitors can navigate a responsive, English-language Tales by Xero portfolio that presents every work as a deliberate, playable scene.
  - **success:** Home, Works, product detail, About, and Ko-fi destinations are reachable by keyboard and mobile navigation; product information and accessible hierarchy remain understandable without hover, animation, or JavaScript.

- **CAP-2: Intent-led session discovery**
  - **intent:** A visitor can choose an appropriate kind of next session through at most three discovery routes instead of first understanding the catalog.
  - **success:** Home presents `Run something tonight`, `Build a campaign around it`, and `Bring something to the table` only when each has a qualifying published work; the One-Shot route exposes its Vibe Selection, and the campaign and table routes lead to their configured works.

- **CAP-3: Curated published works catalog**
  - **intent:** A visitor can browse and open only real, released Tales by Xero works from a clear product-oriented collection.
  - **success:** Every public gallery entry has image, type, title, and premise in the prescribed order; each opens a detail page; drafts and incomplete works are absent from every public discovery surface.

- **CAP-4: Decision-ready product detail**
  - **intent:** A game master can decide whether a work fits their table, understand its creative intent, and continue to its DriveThruRPG listing.
  - **success:** Every published work route shows compatibility, type, title, hook, verified facts, scene image, spoiler-safe moment, table use, Author's Note, exact DriveThruRPG CTA, and one curated Next Work; Karrhold accurately states that it is included with Abythera.

- **CAP-5: Creator trust and optional updates**
  - **intent:** An interested visitor can understand the creator's real-table practice and voluntarily reach the low-pressure Ko-fi update/support destination.
  - **success:** About presents the concise practice-led creator context, and Ko-fi is identifiable as external without pop-ups, forced signups, purchase pressure, or repeated support prompts.

- **CAP-6: Privacy-preserving discovery measurement**
  - **intent:** The creator can evaluate discovery and external handoffs without profiling visitors.
  - **success:** The approved analytics adapter reports only aggregate page, referrer category, discovery-route, One-Shot Vibe Selection, and DriveThruRPG CTA events according to the architecture event contract; the chosen provider passes the documented privacy acceptance criteria before launch.

- **CAP-7: Reliable static publishing workflow**
  - **intent:** The creator can add or change a work without duplicating metadata or manually reconciling Home, Works, details, images, and recommendations.
  - **success:** A schema-valid work entry and versioned assets produce all applicable static surfaces; invalid published data or internal references fail the build; Git-backed Vercel previews precede production deployment from `main`.

## Constraints

- v1 is an Astro 7.3.5 static site using TypeScript 6.0.3, native CSS Custom Properties, local schema-validated content, self-hosted fonts, and repository-versioned product assets.
- The Architecture Spine is binding: no React, Tailwind, Lenis, Vanta, database, CMS, authentication, server-rendered route, shop, or commerce integration in v1.
- Content, navigation, CTAs, and essential product information work without client JavaScript; enhancements are page-local TypeScript only.
- All public product and marketing copy is English. Existing German play materials may appear only as contextualized evidence.
- The site follows Saffron Myth Theatre, WCAG-AA text contrast, keyboard operation, visible focus, 44 by 44 CSS-pixel compact targets, specified responsive widths, and `prefers-reduced-motion` behavior.
- Only published works with complete required metadata and a valid DriveThruRPG URL enter public discovery. DriveThruRPG, Ko-fi, and similar external destinations open in the same tab.
- Analytics may not use advertising profiles, retargeting, persistent identifiers, raw referrer URLs, or unnecessary personal tracking.

## Non-goals

- Internal checkout, cart, payment, subscription, account, purchase history, or any other shop behavior.
- Generic marketplace layouts, pressure selling, pop-ups, countdowns, fake social proof, or fabricated metrics.
- A general Pen-and-Paper onboarding course, mandatory horror/dark-fantasy branding, unpublished-work promotion, VTT tooling, or personalized experiences.
- Smooth-scroll manipulation, perpetual particle effects, auto-rotating carousels, infinite marquees, or animation-dependent discovery.

## Success Signal

- A Daggerheart game master can arrive from search or DriveThruRPG, identify a suitable work from its first relevant screen, understand its practical fit on the detail page, and deliberately continue to DriveThruRPG or a meaningful Next Work.
- The creator can inspect privacy-preserving aggregate discovery and outbound-click signals, while the site remains fast, accessible, static, and visibly unlike a generic AI-generated storefront.

## Open Questions

- Which cookieless analytics provider and configuration satisfy the architecture acceptance criteria and the PRD measurement requirements?
- Which published works have final images, approved `The moment` hooks, Facts Strips, Author's Notes, and final English Vibe microcopy at launch?
- Should the initial Works catalog use filters or only grouped sections, and what are the final Next Work mappings for every launch work?
