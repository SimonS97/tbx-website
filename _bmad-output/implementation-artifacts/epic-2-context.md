# Epic 2 Context: Explore Published Works with Confidence

<!-- Compiled from planning artifacts. Edit freely. Regenerate with compile-epic-context if planning docs change. -->

## Goal

Create a trustworthy, public Works experience in which Daggerheart game masters can browse only released products, quickly assess a work's practical table fit and creator intent, deliberately continue to its verified DriveThruRPG page, and discover one relevant next work. The epic establishes the curated product source and public-readiness gate that later homepage discovery consumes, so incomplete, draft, or misleading product information never reaches a public surface.

## Stories

- Story 2.1: Define and Validate the Published Works Collection
- Story 2.5: Browse the Curated Published Works Catalog
- Story 2.4: Present Decision-Ready Work Detail Pages
- Story 2.6: Provide Accurate Purchase Handoff and Next Work Guidance
- Story 2.2: Prepare the Representative Minimum Catalog
- Story 2.3: Review Work Art Direction Before Publication

## Requirements & Constraints

- Public catalog, detail, discovery, and recommendation surfaces must expose only works marked published. Draft, incomplete, unavailable, or planned works must have no public route, placeholder, announcement, CTA, or recommendation.
- Build a Works catalog at `/works` that presents published works as linked editorial tiles in the fixed order image, type, title, then short premise. It must have a clear accessible empty state when no work is published. Filtering is optional; if added, it must not reload the page, must expose its state programmatically, and must leave catalog information usable without JavaScript.
- Each published work must provide title, product type, Daggerheart compatibility, premise, approved hook, verified facts, product-specific scene image, valid external URL, spoiler-safe `theMoment`, concrete `tableUse`, concise product-specific `authorsNote`, one Next Work, discovery relationship, and page metadata.
- Detail pages must lead with compatibility, type, title, hook, and a variable Facts Strip before imagery or extended content. Facts show only verified, relevant values; do not estimate or render blank placeholders for unknown facts.
- Detail content must offer a spoiler-safe scene, NPC, location, object, conflict, or question; explain concrete table value and included materials without an overlong synopsis or railroaded framing; and put the Author's Note before the external CTA. Use precise, lightly dramatic English without fabricated claims, false scarcity, or generic superlatives.
- On mobile, preserve this reading order: type and compatibility, title, hook and facts, image, moment, table use, Author's Note, CTA, Next Work. Detail pages begin with product information, never a decorative image fragment.
- The primary CTA must use the exact verified DriveThruRPG URL, clearly identify DriveThruRPG as an external destination, and navigate in the same tab. A missing, invalid, or unverified URL prevents publication rather than producing a dead CTA.
- Each detail page shows exactly one other published Next Work plus a quieter route back to Works. Karrhold needs its own indexable detail route with a prominent, accurate Included with Abythera notice stating that Abythera owners need not purchase it separately.
- Ship a representative minimum catalog of Abythera, at least one published one-shot, and the Daggerheart Item Bundle only when all readiness data, assets, Facts Strip, Author's Note, external CTA, and Next Work are complete. Karrhold, Ephemera, Weeping Rift, Amber Tide, and Thorns of Blossomtide join through the same contract, without special-case logic.
- Published artwork must be reviewed for its actual placement, readable crop, responsive behavior, text contrast, and product distinction. Prefer approved official artwork; any proposed supplemental image needs creator approval and a documented role, composition, palette, aspect ratio, and placement. Record the approved image role, crop constraints, and contextual alt text with release readiness.
- Missing or unpublished work URLs must resolve to an accessible Not Found experience that returns visitors to Works and does not reveal draft content.
- Preserve semantic landmarks, one `h1`, logical headings, visible focus, keyboard operation, 44 by 44 CSS-pixel compact targets, WCAG AA contrast, contextual image alt text, and non-color/non-hover/non-motion cues. Test responsive layouts at 375, 768, 1024, and 1440 CSS pixels.
- Reserve media space, use tonal placeholders, lazy-load below-fold imagery, and eager-load only an LCP hero when applicable. Respect reduced motion; no information may depend on motion. Avoid rounded generic card grids, hover-dependent navigation, auto-rotation, infinite effects, scroll hijacking, or decorative ambient imagery.

## Technical Decisions

- Use Astro static generation with progressive enhancement. Public content, navigation, and the DriveThruRPG handoff must function as semantic HTML without client-side JavaScript; do not add server-rendered routes, a database, CMS, authentication, commerce behavior, React, or Tailwind.
- Maintain one canonical Markdown entry per work at `src/content/works/<slug>.md`. The filename stem and kebab-case `slug` define the public `/works/<slug>` route. Catalogs, detail pages, homepage discovery, and Next Work recommendations all resolve from this collection, never duplicated product data.
- Implement the normative work schema in `src/content.config.ts` with Zod. `status` is `draft` or `published`; valid types are `one-shot`, `campaign-framework`, and `item-bundle`. A published entry requires one or more facts and images, exactly one hero image, a valid HTTPS `drivethrurpg.com` URL, and a different published `nextWork`.
- Build validation must reject duplicate slugs, invalid required fields, image references outside the owning asset directory, invalid internal references, self-referential Next Work, or a Next Work target that is not published. Intentional directed recommendation cycles are allowed.
- Store every work-owned source image in `src/assets/works/<slug>/`. Each image declares a contextual `alt` and one role: `hero`, `gallery`, `vibe`, or `evidence`. Use Astro image handling with declared dimensions or aspect ratios.
- Model optional discovery as one route/order/vibe relationship. One-shots require a vibe entry; campaign-framework and item-bundle entries must not have one. Model Karrhold's inclusion using `includedWith` referencing a published work with label and notice. Model Ephemera's Abythera relationship through `campaignRelation`, including its standalone status.
- Store `seo` title and description per work. Reserve Markdown bodies for optional selected detail blocks, not duplicated frontmatter content.
- Use native CSS Custom Properties with primitive, semantic, and component token layers. Components consume semantic or component tokens rather than raw visual values. Keep the Saffron Myth Theatre system: Night Mineral dominant, Saffron for primary action, selection, and type labels, scarce Coral for danger, Chalk/Mist Blue on reliably dark reading fields, sharp structural corners, deliberate framing, and no diffuse shadows or glass panels.
- Make `npm run lint` and `npm run build` mandatory validation. Production builds must fail when published-work data or references are invalid.

## UX & Interaction Patterns

- Present Works as a curated portfolio, not a storefront, price comparison, or dense marketplace. For small catalogs, favor large, deliberate spotlights over artificial gallery density; gallery tiles remain editorial links rather than rounded generic cards.
- Use product-specific art as visual evidence, not uncontrolled wallpaper. Vary gallery image ratio and span for narrative importance while retaining a stable metadata reading edge. Text must stay on opaque or reliably dark fields.
- Stage a detail page as one compelling work at a time. Use a display serif for staged titles and a legible humanist sans for body content; product labels are selective. Product type and compatibility must remain readable in text or text plus iconography, not color alone.
- Use an explicit external CTA such as "View on DriveThruRPG" with visible or accessible external-destination indication. Primary CTAs are rectangular Saffron actions; focus remains clearly visible and touch and keyboard have equivalents to hover feedback.
- The catalog and detail views must keep essential labels, destinations, and product eligibility visible before optional hover, focus, or motion feedback. Any motion is limited to nonessential hierarchy, feedback, or reveal and renders its final state under reduced motion.

## Cross-Story Dependencies

- Story 2.1 establishes the collection, schema, published queries, asset rules, and validation gate required by every other Epic 2 story.
- Stories 2.5, 2.4, and 2.6 consume the same published collection so catalog tiles, routes, detail content, CTAs, inclusion notices, and recommendations cannot diverge.
- Story 2.2 supplies valid representative published entries needed to exercise catalog, detail, CTA, and Next Work behavior; Story 2.3 completes required art-direction readiness before a work appears publicly.
- Epic 3 may consume only the curated published catalog from this epic. Its Home configuration and discovery routes must not introduce placeholders or bypass publication validation.
