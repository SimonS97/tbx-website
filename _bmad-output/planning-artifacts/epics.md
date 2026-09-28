---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
  - step-03-create-stories
  - step-04-final-validation
inputDocuments:
  - prds/prd-websiteDraft-2026-09-28/prd.md
  - prds/prd-websiteDraft-2026-09-28/addendum.md
  - ux-designs/ux-websiteDraft-2026-09-28/DESIGN.md
  - ux-designs/ux-websiteDraft-2026-09-28/EXPERIENCE.md
  - architecture/architecture-websiteDraft-2026-09-28/ARCHITECTURE-SPINE.md
  - ../../specs/spec-tales-by-xero/SPEC.md
---

# websiteDraft - Epic Breakdown

## Overview

This document will decompose the approved Tales by Xero requirements into implementable stories. This first section is the confirmed requirements inventory; epic and story design begins only after user confirmation.

## Requirements Inventory

### Functional Requirements

- FR-1: Render all public navigation, marketing, and product copy in English while retaining a content model that can later support localization.
- FR-2: Provide globally reachable Works, About, and Ko-fi destinations with responsive, active-state-aware navigation.
- FR-3: Apply Saffron Myth Theatre consistently: Night Mineral stage, selective Saffron and Coral, product-specific images, and explicit anti-pattern exclusions.
- FR-4: Present meaningful brand and discovery content with an immediate next action in the first desktop viewport and first mobile viewport.
- FR-5: Offer no more than three asymmetric, readable Discovery Routes: Run something tonight, Build a campaign around it, and Bring something to the table.
- FR-6: Provide an accessible One-Shot Vibe Selection with published one-shots, visible hooks, equivalent mouse/touch/keyboard use, and recoverable browser-back state.
- FR-7: Feature Ephemera after the Discovery Routes as standalone-playable and as the second official Abythera mission.
- FR-8: Show a concrete, non-fabricated table-tested proof statement or readable evidence artifact.
- FR-9: Expose only fully published works on every public discovery surface.
- FR-10: Provide a launch Works catalog with detail routes for Abythera, Karrhold, Ephemera, Weeping Rift, Amber Tide, Thorns of Blossomtide, and the Daggerheart Item Bundle when each is complete.
- FR-11: Make product gallery entries open detail pages, preserve image/type/title/premise order, and support a programmatically exposed no-reload filter only if adopted.
- FR-12: Supply each Published Work with the required title, type, compatibility, premise, scene image, external URL, and approved hook.
- FR-13: Put a variable, verified Facts Strip directly with the product hook and omit unknown values rather than guessing.
- FR-14: Present spoiler-safe scene depth and concrete table use without a railroaded or overlong product synopsis.
- FR-15: Present a concise, product-specific Author's Note before the external CTA.
- FR-16: Provide an accurate, explicit DriveThruRPG CTA only when the destination is valid, opening in the same browser tab.
- FR-17: Give Karrhold an indexable detail route with a prominent, accurate Included with Abythera notice and no-duplicate-purchase explanation.
- FR-18: Give each detail page exactly one curated Next Work and a secondary route to Works.
- FR-19: Provide a concise About page describing Xero's play practice and publication process without a long biography.
- FR-20: Provide a clearly external, low-pressure Ko-fi update/support route without coercive support mechanics.
- FR-21: Measure aggregate entry-source categories and product-detail views without profile construction.
- FR-22: Measure DriveThruRPG CTA activations, Discovery Route activations, and One-Shot Vibe selections only after active visitor action.

### NonFunctional Requirements

- NFR-1: Use semantic landmarks, a visible skip link, exactly one `h1` per page, and logical heading order.
- NFR-2: Meet WCAG AA text contrast; keep reading text on opaque or reliably dark fields.
- NFR-3: Support keyboard operation, clear `:focus-visible`, and compact touch targets of at least 44 by 44 CSS pixels.
- NFR-4: Give informative images contextual alt text; hide decorative textures and repeated maker marks from assistive technology.
- NFR-5: Never make meaning depend only on color, hover, motion, or image content.
- NFR-6: Test responsive behavior at 375, 768, 1024, and 1440 CSS pixels; mobile preserves direct product-first reading order and navigation collapses before wrapping.
- NFR-7: Respect `prefers-reduced-motion`; nonessential motion stops or renders its final state, and no information is hidden by motion.
- NFR-8: Reserve media aspect ratios, use tonal placeholders, lazy-load below-fold images, and eager-load only an LCP hero image when applicable.
- NFR-9: Avoid scroll hijacking, perpetual particles, auto-rotation, infinite marquees, animation on every card, and interaction-critical hover, drag, pinning, or scroll effects.
- NFR-10: Collect only aggregate analytics events; prohibit advertising profiles, retargeting, persistent identifiers, raw referrer URLs, and unnecessary personal tracking.
- NFR-11: External destinations use same-tab navigation and visibly or accessibly identify the destination.
- NFR-12: Every change passes lint and a production build; build validation rejects invalid published work data, internal references, and Home configuration references.
- NFR-13: Before launch, run automated accessibility checks plus manual keyboard and reduced-motion checks on Home, Works, and one product detail page.
- NFR-14: Deploy only through Git-connected Vercel previews and `main` production deployment; no direct local production deploy.

### Additional Requirements

- Build with Astro 7.3.5, TypeScript 6.0.3, Node.js >=22.13.0, npm and committed `package-lock.json`.
- Use static generation and progressive enhancement only. Do not add React, Tailwind, Lenis, Vanta, a database, CMS, auth, server-rendered routes, shop behavior, or commerce integrations in v1.
- Model every work as one schema-validated `src/content/works/<slug>.md` entry. All catalog, route, detail, Vibe, and Next Work content resolves from that collection.
- Implement the full normative work schema: canonical slug/status/type/compatibility/premise/hook/facts/images/external URL/theMoment/tableUse/authorsNote/nextWork/discovery/includedWith/campaignRelation/SEO fields and their validation rules.
- Store work-owned source images under `src/assets/works/<slug>/` and self-host fonts. Do not add external image CDNs or font providers.
- Implement `src/data/home.ts` as the only Home-specific configuration with the required One-Shot, campaign, table, featured Ephemera, and table-tested-proof data contracts.
- Represent One-Shot Vibe Selection open state as `/#one-shot-vibes`, including History API, `popstate`, `hashchange`, and a JavaScript-free static fallback.
- Use native CSS Custom Properties with primitive, semantic, and component token layers; component styles consume tokens rather than raw visual values.
- Use CSS for normal feedback and reveal behavior. Add GSAP only after a prototype proves a named, nonessential sequence requires it; do not initialize client motion under reduced motion.
- Centralize provider-neutral analytics in `lib/analytics.ts` with the exact `AnalyticsEvent` union and `track(event)` contract; components never call a provider SDK directly.
- Before enabling analytics, verify the provider's cookie, identifier, IP/user-agent, retention, auto-collection, advertising, and retargeting behavior against the Architecture Spine acceptance criteria.
- Add Playwright and axe-backed quality coverage for the required page journeys and viewport checks.

### UX Design Requirements

- UX-DR1: Implement the supplied Saffron Myth Theatre token system: mineral-blue dominant fields, selective Saffron primary-action/selection/type markers, scarce Coral danger accent, Chalk/Mist Blue reading colors, sharp structural corners, and a rare maker seal.
- UX-DR2: Implement editorial display serif and humanist sans typography roles, selective labels, readable body text, and a final font selection with German support, clear italics, and tabular numerals where needed.
- UX-DR3: Implement quiet desktop navigation with maker mark, Works, About, Ko-fi and a Saffron active rule; replace it with a plainly labelled, focus-visible mobile menu before links wrap.
- UX-DR4: Implement asymmetric desktop stage compositions with stable reading edges and a single-column mobile order of type/compatibility, title, hook and facts, image, moment, table use, Author's Note, CTA, and Next Work.
- UX-DR5: Implement the Discovery Routes as a layered stage or fan, not an equal card grid or carousel; labels and targets render before any optional hover/focus emphasis.
- UX-DR6: Implement product spotlight and gallery tile components: spotlight has type/title/premise/hook/image/CTA; gallery always orders image, type, title, short premise and uses linkable editorial tiles rather than rounded generic cards.
- UX-DR7: Implement product detail anatomy, including a variable Facts Strip, spoiler-safe lore hook, practical table-use content, optional evidence/detail blocks, Author's Note, DriveThruRPG CTA, and Next Work.
- UX-DR8: Implement media loading behavior with reserved aspect ratios, tonal placeholders, below-fold lazy loading, and product-specific art rather than ambient wallpaper.
- UX-DR9: Implement accessible interaction states for gallery hover/focus, touch equivalents, external CTAs, Vibe Selection, navigation, loading, empty catalog, and unavailable external URL conditions.
- UX-DR10: Implement global reduced-motion behavior and allow only hierarchy-, narrative-, or feedback-motivated opacity/transform reveals; no decorative perpetual movement.

### FR Coverage Map

FR-1: Epic 1 - English public foundation
FR-2: Epic 1 - Global navigation
FR-3: Epic 1 - Saffron Myth Theatre system
FR-4: Epic 3 - Immediate homepage discovery
FR-5: Epic 3 - Three-route discovery model
FR-6: Epic 3 - One-Shot Vibe Selection
FR-7: Epic 3 - Featured Ephemera
FR-8: Epic 3 - Table-tested proof
FR-9: Epic 2 - Published Works gate
FR-10: Epic 2 - Launch catalog and routes
FR-11: Epic 2 - Product-oriented gallery
FR-12: Epic 2 - Product-detail minimum data
FR-13: Epic 2 - Hook-first Facts Strip
FR-14: Epic 2 - Spoiler-safe product depth
FR-15: Epic 2 - Product-specific Author's Note
FR-16: Epic 2 - Accurate same-tab DriveThruRPG handoff
FR-17: Epic 2 - Karrhold and Abythera relationship
FR-18: Epic 2 - Curated Next Work
FR-19: Epic 1 - Concise About page
FR-20: Epic 1 - Low-pressure Ko-fi route
FR-21: Epic 4 - Aggregate discovery measurement
FR-22: Epic 4 - Outbound and route measurement

## Epic List

### Epic 1: Enter a Credible Tales by Xero Stage

Visitors can reach a fast, accessible, English-language Tales by Xero site, recognize its authored Saffron Myth Theatre identity, navigate core destinations, understand the creator's practice, and voluntarily visit Ko-fi.

**FRs covered:** FR-1, FR-2, FR-3, FR-19, FR-20

**Implementation notes:** Establish the Astro static project, native CSS token system, self-hosted assets, responsive navigation, semantic accessibility floor, About and same-tab external-link convention. This epic provides the usable public foundation for later catalog and discovery work.

### Epic 2: Explore Published Works with Confidence

Visitors can browse only released works, open decision-ready product pages, understand practical table fit and creator intent, follow an accurate DriveThruRPG handoff, and continue to one relevant next work.

**FRs covered:** FR-9, FR-10, FR-11, FR-12, FR-13, FR-14, FR-15, FR-16, FR-17, FR-18

**Implementation notes:** Implement the normative `works` schema, build-gated Published Work queries, Home-independent catalog and detail routes, work-owned assets, Facts Strip, Karrhold/Abythera relationship, and Next Work validation. First ship a representative minimum catalog of Abythera, one published One-Shot, and the Daggerheart Item Bundle with complete detail data; then complete Karrhold, Ephemera, Weeping Rift, Amber Tide, and Thorns of Blossomtide through the same readiness contract. Each launch work completes its schema-valid data, assets, and public-readiness check before it can appear publicly. Provide an accessible unknown-work Not Found experience with a return to Works. Epic 3 consumes only this curated, published catalog and does not use placeholders.

### Epic 3: Find the Next Session from the Homepage

Visitors arriving through search or a shared link can immediately choose a session need, explore one-shot mood options, see credible table-tested proof, and find the featured Ephemera path without first decoding the catalog.

**FRs covered:** FR-4, FR-5, FR-6, FR-7, FR-8

**Implementation notes:** Implement `src/data/home.ts`, the three-route asymmetric stage, progressive `/#one-shot-vibes` state and fallback, Featured Ephemera, and table-tested proof. Render routes and Vibe options only from valid, published Home configuration data; two ready One-Shots are a valid curated state and no empty route or visual gap appears. Test Vibe URL, reload, browser-back, `popstate`/`hashchange`, and JavaScript-free fallback behavior. This epic consumes the released catalog from Epic 2 and preserves JavaScript-independent discovery.

### Epic 4: Validate and Measure a Respectful Public Launch

The creator can verify that the public portfolio is accessible and responsive, deploy it safely through Vercel, and assess discovery and DriveThruRPG handoffs without visitor profiling.

**FRs covered:** FR-21, FR-22

**Implementation notes:** Add lint/build gates, Playwright and axe coverage, required viewport and manual motion/keyboard checks, Git-connected Vercel previews and production deployment, then run an analytics-provider eligibility check against the Architecture Spine event and privacy acceptance contract. Include a production-readiness check for external links, metadata and robots behavior, and disabled Analytics in local or Preview environments. If no provider passes, Analytics remains disabled and the privacy-respecting public launch proceeds.

## Epic 1: Enter a Credible Tales by Xero Stage

Visitors can reach a fast, accessible, English-language Tales by Xero site, recognize its authored Saffron Myth Theatre identity, navigate core destinations, understand the creator's practice, and voluntarily visit Ko-fi.

### Story 1.1: Establish the Static Public Site Foundation

As a visitor,
I want to open a fast, accessible public Tales by Xero site,
So that essential orientation and content remain available without client-side JavaScript.

**Acceptance Criteria:**

**Given** the project is not yet configured as a production website
**When** the static Astro foundation is created
**Then** it uses Astro 7.3.5, TypeScript 6.0.3, Node.js `>=22.13.0`, npm, and a versioned `package-lock.json`.

**Given** a public page is rendered
**When** JavaScript is disabled
**Then** navigation, readable core content, and links remain usable as semantic HTML.

**Given** the foundation routes are configured
**When** a visitor opens `/`, `/works`, or `/about`
**Then** they receive a complete HTML page with exactly one `h1`, meaningful landmark structure, and a visible skip link.

**Given** the site quality standard
**When** the foundation changes
**Then** `npm run lint` and `npm run build` are available as required checks.

### Story 1.2: Present the Saffron Myth Theatre Site Shell

As a visitor,
I want to experience a recognizable, accessible Tales by Xero interface with dependable navigation,
So that I can understand the brand and reach Works or About on every device.

**Acceptance Criteria:**

**Given** the public site shell loads
**When** I use it on desktop or mobile
**Then** the maker mark, Works, About, and external Ko-fi link are visible or available through a clearly labelled, keyboard-operable mobile menu before desktop links wrap.

**Given** I am on an internal route
**When** navigation renders
**Then** the active section has a Saffron rule and an additional non-color state indicator.

**Given** application styles
**When** components are designed
**Then** they use native CSS Custom Properties with primitive, semantic, and component token layers rather than scattered raw color, spacing, or focus values.

**Given** the Saffron Myth Theatre design system
**When** the site shell renders
**Then** Mineral Blue and readable Chalk or Mist Blue fields dominate, Saffron identifies primary actions or selection, Coral remains scarce, and generic rounded card grids are not used.

**Given** keyboard or touch interaction
**When** I focus or activate navigation and links
**Then** focus and activation are unambiguous, touch targets are at least 44 by 44 CSS pixels, and external destinations are visibly or accessibly identified.

**Given** `prefers-reduced-motion: reduce` is active
**When** the site shell renders
**Then** no nonessential motion initializes and all information remains visible without motion.

### Story 1.3: Share Xero's Practice and Optional Ko-fi Route

As an interested visitor,
I want to understand Xero's practice and optionally visit Ko-fi,
So that I can assess the person behind the works without being pressured to purchase or support.

**Acceptance Criteria:**

**Given** I open `/about`
**When** the page renders
**Then** it concisely explains in English Xero's more than ten years of tabletop experience, original adventure and campaign practice, and refinement through in-person table play.

**Given** the About page
**When** I read its content
**Then** it remains a credible practice and publication statement rather than becoming a long biography, product list, or sales pitch.

**Given** I activate the Ko-fi link in navigation or About
**When** its destination opens
**Then** the browser navigates in the same tab to `https://ko-fi.com/talesbyxero`, its external nature is identifiable, and no pop-ups, forced signup, or repeated support prompts appear.

**Given** the page is viewed at 375, 768, 1024, and 1440 CSS pixels
**When** content and navigation adapt
**Then** reading order, contrast, focus handling, and direct access to Works and About remain intact.

## Epic 2: Explore Published Works with Confidence

Visitors can browse only released works, open decision-ready product pages, understand practical table fit and creator intent, follow an accurate DriveThruRPG handoff, and continue to one relevant next work.

### Story 2.1: Define and Validate the Published Works Collection

As a creator,
I want to maintain every work as one validated local content source,
So that catalog, detail pages, Home discovery, and recommendations do not use conflicting product data.

**Acceptance Criteria:**

**Given** a work is created or changed in `src/content/works/<slug>.md`
**When** the Astro content build validates it
**Then** the schema validates the required slug, status, title, type, compatibility, premise, hook, facts, images, DriveThruRPG URL, `theMoment`, `tableUse`, `authorsNote`, `nextWork`, discovery relationship, and SEO fields.

**Given** a work receives status `published`
**When** the build runs
**Then** it must contain every required field, exactly one hero image, a valid HTTPS DriveThruRPG URL, and another published work as `nextWork`.

**Given** a published work has invalid image references or internal work references
**When** `npm run build` runs
**Then** the build fails and identifies the affected data relationship.

**Given** a work has status `draft`
**When** public work queries run
**Then** the work appears on no catalog, detail, discovery, or recommendation surface.

**Given** product images are managed
**When** a published work references an asset
**Then** the asset lives in `src/assets/works/<slug>/`, has contextual alt text, and can render with reserved dimensions or aspect ratio.

### Story 2.5: Browse the Curated Published Works Catalog

As a Daggerheart game master,
I want to browse published works in a clear catalog,
So that I can choose an adventure, framework, or table resource without marketing clutter.

**Acceptance Criteria:**

**Given** I open `/works`
**When** published works exist
**Then** the catalog renders only those works as linked editorial tiles in the fixed order image, type, title, and short premise.

**Given** I activate a gallery tile with mouse, touch, or keyboard
**When** I confirm the selection
**Then** the matching `/works/<slug>` detail route opens.

**Given** I use the catalog with keyboard or touch
**When** I focus or activate a tile
**Then** focus, target, and interaction are clear without hover dependence, and the gallery uses neither a rounded card grid nor motion-dependent navigation.

**Given** no published works are available
**When** I open `/works`
**Then** a clear, accessible empty state appears without placeholder products or invented release announcements.

**Given** filtering is adopted later
**When** it is implemented
**Then** it works without a full page reload, is programmatically exposed, and leaves all catalog information accessible without JavaScript.

### Story 2.4: Present Decision-Ready Work Detail Pages

As a Daggerheart game master,
I want to receive practical and creative information on a work detail page immediately,
So that I can decide whether it fits my table before moving to DriveThruRPG.

**Acceptance Criteria:**

**Given** I open a published detail route
**When** the page renders
**Then** compatibility, type, title, hook, and a variable Facts Strip with only verified facts appear before imagery and extended content.

**Given** a fact is not verified or relevant for a work
**When** the Facts Strip renders
**Then** it shows neither an estimated value nor an empty placeholder.

**Given** I read a detail page
**When** product content follows
**Then** it presents a spoiler-safe scene or conflict, concrete table use, and a concise product-specific Author's Note before the external CTA.

**Given** the page is viewed on mobile
**When** its layout becomes one column
**Then** its content order is type and compatibility, title, hook and facts, image, moment, table use, Author's Note, CTA, and Next Work.

**Given** imagery is below the viewport
**When** the page loads
**Then** it lazy-loads; any LCP hero is prioritized, and all media reserve their space without layout shift.

### Story 2.6: Provide Accurate Purchase Handoff and Next Work Guidance

As an interested visitor,
I want an accurate external product link and one relevant next recommendation,
So that I can deliberately continue to a work or remain meaningfully within the catalog.

**Acceptance Criteria:**

**Given** I view a published detail page with a valid external URL
**When** I activate its primary CTA
**Then** it navigates in the same browser tab to the exact configured DriveThruRPG URL and identifies DriveThruRPG as an external destination.

**Given** an external product URL is invalid
**When** content validates or a detail page builds
**Then** the affected work cannot render as `published`.

**Given** a published detail page
**When** its recommendations render
**Then** it shows exactly one other published `nextWork` and a quiet secondary route to `/works`.

**Given** I open `/works/karrhold`
**When** its detail page appears
**Then** it prominently and accurately states that Karrhold is included with Abythera and need not be purchased separately with that framework.

**Given** I request a missing or unpublished work slug
**When** the route resolves
**Then** I receive an accessible Not Found page with a route back to Works and no detail from a draft work is exposed.

### Story 2.2: Prepare the Representative Minimum Catalog

As a creator,
I want to publish a small, complete, representative first catalog,
So that the site is useful without relying on incomplete launch works or placeholders.

**Acceptance Criteria:**

**Given** the works collection schema exists
**When** the minimum catalog content is prepared
**Then** Abythera, at least one published one-shot, and the Daggerheart Item Bundle each have complete validated detail data, work-owned assets, a Facts Strip, an Author's Note, an external CTA, and Next Work.

**Given** a proposed minimum-catalog work does not meet every readiness field
**When** the public catalog builds
**Then** it remains absent from every public surface and the remaining catalog stays functional.

**Given** a minimum-catalog work is published
**When** its catalog and detail entry are inspected
**Then** image, type, title, premise, facts, content sections, external handoff, and recommendation resolve from the same collection entry.

**Given** later launch work is ready
**When** Karrhold, Ephemera, Weeping Rift, Amber Tide, or Thorns of Blossomtide passes the same readiness contract
**Then** it can become public without special-case implementation logic.

### Story 2.3: Review Work Art Direction Before Publication

As a creator,
I want each official work artwork reviewed for its intended public placement,
So that published imagery strengthens product identity, readability, and the Saffron Myth Theatre experience.

**Acceptance Criteria:**

**Given** artwork is supplied for a work's catalog, detail, discovery, featured, or evidence placement
**When** that work is prepared for public release
**Then** its image is reviewed against the specific placement for visual impact, product distinction, readable crop, responsive behavior, and text contrast.

**Given** an official artwork is suitable for its intended placement
**When** the work becomes public
**Then** that official artwork is used in preference to generated replacement imagery.

**Given** an official artwork is technically valid but unsuitable for an intended placement
**When** the review identifies the limitation
**Then** the limitation and a specific remedy are documented, such as an alternative crop, a tonal treatment, a different placement, or a precisely scoped request for supplemental imagery.

**Given** supplemental imagery would materially improve a published surface
**When** an AI-generated or newly commissioned image is proposed
**Then** the proposal states its exact visual role, composition, palette, required aspect ratio, relationship to official artwork, and intended placement, and it is not used without creator approval.

**Given** artwork appears behind or beside readable public copy
**When** it is implemented
**Then** no hard image container, uncontrolled crop, or decorative treatment reduces legibility, hides product identity, or makes meaning depend on the image alone.

**Given** the art direction review is complete for a published work
**When** it is recorded in the work's release readiness
**Then** the assigned image role, approved placement, crop constraints, and contextual alt text are available to implementation and quality checks.

## Epic 3: Find the Next Session from the Homepage

Visitors arriving through search or a shared link can immediately choose a session need, explore one-shot mood options, see credible table-tested proof, and find the featured Ephemera path without first decoding the catalog.

### Story 3.1: Configure Valid Homepage Discovery Content

As a creator,
I want to centrally configure homepage-specific discovery content,
So that product paths, one-shot selection, featured work, and proof consistently reference published works.

**Acceptance Criteria:**

**Given** Home discovery is configured
**When** `src/data/home.ts` is defined
**Then** it is the only Home-specific configuration source and exports `discoveryRoutes.oneShot`, `discoveryRoutes.campaign`, `discoveryRoutes.table`, `featuredWork`, and `tableTestedProof`.

**Given** a discovery route, vibe entry, or featured work is configured
**When** the build validates it
**Then** every reference targets a published work with the corresponding discovery type.

**Given** the one-shot route is configured
**When** its vibe entries validate
**Then** their IDs are unique within the selection, their labels and hooks are visible, and each entry leads to a published one-shot.

**Given** no suitable published work is ready for campaign or table resource
**When** the Home route renders
**Then** the affected discovery route is absent and creates neither an empty space nor a placeholder.

**Given** `tableTestedProof` references an evidence asset
**When** configuration validates
**Then** the asset belongs to a published work and has role `evidence`; without an asset, a concrete English proof statement remains required.

### Story 3.2: Present Intent-Led Discovery Routes

As a Daggerheart game master,
I want to choose an appropriate session intent directly from the homepage,
So that I can find a meaningful next entry point without first searching the catalog.

**Acceptance Criteria:**

**Given** I open the homepage on desktop or mobile
**When** published Home configuration data exists
**Then** relevant brand context, an immediate next action, and available discovery routes appear in the first relevant viewport.

**Given** all three qualifying works are published
**When** discovery routes render
**Then** no more than these three readable routes appear: `Run something tonight`, `Build a campaign around it`, and `Bring something to the table`.

**Given** discovery routes render
**When** I perceive or operate them
**Then** they form an asymmetric layered stage or fan rather than an equal card grid or carousel, and label and target are understandable before optional hover or focus feedback.

**Given** I activate the campaign or table-resource route
**When** the link is triggered
**Then** it leads to the configured published detail route and works without JavaScript.

**Given** I activate a discovery route
**When** analytics is later eligible and enabled
**Then** the UI can send exactly one semantic `discovery_route_selected` event to the central analytics adapter without talking to a provider itself.

### Story 3.3: Offer the URL-Aware One-Shot Vibe Selection

As a Daggerheart game master,
I want to choose among published one-shots by mood,
So that I can find a fitting option faster and keep the choice understandable through browser navigation.

**Acceptance Criteria:**

**Given** I activate `Run something tonight`
**When** JavaScript is available
**Then** the curated vibe selection opens, the URL becomes `/#one-shot-vibes`, and browser history receives exactly one corresponding entry.

**Given** I close the vibe selection
**When** it closes
**Then** the fragment state is removed without creating an inappropriate new navigation state.

**Given** I directly load `/#one-shot-vibes` or reload the page
**When** JavaScript is unavailable
**Then** the same selection appears statically inline and every vibe target is a regular `/works/<slug>` link.

**Given** I use browser back or forward, or the hash changes
**When** `popstate` or `hashchange` fires
**Then** the visible vibe-selection state matches the current URL fragment.

**Given** only two published one-shots are ready for the curated selection
**When** it renders
**Then** both appear without artificial empty space, forced symmetry, or missing interaction information.

**Given** I activate a vibe entry
**When** analytics is later eligible and enabled
**Then** the UI can send one `one_shot_vibe_selected` event with `vibeId` and `workSlug` to `track(event)` before normal link navigation.

### Story 3.4: Feature Ephemera and Concrete Table-Tested Proof

As a visitor,
I want to see a credible product recommendation and concrete table-tested proof after discovery,
So that the site conveys human experience rather than empty marketing claims.

**Acceptance Criteria:**

**Given** Ephemera is published and configured as `featuredWork`
**When** the homepage renders
**Then** it appears after the discovery routes as a product spotlight with type, title, premise, hook, image, and a link to its Ephemera detail page.

**Given** Ephemera appears as featured work
**When** I read its relationship context
**Then** it is correctly understandable as standalone-playable and as the second official Abythera mission.

**Given** `tableTestedProof` is configured
**When** the homepage renders
**Then** it shows a concrete, quiet English statement or contextualized evidence asset without invented numbers, numbered pseudo-proof, or generic AI-style marketing language.

**Given** proof or spotlight media appears
**When** it is decorative
**Then** it is hidden from screen readers; informative media has contextual alt text and loads with a reserved aspect ratio.

**Given** reduced motion is enabled
**When** discovery, spotlight, or proof becomes visible
**Then** all content is immediately visible and no narrative or decorative motion is needed to convey meaning.

## Epic 4: Validate and Measure a Respectful Public Launch

The creator can verify that the public portfolio is accessible and responsive, deploy it safely through Vercel, and assess discovery and DriveThruRPG handoffs without visitor profiling.

### Story 4.1: Establish Automated Quality and Accessibility Coverage

As a creator,
I want to automatically check central public journeys for function, accessibility, and responsive presentation,
So that regressions are discoverable before launch.

**Acceptance Criteria:**

**Given** Home, Works, and at least one published product detail page exist
**When** automated quality coverage is configured
**Then** Playwright and `@axe-core/playwright` check those routes for critical accessibility violations and core navigation.

**Given** end-to-end tests run
**When** they open target views
**Then** they check at least 375, 768, 1024, and 1440 CSS pixel widths and direct product-first reading order on mobile.

**Given** tests check a keyboard-operable interface
**When** skip link, navigation, discovery, vibe selection, gallery tiles, and external CTA are reachable
**Then** focus order, visible `:focus-visible`, and operable activation are covered.

**Given** reduced motion is enabled
**When** automated and manual launch checks run
**Then** they confirm no information is hidden, no nonessential movement is required, and no client motion initializes.

**Given** invalid published content, an invalid internal reference, or invalid Home configuration exists
**When** `npm run build` runs
**Then** the build fails.

### Story 4.2: Prepare Safe Preview and Production Delivery

As a creator,
I want to deliver changes through reviewable previews and a clear production path,
So that no unreviewed local version becomes public.

**Acceptance Criteria:**

**Given** the repository is connected to Vercel
**When** a branch is updated
**Then** Git-connected Vercel configuration creates a preview deployment.

**Given** changes reach production
**When** they are deployed
**Then** production deployment occurs only from `main`, and direct local production deployment is not used.

**Given** a preview or local environment runs
**When** the site loads
**Then** no production analytics transmission occurs.

**Given** a production-readiness check occurs
**When** it runs before launch
**Then** it covers at least `npm run lint`, `npm run build`, reachable external DriveThruRPG and Ko-fi URLs, expected metadata, robots behavior, and preview-versus-production separation.

**Given** a launch candidate receives manual review
**When** Home, Works, and a detail page are checked with keyboard and reduced motion
**Then** outcomes and known remaining deviations are documented.

### Story 4.3: Add a Privacy-Gated Analytics Adapter

As a creator,
I want a provider-neutral measurement interface for relevant discovery and CTA signals,
So that future analytics does not spread through UI components or create personal profiles.

**Acceptance Criteria:**

**Given** analytics code is added to the site
**When** `src/lib/analytics.ts` is defined
**Then** it exports only the normative `AnalyticsEvent` union type and `track(event)`, and UI components import no provider SDK directly.

**Given** an event is passed to `track(event)`
**When** processing fails or is not enabled
**Then** it blocks neither rendering nor same-tab navigation and fails silently.

**Given** page views are measured
**When** a `page_view` event is generated
**Then** it includes only `pageKind`, optional `workSlug`, and normalized `referrerKind`; a raw referrer URL is never forwarded.

**Given** a discovery route, vibe selection, or DriveThruRPG CTA is actively triggered
**When** its UI interaction occurs
**Then** it can send exactly the corresponding architecture-contract event and never emits that event before active visitor action.

**Given** an event payload is checked
**When** data reaches an adapter
**Then** it contains no person, session, or persistent ID, IP address, raw user agent, query string, full referrer, or email address.

### Story 4.4: Verify Analytics Provider Eligibility Before Enablement

As a creator,
I want to enable an analytics provider only after a traceable privacy review,
So that discovery measurement never violates the product and architecture boundaries.

**Acceptance Criteria:**

**Given** a concrete analytics provider is proposed for integration
**When** its eligibility is reviewed
**Then** the review documents cookie and local-identifier behavior, IP and user-agent handling, retention, automatic collection, advertising, retargeting, and configuration options.

**Given** a provider produces automatic page views or other automatic data collection
**When** its eligibility is assessed
**Then** it is eligible only if those mechanisms can be disabled or constrained to the exact sanitized event contract.

**Given** a provider needs client cookies, persistent identifiers, advertising profiles, retargeting, or undocumented retention
**When** the review completes
**Then** the provider is ineligible and is not enabled.

**Given** no provider meets the privacy requirements
**When** production readiness is established
**Then** analytics remains disabled, the site remains fully usable, and public launch is still allowed.

**Given** a provider meets every requirement
**When** analytics is enabled in production
**Then** public privacy information describes anonymized measurement and retention in a traceable way.
