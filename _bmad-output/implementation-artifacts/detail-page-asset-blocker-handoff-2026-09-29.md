# Detail page asset blocker handoff

## Current state

Story 2.4's Hero-only detail-page implementation exists in the working tree but is not committed. Its layout-overflow bugs were corrected: detail pages use a dedicated wide shell, the desktop grid no longer overlaps text and hero art, and title sizing is constrained to the available text column.

Product-copy feedback was also applied in the working tree:

- Abythera now distinguishes the included Karrhold mission from its recommended 12+ mission campaign arc, and puts the included materials first.
- Ephemera uses `Character tier: Tier 1 characters`.
- The Daggerheart Item Bundle prioritizes 120+ unique items, printable variants, and Item Volumes 1-4; evolving items remain a supporting feature.
- Generic section names were replaced with `Inside`, `At the table`, and `A note from Xero`.
- The former oversized hook treatment is now quieter italic context copy.

`npm run lint` and `npm run build` pass as of this handoff. The build covers Astro, Works fixtures, Published-Work validation, static detail-page checks, and emitted Hero-asset presence.

## Blocking assets

### Ephemera media

All currently supplied Ephemera PNG files are not reliably decodable as standard images:

- `src/assets/works/ephemera/hero-cover.png`
- `src/assets/works/ephemera/underground-city-scene.png`
- `src/assets/works/ephemera/orion-npc-portrait.png`
- `src/assets/works/ephemera/lyra-portrait.png`
- `src/assets/works/ephemera/vespera-portrait.png`
- `src/assets/works/ephemera/vespera-tattoo-portrait.png`
- `src/assets/works/ephemera/gm-cheat-sheet-1.png`

Evidence:

- Astro's metadata processing fails for `hero-cover.png` with `NoImageMetadata`.
- The Windows `System.Drawing.Image.FromFile()` decoder fails for the source and the copied build output with `OutOfMemoryException`, which indicates malformed or unsupported image encoding rather than actual memory pressure.
- The browser displays the Hero image as a broken image with its alt text even when the source URL is present in the built HTML.

The current code uses `?url` imports to avoid Astro metadata parsing, but this cannot make a browser-decodable image out of a malformed source. No Ephemera asset was generated, edited, converted, moved, or deleted.

### Daggerheart compatibility asset

The supplied file `src/assets/works/DH_CGL_logos_final_white_full_color.png` has a usable transparent background, but its visible official mark occupies only a small area in a very wide canvas. The current cropped display is not acceptable and does not communicate compatibility well enough.

Do not keep the current implementation as a final compatibility mark. Replace it with an official, tightly framed `Compatible with Daggerheart` asset, ideally with both the icon and approved readable wordmark, on a transparent background. The new asset should avoid large empty canvas padding.

## Required replacement assets

1. Replace `src/assets/works/ephemera/hero-cover.png` with a browser-decodable, standard PNG or JPEG export of the intended Ephemera cover.
2. If later gallery/Evidence use is planned, re-export the remaining Ephemera PNG files as browser-decodable standard PNG or JPEG files as well.
3. Replace `src/assets/works/DH_CGL_logos_final_white_full_color.png` with an official, tightly framed Daggerheart compatibility mark that is readable at compact inline size.

Keep the existing filenames when replacing files if possible. If a new filename is needed, retain kebab-case and update only the consuming component after visual inspection.

## Next session sequence

1. Confirm the newly supplied asset paths and inspect them in batches of at most three files per tool call.
2. Validate that each replacement decodes in both the local decoder and the Astro production build before changing layout or copy.
3. Update `src/components/works/WorkHero.astro` only if an Ephemera replacement uses a new filename.
4. Update `src/components/works/DaggerheartCompatibility.astro` and its styles to use the actual readable compatibility mark without CSS cropping, borders, or fabricated text treatment.
5. Run `npm run lint` and `npm run build`.
6. Manually review `/works/abythera`, `/works/ephemera`, and `/works/daggerheart-item-bundle` at desktop and mobile widths. Do not continue to Story 2.6 until the three Hero-only pages have a visually acceptable baseline.
7. After baseline approval, either commit the accumulated Story 2.4 work or explicitly continue on its dirty worktree, then proceed with Story 2.6.

## Scope boundary

The deeper Abythera explanation and the test of gallery/Evidence media are intentionally not part of the current Hero-only baseline. After the assets are stable and the basic detail pages are accepted, create a focused follow-up story for the deep-dive detail content and optional gallery/Evidence experiment.
