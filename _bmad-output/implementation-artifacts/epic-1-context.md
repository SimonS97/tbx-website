# Epic 1 Context: Enter a Credible Tales by Xero Stage

<!-- Compiled from planning artifacts. Edit freely. Regenerate with compile-epic-context if planning docs change. -->

## Goal

Establish the fast, accessible, English-language public foundation for Tales by Xero so visitors immediately encounter an authored Saffron Myth Theatre identity, can reliably reach Works and About, understand Xero's table-tested practice, and can voluntarily continue to Ko-fi. This foundation must work as complete semantic HTML without client-side JavaScript and provide the shared visual, navigation, accessibility, and deployment-ready conventions that later catalog and discovery work can use.

## Stories

- Story 1.1: Establish the Static Public Site Foundation
- Story 1.2: Present the Saffron Myth Theatre Site Shell
- Story 1.3: Share Xero's Practice and Optional Ko-fi Route

## Requirements & Constraints

- Render all public navigation and page copy in English. Keep the content structure compatible with future localization, but do not add a localized public interface in v1.
- Provide complete static HTML routes for `/`, `/works`, and `/about`; each must have semantic landmarks, a visible skip link, exactly one `h1`, logical heading hierarchy, readable core content, and usable links with JavaScript disabled.
- Make Works, About, and Ko-fi reachable from every public page. Show a quiet desktop navigation with maker mark, Works, About, and Ko-fi; replace it with a plainly labelled, keyboard-operable mobile menu before links wrap.
- Make the active internal navigation destination clear with a Saffron rule plus a non-color indicator. Identify external destinations visibly or through accessible text.
- Create a concise About page that states, in English, Xero's more than ten years of tabletop experience, original adventure and campaign practice, and refinement through in-person table play. Keep it a credible practice and publication statement, not a long biography, product listing, or sales pitch.
- Link Ko-fi to `https://ko-fi.com/talesbyxero` in the same browser tab. Treat it as an optional update and support route: no pop-ups, forced sign-up, countdowns, or repeated support prompts.
- Meet WCAG AA text contrast. Keyboard-operable interactive elements need an unambiguous `:focus-visible` state and compact controls need targets of at least 44 by 44 CSS pixels. Never convey meaning solely through color, hover, motion, or imagery.
- Give informative images contextual alternative text; hide decorative textures and repeated maker marks from assistive technology. Keep reading text on opaque or reliably dark surfaces.
- Verify responsive behavior at 375, 768, 1024, and 1440 CSS pixels. Preserve direct reading order, contrast, focus behavior, and access to Works and About at every width.
- Respect `prefers-reduced-motion`: do not initialize nonessential motion, show all information without motion, and avoid scroll hijacking, auto-rotation, infinite marquees, perpetual particles, and interaction-critical hover or scroll effects.
- Provide `npm run lint` and `npm run build` as required quality checks. Do not introduce shop, payment, cart, account, subscription, checkout, or coercive support behavior.

## Technical Decisions

- Use Astro 7.3.5, TypeScript 6.0.3, Node.js `>=22.13.0`, npm, and a committed `package-lock.json`. Generate a static site with progressive enhancement only; public navigation and content must not depend on client JavaScript.
- Use native CSS Custom Properties as the only v1 styling system. Define primitive, semantic, and component token layers; component styles consume semantic or component tokens rather than raw visual values. Include focus, touch-target, layering, responsive, and reduced-motion tokens or rules in the global system.
- Do not add React, Tailwind, Lenis, Vanta, a database, CMS, authentication, commerce services, server-rendered routes, external image CDNs, or external font providers in v1.
- Use isolated, page-local TypeScript only when native links and controls need enhancement. For the mobile navigation, keep behavior local and preserve a usable semantic fallback.
- Self-host fonts and version first-party assets in the repository. Use declared media dimensions or aspect ratios, tonal placeholders, lazy loading below the fold, and eager loading only for a primary LCP hero when applicable.
- Follow naming conventions: `kebab-case` for paths and filenames, `camelCase` for TypeScript values, and `PascalCase` only for TypeScript types.
- External links use same-tab navigation only. Do not use `target="_blank"` for public links.
- Establish the expected public route and shared-component layout: `pages/index.astro`, `pages/works/index.astro`, `pages/about.astro`, shared navigation and layout primitives under `components/common/`, mobile navigation behavior in a local script, and global token/base styles under `styles/`.

## UX & Interaction Patterns

- Express Saffron Myth Theatre as an authored mythic stage rather than a fantasy storefront: curated product-specific images, cinematic but purposeful composition, and stable text-first orientation.
- Use Night Mineral as the dominant field and Night Deep for recesses or captions. Use Chalk and Mist Blue for reading; reserve Saffron for primary actions, selection, and product type markers, while Coral remains a scarce danger or pivotal-accent color.
- Use an editorial display serif for staged titles and a highly legible humanist sans for body copy. The final serif must support German, clear italics, and tabular numerals where needed. Labels are selective rather than repeated above every section.
- Prefer generous gutters, sharp structural corners, hard framing lines, tonal stage layers, and deliberate asymmetry on desktop. On mobile, collapse to a direct single-column reading order with text retained on safe opaque fields.
- Keep navigation quiet and one line on desktop. The maker seal is rare, not persistent decoration. Use a Saffron rule or underline for active navigation rather than a filled tab.
- Avoid generic rounded card grids, parchment, candles or runes, glassmorphism, diffuse shadows, AI-purple gradients, permanent horror-red fields, fake testimonials, fake metrics, and pressure-oriented sales UI.
- Use motion only for hierarchy, narrative reveal, or direct feedback. CSS opacity or transform feedback is preferred; no motion may be required to discover or understand navigation or content.

## Cross-Story Dependencies

- Story 1.1 supplies the static routes, semantic baseline, build scripts, and shared project substrate required by Stories 1.2 and 1.3.
- Story 1.2 supplies the global site shell, token system, navigation, external-link treatment, responsive behavior, and reduced-motion baseline used by Story 1.3 and all later public routes.
- Story 1.3 relies on the shared About route, navigation, and external-link convention from the preceding stories. Its concise creator-practice content becomes a trust signal for later Works and homepage discovery surfaces.
