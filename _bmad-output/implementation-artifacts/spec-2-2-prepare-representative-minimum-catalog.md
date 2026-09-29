---
title: 'Story 2.2: Repräsentativen Mindestkatalog vorbereiten'
type: 'feature'
created: '2026-09-29'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
baseline_commit: '928106d261994175e8c18dd67de7822f9b3fdbb3'
context:
  - 'AGENTS.md'
  - '_bmad-output/implementation-artifacts/epic-2-context.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Die Works-Collection und ihre Veröffentlichungsschranke sind vorhanden, enthalten aber keine echten Produkte. Damit bleiben Katalog, spätere Detailseiten und die Homepage-Discovery ohne belastbare, kanonische Inhalte.

**Approach:** Abythera, ein freigegebener One-Shot und das Daggerheart Item Bundle erhalten je einen vollständigen, schema-validen Published-Eintrag mit nur belegten Produktinformationen, werkseigenen Bildern und korrekt aufgelösten Beziehungen. Die Einträge sind die alleinige Datenquelle für nachfolgende Katalog-, Detail- und Discovery-Arbeit.

## Boundaries & Constraints

**Always:** Der Mindestkatalog besteht aus Abythera, Ephemera und dem Daggerheart Item Bundle. Jeder Eintrag liegt als flache Datei unter `src/content/works/<slug>.md`, entspricht vollständig dem bestehenden Schema und verweist ausschließlich auf reguläre Dateien im eigenen Asset-Ordner. Jeder Published Work hat genau ein Hero-Bild, kontextbezogene Alt-Texte, mindestens einen verifizierten Fact, die exakte HTTPS-DriveThruRPG-URL, einen anderen veröffentlichten `nextWork`, SEO und vollständige Texte in Englisch. Die öffentliche Copy wird aus den belegten Fakten des PRD-Addendums redaktionell formuliert, vor dem Einsatz humanisiert und unabhängig auf Slop, Werbeton und unbelegte Behauptungen geprüft. Produktfakten stammen ausschließlich aus dem PRD-Addendum oder einer ausdrücklichen Creator-Entscheidung. Empfehlungen dürfen einen gerichteten Zyklus zwischen verschiedenen Werken bilden.

**Approved media:** Abythera verwendet `abythera-cover.png` als Hero sowie `harmony-portrait.png` und `campaign-framework-overview.png` als Galerie; `karrhold-dm-reference.png` bleibt unveröffentlicht. Ephemera verwendet `hero-cover.png` als Hero sowie `underground-city-scene.png` und `orion-npc-portrait.png` als Galerie; `gm-cheat-sheet-1.png` darf nur als klar benanntes GM-Material erscheinen, alle anderen Figurenporträts bleiben vorerst unveröffentlicht. Das Item Bundle verwendet `daggerheart-item-bundle-cover.jpg` als Hero sowie `item-preview-current-design.png` und `daggerheart-items-volume-1-cover.jpg` als Galerie; `scalding-flask-preview-legacy.png` bleibt unveröffentlicht. Öffentliche Copy liegt auf einer stabilen dunklen Fläche neben oder unter Medien, nie als Textüberlagerung. Hero-Bilder bleiben vollständig lesbar; der spätere Katalog nutzt eine einheitliche hochformatige Bildkante.

**Discovery and recommendations:** Abythera nutzt `discovery.route: campaign`, das Item Bundle `discovery.route: table`, Ephemera `discovery.route: one-shot` mit einer redaktionell bestimmten, aus der veröffentlichten Copy abgeleiteten Vibe. Die Empfehlungen bilden den gerichteten Zyklus Abythera -> Ephemera -> Daggerheart Item Bundle -> Abythera. Ephemera referenziert Abythera als Campaign Framework mit `standalone: true`.

**Never:** Keine Produktinformationen, Spielversprechen, Zahlen, Veröffentlichungsfreigaben, Bildrollen, Crops, Alt-Texte oder öffentlichen Texte erfinden. Keine Detailrouten, Katalogansicht, Homepage-Konfiguration, Komponenten oder Sonderlogik hinzufügen. Keine Bilder erzeugen, verändern, verschieben oder außerhalb ihres Work-Ordners referenzieren. Keine nicht freigegebenen Werke veröffentlichen.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Mindestkatalog vollständig | Drei freigegebene Works mit allen Daten, Assets und Beziehungen | Drei Published Collection-Einträge bestehen Schema und Produktionsvalidator | `npm run build` erzeugt keine Datenfehler. |
| Unvollständige Freigabe | Copy, Bildrolle, Ziel oder Beziehung ist nicht bestätigt | Der betreffende Work bleibt unveröffentlicht; es entsteht kein Ersatzinhalt | Umsetzung hält vor der Veröffentlichung an und fordert die Entscheidung an. |
| Ungültige Beziehung oder Asset | Fremder/fehlender Bildpfad, ungültige URL oder Selbst-/Draft-Referenz | Der Eintrag wird nicht als veröffentlichbar akzeptiert | Der bestehende Validator benennt die fehlerhafte Beziehung beim Build. |

</frozen-after-approval>

## Code Map

- `src/content.config.ts` -- bestehendes normatives Astro-/Zod-Schema für Work-Frontmatter; unverändert verwenden, nicht erweitern.
- `scripts/validate-works.mjs` -- Produktionsvalidator für Published-Pflichtfelder, reguläre werkseigene Assets, Bildrollen, URLs und Beziehungen; unverändert als Veröffentlichungsschranke nutzen.
- `src/content/works/` -- aktuell nur mit `.gitkeep`; hier drei flache Markdown-Einträge hinzufügen.
- `src/assets/works/abythera/`, `src/assets/works/ephemera/`, `src/assets/works/daggerheart-item-bundle/` -- vorhandene, bereits normalisierte Werkbilder; nur nach expliziter Rollen- und Platzierungsfreigabe referenzieren.
- `_bmad-output/planning-artifacts/prds/prd-websiteDraft-2026-09-28/addendum.md` -- alleinige vorhandene Quelle für URLs, Produktfakten und spoilerarme Ansätze; keine Freigabe für erfundene oder vollständige Public Copy.
- `src/lib/works.ts` -- bestehende Published-Only-Query; nicht für individuelle Produktdaten umgehen oder duplizieren.

## Tasks & Acceptance

**Execution:**
- [x] `src/content/works/abythera.md` -- vollständigen Published-Eintrag aus freigegebenen Fakten, geprüfter englischer Copy, Bildrollen, SEO, Campaign-Discovery und Empfehlung anlegen -- Campaign Framework wird über die zentrale Collection verfügbar.
- [x] `src/content/works/ephemera.md` -- den freigegebenen One-Shot mit vollständiger Published-Form, Vibe und Abythera-Beziehung anlegen -- der Mindestkatalog enthält ein belastbares Abenteuer.
- [x] `src/content/works/daggerheart-item-bundle.md` -- vollständigen Published-Eintrag mit werkseigenen Item-Bildern, Tabellenfakten, SEO, Table-Discovery und Empfehlung anlegen -- ein Table-Resource-Pfad steht kanonisch bereit.
- [x] `src/content/works/*.md`, `package.json` -- Lint und vollständige Build-Kette ausführen -- Schema-, Asset-, URL- und Referenzfehler verhindern Veröffentlichung.

**Acceptance Criteria:**
- Given die freigegebenen Daten für Abythera, einen One-Shot und das Daggerheart Item Bundle, when die drei Collection-Einträge erstellt werden, then enthält jeder alle Published-Pflichtfelder, mindestens einen Fact, mindestens ein eigenes Bild und genau ein Hero.
- Given ein Eintrag ein Bild oder eine Beziehung referenziert, when der Produktionsvalidator läuft, then gehören Bilder zum eigenen Work-Ordner und jede Empfehlung verweist auf genau einen anderen Published Work.
- Given `npm run build` läuft, when die Mindestkatalogdaten validiert werden, then bestehen Astro-Parsing, Works-Fixtures, Published-Validator und statische Seitenprüfung ohne Fehler.
- Given ein späterer Katalog, eine Detailseite oder die Homepage eine Published-Query nutzt, when sie die Einträge abruft, then kann sie Bild, Typ, Titel, Premise, Fakten, Inhaltsabschnitte, CTA und Empfehlung aus derselben kanonischen Quelle auflösen.

## Implementation Notes

- Die drei Einträge bilden den freigegebenen gerichteten Empfehlungskreislauf und verwenden ausschließlich die erlaubten werkseigenen Medien.

## Spec Change Log

## Review Triage Log

| Verdict | Evidence |
|---------|----------|
| false | Der Diff wurde beim Erzeugen für die Review-Schicht doppelt serialisiert; im Arbeitsbaum existiert jede Datei genau einmal und der Git-Status enthält keine kollidierenden Versionen. |
| false | Markdown-Bodies sind laut Architektur für optionale ausgewählte Detailblöcke reserviert. Die in Story 2.2 verlangten Inhalte liegen vollständig und kanonisch im Frontmatter; Detailseiten und CTA-Komponenten sind ausdrücklich nicht Teil dieser Story. |
| patch | Mehrere Alt-Texte beschrieben nur Bildrolle oder Dateikontext. Sie wurden in sichtbare, knappe Inhaltsbeschreibungen geändert, damit spätere Bildverwendung kontextbezogener bleibt. |
| false | Die beanstandeten Formulierungen zum Item Bundle sind unmittelbar aus dem PRD-Addendum abgeleitet: unmittelbarer Tischeinsatz, nützliche und flavourvolle Items sowie leichte Integration ohne Überkomplizierung. |
| false | Das Addendum beschreibt Ephemera ausdrücklich als standalone One-Shot oder zweiteilige Session mit 5-8 Stunden. Der Work-Typ bestimmt die Discovery-Kategorie, nicht eine Einschränkung der dokumentierten Spielstruktur. |
| false | Das Addendum nennt Entscheidungen über ein zentrales Artefakt ausdrücklich als Teil des Spielversprechens; der Vibe-Hook gibt nur diese belegte, spoilerarme Information wieder. |
| false | Das PRD-Addendum ist im Code Map als alleinige Faktenquelle dokumentiert und die Zahlen stimmen mit ihm überein. Das bestehende Content-Schema sieht keine öffentlichen Quellenfelder vor; ein zusätzliches Auditformat wäre außerhalb dieser Datenstory. |
| false | Die Review-Triage wird mit dieser Tabelle dokumentiert. Ein leerer Change Log ist korrekt, da kein bad-spec-Loopback stattgefunden hat. |

## Verification

**Commands:**
- `npm run lint` -- erwartet: die neuen Markdown-Daten und vorhandenen TypeScript-/Skriptdateien bestehen die Projektprüfung.
- `npm run test:works` -- erwartet: die positiven und negativen Validator-Fixtures bestehen unverändert.
- `npm run build` -- erwartet: Astro-Collection, Works-Validator und statische Seitenprüfung akzeptieren ausschließlich die drei vollständigen Published Works.

**Ausgeführt:**

- `npm run lint` -- bestanden.
- `npm run test:works` -- bestanden.
- `npm run validate:works` -- bestanden.
- `npm run build` -- bestanden; enthält Astro-Build, Works-Fixtures, Published-Validator und statische Seitenprüfung.

**Manual checks (if no CLI):**
- Die drei Frontmatter-Dateien gegen die freigegebenen Produktfakten, Bilder, Alt-Texte, URLs, Empfehlungen und Veröffentlichungsbeziehungen prüfen.
