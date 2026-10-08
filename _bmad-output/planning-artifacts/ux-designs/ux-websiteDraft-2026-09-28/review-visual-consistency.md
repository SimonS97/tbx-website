# Visual Consistency Review

## Overall verdict

**Needs revision before visual-consistency gate approval.** The two final mockups successfully carry the approved Astral Threshold world, the desktop Astral Spread, one intentional Astral Rule, the continuous Work Index, the English public UI, and the Evidence Reader. However, two explicitly approved continuation cues are not visible in practical initial viewports. This is a hierarchy and route-discovery failure, not an objection to the selected cinematic visual direction.

Finding counts: Critical 0, High 2, Medium 2, Low 1.

## Findings sorted by severity

### High

#### H-01 - The mobile Home opener does not satisfy the approved first-viewport discovery contract

**Exact locations:** `mockups/home-astral-threshold-work-index.html:89-96, 135-146, 200-245, 262-282`; `DESIGN.md:152-159`; `EXPERIENCE.md:146-151`; `.memlog.md:34, 44`.

At a 390 x 844 CSS viewport, the opener extends from about y=74 to y=1236, while the Astral Rule begins at about y=1104. The screen shows the opening copy and only the upper part of the fanned cards; neither `All published works` nor `Continue through the portfolio` is visible. The approved contract requires the navigation, route premise, spread, and collection cue in every practical first viewport. This makes the second act undiscoverable at the moment where the approved journey requires it to be signaled.

**Minimal fix:** Preserve the fanned-card composition, but compact or rebalance the less-than-768px opener so the existing Astral Rule phrase and its anchor are visible in the first practical viewport. Do not add a second cue or replace the approved Astral Rule; validate at 375px and 390px across short mobile viewport heights.

#### H-02 - The Product evidence cue repeats the previously rejected distant-divider problem

**Exact locations:** `mockups/product-detail-abythera-evidence-reader.html:97-105, 194-205, 274-316, 336-361`; `DESIGN.md:164-170`; `EXPERIENCE.md:43-56`; `.memlog.md:47, 58, 60`.

At 1440 x 900, the `Product evidence` cue begins at about y=959, below the viewport. At 1024 x 768, only the very top of its treatment enters the screen; its label and destination remain below the fold. At 390 x 844, the cue begins at about y=1519 after the off-screen cover. The decision specifically required an immediately visible cue that substantial material continues below the hero. The current absolute bottom placement and hero height mean it cannot perform that job on common screens.

**Minimal fix:** Re-anchor the existing cue, without introducing a second Astral Rule, so its readable label and destination remain in the initial hero viewport. This can be done by capping the hero's lower allocation on desktop and placing the same cue in normal flow immediately after the action group on narrow screens; retain its single `#product-evidence` destination.

### Medium

#### M-01 - Both final mockups render fallback typography instead of the approved type system

**Exact locations:** `mockups/home-astral-threshold-work-index.html:32, 99-103`; `mockups/product-detail-abythera-evidence-reader.html:32, 154-160`; `DESIGN.md:24-46, 116-120`.

The mockups explicitly use `Arial, sans-serif` for body and labels and `Georgia, serif` for display headings. The approved system specifies Atkinson Hyperlegible for practical reading and Source Serif 4 for display type. This changes the intended reading face, label density, and headline proportions across both canonical references, rather than simply exercising a browser fallback.

**Minimal fix:** Load or locally declare Source Serif 4 and Atkinson Hyperlegible, then apply the approved display, body, and label tokens in both mockups. Recheck the existing line lengths and headline wraps after the font change.

#### M-02 - Desktop primary-navigation links do not meet the specified focus and touch-target floor

**Exact locations:** `mockups/home-astral-threshold-work-index.html:77-83, 255-259`; `mockups/product-detail-abythera-evidence-reader.html:85-95, 328-332`; `DESIGN.md:144-146`; `EXPERIENCE.md:129-137`.

The desktop `.nav-links a` elements have no padding, minimum dimension, or distinct focus outline; the 4.6rem navigation bar does not enlarge the inline anchor hit areas. Their focus treatment is only a color change. This misses the required visible focus ring and 44 x 44 CSS-pixel compact-control floor, reducing keyboard clarity and making the short desktop labels less reliable touch targets.

**Minimal fix:** Make each desktop navigation link an inline-flex 44 x 44 CSS-pixel target with restrained horizontal padding, and add a visible `focus-visible` ring or underline using the approved focus color. Keep the resulting desktop navigation on one line.

### Low

#### L-01 - The global navigation does not communicate the active internal destination

**Exact locations:** `mockups/home-astral-threshold-work-index.html:255-259`; `mockups/product-detail-abythera-evidence-reader.html:328-332`; `DESIGN.md:144-146`; `EXPERIENCE.md:83-85`.

Neither final mockup marks its current internal route programmatically or with the required saffron active indicator. In particular, `Works` is visually identical to the other links on the Abythera detail page even though it is the active catalog branch. This is a small but direct orientation inconsistency in the shared navigation system.

**Minimal fix:** Add `aria-current="page"` to the appropriate current route and render the approved restrained saffron line. Treat the Home maker-mark consistently as the active Home destination when applicable.

## Passes

- Astral Threshold uses the approved desktop and mobile asset roles on Home, remains product-neutral, and continues as the shared mineral-blue visual world on the product detail page.
- The desktop Astral Spread presents three real intent-led routes with prominent cover art, visible non-hover labels, purposeful focus and hover feedback, no automatic card motion, and a reduced-motion fallback.
- The Home mockup uses one centered saffron Astral Rule with the approved copy, avoids a fog seam, and keeps the Work Index in the same continuous field without a second broad catalog cutoff.
- Home visibly includes the complete three-work index while the global navigation and detail back route expose `/works`, representing the approved guided-Home plus canonical-direct-catalog strategy.
- The Work Index preserves the same decision-first order for every entry: artwork, classification, title and premise, verified facts, then the internal detail route. It avoids the rejected equal marketplace grid, staggered catalog, v1 filtering, and carousel behavior.
- The Abythera page follows the approved information sequence into the Evidence Reader without a duplicate Astral Rule or an intervening generic introductory chapter.
- The Evidence Reader uses a compact ordered index, updates the selected item and practical context in place, displays the original asset at useful scale, and retains the direct `Open full page` or `Open full artwork` route.
- Selected Evidence Reader originals sit directly on the shared stage field without decorative card backplates or drop shadows. Their native edges and caption rule provide the intended separation.
- Full-size inspection was exercised in the final mockup: changing evidence updates the selected state and live text, Escape closes the dialog, backdrop click closes it, and the direct original route remains available.
- Public interface copy and action labels are English. The potential German source evidence is given English surrounding context, as approved.
- The mockups avoid the rejected generic-fantasy and commerce patterns: no AI-purple fog, parchment, candles-and-runes decoration, particle field, generic marketplace grid, checkout behavior, urgency copy, or purchase simulation.
