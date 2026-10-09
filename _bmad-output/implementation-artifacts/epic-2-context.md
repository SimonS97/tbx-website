# Epic 2 Context: Explore Published Works with Confidence

<!-- Compiled from planning artifacts. Edit freely. Regenerate with compile-epic-context if planning docs change. -->

## Goal

Create a trustworthy, English-language Works experience in which Daggerheart game masters can browse only released products, assess practical table fit and creator intent, deliberately follow an exact DriveThruRPG handoff, and discover one relevant next work. The epic establishes the single curated product source and publication gate consumed by later homepage discovery, so incomplete, draft, unapproved, or misleading work information never reaches a public surface. After Story 2.6 completes the functional detail substrate, Story 2.7 migrates the shared product-detail presentation to the approved Astral spine and adds the bounded Abythera Evidence Reader; it does not create a general gallery system.

## Stories

- Story 2.1: Define and Validate the Published Works Collection
- Story 2.2: Prepare the Representative Minimum Catalog
- Story 2.3: Review Work Art Direction Before Publication
- Story 2.4: Present Decision-Ready Work Detail Pages
- Story 2.5: Browse the Curated Published Works Catalog
- Story 2.6: Provide Accurate Purchase Handoff and Next Work Guidance
- Story 2.7: Apply the Approved Astral Product-Detail Spine and Present Curated Product Evidence

## Requirements & Constraints

- Public catalog, detail, discovery, and recommendation queries expose only `published` works. Draft, incomplete, unavailable, or planned works receive no public route, placeholder, CTA, or recommendation.
- `/works` presents published works as linked editorial tiles in the fixed order image, type, title, and short premise, with an accessible empty state. Filtering is optional; if introduced, it must be no-reload, programmatically exposed, and usable as static content without JavaScript.
- A published entry supplies title, type, Daggerheart compatibility, premise, hook, verified facts, product image, valid DriveThruRPG URL, spoiler-safe `theMoment`, concrete `tableUse`, product-specific `authorsNote`, one `nextWork`, discovery relationship, and SEO fields. Unknown facts are omitted, never estimated or padded with empty placeholders.
- Detail pages preserve the decision order: type and compatibility, title, hook and Facts Strip, explicit DriveThruRPG and Works actions, image, moment, table use, Author's Note, and Next Work. Content is concise, spoiler-safe, practical, and free of fabricated claims, false scarcity, or generic superlatives.
- The primary CTA uses the exact verified HTTPS DriveThruRPG URL, identifies the external destination, and navigates same-tab. Invalid or missing URLs prevent publication. Each detail page has exactly one other published Next Work and a quiet `/works` route. Karrhold has an indexable route with an accurate, prominent `Included with Abythera` notice explaining that Abythera owners need not purchase it separately.
- The representative minimum catalog is Abythera, at least one published one-shot, and the Daggerheart Item Bundle, only after complete data, approved assets, facts, note, CTA, and Next Work are ready. Karrhold, Ephemera, Weeping Rift, Amber Tide, and Thorns of Blossomtide use the same readiness contract without special cases.
- Art must be approved for its intended placement, crop, responsive behavior, contrast, and product distinction; official art is preferred. Supplemental imagery requires creator approval and recorded role, composition, palette, ratio, placement, crop constraints, and contextual alt text.
- Missing or unpublished slugs resolve to an accessible Not Found page with routes back to Works and Home and no draft detail. Preserve semantic landmarks, one `h1`, logical headings, WCAG AA contrast, keyboard/focus access, contextual alt text, 44×44 CSS-pixel targets, and non-color/non-hover/non-motion meaning at 375, 768, 1024, and 1440px. Reserve media space, lazy-load below-fold images, prioritize only an applicable LCP hero, and honor reduced motion.
- Story 2.7 must replace the old functional detail treatment with the approved Astral product-detail spine for every published detail route. It preserves the Story 2.6 CTA, Works route, configured inclusion notice, and exactly one Next Work; Home and the canonical Work Index are not part of this story.
- The approved Evidence Reader is optional per work and bounded to two through five explicitly approved assets, in explicit order with exactly one initial selection. At present only Abythera is approved, with exactly `harmony-portrait.png`, `CampaignFramework.png`, `KarrholdCheatSheet.png`, and `AboutThisProduct.png`; Ephemera, Karrhold, and the Daggerheart Item Bundle remain hero-only until separately approved. No unapproved supporting asset may be emitted.

## Technical Decisions

- Use Astro static generation with progressive enhancement. Semantic HTML must keep product content, navigation, CTA, and the static evidence baseline usable without JavaScript. Do not add server routes, a database, CMS, auth, commerce, React, or Tailwind.
- Keep one canonical `src/content/works/<slug>.md` entry per work. Its kebab-case filename/slug defines `/works/<slug>`; catalog, detail, discovery, and Next Work data all resolve from this collection.
- Implement the Zod schema in `src/content.config.ts`: `status` is `draft` or `published`; types are `one-shot`, `campaign-framework`, or `item-bundle`; published entries require exactly one hero, valid owned image references, a valid HTTPS `drivethrurpg.com` URL, and a different published `nextWork`. Reject duplicate slugs, bad internal references, self-references, and unpublished targets; directed cycles are allowed.
- Store work-owned images under `src/assets/works/<slug>/` with contextual alt text and roles (`hero`, `gallery`, `vibe`, or `evidence`), using declared dimensions/aspect ratios. Extend owning Abythera image entries with optional reader-specific metadata for order, labels, contextual copy, initial selection, and original-route labels; do not create a second product-data source.
- Story 2.6 owns the existing CTA, quiet Works route, Karrhold relationship, and Not Found behavior. Story 2.7 follows it, migrates the shared detail shell to the approved Astral presentation, and adds only the local Abythera Evidence Reader beneath the complete official cover. Page-local TypeScript may switch selection and open a native dialog; the static initial evidence and direct original route remain present without JavaScript.
- Use native CSS Custom Properties in primitive, semantic, and component layers. Preserve Night Mineral, Saffron, scarce Coral, Chalk/Mist Blue, sharp corners, deliberate framing, and no diffuse shadows or glass panels. `npm run lint` and `npm run build` are mandatory gates.

## UX & Interaction Patterns

- Treat Works as a curated portfolio, not a storefront or dense marketplace. Use deliberate editorial links and stable metadata edges rather than rounded generic cards or artificial gallery density. Product-specific art is evidence, not ambient wallpaper; copy remains on opaque or reliably dark fields.
- Stage one product at a time with display serif titles, humanist-sans reading text, selective labels, and type/compatibility conveyed by text (not color alone). Keep labels, destinations, eligibility, and actions available before hover or motion.
- The detail introduction places the clear rectangular Saffron `View on DriveThruRPG` action and quiet Works route in the approved product-introduction action group. Story 2.7 adopts the Astral Threshold backdrop, staging, display hierarchy, complete unframed official cover, and no-second-divider treatment from the approved product-detail mockup. The `Product evidence` cue appears in the practical first viewport when available, and the reader follows the complete official cover without a second decorative divider or backing panel.
- The Evidence Reader presents an ordered native-button index and the selected original at a useful full reading scale with adjacent English context. Selection is programmatic and non-color-only, updates copy/image without moving focus, and announces the new item through a polite status. A preview may open a native dialog that closes on Escape or backdrop activation and restores focus; the independently labelled direct original route remains available.
- With JavaScript unavailable, primary product information, DriveThruRPG CTA, return route, initial evidence, and its direct original route remain static HTML. Motion is only hierarchy, narrative, or feedback; reduced motion shows the final state immediately. Keyboard, touch, focus-visible, responsive stacking, and reserved media dimensions are required.

## Cross-Story Dependencies

- Story 2.1 establishes the collection, schema, published queries, asset rules, and build gate required by every other Epic 2 story.
- Stories 2.2 and 2.3 supply complete data and placement approval before works become public. Stories 2.4 and 2.5 consume the same collection for detail and catalog surfaces.
- Story 2.6 must complete before Story 2.7: it provides the CTA, Works route, Next Work, Karrhold, and Not Found functionality that the new shared visual shell preserves. Story 2.7 does not invalidate completed Story 2.4; it replaces its visual presentation under the approved final UX direction.
- Story 2.7 depends on the explicit Abythera-only evidence approval and its four owned assets. Other works receive the shared visual shell but remain hero-only until a later explicit approval; no generalized gallery or incidental asset exposure is permitted.
- Epic 3 may consume only this epic's curated published collection. Home configuration and discovery routes must not introduce placeholders or bypass the publication gate.
