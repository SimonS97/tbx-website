---
title: Tales by Xero Experience Specification
status: draft
created: 2026-09-28
updated: 2026-09-28
sources:
  - ../../briefs/brief-websiteDraft-2026-09-28/brief.md
  - DESIGN.md
---

# Foundation

Tales by Xero is a responsive public web portfolio and promotional gallery. It has no commerce, account, subscription, or checkout behavior. `DESIGN.md` is the visual identity authority; this document defines information architecture, interactions, states, and accessibility behavior.

The public website uses English. German source assets may appear when they document real play material, but their role must be clear through surrounding English context. Content architecture may later support localized product fields without changing the visual system.

# Information Architecture

## Global destinations

- **Startseite:** Brand promise, featured works, table-tested proof, product discovery, quiet Ko-fi invitation.
- **Werke:** Filterable or grouped product gallery by product type, with no cart or pricing comparison behavior.
- **Produktdetail:** A dedicated discovery page for each work, leading externally to DriveThruRPG.
- **Über Tales by Xero:** A short creator and method statement: played with real groups, then polished for publication.
- **Ko-fi:** External, clearly labeled route for spam-free release updates.

## Startseite sections

1. Compact scene header: a concise creator promise, one atmospheric image treatment, and immediate entry into product discovery. It must not consume the first viewport with empty stage space.
2. **Find your next session:** up to three intent-led product routes, visible above the fold on desktop and beginning within the first viewport on mobile. The routes are "Run something tonight" for a One-Shot, "Build a campaign around it" for a Campaign Framework, and "Bring something to the table" for a released item-oriented product. A route is omitted when no strong released product represents it.
3. Featured work depth: the selected route foregrounds its product type, premise, image, spoiler-safe hook, and an explicit DriveThruRPG handoff.
4. At the table: visual proof of practical play support using a real cheat sheet or a compact explanation of playtested-first publication.
5. Creator method: short text, not a biographical wall or founder story.
6. Ko-fi epilogue: a low-pressure external update route.

## Product detail anatomy

1. Product type and compatibility label.
2. Title and one-sentence premise.
3. Dominant product image or scene image.
4. "The moment" hook: one spoiler-safe NPC, location, object, conflict, or question.
5. What it brings to the table: concise practical value, such as flexible setup, GM support, or printable material.
6. Optional selected detail blocks: lore, NPC, illustration, or a cheat sheet excerpt.
7. Explicit outbound action to DriveThruRPG.
8. Next work or return to works.

# Voice and Tone

Microcopy is vivid, precise, and lightly dramatic. It speaks in concrete scenes and playable stakes, not generic fantasy superlatives. "Auf DriveThruRPG ansehen" is better than "Jetzt kaufen" because it describes the handoff truthfully. Product hooks invite rather than spoil.

Avoid AI-sounding claims such as "epic", "unforgettable", "masterfully crafted", or fabricated precision. Avoid pressure copy, countdowns, pop-ups, and false scarcity. Keep creator language grounded: "am Spieltisch erprobt" is evidence, not a grandiose slogan.

# Component Patterns

## Gallery navigation

The gallery opens each product detail in the same tab. Product type controls, if included, filter the visible collection without a page reload and expose their selected state programmatically. [ANNAHME] Initial product count is small enough that filters can be omitted in favor of grouped sections; decide after product inventory is available.

## External links

DriveThruRPG and Ko-fi links open in a new tab only if that behavior is retained consistently across the site. Every external action names its destination in visible copy or accessible text. External destinations must never resemble an internal checkout flow.

## Product compatibility

Compatibility and product type appear before lore. They use text and iconography or text alone, never color alone. Do not invent system compatibility, playtime, group-size, or content-warning data; absent data stays absent until supplied.

# State Patterns

## Loading and media

Images reserve their final aspect ratio and show a quiet tonal placeholder while loading. No animated shimmer is required. Lazy-load below-the-fold media; the hero image loads eagerly only when it is the primary largest-contentful paint element.

## Empty and incomplete catalog

If a product type has no released work, hide the category rather than showing an empty sales prompt. If the catalog contains fewer than three works, the start page presents those works as large spotlights and removes gallery density expectations.

## Outbound handoff

Outbound clicks are tracked as an intentional event only after the visitor activates the link. [ANNAHME] Tracking must work without collecting unnecessary personal data and must disclose analytics behavior in the eventual privacy information.

## Error and unavailable destination

If an external product URL is unavailable at build time, do not render a dead CTA. Show the product as "in Vorbereitung" only when the user explicitly chooses to present unreleased work; otherwise omit it from public discovery.

# Interaction Primitives

## Motion

Motion is used to reveal hierarchy, story sequence, or direct feedback. Hero and product blocks may enter with a small opacity and vertical transform reveal. A single scene spotlight may use a scrubbed reveal on desktop only if it remains understandable without the effect. All nonessential motion stops or renders its final state under `prefers-reduced-motion`.

Hovering a gallery tile may shift image crop, border tone, or caption position. Touch and keyboard receive equivalent focus and active feedback. No continuous particles, auto-rotating carousel, infinite marquee, scroll hijacking, or animation on every card.

## Product exploration

The "Find your next session" routes form a layered stage arrangement, not an equal-size card grid or auto-rotating carousel. Pointer hover and keyboard focus may bring one route's image crop and hook forward, but its label and destination are always visible. On touch, selecting a route opens its product detail page directly. The detail page starts at the title and premise, not at a decorative image fragment. Browser back returns to the prior route state where the platform supports it.

# Accessibility Floor

- Use semantic landmarks, a visible skip link, one `h1` per page, and logical heading order.
- Maintain at least WCAG AA contrast for all text; `{colors.chalk}` and `{colors.mist-blue}` appear only on reliably dark fields, while `{colors.night-mineral}` text appears on `{colors.stage-saffron}`.
- Every image has context-appropriate alt text. Decorative texture and repeated maker marks are hidden from assistive technology.
- All interactive controls work with keyboard and use `:focus-visible` based on `{colors.focus-ring}`.
- Touch targets are at least 44 by 44 CSS pixels where controls are compact.
- No meaning depends only on color, hover, motion, or image content.
- `prefers-reduced-motion` disables or completes nonessential movement; no information is hidden behind animation.

# Responsive and Platform

The site is desktop-first in composition but mobile-first in behavior. Test at 375px, 768px, 1024px, and 1440px widths. Desktop may use asymmetric side-by-side story and image staging. At small widths, the reading order is always product type, title, premise, image, hook, CTA.

Navigation collapses to a labeled menu before links wrap. Product grids become a single column before tile copy becomes cramped. Do not use fixed viewport height for content-critical hero regions; use dynamic viewport-aware minimum height only when the CTA remains visible.

# Key Flows

## Mara discovers a strange one-shot

1. Mara, a Daggerheart GM looking for something to run with her established group, arrives from a shared link or search result.
2. She sees a strong product scene, understands that Tales by Xero is playtested before publication, and notices that the work is Daggerheart-compatible.
3. She opens the featured product because the premise and one strange detail make her want context.
4. On the product detail page, she sees product type, premise, a spoiler-safe hook, and a practical "what it brings to the table" explanation.
5. **Climax:** Mara decides that the work will create a useful session for her group and activates "Auf DriveThruRPG ansehen".
6. She arrives at DriveThruRPG with clear intent, not because she was pressured by an on-site purchase mechanic.

## Jonas explores Daggerheart third-party content

1. Jonas knows Daggerheart but has not yet bought third-party material.
2. He browses Works and learns the difference between a one-shot, campaign framework, and printable item from clear product labels.
3. He opens a work whose visual scene and premise match his group's taste.
4. He recognizes that the site is an authored portfolio, not a generic marketplace, and can follow Ko-fi if he wants future release updates.
5. **Climax:** He chooses either a specific DriveThruRPG product or the low-pressure Ko-fi updates route.

# Content and Asset Rules

Existing AI-generated product art is acceptable as product-specific visual material when it is clearly curated, consistently cropped, and paired with real product information. Do not use it as generic ambient wallpaper. Each public product requires at minimum: title, product type, compatibility statement, premise, one image, external URL, and one approved story or table hook.

The supplied German cheat sheet is evidence of the table-focused method. Show it as a readable excerpt or detail image, never as illegible background texture.
