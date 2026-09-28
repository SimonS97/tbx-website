---
title: 'Story 2.1: Veröffentlichte Works-Collection definieren und validieren'
type: 'feature'
created: '2026-09-28'
status: 'done'
route: 'dispatch'
review_loop_iteration: 1
baseline_commit: 'NO_VCS'
context:
  - '_bmad-output/implementation-artifacts/epic-2-context.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Es gibt keine kanonische Produktdatenquelle und keine Veröffentlichungsschranke für Works. Künftige Katalog-, Detail-, Discovery- und Empfehlungssichten könnten dadurch unvollständige, widersprüchliche oder nicht verfügbare Produkte veröffentlichen.

**Approach:** Eine schema-validierte lokale Astro-Collection hält pro Work genau eine Markdown-Datei. Zentralisierte Published-Queries und ein Produktions-Build-Validator erzwingen Datenvollständigkeit, werkseigene Assets und korrekte Referenzen, bevor ein Work öffentlich verwendet werden kann.

## Boundaries & Constraints

**Always:** Jeder Work liegt direkt unter `src/content/works/<slug>.md`; Dateistamm und kebab-case `slug` stimmen überein. Das normative Schema umfasst `slug`, `status`, `title`, `type`, `compatibility`, `premise`, `hook`, `facts`, `images`, `externalUrl`, `theMoment`, `tableUse`, `authorsNote`, `nextWork`, `discovery`, `includedWith`, `campaignRelation` und `seo`. Öffentliche Abfragen liefern ausschließlich `published` Works. Published Works haben mindestens einen Fact und ein Bild, exakt ein `hero`, kontextbezogene Alt-Texte, eine HTTPS-DriveThruRPG-URL und ein anderes veröffentlichtes `nextWork`. `discovery` ist optional: `route` ist ausschließlich `one-shot`, `campaign` oder `table`; nur `one-shot` verlangt ein vollständiges Vibe-Objekt `{ id, label, hook, order }` mit kebab-case `id` und positiver `order` und muss den Work-Typ `one-shot` haben. `campaign` und `table` verbieten Vibe und verlangen jeweils `campaign-framework` beziehungsweise `item-bundle`. `campaignRelation` enthält `work`, `label` und `standalone`; sein Ziel ist ein veröffentlichtes Campaign Framework. Work-Bilder liegen nur unter `src/assets/works/<slug>/`.

**Never:** Keine öffentlichen Katalog-, Detail- oder Discovery-Ansichten, keine Produktdaten-Duplikate, keine Beispielprodukte, keine frei erfundenen Produktcopy oder keine produktiven Inhalte als `published` anlegen. Keine Datenbank, CMS, React, clientseitige Datenladung oder Sonderlogik für einzelne Works hinzufügen. Story 2.2 entscheidet erst über final freigegebene Werke und deren Inhalte.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Draft Work | Valider Eintrag mit `status: draft` | Bleibt in der lokalen Collection, erscheint aber in keiner zentralen Published-Query | Der Build akzeptiert den Draft ohne öffentliche Freigabe. |
| Valides Published Work | Vollständiger Eintrag mit eigenem Asset, Hero, HTTPS-DriveThruRPG-URL und anderem Published `nextWork`; Discovery bleibt absent oder typkonform | Zentraler Query liefert den Eintrag für spätere öffentliche Sichten | Der Build beendet sich erfolgreich. |
| Ungültige Veröffentlichung | Fehlendes/eigenfremdes oder nicht reguläres Bild, kein oder mehrere Hero-Bilder, ungültige URL, Selbst-/Draft-Referenz oder typwidrige Discovery-/Beziehungsreferenz | Kein veröffentlichbarer Datensatz entsteht | `npm run build` bricht mit einem verständlichen Validierungsfehler ab. |
| Empfehlungskreislauf | Zwei Published Works referenzieren sich gegenseitig als `nextWork` | Beide Referenzen bleiben gültig | Nur die direkte Selbstreferenz wird abgewiesen. |

</frozen-after-approval>

## Code Map

- `src/content.config.ts` -- neu; definiert die Astro-Collection und Zod-Feldvalidierung für die normative Work-Form, inklusive optionaler typgebundener Discovery und vollständig modellierter Campaign Relations.
- `src/content/works/.gitkeep` -- neu; hält den noch leeren kanonischen Work-Ordner versionierbar, ohne Platzhalterdaten öffentlich anzulegen.
- `src/assets/works/.gitkeep` -- neu; reserviert die werkseigene Asset-Struktur für Story 2.2 und folgende.
- `src/lib/works.ts` -- neu; stellt eine zentrale asynchrone Published-Query und Work-Typen für spätere Katalog-, Detail-, Home- und Empfehlungslogik bereit.
- `scripts/validate-works.mjs` -- neu; prüft nach Astos Content-Parsing alle Collection-übergreifenden Referenz-, Published-, Asset-, Hero-, URL-, Discovery- und Beziehungsinvarianten einschließlich regulärer Dateien und aufgelöster Asset-Pfade.
- `scripts/verify-static-pages.mjs` -- bestehende Routengrundprüfung; unverändert lassen, weil Work-Routen und Katalogdarstellung erst in späteren Stories entstehen.
- `package.json` -- Build-Skript um die Works-Validierung erweitern, ohne bestehende Lint-/statische Seitenprüfung zu entfernen.
- `src/pages/works/index.astro` -- bestehender Platzhalter; nicht als Katalog umbauen. Falls ein sichtbarer „in preparation“-Text gegen die Published-only-Regel verstößt, durch einen neutralen, zugänglichen leeren Katalogzustand ohne Ankündigung ersetzen.

## Tasks & Acceptance

**Execution:**
- [ ] `src/content.config.ts`, `src/content/works/.gitkeep`, `src/assets/works/.gitkeep` -- Collection, vollständiges Zod-Schema und kanonische flache leere Verzeichnisstruktur anlegen; optionale Discovery, vollständiges Vibe-Objekt inklusive `id` und `order` sowie `campaignRelation.label` normgerecht abbilden -- alle späteren Work-Daten haben eine einzige validierbare Heimat.
- [x] `src/lib/works.ts` -- zentrale Published-Only-Query mit stabilen exportierten Typen implementieren -- spätere öffentliche Verbraucher können Drafts nicht versehentlich direkt abfragen.
- [ ] `scripts/validate-works.mjs`, `scripts/test-validate-works.mjs`, `package.json` -- Cross-Entry-Build-Validator integrieren und dessen Fixtures in die reguläre Build-Kette aufnehmen; Draft-Gating, optionale/typkonforme Discovery samt vollständigem Vibe, gültige Published-Referenzen, unzulässige Veröffentlichungen, reguläre eigene Assets und erlaubte Kreisläufe prüfen -- Zod-Parsing und referenzielle Regeln werden vor Produktionsausgabe durchgesetzt.
- [x] `src/pages/works/index.astro` -- den sichtbaren Ankündigungsplatzhalter durch einen neutralen, zugänglichen Zustand ohne erfundene Produkt- oder Veröffentlichungsinformation ersetzen -- die leere Collection leakt keine zukünftigen Works.
- [x] `package.json` und die Work-Validierungsdateien -- Lint, Fixture-Validierung und Produktionsbuild ausführen -- die Datenbasis bleibt reproduzierbar und die vorhandenen Routen bleiben intakt.

**Acceptance Criteria:**
- Given ein Work wird unter `src/content/works/<slug>.md` erstellt oder geändert, when Astro die Collection parst, then validiert das Schema alle normativen Produkt-, Inhalts-, Bild-, Referenz-, Discovery- und SEO-Felder.
- Given ein Work `published` ist, when der Build läuft, then verlangt er vollständige Pflichtdaten, exakt ein eigenes Hero-Bild, eine valide HTTPS-DriveThruRPG-URL und ein anderes veröffentlichtes `nextWork`.
- Given ein Published Work ungültige Bildpfade, nicht reguläre/eigenfremde Assets oder interne Referenzen enthält, when `npm run build` läuft, then schlägt der Build mit einer Angabe zur fehlerhaften Beziehung fehl.
- Given ein Work `draft` ist, when zentrale Published-Queries laufen, then erscheint er auf keiner zukünftigen Katalog-, Detail-, Discovery- oder Empfehlungsfläche.
- Given ein Published Work ein Asset referenziert, when die Collection validiert wird, then liegt es im zugehörigen `src/assets/works/<slug>/`-Verzeichnis, hat kontextbezogenen Alt-Text und eine erlaubte Bildrolle.

## Implementation Notes

- `src/content.config.ts` definiert die lokale flache `works`-Collection mit Astro-Glob-Loader und validiert alle normativen Work-Felder, sofern sie am Draft vorhanden sind, sowie zulässige Typen, Bildrollen, kebab-case-Slugs, SEO, die typgebundene optionale Discovery und die für Astro-Bilder nötigen Dimensionen oder Seitenverhältnisse. Der Produktionsvalidator verlangt anschließend die vollständige Published-Form.
- `src/lib/works.ts` bietet `getPublishedWorks()` und die zugehörigen Typen als zentrale API für spätere öffentliche Oberflächen.
- `scripts/validate-works.mjs` prüft nach dem Astro-Build flache Dateipfade, Slugs, Veröffentlichungsdaten, aufgelöste eigene reguläre Asset-Dateien, Bildrollen und Alt-Texte, DriveThruRPG-URLs, typkonforme optionale Discovery sowie Published-Referenzen. Direkte Empfehlungskreisläufe bleiben erlaubt, Selbstreferenzen nicht.
- `scripts/test-validate-works.mjs` deckt Draft-Gating, optionale und typkonforme Discovery, gültige Published-Referenzen, ungültige Veröffentlichungen, nicht reguläre Assets und erlaubte Empfehlungskreisläufe mit Fixtures ab. `npm run build` führt die Suite verpflichtend aus.
- Der leere Zustand unter `/works` enthält keine angekündigten oder erfundenen Werke.

## Spec Change Log

- Der Review-Befund hat gezeigt, dass die erste Spezifikation `discovery.route` irrtümlich als Work-URL und Discovery für jedes Published Work als Pflicht modellierte. Discovery ist nun optional und als Kategorievertrag (`one-shot`/`campaign`/`table`) mit typabhängigem Vibe präzisiert; `campaignRelation.label`, Published-Campaign-Target, flache Work-Dateien, reguläre Asset-Prüfung und Fixture-Ausführung im Build sind ergänzt. Dies verhindert, dass valide Published Works ohne Homepage-Discovery abgewiesen oder künftige Home-Konfigurationen gegen eine falsche Datenform gebaut werden. KEEP: zentrale Published-Query, werkseigene Asset-Ownership, exakt ein Hero und erlaubte gerichtete `nextWork`-Kreisläufe bleiben erhalten.
- Der nachgelagerte Vertragsabgleich ergänzte die fehlenden normativen Vibe-Felder `id` und `order`. Das verhindert, dass Story 3 eine instabile Vibe-Auswahl oder nachträgliche Datenmigration benötigt.

## Review Triage Log

| Verdict | Evidence |
|---------|----------|
| false | Die Validator-, Test- und statischen Prüfscripte sowie die bestehende Route existieren; die nicht-Git-basierte Momentaufnahme ließ verschachtelte Quelldateien aus. |
| false | Sichtbare Work-Daten, Detailrouten, Assets und erweitertes Gallery-Rendering gehören ausdrücklich zu den nachfolgenden Stories 2.2 bis 2.6; die Collection bleibt absichtlich leer. |
| low | Contributor-Dokumentation und CI wären sinnvoll, liegen aber außerhalb dieser Collection-Foundation und werden von der aktuellen Umgebung nicht vorausgesetzt. |
| false | Das `undici`-Override bleibt mit Node `>=22.13.0` kompatibel und wurde bereits in Story 1.1 geprüft. |
| high | Die ursprüngliche Discovery- und Campaign-Relation-Modellierung wich vom normativen Architekturvertrag ab; diese Änderung wurde als `bad_spec` in den korrigierten Vertrag übernommen. |
| medium | Der Validator akzeptierte ein Verzeichnis oder einen Symlink als Work-Asset; die korrigierte Spezifikation verlangt eine reguläre Datei im realen Work-Asset-Verzeichnis. |
| patch | Die Works-Fixtures müssen innerhalb der normalen Build-Kette laufen, damit Validatorregressionen nicht nur durch einen separaten manuellen Befehl sichtbar werden. |
| false | Die Validator-, Fixture- und statischen Prüfscripte sowie die öffentlichen Astro-Routen existieren und liefen im vollständigen Produktionsbuild erfolgreich; die Nicht-Git-Momentaufnahme ließ sie aus. |
| false | Reale Work-Einträge, Detailrouten und öffentliches Produktmaterial sind explizit den Stories 2.2 und 2.4 bis 2.6 zugeordnet; die kanonische leere Collection ist beabsichtigt. |
| low | `.astro/` ist in `.gitignore`, aber noch nicht in den ESLint-Ignores; das ist eine direkte Konfigurationsbereinigung. |
| low | Ein allgemeines `npm test`-Alias, CI und Contributor-Dokumentation sind nicht erforderlich für die aktuelle lokale Collection-Story und würden den kleinen Scope unverhältnismäßig erweitern. |

## Verification

**Commands:**
- `npm run lint` -- erwartet: Content-Konfiguration, Query- und Validator-Skripte bestehen den Linter.
- `npm run test:works` -- erwartet: alle positiven und negativen Works-Validierungsfixtures liefern den erwarteten Erfolg oder Fehler.
- `npm run build` -- erwartet: Astro-Collection, Works-Validator und bestehende statische Seitenprüfung bestehen mit leerer Collection.

**Ausgeführt am 2026-09-28:**
- `npm run lint` -- erfolgreich.
- `npm run test:works` -- erfolgreich; Draft-Gating, optionale und typkonforme Discovery, Published-Referenzen, unzulässige Veröffentlichungen, reguläre Assets und Empfehlungskreisläufe bestanden.
- `npm run build` -- erfolgreich; Astro, die im Build enthaltenen Works-Fixtures, die leere Works-Validierung und die bestehende statische Routenprüfung bestanden. Astro meldet erwartungsgemäß, dass die bewusst leere Collection keine Markdown-Einträge enthält.

**Manual checks (if no CLI):**
- Den neutralen leeren Zustand von `/works` lesen und bestätigen, dass weder Entwürfe noch fiktive Veröffentlichungshinweise sichtbar sind.
