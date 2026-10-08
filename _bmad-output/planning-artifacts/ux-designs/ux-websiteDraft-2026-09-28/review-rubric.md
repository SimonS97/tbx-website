# Spine Pair Review — Tales by Xero

## Overall verdict
The spine pair is **adequate** for downstream implementation: source-derived journeys, IA, content boundaries, visual-reference linkage, token paths, and required document shape are all usable. It is not yet strong because the approved responsive heading scale is not committed to the token contract, and core media has no terminal failure treatment.

Those are contract omissions, not deferred product decisions. The absence of v1 filtering and the analytics implementation choice are explicitly and sufficiently deferred, so neither is a finding.

## 1. Flow coverage — strong
Checked the source brief's discovery, product-detail, external-handoff, and no-onsite-commerce requirements (`../../briefs/brief-websiteDraft-2026-09-28/brief.md:24-30,57-68`) against all four Key Flows. Mara, Jonas, Leila, and Devon are named protagonists; each journey has numbered steps, a clear climax, and a relevant failure or alternative path (`EXPERIENCE.md:166-208`).

### Findings
- None.

## 2. Token completeness — adequate
Checked all frontmatter token families and component references (`DESIGN.md:10-99`) plus every prose token reference in both spines. All references resolve; all color tokens have hex values; and the load-bearing contrast target is stated as WCAG AA (`DESIGN.md:112-114`, `EXPERIENCE.md:132`).

### Findings
- **medium** The typography token contract cannot reproduce the approved responsive display treatments. `{typography.display}` declares one fixed `4.5rem` size (`DESIGN.md:24-30`) and is assigned to work names and large decisions (`DESIGN.md:118`), while the approved Home and product-detail H1s use materially different responsive ranges (`mockups/home-astral-threshold-work-index.html:103`, `mockups/product-detail-abythera-evidence-reader.html:160`). A downstream consumer must choose between the spine and mock literals. *Fix:* define named responsive display roles for the approved Home and product-detail contexts, then reference those names in the Typography section; do not require consumers to recover the scale from mock CSS.

## 3. Component coverage — adequate
Checked Navigation, Classification, Astral Spread, Astral Rule, Work Index, Product Detail Hero, Product Evidence Reader, and primary/secondary actions across `DESIGN.md` frontmatter and Components prose (`DESIGN.md:63-99,142-178`) and EXPERIENCE component patterns (`EXPERIENCE.md:79-99`). Each main custom pattern has substantive visual and behavioral rules.

### Findings
- **low** The full-size evidence dialog is a consumer-visible component, but it is only distributed across a visual sentence, state/accessibility clauses, and the mock. It has no `components` frontmatter entry or named Component Patterns row (`DESIGN.md:168-172`, `EXPERIENCE.md:90-99,110,136`, `mockups/product-detail-abythera-evidence-reader.html:245-250,412-417`). *Fix:* add one named `evidence-dialog` visual entry and one short behavioral row that reference the existing close and direct-route rules; include expected focus return rather than leaving it implicit.

## 4. State coverage — adequate
Walked Home, Works, Product Detail, About, and external handoff. The pair covers static cold-load, image loading, empty inventory, missing product type, evidence selection, full-size evidence, missing external URLs, withdrawn routes, external handoff, mobile-menu state, keyboard focus, and reduced motion (`EXPERIENCE.md:101-138`). Offline and permission states do not apply to this static, account-free site.

### Findings
- **medium** The media state stops at a temporary loading placeholder and does not specify what happens when a required cover or selected evidence asset permanently fails (`EXPERIENCE.md:105-106,210-214`). That leaves a core product-decision surface undefined. *Fix:* add a `Media unavailable` state that preserves the asset's reserved space and product context, exposes useful text/alt context, and suppresses the inspect/full-asset route when its target failed, without inventing replacement art.

## 5. Visual reference coverage — strong
Checked every promoted reference: `mockups/home-astral-threshold-work-index.html` and `mockups/product-detail-abythera-evidence-reader.html`. Both are linked inline with what they illustrate (`DESIGN.md:132,174`, `EXPERIENCE.md:65`), and spine precedence is stated (`DESIGN.md:132,174`, `EXPERIENCE.md:16,65`). There are no `imports/` or `wireframes/` artifacts to link.

### Findings
- None.

## 6. Bloat & overspecification — strong
Checked for source restatement, decorative narrative without a decision, needless pixel prescription, and prose that should be a table. DESIGN.md uses editorial prose for visual decisions; EXPERIENCE.md uses tables for IA, components, states, and responsive behavior. The additional Content and Asset Rules section carries a real publication-data contract rather than duplicating the brief (`EXPERIENCE.md:210-214`).

### Findings
- None.

## 7. Inheritance discipline — adequate
All `sources` entries resolve (`DESIGN.md:7-9`, `EXPERIENCE.md:6-9`), including EXPERIENCE.md's DESIGN.md reference. EXPERIENCE token references resolve to DESIGN tokens (`EXPERIENCE.md:132,134`). The public-language override and selected art direction agree with the decision log (`.memlog.md:18,28,36,44,57,61`) rather than retaining superseded source assumptions.

### Findings
- **low** The external action has three names that require consumer inference: `button-primary`/`button-secondary` in frontmatter (`DESIGN.md:64-71`), `External CTA` in the visual body (`DESIGN.md:176-178`), and `Button Primary`/`Button Secondary` in behavioral patterns (`EXPERIENCE.md:92-93`). This misses the rubric's exact component-name inheritance rule. *Fix:* choose `button-primary` and `button-secondary` as canonical IDs and use those exact names in the body heading and Component Patterns table, with readable labels as secondary text.

## 8. Shape fit — strong
DESIGN.md uses the complete canonical section order (`DESIGN.md:102-184`). EXPERIENCE.md contains every required default section in order and includes both triggered sections: Responsive and Platform for its breakpoint contract, and Inspiration and Anti-patterns for the recorded direction choices (`EXPERIENCE.md:12-214`). Its product-specific Content and Asset Rules section earns its place as a downstream data rule.

### Findings
- None.

## Mechanical notes
- No unresolved source links, token paths, or promoted-mock links were found. No Mermaid diagrams are present.
- Product-type filtering is deliberately deferred until URL behavior, empty state, and keyboard semantics are decided (`DESIGN.md:160-162`, `EXPERIENCE.md:41`); its absent control and states are not defects.
- Analytics provider, consent basis, retention, and privacy notice are expressly reserved for architecture and legal decisions (`../../briefs/brief-websiteDraft-2026-09-28/brief.md:65-67`, `EXPERIENCE.md:127`); this is not a missing UX commitment.
