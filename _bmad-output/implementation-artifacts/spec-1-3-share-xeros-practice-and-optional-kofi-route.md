---
title: 'Story 1.3: Xeros Praxis und optionale Ko-fi-Route'
type: 'feature'
created: '2026-09-28'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
baseline_commit: 'NO_VCS'
context:
  - '_bmad-output/implementation-artifacts/epic-1-context.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Die aktuelle About-Seite nennt zwar das Arbeitsfeld, vermittelt aber weder Xeros praktische Erfahrung noch die reale Spiel- und Veröffentlichungsmethode. Die vorhandene globale Ko-fi-Navigation erhält auf der About-Seite keinen ruhigen Kontext als freiwillige Update- und Supportmöglichkeit.

**Approach:** Die statische About-Seite erhält eine kurze englische Practice- und Publication-Statement: mehr als zehn Jahre Tabletop-Erfahrung, das Schreiben und Leiten eigener Abenteuer und Kampagnen sowie die Verfeinerung von Material nach Präsenzspiel. Eine zurückhaltende Ko-fi-Erwähnung ergänzt die bestehende externe Route ohne Druck oder Verkaufsmechanik.

## Boundaries & Constraints

**Always:** Die öffentliche Copy bleibt auf Englisch, konkret und glaubwürdig. Sie nennt ausdrücklich mehr als zehn Jahre Erfahrung, eigene Abenteuer- und Kampagnenpraxis sowie die Verfeinerung durch Spielsessions am physischen Tisch. Die Aussage bleibt kurz, lesbar und auf Praxis und Veröffentlichungsmethode fokussiert. Der About-Ko-fi-Link führt im selben Tab exakt zu `https://ko-fi.com/talesbyxero` und benennt die externe Destination zugänglich; seine Rolle ist gelegentliche Updates und optionale Unterstützung.

**Never:** Keine lange Biografie, Gründerstory, Produktliste, Testimonials, erfundenen Systemnamen, Gruppen, Sessionzahlen, Playtest-Metriken oder pauschalen Qualitätsversprechen hinzufügen. Kein aggressiver Sales-Ton, keine Pop-ups, Anmeldung, Countdowns, wiederholten Support-Aufforderungen, Ko-fi-Mechaniken oder `target="_blank"`. Die globale Shell, Navigation, Tokens, Assets und andere Routen bleiben unverändert.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| About-Lektüre | Aufruf von `/about` mit oder ohne JavaScript | Kurzer englischer Text beschreibt Erfahrung, eigene Abenteuer-/Kampagnenpraxis und Verfeinerung nach Präsenzspiel | Der Inhalt bleibt statisches semantisches HTML ohne Client-Fallback. |
| Optionale Unterstützung | Aktivierung des About-Ko-fi-Links | Navigation im selben Tab zur exakten Ko-fi-URL; die externe Natur ist für Screenreader erkennbar | Kein Popup, neuer Tab oder verpflichtender Support-Schritt. |
| Schmaler Viewport | 375 oder 768 CSS-Pixel | Text bleibt in der bestehenden Lesespalte logisch geordnet und die globale Navigation bleibt erreichbar | Keine neue responsive oder interaktive Abhängigkeit einführen. |

</frozen-after-approval>

## Code Map

- `src/pages/about.astro` -- bestehende About-Route mit korrektem `currentPath`; Platzhalter durch die verifizierte englische Praxis- und Veröffentlichungsbeschreibung sowie den ruhigen Ko-fi-Hinweis ersetzen.
- `scripts/verify-static-pages.mjs` -- bestehende Build-Prüfung für Shell-Invarianten; statische Assertions für die About-Pflichtaussagen und den About-internen Same-Tab-Ko-fi-Link ergänzen.
- `src/layouts/BaseLayout.astro`, `src/components/common/SiteNavigation.astro`, `src/styles/global.css` -- bestehende Shell-, Navigations- und Lesbarkeitsgrundlage; nicht ändern.
- `src/pages/index.astro`, `src/pages/works/index.astro` -- unberührte Routen; die bisherige Ausgabe weiterhin über den vollständigen Produktionsbuild schützen.

## Tasks & Acceptance

**Execution:**
- [x] `src/pages/about.astro` -- den Platzhalter durch eine knappe englische Practice- und Publication-Statement mit den drei belegten Praxisfakten ersetzen und einen sachlichen About-Ko-fi-Link ergänzen -- Besucher können die Arbeitsweise einschätzen, ohne eine Biografie oder Verkaufscopy lesen zu müssen.
- [x] `scripts/verify-static-pages.mjs` -- die erzeugte About-Seite auf die Pflichtaussagen, den About-Ko-fi-Link, Same-Tab-Konvention und die bestehenden statischen Invarianten prüfen -- der Build erkennt die Entfernung oder Verfälschung zentraler Vertrauensinformationen.
- [x] `src/pages/about.astro` und Build-Ausgabe -- bei 375, 768, 1024 und 1440 CSS-Pixeln Lesereihenfolge, Kontrast, Fokus und direkten Zugriff auf Works und About prüfen -- der neue Inhalt beeinträchtigt die Shell nicht.

**Acceptance Criteria:**
- Given ich öffne `/about`, when die Seite rendert, then erklärt sie auf Englisch knapp Xeros mehr als zehnjährige Tabletop-Erfahrung, das Schreiben und Leiten eigener Abenteuer und Kampagnen sowie die Verfeinerung durch Präsenzspiel.
- Given ich lese die About-Seite, when ich ihren Inhalt bewerte, then bleibt sie eine glaubwürdige Praxis- und Veröffentlichungsbeschreibung statt einer langen Biografie, Produktliste oder Verkaufserzählung.
- Given ich aktiviere Ko-fi in Navigation oder About, when das Ziel lädt, then navigiert der Browser im selben Tab zu `https://ko-fi.com/talesbyxero`, das externe Ziel ist zugänglich bezeichnet und es erscheinen keine Pop-ups, Anmeldungen oder wiederholten Support-Aufforderungen.
- Given die Seite wird bei 375, 768, 1024 und 1440 CSS-Pixeln betrachtet, when sie sich anpasst, then bleiben Lesereihenfolge, Kontrast, Fokusverhalten sowie der direkte Zugang zu Works und About erhalten.

## Implementation Notes

- Die About-Seite enthält eine knappe englische Praxis- und Veröffentlichungsbeschreibung mit mehr als zehn Jahren Erfahrung, eigenen Abenteuern und Kampagnen sowie Verfeinerung durch Präsenzspiel.
- Der About-inhaltliche Ko-fi-Link ist eine ruhige Option für gelegentliche Updates und Unterstützung; der sichtbare Text bleibt auf `Ko-fi` beschränkt, während die externe Kennzeichnung für Screenreader erhalten bleibt.
- Die statische Build-Prüfung verifiziert die drei Pflichtaussagen und sucht den About-Ko-fi-Link gezielt innerhalb des generierten `<main>`-Bereichs, nicht in der globalen Navigation.
- Die About-Copy verwendet die direkte Ich-Perspektive, ohne die belegten Praxis- und Veröffentlichungsfakten zu verändern.

## Spec Change Log

## Review Triage Log

| Verdict | Evidence |
|---------|----------|
| false | `scripts/verify-static-pages.mjs` exists and is invoked successfully by `npm run build`; the non-Git directory snapshot omitted nested new files. |
| false | `src/pages/about.astro` exists and the successful build emits the required English practice statement and About-specific Ko-fi context. |
| false | The verifier exists and asserts the mandatory About statements and the Ko-fi route; its About-link scope is handled as a separate verified finding. |
| false | The `src/` routes, shared layout and global stylesheet exist and the production build emits `/`, `/works` and `/about`. |
| false | The site navigation, layout, token styles and maker-seal asset exist and are validated by the successful static build check. |
| false | This story does not change the responsive shell; its inherited responsive structure and static navigation invariants are covered by the complete build. Manual browser viewport validation remains an acknowledged delivery check, not false implementation evidence. |
| low | ESLint does not lint standalone CSS; a CSS-specific linting tool would broaden the quality setup beyond this content-focused story, while the CSS file is unchanged. |
| low | Local environment file ignores are not needed by the current static site and no environment files or secrets are introduced; defer until a concrete environment configuration exists. |
| false | The versioned npm lockfile and existing Node engine constraint are sufficient for this story; no demonstrated package-manager failure occurs. |
| false | `undici` is explicitly overridden to 7.16.0 with a Node `>=20.18.1` requirement, which remains compatible with the declared `>=22.13.0` project floor. |
| medium | The About-specific Ko-fi assertion is not scoped to `<main>`, so the existing global navigation link can satisfy it after the About content link is removed. |

## Design Notes

Die About-Seite bleibt textgeführt und nutzt die bestehende dunkle Bühne. Die Praxisbeschreibung wird in wenige ruhige Absätze gegliedert; der Ko-fi-Hinweis erscheint als sekundäre, sachliche Route statt als CTA-Banner. Der Text behauptet nur Erfahrung und Arbeitsweise, die durch die Planung gedeckt sind.

## Verification

**Commands:**
- `npm run lint` -- erwartet: die geänderte Astro-Seite und Verifikationsdatei bestehen den Linter.
- `npm run build` -- erwartet: die statischen Routen bauen und die erweiterten About-Prüfungen bestehen.

**Manual checks (if no CLI):**
- `/about` bei 375, 768, 1024 und 1440 CSS-Pixeln auf Lesbarkeit, logische Reihenfolge, Fokus und globale Navigation prüfen.
- Den About-Ko-fi-Link per Tastatur aktivieren und bestätigen, dass er im selben Tab zur konfigurierten externen URL führt.
