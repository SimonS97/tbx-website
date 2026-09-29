---
title: 'Story 2.4: Entscheidungsfähige Work-Detailseiten darstellen'
type: 'feature'
created: '2026-09-29'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
baseline_commit: '50b3b6e39a117739564e9c66182f6143dbd6ed31'
context:
  - 'AGENTS.md'
  - '_bmad-output/implementation-artifacts/epic-2-context.md'
  - '_bmad-output/implementation-artifacts/story-2-3-art-direction-release-readiness.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Die drei Published Works sind validierte Daten, aber Besucher können ihre Table-Fit, ihren kreativen Ansatz und ihre Produktidentität noch nicht auf einer eigenen Seite beurteilen. Es gibt keine statischen `/works/<slug>`-Routen, die die kanonischen Daten lesbar und responsiv darstellen.

**Approach:** Statische Published-only-Detailrouten rendern Titel, Premise, Typ, Kompatibilität, Hook, variable Facts Strip, Hero, Moment, Table Use und Author's Note direkt aus `getPublishedWorks()`. Die Saffron-Myth-Theatre-Komposition nutzt ausschließlich die freigegebenen Hero-Regeln; eine spätere Story ergänzt CTA, Next Work, Rückroute und Not Found.

## Boundaries & Constraints

**Always:** `getStaticPaths()` entsteht ausschließlich aus `getPublishedWorks()`; Drafts und unbekannte Slugs erzeugen keine öffentliche Route und laden keine Daten. Sichtbare Type-Labels werden zentral gemappt: `one-shot` zu `One-shot`, `campaign-framework` zu `Campaign framework`, `item-bundle` zu `Item bundle`. Die Detailseite zeigt auf Desktop und Mobile zuerst Type und Kompatibilität, dann Titel und Premise, Hook und nur vorhandene Fakten, erst danach das Hero, Moment, Table Use und Author's Note. Diese erste Umsetzung ist bewusst Hero-only: Jeder Work verwendet nur sein freigegebenes Hero-Bild vollständig und ohne inhaltlichen Crop; Copy liegt auf opaken Night-Mineral-/Night-Deep-Feldern. Hero-Medien reservieren ihre Fläche und laden eager nur, wenn sie tatsächlich oberhalb des Folds liegen. Semantik, ein `h1`, sichtbarer Fokus, reduzierte Bewegung und Tastaturzugang bleiben erhalten.

**Never:** Keine Work-Daten, Copy, Fakten, URLs, Bilder oder Alt-Texte duplizieren oder erfinden. Keine clientseitige Datenladung, React, Datenbank, CMS, Carousel, Hover-pflichtige Information oder Textüberlagerung auf Produktkunst hinzufügen. Keine Galerie- oder GM-Evidence-Medien in dieser Story rendern; sie bleiben für eine spätere testweise Erweiterung nach dem Hero-only-Review freigegeben. Kein CTA, Next Work, Rücklink, Karrhold-Route oder Not-Found-Verhalten hinzufügen; diese gehören zu Story 2.6.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Published Work | Einer der drei validierten Published-Einträge | Eine statische `/works/<slug>`-Seite zeigt die kanonischen Detailinformationen in Lesereihenfolge | Build erzeugt die Route ohne Laufzeitdatenladung. |
| Draft oder unbekannter Slug | Nicht in `getPublishedWorks()` enthalten | Keine Detailroute und keine Produktdaten im Build | Spätere Story 2.6 ergänzt die zugängliche Not-Found-Erfahrung. |
| Variable Fakten | Work hat unterschiedlich viele bestätigte Facts | Facts Strip zeigt nur vorhandene Label-Value-Paare | Keine leeren Zellen, Schätzwerte oder fixe Fact-Anzahl. |

</frozen-after-approval>

## Code Map

- `src/lib/works.ts` -- `getPublishedWorks()` als einzige öffentliche Datenquelle für `getStaticPaths()` und die Detailansicht verwenden.
- `src/content/works/*.md` -- kanonische Published-Daten; unverändert konsumieren und nicht in Komponenten duplizieren.
- `src/pages/works/[slug].astro` -- neu; statische Published-only-Detailroute mit SEO aus Work-Daten und einem `h1` pro Seite.
- `src/components/works/WorkFactsStrip.astro` -- neu; variable Facts ohne leere Einträge oder feste Anzahl rendern.
- `src/components/works/WorkHero.astro` -- neu; freigegebenen Hero mit reserviertem Verhältnis, kontextbezogenem Alt-Text und eager/lazy-Verhalten rendern.
- `src/components/common/SiteNavigation.astro` -- Works als aktiv markieren, wenn `currentPath` `/works` oder eine Work-Unterroute ist.
- `src/styles/global.css` -- Detailseiten- und Komponenten-Tokens ergänzen, ohne rohe Werte außerhalb des Primitiv-Layers einzuführen.
- `scripts/verify-static-pages.mjs` -- um die drei statisch erzeugten Detailseiten, Metadata, Reihenfolge, Facts, Hero-Verhalten und scriptfreie Ausgabe erweitern.
- `_bmad-output/implementation-artifacts/story-2-3-art-direction-release-readiness.md` -- verbindliche Hero-, Kontrast-, Letterboxing- und Accessibility-Regeln anwenden.

## Tasks & Acceptance

**Execution:**
- [x] `src/pages/works/[slug].astro`, `src/lib/works.ts` -- Published-only-Strecken erzeugen und die vollständige Work-Detailansicht aus kanonischen Daten rendern -- alle drei Works erhalten eine statische, konsistente Detailseite ohne Draft-Leak.
- [x] `src/components/works/WorkFactsStrip.astro`, `src/components/works/WorkHero.astro` -- variable Fakten und freigegebene Hero-Medien als wiederverwendbare, semantische Komponenten umsetzen -- Detailseiten zeigen nur verifizierte Daten und stabile Medienflächen.
- [x] `src/components/common/SiteNavigation.astro`, `src/styles/global.css` -- aktive Works-Navigation und responsive Saffron-Myth-Theatre-Detailkomposition ergänzen -- Orientierung, Kontrast und mobile Lesereihenfolge bleiben eindeutig.
- [x] `scripts/verify-static-pages.mjs`, `npm run verify:static` -- statische Detailausgabe und die vorhandene Prüfungsfolge erweitern und ausführen -- künftige Änderungen können Published-only-Routen und Kernanatomie nicht unbemerkt brechen.

**Acceptance Criteria:**
- Given ein Published Work, when `/works/<slug>` statisch gebaut wird, then erscheinen Type, Kompatibilität, Titel, Premise, Hook und sein variabler Facts Strip vor Hero und erweitertem Inhalt.
- Given Facts je Work variieren, when die Detailseite rendert, then zeigt sie ausschließlich bestätigte Label-Value-Paare ohne Platzhalter oder geschätzte Werte.
- Given die Seite bei 375 CSS-Pixeln dargestellt wird, when der Inhalt einspaltig fließt, then lautet die Lesereihenfolge Type/Kompatibilität, Titel/Premise, Hook/Facts, Bild, Moment, Table Use, Author's Note.
- Given ein freigegebenes Hero von einem Katalogformat abweicht, when es auf der Detailseite erscheint, then bleibt die vollständige Datei sichtbar, hat einen reservierten Platz und erhält keine Textüberlagerung.
- Given ein unbekannter oder Draft-Slug, when statische Pfade erzeugt werden, then existiert dafür keine Detailroute und kein Draft-Inhalt wird ausgegeben.

## Implementation Notes

- Detailrouten entstehen ausschließlich aus der Published-Collection. Die erste Umsetzung nutzt nur die freigegebenen Hero-Bilder; Galerie- und Evidence-Medien bleiben für die spätere Test-Erweiterung reserviert.
- Die Hero-Komponente lädt lazy, weil die aktuelle Desktop-Komposition Produktinformationen zuerst zeigt und kein Hero pauschal als LCP angenommen wird.
- Visuelles Feedback korrigierte die Detail-Shell, die Hero-Auslieferung und die Inhaltsgewichtung vor dem Abschluss: Die Route nutzt nun die breite Detail-Shell, der Hero-Resolver liefert Ephemera als URL ohne Astro-Metadatenverarbeitung, die Kompatibilität erscheint mit offiziellem Daggerheart-Markenbild und zugänglichem Text, und die Folgeabschnitte sind als `Inside`, `At the table` und `A note from Xero` statt generischer Moment-Schablone bezeichnet.
- Abythera unterscheidet jetzt klar zwischen dem enthaltenen Karrhold und dem empfohlenen 12+-Missionen-Campaign-Arc. Ephemera nennt `Tier 1 characters`; das Item Bundle priorisiert 120+ Items, druckbare Varianten und Item Volumes vor seinen evolvierenden Items.
- Die Daggerheart-Kompatibilität verwendet die bereitgestellte offizielle Marke als freie, rahmenlose Kennzeichnung neben dem Work-Type; der letzte Facts-Trenner wird nicht gerendert.
- Ephemeras bereitgestellte PNG-Dateien sind nicht standardkonform dekodierbar: Astro kopiert den Hero als URL, aber Windows-Bilddecoder und Browser können Original sowie Build-Ausgabe nicht laden. Keine Bilddatei wurde verändert; für eine sichtbare Ephemera-Hero-Fläche ist ein funktionierender Export erforderlich.
- Der aktuelle Asset-Blocker, die akzeptierten Copy- und Layoutkorrekturen sowie die Fortsetzungsschritte stehen in `detail-page-asset-blocker-handoff-2026-09-29.md` im selben Verzeichnis.

## Spec Change Log

## Review Triage Log

| Verdict | Evidence |
|---------|----------|
| patch | Die statische Prüfung duplizierte Published-Slugs, sichtbare Typen und Titel. Sie liest jetzt die kanonischen Work-Frontmatters und prüft jede Published-Route daraus. |
| patch | Die statische Prüfung bestätigte nur Struktur, nicht die sichtbaren kanonischen Werte. Sie vergleicht jetzt Premise, Hook, Facts, Moment, Table Use, Author's Note, SEO und Hero-Ausgabe mit dem jeweiligen Work-Eintrag. |
| patch | Ein beliebiger Fehler beim Prüfen einer nicht veröffentlichten Route galt als fehlende Datei. Ausschließlich `ENOENT` wird nun als erwartete Abwesenheit akzeptiert. |
| patch | Facts Strip konnte bei fehlerhaften Eingaben leere Paare oder ein leeres `dl` erzeugen. Er filtert nun auf nichtleere String-Paare und rendert ohne gültige Fakten nichts. |
| patch | Detail-Border wiederholten rohe Werte außerhalb des Primitiv-Layers. Die Werte laufen nun über Primitive-, semantische und Komponenten-Tokens. |
| false | Die scheinbare Mojibake erscheint nur in der PowerShell-serialisierten temporären Diff-Datei. Die Arbeitsdatei wurde direkt gelesen und enthält korrektes UTF-8. |
| patch | Die Aufgabenreferenz nannte `package.json`, obwohl kein Skript geändert wurde. Sie verweist jetzt korrekt auf `npm run verify:static` als bestehende Integrationskette. |
| patch | Der Item-Bundle-SEO-Titel enthielt bereits den Markensuffix und wurde im Layout doppelt ergänzt. `BaseLayout` hängt den Suffix jetzt nur bei Bedarf an. |

## Design Notes

- Desktop darf die Text- und Medienbereiche asymmetrisch nebeneinander stellen, muss aber dieselbe DOM- und mobile Lesereihenfolge bewahren. Das Hero wird als Produktnachweis behandelt, nicht als Atmosphäre hinter Copy.

## Verification

**Commands:**
- `npm run lint` -- erwartet: Route, Komponenten und statische Prüfung bestehen ESLint.
- `npm run build` -- erwartet: Astro erzeugt ausschließlich die drei Published-Detailrouten; Works-Validator und erweiterte statische Prüfung bestehen.

**Manual checks (if no CLI):**
- Die drei Detailseiten bei 375, 768, 1024 und 1440 CSS-Pixeln auf Lesereihenfolge, vollständige Hero-Kunst, Facts ohne Lücken, sichtbaren Fokus, kontrastreiche Copy-Felder und reduzierte Bewegung prüfen.

**Ausgeführt:**

- `npm run lint` -- bestanden.
- `npm run build` -- bestanden; erzeugt die drei Published-Detailrouten und enthält Works-Fixtures, Published-Validator und erweiterte statische Routenprüfung.
