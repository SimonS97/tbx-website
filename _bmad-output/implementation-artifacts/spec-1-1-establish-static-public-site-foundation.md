---
title: 'Story 1.1: Statische Grundlage der öffentlichen Website'
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

**Problem:** Das Projekt enthält noch keine lauffähige öffentliche Website. Besucherinnen und Besucher können daher weder Tales by Xero noch die grundlegenden Ziele Works und About ohne clientseitiges JavaScript erreichen.

**Approach:** Ein minimales, statisch generiertes Astro-Projekt stellt die öffentlichen Routen `/`, `/works` und `/about` als vollständiges semantisches HTML bereit. Es etabliert zugleich die erforderliche npm-, Lint- und Build-Grundlage für die nachfolgenden Stories.

## Boundaries & Constraints

**Always:** Astro 7.3.5, TypeScript 6.0.3, npm mit versionierter `package-lock.json` und Node.js `>=22.13.0` verwenden. Alle drei Routen enthalten genau ein `h1`, einen sichtbaren Skip-Link, logische Überschriften und die Landmarks `header`, `main` und `footer`. Öffentliche Texte, Navigation und Links bleiben auf Englisch und ohne JavaScript bedienbar.

**Never:** React, Tailwind, Datenbank, CMS, Authentifizierung, serverseitige Routen, Commerce-Funktionen oder JavaScript-abhängige Navigation hinzufügen. Die spätere visuelle Saffron-Myth-Theatre-Ausgestaltung, globale Navigation und die finalen About-Inhalte gehören nicht zu dieser Story.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Öffentliche Route | Direkter Aufruf von `/`, `/works` oder `/about` | Vollständige HTML-Seite mit eindeutiger Seitenüberschrift, Skip-Link und lesbarem Kerninhalt | Statische Generierung liefert die Route ohne Client-Fallback. |
| JavaScript deaktiviert | Browser führt keine Skripte aus | Skip-Link, interne Links und Kerninhalt bleiben als native HTML-Elemente nutzbar | Keine interaktiven oder inhaltlichen Abhängigkeiten von JavaScript einführen. |
| Qualitätsprüfung | `npm run lint` oder `npm run build` | Befehl ist verfügbar und beendet sich bei gültigem Projekt erfolgreich | Konfigurations- oder Quellfehler lassen den jeweiligen Prozess mit Fehlercode abbrechen. |

</frozen-after-approval>

## Code Map

- `package.json` -- neu; definiert private npm-Metadaten, Node-Engine sowie die Skripte `dev`, `build`, `preview` und `lint`.
- `package-lock.json` -- neu; sperrt die installierten Paketversionen für reproduzierbare npm-Installationen.
- `astro.config.mjs` -- neu; Astro-Konfiguration für die statische Website ohne Serveradapter.
- `tsconfig.json` -- neu; übernimmt Astos strikte TypeScript-Grundkonfiguration.
- `eslint.config.mjs` -- neu; stellt einen echten `npm run lint`-Check für Astro- und TypeScript-Dateien bereit.
- `src/layouts/BaseLayout.astro` -- neu; gemeinsame semantische Dokumentstruktur, sichtbarer Skip-Link und Seiten-Metadaten.
- `src/pages/index.astro` -- neu; statische Homepage mit englischer Orientierung und einem `h1`.
- `src/pages/works/index.astro` -- neu; statische Works-Grundroute mit einem `h1` und vorbereitendem, nicht erfundenem Inhaltsstatus.
- `src/pages/about.astro` -- neu; statische About-Grundroute mit einem `h1` und neutraler englischer Orientierung; Story 1.3 ergänzt den eigentlichen Praxistext.
- `src/styles/global.css` -- neu; minimale globale Lesbarkeits-, Landmarken- und Skip-Link-Styles; keine vorgezogene visuelle Designsystem-Implementierung.
- `assets/` -- vorhandene Quellbilder; nicht in dieser Story verschieben oder öffentlich einbinden, weil ihr Einsatz erst mit der Produkt- und Art-Direction-Planung geprüft wird.

## Tasks & Acceptance

**Execution:**
- [x] `package.json`, `package-lock.json`, `astro.config.mjs`, `tsconfig.json`, `eslint.config.mjs` -- Astro-7.3.5-Toolchain mit TypeScript 6.0.3, Node-Engine und funktionsfähigen Lint-/Build-Skripten anlegen -- die Foundation muss reproduzierbar installier- und prüfbar sein.
- [x] `src/layouts/BaseLayout.astro`, `src/styles/global.css` -- gemeinsame HTML-Dokumentstruktur mit sichtbarem Skip-Link, Landmarken, lesbarer Grundtypografie und Fokuszuständen erstellen -- alle Startseiten erhalten dieselbe barrierearme Baseline ohne JavaScript.
- [x] `src/pages/index.astro`, `src/pages/works/index.astro`, `src/pages/about.astro` -- drei vollständig statische, englische Seitenrouten mit jeweils genau einem `h1`, Kerninhalt und regulären Links implementieren -- die erforderlichen Einstiegsziele bleiben ohne JavaScript verfügbar.
- [x] `package.json` und die öffentlichen Routen -- Lint und Produktionsbuild ausführen sowie die erzeugten HTML-Dateien auf die Landmarken-, Skip-Link- und `h1`-Invarianten prüfen -- die Story-Akzeptanz ist vor Übergabe nachweisbar.

**Acceptance Criteria:**
- Given die Website ist noch nicht produktiv konfiguriert, when die Foundation installiert wird, then verwendet sie Astro 7.3.5, TypeScript 6.0.3, Node.js `>=22.13.0`, npm und eine versionierte `package-lock.json`.
- Given JavaScript ist deaktiviert, when eine öffentliche Route geladen wird, then bleiben Navigation, lesbarer Kerninhalt und Links als semantisches HTML nutzbar.
- Given eine Person öffnet `/`, `/works` oder `/about`, when die Route statisch erzeugt wird, then enthält sie vollständiges HTML mit genau einem `h1`, sinnvollen Landmarks und sichtbarem Skip-Link.
- Given die Foundation wird geändert, when `npm run lint` und `npm run build` ausgeführt werden, then stehen beide Prüfungen zur Verfügung und schließen bei der implementierten Basis erfolgreich ab.

## Implementation Notes

- Die Astro-7.3.5-Foundation erzeugt `/`, `/works` und `/about` statisch aus gemeinsamen Layout- und globalen Basisstilen.
- `npm run build` führt nach dem Astro-Build `scripts/verify-static-pages.mjs` aus; die Prüfung bestätigt für alle drei Ausgaben je ein `h1`, den Skip-Link, `header`/`main`/`footer`, Kerninhalt, native Links und das Fehlen von Client-Skripten.
- Ein npm-Override hält die transitive Abhängigkeit `undici` bei 7.16.0 mit Node-Anforderung `>=20.18.1`; dadurch bleibt die festgelegte Node-Untergrenze `>=22.13.0` bei engine-strict-Installationen valide.

## Spec Change Log

## Review Triage Log

| Verdict | Evidence |
|---------|----------|
| false | `scripts/verify-static-pages.mjs` exists and is invoked successfully by `npm run build`; the non-Git directory snapshot omitted nested new files. |
| false | `src/pages/index.astro`, `src/pages/works/index.astro`, and `src/pages/about.astro` exist; the successful Astro build emits all three required routes. |
| false | `src/layouts/BaseLayout.astro` exists and supplies the document structure, visible skip link, and page metadata. |
| false | `src/styles/global.css` exists and provides readable base typography, focus styling, and visible skip-link styling. |
| false | `src` and `scripts` exist, and `npm run lint` completed successfully with exit code 0. |
| false | The checked tasks and verification evidence match the implemented files and successful commands; no false completion state occurs. |
| false | The specification is UTF-8 and renders readable German text; the reported mojibake is an artifact of the reviewer’s directory-diff decoding. |
| low | `.gitignore` is absent, so generated dependencies and build output could be accidentally tracked if this workspace later receives version control; adding three standard ignores is a direct correction. |
| false | The acceptance criteria require the toolchain and quality commands, not contributor onboarding documentation; a README is not necessary to satisfy this foundation story. |
| false | A versioned npm lockfile provides reproducible dependency resolution; adding a package-manager version field does not address a demonstrated failure in this story. |
| medium | `node_modules/undici/package.json` declares Node `>=22.19.0`, so engine-strict installations under Node 22.13 through 22.18 can fail despite the project claiming support. The declared engine must match the installed dependency floor. |

## Verification

**Commands:**
- `npm run lint` -- erwartet: Astro-/TypeScript-Prüfung endet mit Exit-Code 0.
- `npm run build` -- erwartet: Astro erzeugt die drei statischen Routen ohne Fehler.

**Manual checks (if no CLI):**
- Die erzeugten Dateien unter `dist/` für `/`, `/works` und `/about` auf je einen `h1`, Skip-Link und `header`/`main`/`footer` prüfen.
