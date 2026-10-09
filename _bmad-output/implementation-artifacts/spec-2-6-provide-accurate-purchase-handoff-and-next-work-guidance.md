---
title: 'Story 2.6: Praezise Produktuebergabe und naechste Work-Empfehlung'
type: 'feature'
created: '2026-10-09'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
baseline_commit: 'be3e86767f2b79d24e4c92e4d471a6216c93f9b5'
context:
  - 'AGENTS.md'
  - '_bmad-output/implementation-artifacts/epic-2-context.md'
  - '_bmad-output/planning-artifacts/ux-designs/ux-websiteDraft-2026-09-28/DESIGN.md'
  - '_bmad-output/planning-artifacts/ux-designs/ux-websiteDraft-2026-09-28/EXPERIENCE.md'
---

<frozen-after-approval reason="human-owned intent - do not modify unless human renegotiates">

## Intent

**Problem:** Die bestehenden Published-Detailseiten enden nach der Author's Note. Besuchende erhalten weder die exakte DriveThruRPG-Uebergabe noch eine ruhige Rueckroute oder eine einzelne kuratierte Fortsetzung; Karrhold hat trotz seiner beabsichtigten Suchroute keine eigene Seite, und unbekannte Work-URLs liefern keine gestaltete, sichere Orientierung.

**Approach:** Die bestehende statische Published-Collection bleibt die einzige Produktquelle. Jede Published-Detailseite erhaelt ihre kanonische Same-Tab-CTA, eine dezente Works-Route und genau ein aus `nextWork` aufgeloestes Folgewerk. Karrhold wird als viertes Published Work mit seinem vorhandenen offiziellen Cover und belegter Produktcopy angelegt; eine generische statische 404-Seite enthaelt keine Work-Daten.

## Boundaries & Constraints

**Always:** CTA-Ziele stammen ohne Duplikat aus `externalUrl`, nennen DriveThruRPG sichtbar und setzen kein `target`. Die Detail-Introgruppe folgt dem finalen UX-Spine: ruhiger Link `All published works`, Klassifikation, Produktdaten, klarer `View on DriveThruRPG`-Link und sekundaere Works-Route; die CTA ist kein On-site-Kaufablauf. Jede Published-Route loest genau einen anderen Published `nextWork` auf. Karrhold nutzt ausschliesslich `Karrhold_Cover_img_Final.jpg` als vollstaendiges Hero, hat keinen Discovery-Eintrag und zeigt sichtbar `Included with Abythera` sowie den Hinweis, dass Besitzer des Abythera Campaign Framework Karrhold nicht separat kaufen muessen. Die statische 404 hat ein `h1`, Links zu Works und Home, aber keine Produktbilder, Produktcopy oder externe CTA.

**Never:** Keinen Evidence Reader, keine Galerie, keine GM-Referenz, keine Client-Skripte, keine neue Commerce-Oberflaeche und keine weitere Karrhold-Medienfreigabe hinzufuegen. Keine Daten ausserhalb der kanonischen Work-Frontmatters duplizieren oder unbekannte Produktwerte erfinden. Kein unbekannter oder Draft-Slug darf eine Detailroute erzeugen oder Detaildaten preisgeben.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
| --- | --- | --- | --- |
| Published detail | Published Work mit valider URL und `nextWork` | Exakte Same-Tab-CTA, ruhiger Works-Link und genau eine interne Next-Work-Route | Fehlendes aufgeloestes Next Work bricht den Static Build work-spezifisch ab. |
| Karrhold | Vollstaendiger Published-Eintrag mit `includedWith: abythera` | `/works/karrhold` zeigt Cover, Notice und exakte Produkt-URL; der Katalog behaelt sein Editorial-Tile mit Hero, Typ, Titel und Premise | Validator verhindert ungueltige Beziehung oder fehlende Published-Felder. |
| Unknown or draft URL | Kein statischer Published-Pfad | Statische 404 mit Works- und Home-Rueckroute, ohne Work-Ausgabe | 404 bleibt produktfrei. |

</frozen-after-approval>

## Code Map

- `src/content/works/karrhold.md` -- neuer kanonischer Published-Eintrag. Nur der sichtbare Produktcover-Pfad, belegte englische Copy aus `prds/.../addendum.md` und dem lokalen Quellbild `src/assets/works/karrhold/AboutThisProduct.png`, `nextWork: abythera` sowie die exakte `includedWith`-Notice gehoeren hinein; das Quellbild wird nicht oeffentlich gerendert.
- `src/pages/works/[slug].astro` -- erzeugt weiter nur Published-Pfade, loest `nextWork` gegen dieselbe Published-Collection auf und rendert Rueckroute, Relationship-Notice, CTA und Next Work ohne Client-JavaScript.
- `src/pages/404.astro` -- neue statische, produktfreie Not-Found-Erfahrung auf `BaseLayout`.
- `src/styles/global.css` -- ergaenzt nur tokenbasierte Regeln fuer Intro-Aktionen, Included-with-Notice, Next-Work-Abschluss und 404; vorhandene Fokus-, Touch- und Reduced-Motion-Regeln bleiben erhalten.
- `scripts/test-validate-works.mjs` -- deckt eine gueltige `includedWith`-Beziehung ab, damit die Karrhold-Datenform neben dem bestehenden Negativfall abgesichert ist.
- `scripts/verify-static-pages.mjs` -- prueft CTA-URL/Same-Tab, genau eine Next-Work-Route, Karrhold-Notice, ausgegebene 404 und den Ausschluss von Detaildaten auf der 404.
- `_bmad-output/implementation-artifacts/story-2-3-art-direction-release-readiness.md` -- ergaenzt die Karrhold-Coverfreigabe ausschliesslich fuer Katalogtile und Karrhold-Detail-Hero; weitere Karrhold-Assets bleiben ausgeschlossen.

## Tasks & Acceptance

**Execution:**
- [x] `src/content/works/karrhold.md`, `story-2-3-art-direction-release-readiness.md` -- Karrhold mit `Karrhold: A Seed of Corruption`, Typ `one-shot`, Daggerheart-Kompatibilitaet, 3-5-Spielende-Fact, Standalone-Format, investigativer Struktur, Cover-Hero, exakter DriveThruRPG-URL, spoilerarmem Korruptionsmoment, table-use, on-table Author's Note, `nextWork: abythera` und Included-with-Abythera-Notice veroeffentlichen; nur das Cover freigeben -- die Route bleibt datengetrieben und preisgibt kein GM-Material.
- [x] `src/pages/works/[slug].astro`, `src/styles/global.css` -- kanonische Intro-Aktionen, `includedWith`-Notice und genau einen Next-Work-Abschluss in der freigegebenen Hierarchie rendern -- CTA, Rueckweg und Empfehlung bleiben auf allen Published-Routen lesbar und tastaturbedienbar.
- [x] `src/pages/404.astro`, `src/styles/global.css` -- semantische 404 mit Home- und Works-Rueckrouten anlegen -- unbekannte und Draft-Adressen zeigen keine Produktdaten oder externe CTA.
- [x] `scripts/test-validate-works.mjs`, `scripts/verify-static-pages.mjs` -- Datenbeziehung und gebaute Ausgabe auf CTA, Karrhold, Next Work, 404 und No-Draft-Leak pruefen -- spaetere Aenderungen koennen die externe Uebergabe nicht still brechen.
- [x] `package.json`-Skriptkette -- `npm run lint` und `npm run build` ausfuehren -- Lint, Fixture-Tests, Bildvalidierung und statische Ausgabe bestehen gemeinsam.

**Acceptance Criteria:**
- Given eine Published-Detailseite, when Besuchende ihre primaere Aktion aktivieren, then der Browser folgt derselben Tab-Route zur exakt konfigurierten DriveThruRPG-URL und der Link nennt DriveThruRPG als externe Destination.
- Given ein Published Work, when die Detailseite baut, then zeigt sie genau ein anderes Published `nextWork` und eine ruhige `/works`-Route.
- Given `/works/karrhold`, when die statische Route baut, then zeigt sie den sichtbaren Notice-Titel `Included with Abythera` und erklaert klar, dass Abythera-Besitzer Karrhold nicht separat kaufen muessen.
- Given eine unbekannte oder nicht veroeffentlichte Work-Adresse, when der statische Host die 404 liefert, then sind Works und Home erreichbar, waehrend Work-Titel, Bilder, Hooks, Facts und externe CTA fehlen.

## Implementation Notes

- Die bestehende Story-2.4-Reihenfolge wird durch den nachtraeglich freigegebenen Detail-Spine konkretisiert: CTA und ruhige Rueckroute liegen im Intro; Story 2.7 fuegt spaeter nur den Evidence Reader unter dem Cover hinzu.
- Karrholds sichtbare Copy wird ausschliesslich aus dem PRD-Addendum fuer URL, Standalone- und Abythera-Beziehung sowie aus `src/assets/works/karrhold/AboutThisProduct.png` fuer Setting, 3-5-Spielende-Fact, investigative Struktur, skalierbare Begegnungen und die on-table Author's Note abgeleitet. Das Quellbild bleibt nicht oeffentlich. Nicht in den Hero, Katalog oder die Detailroute gehoeren `ToC.png`, Cheat Sheets, NPC-Portraits und weitere Karrhold-Assets.
- Der CTA enthaelt eine visuell versteckte externe Zielkennzeichnung. Der bestehende Hero bleibt lazy, weil Produktdaten und Aktionen vor ihm erscheinen und das Hero damit nicht pauschal als LCP behandelt wird.
- `astro preview` lieferte fuer `/works/unknown-work` und `/works/draft-work` jeweils die produktfreie statische 404 mit HTTP-Status 404 aus.

## Spec Change Log

## Review Triage Log

| Source | Verdict | Evidence |
| --- | --- | --- |
| Blind 1 | patch | PRD, Epic und Epic-Kontext enthielten eine aeltere CTA-Reihenfolge. Sie nennen jetzt die vom finalen Detail-Spine bestimmte Aktionsgruppe nach Hook und Facts vor dem Cover. |
| Blind 2 | patch | Die Readiness fasste den Stand noch als drei Published Works zusammen. Sie unterscheidet nun die urspruenglichen drei von Karrhold als Story-2.6-Ergaenzung. |
| Blind 3 | patch | Die Release-Readiness definierte widerspruechliche Abythera-Evidence-Freigaben. Die vier konkreten Story-2.7-Assets sind jetzt dort mit ihren korrekten Pfaden und Grenzen dokumentiert. |
| Blind 4 | patch | Die Code Map konnte `AboutThisProduct.png` wie ein oeffentliches Karrhold-Asset lesen lassen. Sie bezeichnet die Datei jetzt ausschliesslich als lokale Copy-Quelle ohne Renderer. |
| Blind 5 | patch | Die Karrhold-Matrix verlangte Notice und URL im Tile, obwohl der feste Works-Vertrag sie der Detailseite zuordnet. Nach expliziter Creator-Entscheidung beschreibt sie nun Detailseite und Editorial-Tile getrennt. |
| Blind 6 | patch | Die Karrhold-Copy-Herkunft war nicht ausreichend aufgezeichnet. Die Implementation Notes benennen jetzt PRD-Addendum und die lokale Produktbeschreibung als getrennte Quellen. |
| Blind 7 | patch | Der Validator pruefte nur allgemeine Inclusion-Integritaet. Der Static Verifier erzwingt jetzt Karrholds exakte URL, Abythera-Ziel, Label und Notice. |
| Blind 8 | patch | Die 404-Pruefung sah nur einen Teil der Produktwerte im Main. Sie prueft jetzt das gesamte Dokument gegen alle Work-Felder, Facts, Klassifikation, Mediennamen und externe CTA. |
| Blind 9 | patch | Die Static-Output-Pruefung allein belegte den Fallback nicht. Die lokale Astro-Vorschau wurde fuer unbekannten und Draft-Work-Pfad mit HTTP 404 und gestalteter 404 geprueft. |
| Blind 10 | patch | Die manuellen Zielbreitenpruefungen waren nicht aufgezeichnet. Die Verification dokumentiert jetzt die ausgefuehrte Chromium-Pruefung bei allen vier Breiten. |
| Blind 11 | patch | Die genehmigte Change Proposal enthielt noch einen offenen Approval-Abschnitt. Dieser ist durch einen Approval Record ersetzt. |
| Blind 12 | patch | Die Proposal beschrieb den historischen Backlog-Stand als Gegenwart. Sie kennzeichnet ihn nun als Stand zum Genehmigungszeitpunkt und verweist fuer den Laufzeitstatus auf den Sprint-Tracker. |
| Blind 13 | defer | Der Evidence-Reader-Frontmattervertrag ist fuer Story 2.7 erforderlich, aber durch den expliziten Story-2.6-Scope ausgeschlossen. Die Folgearbeit ist in `deferred-work.md` festgehalten. |
| Blind 14 | defer | Die statische Aufloesung und Emission nicht-Heroischer Evidence-Assets gehoert mit ihrem Datenvertrag zu Story 2.7, nicht zu dieser hero-only Story. Die Folgearbeit ist in `deferred-work.md` festgehalten. |
| Blind 15 | false | Die Arbeitsdateien enthalten kein Mojibake; `Read` zeigt die korrekten Zeichen. Die falsch dekodierten Zeichen entstanden nur in der PowerShell-erzeugten temporaren Diff-Ansicht. |
| Blind 16 | false | Das Hero ist nach der sichtbaren Produktinformation und den Aktionen angeordnet; es ist damit kein pauschales LCP-Element. Die Lazy-Entscheidung stammt bereits aus Story 2.4 und bleibt regelkonform. |
| Edge 1 | patch | Die Detailroute wirft jetzt vor dem Rendern, falls ein Published Work keine externe URL liefert, statt einen unbrauchbaren Primaerlink auszugeben. |
| Edge 2 | patch | Die Detailroute verlangt nun fuer die aufgeloeste Empfehlung auch nichtleeren Titel und Premise. |
| Edge 3 | patch | Next-Work-Ueberschriften umbrechen jetzt auch bei langen, untrennbaren Tokens. |
| Edge 4 | patch | Included-with-Ueberschrift und Notice umbrechen jetzt auch bei langen, untrennbaren Tokens. |
| Verification 1 | patch | Der Static Verifier bindet Karrhold an die verifizierte DriveThruRPG-URL statt nur an den gerade im Frontmatter stehenden Wert. |
| Verification 2 | patch | Der 404-Ausschluss umfasst jetzt Facts, Typ, Kompatibilitaet, Beziehungen, URLs und weitere Detailwerte statt nur ausgewahlter Copy. |
| Verification 3 | patch | Der CTA-Ordnungswiderspruch wurde durch die abgestimmten PRD-, Epic- und Kontextaenderungen behoben. |

## Design Notes

- Die Primaeraktion bleibt rechteckig und saffronfarben auf dunklem Feld. Rueckroute, Included-with-Notice und Next Work nutzen die bestehenden harten Regeln und dunklen Leseflaechen statt Karten, Schatten oder einer zweiten Kaufzone.

## Verification

**Commands:**
- `npm run lint` -- erwartet: neue Astro-Seiten, Styles und Verifier bestehen ESLint.
- `npm run build` -- erwartet: Karrhold validiert, vier Published-Routen sowie `404.html` entstehen und alle statischen Verträge bestehen.

**Ausgeführt:**
- `npm run lint` -- bestanden.
- `npm run build` -- bestanden; Astro erzeugt vier Published-Detailrouten und `404.html`, danach bestehen Fixture-Tests, Bildvalidierung und statische Prüfung.
- Chromium gegen `astro preview` bei 375, 768, 1024 und 1440 CSS-Pixeln -- bestanden: `/works/karrhold` hat keinen horizontalen Overflow, zeigt Notice, Back- und Next-Work-Route, nutzt die exakte Same-Tab-DriveThruRPG-URL und alle geprueften Interaktionsziele sind mindestens 44 CSS-Pixel hoch.
- Chromium gegen `astro preview` fuer `/works/unknown-work` und `/works/draft-work` -- bestanden: beide liefern HTTP 404 und die produktfreie Not-Found-Seite mit Works- und Home-Rueckroute.

**Manual checks:**
- `/works/abythera`, `/works/ephemera`, `/works/daggerheart-item-bundle`, `/works/karrhold` und eine unbekannte Work-URL bei 375, 768, 1024 und 1440 CSS-Pixeln auf sichtbaren Fokus, CTA-Hierarchie, Same-Tab-Ziele, Lesereihenfolge und fehlende Horizontal-Overflow pruefen.
