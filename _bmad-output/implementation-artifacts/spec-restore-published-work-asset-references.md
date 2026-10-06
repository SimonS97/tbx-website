---
title: 'Published-Work-Asset-Referenzen nach Asset-Austausch wiederherstellen'
type: 'bugfix'
created: '2026-10-06'
status: 'in-review'
route: 'dispatch'
review_loop_iteration: 0
baseline_commit: 'a1d0b362c6536f13adb8d219c6e7a83f854e0bb0'
context:
  - 'AGENTS.md'
  - '_bmad-output/implementation-artifacts/epic-2-context.md'
  - '_bmad-output/implementation-artifacts/spec-2-4-present-decision-ready-work-detail-pages.md'
  - '_bmad-output/implementation-artifacts/detail-page-asset-blocker-handoff-2026-09-29.md'
---

<frozen-after-approval reason="human-owned intent - do not modify unless human renegotiates">

## Intent

**Problem:** Der Asset-Austausch vom 2026-10-06 hat sechs Dateien ersetzt oder entfernt, ohne die kanonischen Work-Frontmatters und den Ephemera-Hero-Resolver mitzuziehen. Dadurch scheitern `npm run validate:works` und folglich der Produktionsbuild, obwohl die neuen Bilddateien standardkonform dekodierbar sind. Die bisherige Daggerheart-Kennzeichnung bleibt zudem ein visuelles Release-Risiko, weil sie eine breite Bitmap per CSS beschneidet.

**Approach:** Die bestehenden Published-Work-Daten werden auf die vorhandenen Ersatzdateien abgeglichen und der Hero-Resolver laedt das neue Ephemera-Cover. Bis eine eng gerahmte offizielle Daggerheart-Kompatibilitaetsmarke vorliegt, zeigen Detailseiten den vorhandenen kanonischen Textwert dezent statt der beschnittenen Bitmap. Eine Release-Readiness-Ergaenzung dokumentiert die Dateizuordnung und begrenzt die noch nicht umgesetzte Galerie-/Evidence-Nutzung auf einen spaeteren Schritt.

## Boundaries & Constraints

**Always:** Die drei Published Works bleiben die einzigen oeffentlichen Datenquellen und behalten genau ein Hero. Alle Frontmatter-Pfade zeigen auf regulare Dateien im jeweiligen Work-Ordner. Kontextbezogene Alt-Texte und reservierte Seitenverhaeltnisse entsprechen den tatsaechlich verwendeten Dateien. Detailseiten bleiben Hero-only, mit voller, unbeschnittener Hero-Datei und der bestehenden mobilen Lesereihenfolge. Bis ein eng gerahmtes, freigegebenes offizielles Daggerheart-Asset bereitsteht, zeigt die Detailseite `work.data.compatibility` als dezente sichtbare Textinformation; die bestehende offizielle Bitmap bleibt unveraendert und wird nicht per CSS beschnitten. Die Readiness-Ergaenzung haelt technische Dekodierbarkeit, Ersatzpfade und offene visuelle Einschränkungen nachvollziehbar fest.

**Never:** Keine Bilddateien erzeugen, bearbeiten, umbenennen, verschieben oder loeschen. Keine Galerie, GM-Evidence, CTA, Next-Work-, Karrhold- oder Not-Found-Funktion implementieren. Keine Produktionscopy, Facts, URLs, Rollen oder Work-Beziehungen erfinden. Die aktuell vorhandenen Dateien `CampaignFramework.png` und `NewDesign1.png` werden nicht durch diese Arbeit auf einer oeffentlichen Galerie freigegeben: ihre sichtbaren Titel-/Korrekturspuren erfordern eine getrennte inhaltliche Freigabe, bevor eine kuenftige Galerie sie rendert.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|---|---|---|---|
| Ersatzdatei | Ein Published-Frontmatter verweist noch auf einen entfernten Asset-Namen | Der Pfad referenziert die vorhandene, werkseigene Ersatzdatei mit passendem Alt-Text und Seitenverhaeltnis | Der Works-Validator akzeptiert nur vorhandene regulaere Dateien im richtigen Work-Ordner. |
| Ephemera-Hero | Das neue Cover liegt unter `Selfmade_Cover.png` | Astro baut `/works/ephemera` mit dem vollstaendigen, dekodierbaren Cover und reserviert dessen echte Bildflaeche | Ein unbekannter Hero-Pfad wirft weiterhin einen klaren Resolver-Fehler. |
| Kompatibilitaet | Das bereitgestellte Markenbild ist zu breit gepaddet und wird bisher beschnitten | Die Detailseite nutzt die nach der Freigabe gewaehlte, lesbare Behandlung vor dem Titel | Die zugaengliche Kennzeichnung bleibt im statischen HTML erhalten. |
| Spaetere Galerie | Ersatz-Galerie-/Evidence-Dateien sind im Datenbestand, werden aber in Story 2.4 nicht gerendert | Der aktuelle Hero-only-Umfang bleibt unveraendert; die Readiness beschreibt, welche spaetere Sichtpruefung noch offen ist | Keine Datei wird durch ein neues Galerie-Layout versehentlich veroeffentlicht. |

</frozen-after-approval>

## Code Map

- `src/content/works/abythera.md` -- aktualisiert den entfernten Framework-Galeriepfad auf die vorhandene Ersatzdatei; die Datei bleibt in diesem Fix ungerendert.
- `src/content/works/ephemera.md` -- ist die kanonische Zuordnung fuer das neue Cover, die Stadt-, Orion- und GM-Referenzdateien; Hero-Ratio und Alt-Texte muessen die tatsaechlichen Dateien abbilden.
- `src/content/works/daggerheart-item-bundle.md` -- aktualisiert die entfernte Item-Vorschau und ihre bildbezogenen Metadaten, ohne eine Galerie zu bauen.
- `src/components/works/WorkHero.astro` -- hat eine explizite, statische Published-Hero-Importtabelle; nur der Ephemera-Import und sein Lookup-Key sind veraltet.
- `src/components/works/DaggerheartCompatibility.astro` -- importiert derzeit die ungeeignete breite Markenbitmap und wird den uebergebenen kanonischen Kompatibilitaetstext ausgeben.
- `src/pages/works/[slug].astro` -- besitzt bereits den kanonischen Work-Datensatz und reicht dessen `compatibility` ohne Duplikat an die Komponente weiter.
- `src/styles/global.css` -- ersetzt die Bild-Crop-Regeln durch eine dezente, tokenbasierte Textbehandlung neben dem Work-Type.
- `scripts/validate-works.mjs` -- prueft reale Frontmatter-Pfade und Werkseigentum dynamisch; bleibt als Published-Work-Schranke unveraendert.
- `scripts/verify-static-pages.mjs` -- prueft Hero-Emission, sichtbare kanonische Kompatibilitaet, Hero-only-Ausgabe und Inhaltsreihenfolge dynamisch.
- `_bmad-output/implementation-artifacts/story-2-3-art-direction-release-readiness.md` -- erhaelt eine datierte Ergaenzung mit Ersatzpfaden, technischer Dekodierbarkeit und den offenen Galerie-/Evidence-Grenzen; fruehere Freigabehistorie bleibt nachvollziehbar.

## Tasks & Acceptance

**Execution:**
- [x] `src/content/works/abythera.md`, `src/content/works/ephemera.md`, `src/content/works/daggerheart-item-bundle.md` -- entfernte Asset-Pfade auf die vorhandenen Ersatzdateien abgleichen sowie bildbezogene Alt-Texte und Seitenverhaeltnisse an die verwendeten Dateien anpassen -- der Published-Datensatz bleibt wahrheitsgemaess und validierbar.
- [x] `src/components/works/WorkHero.astro` -- den Ephemera-Import und den Lookup-Key auf `Selfmade_Cover.png` umstellen -- die statische Detailroute kann den neuen Hero ohne Astro-Metadatenfehler ausliefern.
- [x] `src/components/works/DaggerheartCompatibility.astro`, `src/pages/works/[slug].astro`, `src/styles/global.css` -- die geschnittene Markenbitmap bis zu einem neuen offiziellen Asset durch den kanonischen, dezenten sichtbaren Kompatibilitaetstext ersetzen und dessen bestehende Informationsreihenfolge bewahren -- die Detailseiten behaupten keine unfreigegebene Ersatzmarke.
- [x] `_bmad-output/implementation-artifacts/story-2-3-art-direction-release-readiness.md` -- eine datierte Asset-Reconciliation mit Pfadzuordnungen und verbleibenden Galerie-/Evidence-Einschraenkungen anfuegen -- spaetere Arbeit verwechselt technische Referenzreparatur nicht mit visueller Freigabe.
- [x] `scripts/verify-static-pages.mjs` -- den sichtbaren kanonischen Kompatibilitaetstext und die Hero-only-Ausgabe der Detailseiten pruefen -- der Text-Fallback und die Galerie-Grenze bleiben bei kuenftigen Aenderungen abgesichert.
- [x] `package.json`-Skriptkette -- `npm run test:works`, `npm run validate:works`, `npm run lint` und `npm run build` ausfuehren -- Collection, Astro-Build und statische Detailseiten sind wieder geschlossen validiert.

**Acceptance Criteria:**
- Given die drei Published-Works auf aktuell vorhandene Ersatzdateien zeigen, when der Produktionsvalidator laeuft, then bestehen alle Bildpfade, Werkseigentum, Published-Felder und Beziehungen ohne Fehler.
- Given `/works/ephemera` statisch gebaut wird, when sein Hero rendert, then wird `Selfmade_Cover.png` als vollstaendige, browser-dekodierbare Datei mit reservierter tatsaechlicher Flaeche ausgeliefert.
- Given eine Published-Detailseite erscheint, when ihre Klassifikation vor Titel und Premise gerendert wird, then ist `work.data.compatibility` als dezente sichtbare und zugaengliche Textinformation lesbar.
- Given die Ersatzdateien fuer Galerie oder Evidence spaeter verwendet werden sollen, when ein Folgeumfang geplant wird, then benennt die Readiness die noch ausstehende visuelle Freigabe; der aktuelle Fix rendert keine zusaetzlichen Medien.
- Given die komplette Projektkette ausgefuehrt wird, when Astro, Work-Fixtures, Validator und statische Pruefung laufen, then bestehen sie ohne durch den Asset-Austausch verursachte Fehler.

## Implementation Notes

- Die sechs Ersatzdateien wurden in zwei Bildgruppen zu je hoechstens drei Dateien als browser-dekodierbar bestaetigt. Ihre gemessenen Seitenverhaeltnisse sind in den Published-Frontmatters hinterlegt.
- Die drei Frontmatters referenzieren die vorhandenen Ersatzdateien; `WorkHero.astro` importiert und loest `Selfmade_Cover.png` fuer Ephemera statisch auf.
- Die breite Daggerheart-Bitmap wird weder importiert noch zugeschnitten. `DaggerheartCompatibility.astro` gibt den kanonischen Textwert aus; die statische Pruefung sichert diesen sichtbaren Wert sowie die Hero-only-Grenze ab.
- Keine Datenmigration, Loeschung, externe Nebenwirkung oder Deployment wird durch diesen Fix ausgeloest. Der Footprint ist auf drei Frontmatters, drei Detailansichtsdateien, die Release-Readiness und bestehende Validierungsbefehle begrenzt.

## Spec Change Log

## Review Triage Log

## Design Notes

- Die Detailseite bleibt im etablierten Saffron-Myth-Theatre-Muster: Type und Kompatibilitaet erscheinen zuerst auf einem opaken Feld; Produktkunst bleibt ein vollstaendiger Nachweis ohne Copy-Overlay. Der Text-Fallback bleibt bewusst visuell nachgeordnet, bis ein kompakter offizieller Marken-Lockup verfuegbar ist.

## Verification

**Commands:**
- `npm run test:works` -- erwartet: bestehende positive und negative Collection-Fixtures bestehen unveraendert.
- `npm run validate:works` -- erwartet: alle Published-Work-Assetpfade referenzieren reale, werkseigene Dateien.
- `npm run lint` -- erwartet: Astro-Komponenten, Styles und Skripte bestehen die Lint-Pruefung.
- `npm run build` -- erwartet: Astro erzeugt die drei Published-Detailseiten; Works-Validator und statische Pruefung bestehen.

**Ausgefuehrt:**
- `npm run test:works` -- bestanden.
- `npm run validate:works` -- bestanden.
- `npm run lint` -- bestanden.
- `npm run build` -- bestanden, einschliesslich der erweiterten statischen Detailseitenpruefung.

**Manual checks:**
- `/works/abythera`, `/works/ephemera` und `/works/daggerheart-item-bundle` bei 375, 768, 1024 und 1440 CSS-Pixeln auf sichtbare Kompatibilitaet, vollstaendige Hero-Kunst, Lesereihenfolge und Fokus pruefen.
