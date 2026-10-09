---
title: Sprint Change Proposal - Final UX Spines and Product Evidence
status: approved
created: 2026-10-09
approved: 2026-10-09
project: websiteDraft
scope: minor
---

# Sprint Change Proposal - Final UX Spines and Product Evidence

## 1. Issue Summary

The final UX spines approved on 2026-10-08 make the Abythera Evidence Reader the approved product-detail pattern for a curated set of two to five public supporting assets. Story 2.4 was intentionally delivered as a hero-only detail foundation: its approved scope explicitly excluded gallery and evidence media, client-side evidence selection, CTA, Next Work, return navigation, Karrhold, and Not Found behavior.

This is not a defect in Story 2.4. It is a later, approved extension to the product-detail experience. Reopening Story 2.4 would erase a useful, completed foundation and mix a new interactive evidence capability into an already accepted story.

Evidence:

- The final product-detail spine at `ux-designs/ux-websiteDraft-2026-09-28/mockups/product-detail-abythera-evidence-reader.html` defines the reader, product-evidence cue, selected original, direct original route, and native inspection dialog.
- `DESIGN.md` and `EXPERIENCE.md` are final as of 2026-10-08 and name the Evidence Reader as the standard pattern for two to five curated public supporting assets.
- The Story 2.4 spec states that its implementation is deliberately hero-only and reserves gallery and GM-evidence media for a later extension.
- The current product route and static verifier still enforce exactly one hero image and no client script on detail pages.

## 2. Impact Analysis

### Checklist Result

| Item | Status | Result |
| --- | --- | --- |
| 1.1 Triggering story | [x] Done | Story 2.4 established the hero-only detail foundation that the final reader extends. |
| 1.2 Core problem | [x] Done | A final, approved UX capability is not represented by a remaining implementation story. |
| 1.3 Supporting evidence | [x] Done | Final UX spines and the Story 2.4 frozen scope agree that this is a later extension. |
| 2.1 Current epic | [x] Done | Epic 2 remains viable and should stay in progress. |
| 2.2 Epic change | [x] Done | Add one narrowly scoped Story 2.7 after Story 2.6. |
| 2.3-2.5 Future epics | [x] Done | Epic 3 keeps its existing Home scope; no resequencing or new epic is needed. |
| 3.1 PRD | [x] Done | No PRD change. FR-12 through FR-15 already allow real product material and product detail depth. |
| 3.2 Architecture | [x] Done | No architecture rewrite. AD-2 and the optional-field rule already permit a small frontmatter extension. |
| 3.3 UX | [x] Done | No UX revision. The final 2026-10-08 spines are the source of truth. |
| 3.4 Secondary artifacts | [!] Action-needed | Detail verification, release-readiness record, work frontmatter, and styling need the implementation updates below. |

### Epic and Story Impact

- **Epic 2:** Remains `in-progress`. Its goal already includes product confidence through real product detail; the reader strengthens that goal without changing it.
- **Story 2.4:** Remains `done`. It delivered the stated hero-only, static detail baseline and needs no status change.
- **Story 2.6:** Remains the next story. Its CTA, Next Work, Karrhold, and Not Found scope is unchanged. Its implementation should place the already-required CTA and quiet Works route in the approved detail-introduction hierarchy, rather than creating a second competing action area later.
- **New Story 2.7:** Follows Story 2.6 and implements only the approved Evidence Reader capability for Abythera.
- **Epic 3:** The approved Astral Threshold Home and embedded Work Index remain work for Stories 3.1 and 3.2. This proposal does not pull that work into Epic 2. The canonical `/works` Work Index alignment remains a later visual follow-up, not a reason to delay the detail and handoff work now.

### Artifact and Technical Impact

- **Work data:** Extend the existing `images` entries only where needed with optional, reader-specific metadata. Keep evidence order, visible labels, copy, initial selection, and original-route label beside the owning image in `src/content/works/abythera.md`; do not create a second product-data source.
- **Public media boundary:** Start with exactly four explicitly approved Abythera assets: `harmony-portrait.png`, `CampaignFramework.png`, `KarrholdCheatSheet.png`, and `AboutThisProduct.png`. Ephemera and Item Bundle remain hero-only until their supporting assets receive the same explicit approval and data.
- **Release readiness:** Amend `story-2-3-art-direction-release-readiness.md` to record this final Abythera-only approval, replacing older contradictory placement limits for these four files. It does not reopen Story 2.3.
- **Route and enhancement:** Add one local Evidence Reader component and a small page-local enhancement. JavaScript may switch the selected evidence and open a native dialog; the static page must remain decision-ready, keep its primary CTA functional, and expose the initially selected evidence with a direct original route.
- **Verification:** Replace the detail verifier's hero-only/no-script assumption with explicit checks for the allowed Abythera evidence assets, order, accessible selected state, static fallback, and absence of unapproved emitted work assets. Keep the existing published-only and draft-leak checks.

## 3. Recommended Approach

**Selected approach: Direct adjustment.**

Add a new, bounded Story 2.7 instead of reopening Story 2.4.

This is the smallest path that keeps completed work auditable, gives the final UX decision an explicit acceptance boundary, and avoids spreading a generic gallery system over every product. It is moderate implementation effort because it adds a data contract, a component, a progressive local interaction, and targeted verification; the risk is low because it stays within static Astro, existing work ownership, and one approved product.

Alternatives rejected:

- **Reopen Story 2.4:** Not recommended. It contradicts that story's frozen hero-only scope and obscures what was already accepted.
- **Fold the reader into Story 2.6:** Not recommended. Story 2.6 already owns four distinct visitor-facing outcomes. Adding a new content model and interaction would make its acceptance boundary needlessly broad.
- **Create a generic media/gallery system:** Not recommended. Only Abythera has an approved reader set today; other media stays private until separately approved.

## 4. Detailed Change Proposals

### 4.1 Add Story 2.7 to Epic 2

**Artifact:** `_bmad-output/planning-artifacts/epics.md`

**OLD:** Epic 2 ends with Story 2.6 as its final detail-page follow-up.

**NEW:** Add the following story immediately after Story 2.6.

```md
### Story 2.7: Present Curated Product Evidence

As an interested Daggerheart game master,
I want to inspect a small, curated set of real product material without losing my place on the detail page,
So that I can judge how the product supports play before I continue to DriveThruRPG.

**Acceptance Criteria:**

Given I open Abythera,
When its approved product evidence is available,
Then a visible `Product evidence` cue leads to an Evidence Reader after the complete official cover, with the current selection shown in full at a useful reading scale and with adjacent English context.

Given the Evidence Reader renders,
When I choose an item with mouse, touch, or keyboard,
Then its selected state is programmatic and non-color-only, the selected original and its contextual copy update without moving focus, and a polite status announces the selected item.

Given I inspect the selected original,
When JavaScript is available,
Then its preview may open a native dialog that closes with Escape or backdrop activation and restores focus to the preview; a clearly labelled direct original route remains available independently.

Given JavaScript is unavailable or does not run,
When the detail page renders,
Then its primary product information, DriveThruRPG CTA, and return route remain usable, and the initial evidence item plus its contextual direct original route remain available as static HTML.

Given the published works collection validates,
When Evidence Reader data is configured,
Then it is optional per work, contains two to five explicitly approved assets in an explicit order with exactly one initial selection, and only the configured approved assets may be emitted for the reader.

Given I open Ephemera or the Daggerheart Item Bundle,
When their detail pages render,
Then they remain hero-only until their own supporting assets and public placement receive an explicit later approval.
```

**Rationale:** The story makes the approved detail spine executable while limiting public supporting media to the one work whose set is explicitly approved.

### 4.2 Clarify Story 2.6 Visual Placement Without Expanding Its Scope

**Artifact:** `_bmad-output/planning-artifacts/epics.md`, Story 2.6 implementation notes

**OLD:** The story requires the external CTA and quiet Works route but does not state their position relative to the final detail spine.

**NEW:** Add this implementation note:

```md
Place the existing primary DriveThruRPG CTA and quiet `/works` route in the product-introduction action group defined by the final product-detail spine. Story 2.6 does not implement the Evidence Reader; Story 2.7 adds the Product evidence cue and reader beneath the official cover.
```

**Rationale:** The next implementation can align the permanent handoff actions with the final composition once, without absorbing evidence-reader logic.

### 4.3 Update Sprint Tracking After Approval

**Artifact:** `_bmad-output/implementation-artifacts/sprint-status.yaml`

**OLD:** Epic 2 lists Story 2.6 as the final remaining story.

**NEW at approval time:** Add:

```yaml
2-7-present-curated-product-evidence: backlog
```

At approval time, keep Story 2.6 as `backlog` and Epic 2 as `in-progress`. The current lifecycle state belongs solely to `sprint-status.yaml`; update `last_updated` when the approved change is written.

### 4.4 Record the Narrow Asset Approval During Implementation

**Artifact:** `_bmad-output/implementation-artifacts/story-2-3-art-direction-release-readiness.md`

**OLD:** Earlier release-readiness notes keep some Abythera document and GM-reference assets out of public placement.

**NEW:** Record that the final 2026-10-08 UX decision approves the four listed Abythera assets only for the Evidence Reader, with uncropped originals, adjacent English context, and no decorative backing panel. Keep every other supporting asset excluded until explicitly approved.

**Rationale:** The implementation gets one unambiguous public-media source without broadening any other work's approval.

## 5. Implementation Handoff

**Scope classification:** Minor sprint adjustment with a moderate implementation task.

**Sequence:**

1. Implement Story 2.6 unchanged in functional scope, using the approved detail-introduction action placement.
2. Implement new Story 2.7 from the approved Abythera Evidence Reader spine.
3. Run `npm run lint` and `npm run build` for each completed story.
4. Continue to Epic 3; do not block on a generalized gallery or an early catalog visual rewrite.

**Success criteria for Story 2.7:**

- Abythera alone exposes its four explicitly approved evidence assets through the approved reader pattern.
- The selection, dialog, direct original route, static baseline, keyboard flow, reduced-motion behavior, and responsive layouts are covered by build/static verification and manual checks at 375, 768, 1024, and 1440 CSS pixels.
- No other work asset becomes public incidentally.
- No React, CMS, remote media service, carousel, or generalized gallery feature is introduced.

## 6. Approval Record

Approved on 2026-10-09. `epics.md` and `sprint-status.yaml` were updated with Story 2.7; Story 2.6 then moved into the standard Build workflow.

## 7. Post-2.6 Scope Clarification

After Story 2.6 completed its functional detail-route work, the creator confirmed that Story 2.7 must not add an Evidence Reader to the old production layout. It must migrate every published detail route to the approved Astral product-detail spine from `mockups/product-detail-abythera-evidence-reader.html`, preserving Story 2.6 functionality while adding the Abythera-only Evidence Reader. This does not reopen Story 2.4 as a functional story and does not include the approved Home or Work Index migration, which remains Epic 3 work.
