- source_spec: `_bmad-output/implementation-artifacts/spec-restore-published-work-asset-references.md`
  summary: Model a machine-readable public-approval state for gallery and evidence assets before any non-hero media renderer is introduced.
  evidence: Replacement assets retain their canonical gallery or evidence roles, while the updated art-direction readiness deliberately withholds several files from public placement; the current hero-only route and static check prevent exposure, but a later renderer needs an enforceable data contract.
- source_spec: `_bmad-output/implementation-artifacts/spec-restore-published-work-asset-references.md`
  summary: Deliver responsive, optimized detail-page heroes after target widths and image-quality requirements are approved.
  evidence: WorkHero intentionally uses raw ?url imports from the prior malformed-image workaround; the new Ephemera hero is emitted unchanged at 5,203,924 bytes, so optimization must preserve the approved no-crop presentation while reducing mobile transfer cost.
- source_spec: `_bmad-output/implementation-artifacts/spec-2-5-browse-the-curated-published-works-catalog.md`
  summary: Define responsive image formats, target widths, and quality policy for catalog and detail heroes, then use Astro derivatives without changing the approved no-crop presentation.
  evidence: Story 2.5 adds the hero-led Works catalog and prioritizes its first tile, while original hero files remain emitted unchanged; responsive output is a separate media-quality decision beyond the current curated catalog scope.
- source_spec: `_bmad-output/implementation-artifacts/spec-2-5-browse-the-curated-published-works-catalog.md`
  summary: Model creator-approved public asset placement as machine-readable Work data before allowing any broader hero, gallery, vibe, or evidence renderer.
  evidence: The current content role determines technical hero emission, and Story 2.5 excludes non-hero media; independent creator approval is currently documented in release-readiness prose rather than a build-validatable field.
- source_spec: `_bmad-output/implementation-artifacts/spec-2-5-browse-the-curated-published-works-catalog.md`
  summary: Implement the accessible unknown-work Not Found route and a quiet return to Works as Story 2.6.
  evidence: Missing and unpublished work slugs still intentionally have no static detail route; Epic 2 Story 2.6 owns the visitor-facing Not Found experience and draft-leak protection.
- source_spec: `_bmad-output/implementation-artifacts/spec-2-5-browse-the-curated-published-works-catalog.md`
  summary: Add browser-driven computed-style and viewport regression coverage for catalog media containment as Story 4.1.
  evidence: Story 2.5 has manual viewport review plus CSS and markup contracts, but no Playwright-based computed geometry assertion; Epic 4 Story 4.1 owns automated responsive and accessibility coverage.
