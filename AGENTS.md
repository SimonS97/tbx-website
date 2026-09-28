<!-- bmad:context -->
<!-- Verified 2026-09-28 against an unversioned workspace. Managed by bmad-project-context; edits inside this block are replaced on refresh. Keep anything you want preserved outside the markers. -->

## Tales by Xero

Portfolio and promotional website for a solo indie tabletop creator, focused on Daggerheart adventures, campaign frameworks, and item documents. UX and visual design are the primary product concerns; planning artifacts live in `_bmad-output/`. The stack is deliberately undecided until the approved visual direction requires it.

## Policy

- Build an information and gallery site only; never add checkout, payments, subscriptions, accounts, carts, or other shop behavior. Product CTAs link out to DriveThruRPG or Etsy.
- Treat every prototype as agent-built: the user validates working prototypes and visual core decisions, not implementation details.
- Do not run code-review workflows unless the user explicitly asks. Before a prototype handoff, run only the project's build and lint commands once they exist.
- Preserve readability, keyboard access, responsive behavior, and `prefers-reduced-motion` while pursuing a striking fantasy presentation.

## Where things are

- BMad plans and generated artifacts: `_bmad-output/`
- BMad configuration and installed workflow skills: `_bmad/`, `.agents/skills/`, and `.claude/skills/`
- Anti-slop landing-page and portfolio guidance: `.claude/skills/taste-skill/skills/taste-skill/SKILL.md`
- Searchable UI/UX design guidance: `.claude/skills/ui-ux-pro-max-skill/cli/assets/skills/`
- Motion creation guidance: `.claude/skills/design-motion-principles/skills/design-motion-principles/SKILL.md`
- `DESIGN.md` inspiration library only, never a source to clone: `.claude/skills/awesome-claude-design/`

## Conventions that differ from defaults

- Before the first implementation, present three original art directions and wait for the user's visual decision; do not default to generic fantasy, AI-purple gradients, or a templated card grid.
- Use the local Taste Skill for portfolio/landing-page design work, UI UX Pro Max for design-system and responsive decisions, and Design Motion Principles when motion is added; apply each only when its scope fits.
- Use motion to reveal hierarchy, narrative, or interaction feedback; do not add decorative perpetual animation. Respect `prefers-reduced-motion` for every effect.
- Evaluate Lenis, GSAP, Vanta, and Refero as optional references or tools for the approved direction; never add them merely because they are available.

<!-- /bmad:context -->
