# Accessibility and Responsive Review

## Overall verdict

**Gate: changes requested.** There are 2 high, 4 medium, and 1 low confirmed issues in the final mockups. The largest accessibility problems are an ineffective skip link and insufficient visible keyboard focus. The responsive contract also misses the required first-viewport continuation cue, and the mobile Evidence Reader preview collapses before its lazy image loads.

Runtime observations are limited to the two supplied static HTML mockups, exercised in Chrome at 375x812, 768x900, 1024x900, and 1440x1000. This report makes no claim about unprovided production routes, assistive-technology/browser combinations not exercised, or third-party destination behavior.

## Findings sorted by severity

### High

#### H1. The skip link does not bypass the repeated navigation

**Locations:** `mockups/home-astral-threshold-work-index.html:252-260`; `mockups/product-detail-abythera-evidence-reader.html:325-333`; accessibility contract in `EXPERIENCE.md:129-135`.

**Confirmed:** Activating `Skip to main content` moves focus to `#main-content`, but that `main` contains the global `nav`. The next Tab lands on the brand link, so a keyboard user has not skipped the repeated navigation. This also places global site navigation inside the main-content landmark.

**Minimal fix:** Place the global `nav` before `main` and retain `#main-content` as the skip target, or target a focusable first-content element after the nav. Verify that the next Tab after activation reaches the page content rather than the brand/navigation.

#### H2. Several primary links have no reliably visible keyboard-focus indicator

**Locations:** `mockups/home-astral-threshold-work-index.html:79-83`; `mockups/product-detail-abythera-evidence-reader.html:150-152`, `180-186`, and `269-272`; focus requirement in `EXPERIENCE.md:131-136`.

**Confirmed:** Home navigation relies on a mist-to-gold color shift and a browser-default 1px dark outline; in Chrome, the focused outline resolves to near-black on the dark stage and the two text colors have only about 1.01:1 contrast with each other. Detail primary, secondary, back, and next-work links suppress their outline and rely on subtle color, icon, or 2.6px transform changes. This does not provide a consistent, high-visibility focus treatment.

**Minimal fix:** Apply one explicit, persistent `:focus-visible` ring to all interactive links and buttons, for example a 3px `--gold-light` outline with a dark-background-safe offset. Do not replace the ring with color or motion alone.

### Medium

#### M1. The required first-viewport continuation cue is outside or incomplete at every required viewport

**Locations:** `mockups/home-astral-threshold-work-index.html:89-96`, `135-146`, and `200-245`; contract in `DESIGN.md:154-159` and `EXPERIENCE.md:140-151`.

**Confirmed:** The `Continue through the portfolio` control begins at y=1064 in the 375x812 viewport and y=1140 in the 768x900 viewport. At 1024x900 its arrow extends below the viewport; at 1440x1000 the title ends at y=1003 and the arrow begins at y=1014. The full required cue is therefore not visible in the practical first viewport as specified.

**Minimal fix:** Reflow the mobile/tablet opening and put the threshold in normal flow, or reduce the opening/spread footprint so the complete continuation control is visible at the tested viewport heights. Recheck all four contract widths with realistic heights.

#### M2. The lazy Evidence Reader image initially has a 0 by 0 layout box and reserves no space

**Locations:** `mockups/product-detail-abythera-evidence-reader.html:229-234` and `386-387`; static-media contract in `EXPERIENCE.md:103-110`.

**Confirmed:** At 375px before scroll, `#evidence-image` has `naturalWidth: 0` and its focusable preview link is 0 by 0 because `loading="lazy"` is combined with no intrinsic dimensions or aspect ratio. When it becomes eligible to load, it expands to 343 by 487px. This causes layout shift and temporarily leaves the preview without a usable visible target.

**Minimal fix:** Reserve the asset's final aspect ratio on `.evidence-preview` or the image, and provide matching intrinsic `width` and `height` attributes. Keep lazy loading only after the layout footprint is reserved.

#### M3. An open mobile menu remains visible after resizing into the desktop breakpoint

**Locations:** `mockups/home-astral-threshold-work-index.html:82-87`, `216-220`, and `327-347`; `mockups/product-detail-abythera-evidence-reader.html:90-95`, `296-300`, and `419-438`.

**Confirmed:** Opening `Menu` at 375px and resizing to 768px hides the trigger but leaves `aria-expanded="true"` and the previously unhidden `.mobile-menu` visible as a duplicate desktop overlay. The declared desktop navigation and mobile-menu state are then inconsistent.

**Minimal fix:** On the breakpoint transition to desktop, close the menu and synchronize `hidden` and `aria-expanded`; alternatively enforce a desktop rule that hides the mobile popup while also resetting its ARIA state.

#### M4. Several standalone link targets are below the documented 44px minimum

**Locations:** `mockups/home-astral-threshold-work-index.html:77-87` and `192-193`; `mockups/product-detail-abythera-evidence-reader.html:85-95`, `239-242`, and `269-272`; target-size floor in `EXPERIENCE.md:129-138`.

**Confirmed:** At 1440px, the desktop nav links render at approximately 50x12px, 46x12px, and 123x12px; the brand link is 32px high, the home footer route is 15px high, and the detail next-work route is 31px high. These are standalone controls, not inline prose links, and do not meet the stated 44 by 44 CSS-pixel target floor.

**Minimal fix:** Give standalone navigation and route links a 44px minimum hit area through padding or an inline-flex/block layout while preserving their visual rhythm.

### Low

#### L1. The current internal route is not programmatically marked

**Locations:** `mockups/home-astral-threshold-work-index.html:255-259`; `mockups/product-detail-abythera-evidence-reader.html:328-332`; navigation contract in `EXPERIENCE.md:83-86`.

**Confirmed:** Neither final mockup contains `aria-current`, despite the specification requiring the active internal path to be programmatically marked. The home brand link and the Works ancestor on the detail route provide no current-location state.

**Minimal fix:** Add the appropriate `aria-current` value to the current page or active route ancestor and keep its visual active treatment synchronized with that state.

## Passes

- Both mockups declare `lang="en"`, have one visible `h1`, retain logical heading progression, use named primary-navigation landmarks, and provide meaningful product-image alt text while hiding decorative marks from assistive technology.
- The Work Index and Evidence Reader use ordered lists; Evidence Reader choices are native buttons, expose a selected state with `aria-pressed`, preserve button focus on selection, update the selected context and direct route, and write a polite live confirmation. These behaviors were exercised in Chrome.
- The Evidence Reader uses a native modal `dialog`. In Chrome, opening the preview moved focus into the dialog, Escape returned focus to the preview trigger, backdrop clicks closed it, and the separately available direct asset route remained available.
- The small-width menu exposes `aria-expanded`, hides its links while closed, and its Escape handler closes the menu and restores focus to the trigger. The resize-state defect above is the exception.
- `Open full page/artwork in new tab` accurately discloses the new tab and uses `rel="noopener"`; Ko-fi is visibly labelled external, and DriveThruRPG links clearly name their destination.
- Both mockups include a reduced-motion override. Chrome reduced-motion testing changed smooth scrolling to `auto` and reduced animation/transition duration to effectively immediate.
- No horizontal document overflow was observed at 375, 768, 1024, or 1440px in the supplied mockups. The 375px detail layout stacks the Evidence Reader index before the selected evidence, and the 768px version uses the permitted two-column index.
- Nominal design-token text pairs meet AA on the declared dark surfaces, including mist and muted text. Contrast over the raster background and asset imagery remains a production-render validation item rather than a confirmed mock defect.
- A visible dialog close button is not reported as missing: `.memlog.md:58` explicitly records the approved pattern of Escape or backdrop dismissal without one.
