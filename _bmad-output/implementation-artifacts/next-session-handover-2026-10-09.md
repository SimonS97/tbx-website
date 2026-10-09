# Next Session Handover - 2026-10-09

## Current State

- Story 2.6, `Provide Accurate Purchase Handoff and Next Work Guidance`, is complete. Its spec is `done` and `sprint-status.yaml` marks it `done`.
- Epic 2 remains `in-progress`. The next story is 2.7, tracked as `2-7-present-curated-product-evidence`.
- Story 2.6 added the reusable detail-route function layer: exact same-tab DriveThruRPG CTA with an accessible external label, quiet Works routes, exactly one data-driven Next Work, Karrhold as a published route with its Included with Abythera notice, and a product-free static 404.
- Karrhold is published at `/works/karrhold`. Its public surface uses only `Karrhold_Cover_img_Final.jpg`; its remaining assets remain excluded.

## Verification Completed

- `npm run lint` passed.
- `npm run build` passed. It includes Astro generation, Works fixtures, catalog fixtures, Work validation with image decoding, and static HTML verification.
- Chromium checked `/works/karrhold` at 375, 768, 1024, and 1440 CSS pixels: no horizontal overflow; the CTA has the exact configured URL, no `target`, and an external label; the back route, inclusion notice, and Next Work route are present; tested controls are at least 44 CSS pixels high.
- `astro preview` returned the product-free Not Found page with HTTP 404 for both `/works/unknown-work` and `/works/draft-work`.

## Critical Visual Boundary

The current Astro implementation still uses the old functional production layout. It is not the approved final visual direction and must not receive an Evidence Reader as an isolated add-on.

The approved final references are:

- Product detail: `_bmad-output/planning-artifacts/ux-designs/ux-websiteDraft-2026-09-28/mockups/product-detail-abythera-evidence-reader.html`
- Visual rules: `_bmad-output/planning-artifacts/ux-designs/ux-websiteDraft-2026-09-28/DESIGN.md`
- Interaction rules: `_bmad-output/planning-artifacts/ux-designs/ux-websiteDraft-2026-09-28/EXPERIENCE.md`

Story 2.7 must migrate the shared `/works/[slug]` presentation to this approved Astral product-detail spine for every published work. It preserves the functioning Story-2.6 CTA, Works route, Karrhold notice, and exactly one Next Work. Abythera alone then receives the Evidence Reader. The approved Home and canonical Work Index migration do not belong to Story 2.7; they remain Epic 3 work.

## Story 2.7 Scope

1. Replace the old detail-page visual shell with the approved Astral Threshold stage, display hierarchy, full unframed official hero treatment, readable separate copy field, and responsive product-detail flow.
2. Preserve the Story-2.6 functional contract without duplication or regression: same-tab CTA, quiet Works routes, configured inclusion notice, published-only routing, product-free 404, and one Next Work.
3. Add a visible Abythera `Product evidence` cue and an Evidence Reader after the complete cover.
4. Model and validate the reader data in canonical Abythera frontmatter: explicit order, visible label/category, contextual copy, one initial selection, direct-original label, two-to-five approved assets, and a static original-asset URL strategy that does not broadly emit non-hero files.
5. Use only the approved Abythera reader set: `harmony-portrait.png`, `CampaignFramework.png`, `KarrholdCheatSheet.png`, and `AboutThisProduct.png`. Ephemera, Karrhold, and the Daggerheart Item Bundle adopt the new visual shell but stay hero-only.
6. Keep static HTML useful without JavaScript. Local enhancement may update selection and open a native inspection dialog; direct original routes remain available independently.

## Start Here

Start a fresh session with:

```text
@skills/bmad-build

2.7
```

Read this handover, the final product-detail mockup, `DESIGN.md`, `EXPERIENCE.md`, `_bmad-output/implementation-artifacts/epic-2-context.md`, and `_bmad-output/implementation-artifacts/story-2-3-art-direction-release-readiness.md` before planning the Story 2.7 spec.

## Git State

- Current HEAD: `be3e86767f2b79d24e4c92e4d471a6216c93f9b5` (`Adjusted bmad rules for repository`).
- The worktree is intentionally dirty with the approved course correction, Story 2.6 implementation, verification artifacts, and this handover. No commit or push was created.
- A new Build workflow normally asks for a clean worktree. Commit the intended changes manually before the next session, or explicitly approve continuing on the dirty worktree when prompted.
