---
name: Tales by Xero
description: A vivid mythic portfolio for table-tested Daggerheart adventures, staged as invitations into playable scenes.
status: draft
created: 2026-09-28
updated: 2026-09-28
sources:
  - ../../briefs/brief-websiteDraft-2026-09-28/brief.md
  - ../../../brainstorming/brainstorm-tales-by-xero-art-directions-2026-09-28/direction-comparison.html
colors:
  night-mineral: '#132952'
  night-deep: '#0B1732'
  stage-saffron: '#F0C65E'
  danger-coral: '#E87067'
  chalk: '#F6F3EB'
  mist-blue: '#D8E0E8'
  slate-ink: '#182542'
  focus-ring: '#F6F3EB'
typography:
  display:
    fontFamily: 'editorial display serif, fallback serif'
    fontSize: 'clamp(3rem, 8vw, 8.5rem)'
    fontWeight: '400'
    lineHeight: '0.82'
    letterSpacing: '-0.065em'
  title:
    fontFamily: 'editorial display serif, fallback serif'
    fontSize: 'clamp(2.4rem, 5vw, 5.5rem)'
    fontWeight: '400'
    lineHeight: '0.9'
  body:
    fontFamily: 'humanist sans-serif, fallback sans-serif'
    fontSize: '1rem'
    fontWeight: '400'
    lineHeight: '1.55'
  label:
    fontFamily: 'humanist sans-serif, fallback sans-serif'
    fontSize: '0.75rem'
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: '0.14em'
rounded:
  sm: '0px'
  md: '0px'
  lg: '0px'
  full: '9999px'
spacing:
  '1': '0.5rem'
  '2': '0.75rem'
  '3': '1rem'
  '4': '1.5rem'
  '5': '2.25rem'
  '6': '3.5rem'
  '7': '5.5rem'
  '8': '8rem'
  gutter: 'clamp(1.25rem, 5vw, 5rem)'
  gutter-mobile: '1.25rem'
components:
  button-primary:
    background: '{colors.stage-saffron}'
    foreground: '{colors.night-mineral}'
    border: '{colors.stage-saffron}'
    radius: '{rounded.sm}'
  button-secondary:
    background: 'transparent'
    foreground: '{colors.chalk}'
    border: '{colors.mist-blue}'
    radius: '{rounded.sm}'
  product-type-label:
    foreground: '{colors.stage-saffron}'
    font: '{typography.label}'
  product-card:
    border: '{colors.mist-blue}'
    radius: '{rounded.sm}'
  spotlight-caption:
    background: '{colors.night-deep}'
    foreground: '{colors.mist-blue}'
    accent: '{colors.stage-saffron}'
---

# Brand & Style

Tales by Xero is a mythic stage, not a fantasy storefront. Each work is introduced as the moment a group steps into a dangerous, strange, or promising scene. The visual language is cinematic and composed, but never ornamental for its own sake: images, titles, and color changes direct attention toward a playable premise.

The system inherits the discovery instinct of the Wayfinder's Field Guide. Different products may carry different moods, but they all enter through the same dramatic frame: product type, premise, a vivid hook, and a clear route to DriveThruRPG. The brand mark appears as a rare maker's seal, not as persistent decoration.

# Colors

{colors.night-mineral} is the dominant stage night and default page field. {colors.night-deep} holds captions, navigation states, and visual recesses. {colors.stage-saffron} is literal stage light: it identifies the primary action, selected moments, and product type labels. It is never used as a broad background or a glow.

{colors.danger-coral} is scarce. It marks danger, a pivotal story reveal, or a single high-energy image treatment; it never labels normal UI states. {colors.chalk} and {colors.mist-blue} carry reading. Text remains on opaque or reliably dark surfaces, never directly over uncontrolled imagery.

# Typography

{typography.display} and {typography.title} make story and product names feel staged and authored. The final serif selection must retain clear italics, tabular numerals where required, and German-language support. {typography.body} stays plain, modern, and highly legible so the page never becomes a faux-manuscript.

Use {typography.label} for product types, scene markers, and small navigational metadata. Labels are selective: no repeating eyebrow above every section. Body copy remains at or above {typography.body.fontSize}; long lore is never set as decorative display text.

# Layout & Spacing

Desktop layouts use generous gutters {spacing.gutter}, asymmetric two-column hero compositions, and a limited number of deliberate full-bleed image moments. Product galleries vary image ratio and span according to story importance, while their metadata remains aligned to a stable reading edge.

Mobile collapses every composition to a direct vertical reading order: product type, title, premise, image, hook, CTA. Spacing uses {spacing.gutter-mobile}; image art may bleed to the screen edge only when text retains its own safe, opaque field. No content relies on hover, horizontal drag, or a pinned-scroll effect.

# Elevation & Depth

Depth comes from tonal stage layers, hard framing lines, image crop, and occasional overlap. Use no floating glass panels, diffuse card shadows, or generic blur. A spotlight caption may overlap an image edge when its text stays on {colors.night-deep}. Separators are thin and purposeful, similar to theatre blocking marks.

# Shapes

All structural corners use {rounded.sm}. Primary and secondary CTAs remain rectangular. Pills are reserved for compact, nonessential status markers only; no pill-heavy interface. This system should feel cut, framed, and staged rather than soft or app-like.

# Components

## Navigation

Navigation is quiet and one line on desktop: maker mark, Works, About, Ko-fi. The active destination receives a saffron rule or underline, not a filled tab. On mobile, a plainly labeled menu exposes the same destinations and retains the visible focus treatment {colors.focus-ring}.

## Product spotlight

A spotlight contains a product type label {components.product-type-label}, title, premise, one spoiler-safe hook, image, and one primary external action {components.button-primary}. The image can own scale, but the type, premise, and CTA must remain readable without it.

## Product gallery tile

{components.product-card} uses image first, then product type, title, and a short premise. It is a linkable editorial object, not a generic rounded card. Tile sizes vary, but tile information order never does.

## External CTA

{components.button-primary} says "Auf DriveThruRPG ansehen" or a similarly explicit destination. It includes an external-link icon with accessible text. Hover darkens by tonal shift; keyboard focus uses a clearly visible {colors.focus-ring} outline.

## Lore hook

The lore hook is a short, spoiler-safe invitation, not a paragraph of synopsis. It appears as a caption or marginal stage note and uses {components.spotlight-caption}. Never hide essential product eligibility or CTA information inside a reveal.

# Do's and Don'ts

Do stage one compelling product detail at a time. Do let content tone change per work inside the fixed mineral-blue and saffron system. Do use existing product art as the primary visual evidence. Do keep product type and destination clearer than the mood effect.

Do not use AI-purple gradients, generic parchment, candles-and-runes decoration, full-page particle fields, or an equal-size card grid. Do not make every section dark red or horror-coded. Do not use unbounded animation, fake testimonials, fake metrics, or pressure-oriented sales UI. Do not rely on an image alone to communicate product purpose.
