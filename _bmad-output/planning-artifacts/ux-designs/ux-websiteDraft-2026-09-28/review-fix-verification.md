# Reviewer-Gate Fix Verification

Reviewed current `DESIGN.md`, `EXPERIENCE.md`, and the two approved static mockups. Source evidence was checked against the current files; stated runtime observations were exercised in Chrome 153 against the local mockups.

## Status Summary

| Status | Count |
|---|---:|
| Resolved | 11 |
| Partially resolved | 1 |
| Unresolved | 0 |

## Previous High and Medium Findings

| Previous finding | Status | Exact current evidence |
|---|---|---|
| Rubric medium: responsive display-token contract | **Resolved** | `DESIGN.md:36-77` defines named Home and detail display roles; `DESIGN.md:164` maps their desktop and small-width ranges. Those values match the approved H1 rules in `mockups/home-astral-threshold-work-index.html:110,227` and `mockups/product-detail-abythera-evidence-reader.html:166,307`. |
| Rubric medium: no terminal media-failure treatment | **Resolved** | `EXPERIENCE.md:108` now defines `Medium nicht verfuegbar`: retain the reserved surface and context, show existing alt/caption context, and suppress inspection and direct-original routes without replacement art. |
| Accessibility H1: skip link did not bypass navigation | **Resolved** | Both mockups place `nav` before `main` and target focusable `#main-content`: Home `:275,278-285`; detail `:329,332-339`. At 375x812, activating the skip link focused `main-content`; the next Tab reached Home's first choice card and detail's `All published works` link, not global navigation. |
| Accessibility H2: insufficient visible keyboard focus | **Resolved** | Explicit saffron-light focus outlines are applied to Home links at `home-astral-threshold-work-index.html:87,94,194` and detail links at `product-detail-abythera-evidence-reader.html:95,102,223`. The rules use a `.18rem` outline and positive offset rather than color or motion alone. |
| Accessibility M1: Home continuation cue outside/incomplete in first viewport | **Partially resolved** | The small/tablet reflow places the threshold in opening grid row 3 (`home-astral-threshold-work-index.html:207-210`), and Chrome measured the full cue at 375x812 (y=728.3-801.6) and 768x900 (y=752.4-886.4). At desktop widths it remains incomplete: 1024x900 is y=788.7-922.8, and 1440x1000 is y=910.2-1051.2. The latter also clips the cue text by 2.9px and the arrow is below the viewport. |
| Accessibility M2: lazy Evidence Reader image reserved no space | **Resolved** | The preview reserves a minimum footprint at `product-detail-abythera-evidence-reader.html:236-237,320`, and the image has intrinsic `width="1040" height="1476"` at `:394`. Before the lazy asset loaded at 390px, Chrome reported `naturalWidth: 0` while the preview/image still occupied 343x514.8px. |
| Accessibility M3: mobile menu stayed open after desktop resize | **Resolved** | Both `closeMenu()` functions set `hidden=true` and `aria-expanded=false` (Home `:359-362`; detail `:431-434`), and the `(min-width: 48rem)` listener invokes them on transition (Home `:377-380`; detail `:449-452`). At 375px the menu opened with `hidden=false`/`aria-expanded=true`; after resizing to 768px it was `hidden=true`/`aria-expanded=false`. |
| Accessibility M4: standalone targets below 44px | **Resolved** | Navigation links are `inline-flex` with `min-width` and `min-height: 2.75rem` in Home `:84` and detail `:92`; other standalone routes retain at least `min-height: 2.75rem` (Home `:81,88,92,198`; detail `:89,96,100,134,187,243,275`). Chrome found no visible interactive target below 44x44px at 375px or 1440px. |
| Visual H-01: mobile Home opener lacked the first-viewport discovery cue | **Resolved** | The opening has a fixed available-height grid with its threshold in normal flow at small/tablet widths (`home-astral-threshold-work-index.html:207-210`) plus short-height compaction (`:254-268`). The complete Astral Rule was visible at 375x812 (y=728.3-801.6) and 390x844 (y=760.3-833.6). |
| Visual H-02: Product evidence cue was distant from the initial hero | **Resolved** | The cue is in normal content flow immediately after the hook (`product-detail-abythera-evidence-reader.html:200-209,344-350`). It was fully visible in Chrome at 375x812 (y=544.9-649.6), 1024x768 (y=515.5-599.4), and 1440x900 (y=602.0-693.9). |
| Visual M-01: mockups used fallback typography | **Resolved** | Both mockups declare Source Serif 4 and Atkinson Hyperlegible faces (Home `:13-15`; detail `:13-15`) and apply them to body/display rules (Home `:36,109`; detail `:36,165`). Chrome reported all three declared faces loaded; computed body and H1 families were Atkinson Hyperlegible and Source Serif 4 respectively. |
| Visual M-02: desktop primary navigation lacked focus and target floor | **Resolved** | The shared navigation now has 44px minimum link boxes and explicit focus outlines (Home `:84-87`; detail `:92-95`). This is also confirmed by the rendered 1440px target check cited for Accessibility M4. |

## Required Current-Artifact Checks

| Check | Result | Exact evidence |
|---|---|---|
| Documented fonts | **Confirmed** | The approved faces are declared and loaded as above; `DESIGN.md:26,37-76,79,84` documents the same Source Serif 4 and Atkinson Hyperlegible families. |
| Navigation outside main and effective skip targets | **Confirmed** | Home `nav`/`main`: `home-astral-threshold-work-index.html:278,285`; detail: `product-detail-abythera-evidence-reader.html:332,339`. Runtime skip behavior is recorded under Accessibility H1. |
| Menu reset after desktop breakpoint | **Confirmed** | Runtime and source evidence are recorded under Accessibility M3. |
| First-viewport continuation cues at contracted widths | **Partially confirmed** | Product detail cue is fully visible at tested small and desktop dimensions. Home cue is fully visible at 375px and 768px, but not fully visible at 1024x900 or 1440x1000; see Accessibility M1. |
| Reserved Evidence Reader media footprint | **Confirmed** | Source and unloaded-image runtime evidence are recorded under Accessibility M2. |
| Visible focus and 44px minimum targets | **Confirmed** | Source and rendered-target evidence are recorded under Accessibility H2 and M4. |
| No v1 filter UI | **Confirmed** | The only Home catalog control is the released-work count (`home-astral-threshold-work-index.html:163-165,318`). The approved mockups contain no filtering form, input, select, or filter control; this agrees with `DESIGN.md:208` and `EXPERIENCE.md:41,89`. |
