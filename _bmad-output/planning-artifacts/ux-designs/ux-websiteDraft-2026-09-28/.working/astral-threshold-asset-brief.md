# Astral Threshold Asset Brief

## Purpose

Create the single visual world behind the Tales by Xero home opener. It must support the Astral Spread card selector and dissolve without a visible seam into the Works catalog. It is not a product cover, a game scene, or a decorative particle background.

The threshold is a distant, monumental, abstract celestial formation: the moment before a party chooses where to go next.

## Non-negotiable Composition Rules

- No readable text, logos, interface elements, product names, cards, sigils, or glyphs embedded in the art.
- No central person, character portrait, party, creature, weapon, dragon, or product-specific narrative scene.
- No generic purple-blue AI nebula, floating planets, starship, cyberpunk glow, or Vanta-like particle field.
- The image must remain dark enough for nearby HTML copy, but still contain a memorable focal world.
- Saffron light is rare and structural: it marks the threshold, never becomes a broad gold glow.
- The lower third must become quieter and less detailed so it can fade naturally into the Night Deep catalog field.
- The asset must be delivered without baked text overlays. All copy remains semantic HTML.

## Master Visual Direction

**Name:** Astral Threshold

**World:** An immense, almost architectural threshold suspended in deep mineral-blue space. It is formed from faint stone-like arcs, fractured celestial geometry, and one contained saffron-white source of light. It should feel ancient, immense, precise, and quiet rather than magical in a fantasy-stock-art sense.

**Material language:** dark mineral stone, cold silver dust, restrained star fields, barely perceptible atmospheric mist, thin saffron edge light. The world has depth but does not need visible moving particles.

**Narrative role:** It suggests that there are multiple possible stories beyond the threshold. It must not decide which Work the visitor should choose.

## Required Asset Set

### 1. Desktop Master Background

- Deliver at least `3840 x 2400` pixels, landscape, 16:10.
- Keep the image source lossless or high-quality PNG/TIFF. Web derivatives can be generated later.
- The visual center of gravity sits around `64%` horizontal / `40%` vertical, behind the Astral Spread.

Safe zones:

- Top `10-12%`: dark, quiet navigation-safe band.
- Left `6-39%`, from roughly `17-70%` height: low-detail copy-safe area for headline and supporting copy.
- Right `42-96%`, roughly `20-78%` height: lower-contrast card-safe stage. The threshold may be visible behind the cards but must not compete with their covers.
- Lower-left `0-43%`, roughly `78-96%` height: quiet cue-safe area for `Continue through the portfolio`.
- Bottom `25-35%`: simplify gradually into Night Deep / Mineral tones. No hard horizon, frame edge, or visual wall.

Prompt:

```text
Create a premium cinematic web background asset, 16:10 landscape, for an indie tabletop roleplaying portfolio called Tales by Xero. Deep mineral-blue near-black astral space, a monumental abstract celestial threshold positioned slightly right of center, built from faint broken stone arcs, restrained silver cosmic dust, and a single contained saffron-white point of light. The threshold feels ancient, immense, quiet, precise, and architectural, not a literal fantasy gate. The left third is intentionally dark and visually quiet for large white editorial headline text. The right half has controlled depth but remains calm enough for three physical tarot-like product cards to float in front. The bottom third gradually dissolves into a quiet navy-black field with no visible horizon so a product catalog can continue seamlessly below. Fine star detail only, high-end filmic lighting, subtle atmospheric haze, deep contrast, elegant material realism, no glow overload.

No people, no faces, no characters, no creatures, no dragons, no weapons, no ships, no planets, no tarot cards, no embedded text, no logos, no runes, no readable symbols, no UI, no purple-blue AI nebula, no bright rainbow galaxy, no generic fantasy poster composition.
```

### 2. Mobile Recomposition

- Deliver at least `2160 x 3840` pixels, portrait, 9:16.
- This is a new composition in the same world, not a destructive crop of the desktop asset.

Safe zones:

- Top `8-14%`: navigation-safe band.
- `12-34%` height: low-detail headline-safe area.
- `36-74%` height: open card-safe stage for the vertical fanned cards.
- `76-94%` height: quiet cue-safe threshold fade.

Prompt:

```text
Create the mobile portrait companion to the same Astral Threshold web background, 9:16. Preserve the same deep mineral-blue near-black world, restrained silver dust, ancient abstract threshold geometry, and rare saffron-white point of light. Recompose it for a phone: quiet dark upper third for readable HTML headline text, threshold structure framing but not occupying the center, a clear low-contrast middle stage for a fanned set of product cards, then a gradual dark mineral fade in the lower quarter for a seamless continuation into a catalog. Cinematic and premium, calm rather than busy, no embedded typography.

No people, no characters, no creatures, no weapons, no product covers, no cards, no logos, no text, no symbols, no generic purple galaxy, no bright colored nebula, no decorative particle storm.
```

### 3. Optional Continuation Cap

Only create this after the desktop master is visually approved.

- Deliver `3840 x 1280` pixels, 3:1.
- It is a low-detail continuation of the same threshold atmosphere, designed to fade into the catalog header.
- It must not contain a new focal object.

Prompt:

```text
Create a wide 3:1 continuation cap for the same Astral Threshold world. Deep mineral-blue night, faint residual stone-arc geometry and sparse silver dust receding upward, with the lower half dissolving into quiet navy-black. No focal object, no text, no characters, no symbols. It must visually merge with a 16:10 celestial threshold hero above and an editorial Works catalog below.
```

## Implementation Contract

1. Use the Desktop Master as a fixed-size decorative world layer for the opener, not as an inline content image.
2. Keep headline, cards, scroll cue, catalog title, and catalog rows as normal semantic HTML above it.
3. Mask the lower edge of the Desktop Master into the same CSS Night Deep / Mineral base used beneath the catalog. The invisible transition comes from the shared base color and mask, not from forced global smooth scrolling.
4. Add a single desktop-only enhancement only after the static composition works: an unpinned GSAP ScrollTrigger sequence can move the background layer slightly downward and lower its opacity through the last third of the hero.
5. Do not pin, snap, hijack, smooth, or otherwise control document scrolling. Do not use Lenis or Vanta for this effect.
6. At small widths and with `prefers-reduced-motion: reduce`, render the same continuous scene statically with no scroll-linked movement.
7. Optimize source assets into responsive AVIF/WebP derivatives before shipping. Do not emit the original source image to every viewport.

## Acceptance Checks

- At 1440px and 1024px, the first viewport shows navigation, the full first-choice premise, the three-card spread, and `Continue through the portfolio` without scroll.
- At 375px and 768px, there is no destructive crop over copy, cards, or the cue.
- The visitor cannot identify a hard visual boundary between the hero and catalog.
- The opening remains fully understandable with JavaScript disabled or reduced motion enabled.
- The background supports the works; it never becomes more important than their covers or decision information.
