---
title: 'Story 2.3: Art Direction der veröffentlichten Works prüfen'
type: 'feature'
created: '2026-09-29'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
baseline_commit: '7682f396010ff874c4c68ed4c3779669f770ec87'
context:
  - 'AGENTS.md'
  - '_bmad-output/implementation-artifacts/epic-2-context.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Die drei veröffentlichten Works haben freigegebene Dateien und allgemeine Bildrollen, aber keine nach Platzierung geprüfte Release-Readiness. Katalog-, Detail- und Homepage-Implementierung könnten Bilder sonst unkontrolliert beschneiden, nicht lesbare Copy darauf legen oder GM-Material wie dekorative Kunst verwenden.

**Approach:** Ein einzelnes Art-Direction-Readiness-Artefakt dokumentiert für jede freigegebene Datei die zulässige öffentliche Platzierung, Bildrolle, Crop-Grenzen, responsive Behandlung, Kontrastregel, kontextbezogenen Alt-Text und bekannte Limitierungen. Es ergänzt die kanonischen Work-Einträge, ohne Produktdaten oder eine öffentliche Oberfläche zu bauen.

## Boundaries & Constraints

**Always:** Prüfe ausschließlich Abythera, Ephemera und das Daggerheart Item Bundle mit den bereits freigegebenen Dateien. Öffentliche Copy bleibt auf einem opaken Night-Mineral-/Night-Deep-Feld neben oder unter dem Bild, nie direkt auf unkontrollierter Bildfläche. Katalog-Tiles zeigen das Produktbild vor Type, Title und Premise; Detailseiten bewahren die mobile Reihenfolge aus Produktdaten, Titel, Hook/Facts und danach Bild. Hero-Kunst wird vollständig gezeigt und nicht als Ambient-Wallpaper verwendet. German-language GM-Material erscheint nur als lesbarer, klar als GM-Material bezeichneter Evidence-Block. Nicht freigegebene Dateien bleiben aus öffentlichen Platzierungen ausgeschlossen.

**Catalog frame decision:** Spätere Katalog-Tiles verwenden eine feste 2:3-Kante. Weicht ein freigegebenes Hochformat davon ab, bleibt die gesamte Datei innerhalb dieser Kante sichtbar und erhält ruhiges Letterboxing auf einem tonalen Night-Mineral-/Night-Deep-Feld; sie wird nicht inhaltlich auf 2:3 zugeschnitten.

**Never:** Keine Assets generieren, bearbeiten, umbenennen oder verschieben. Keine Work-Frontmatter, Produktcopy, Bildrollen, CSS, Komponenten, Katalog-, Detail- oder Home-Routen ändern. Keine Crop-Werte oder tatsächlichen Bildmaße als technisch verifiziert ausgeben, wenn sie nicht verlässlich vorliegen. Kein Supplemental Imagery ohne eine separate Creator-Freigabe mit Rolle, Komposition, Palette, Verhältnis und Zielplatzierung vorschlagen.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Freigegebenes Artwork | Hero-, Galerie- oder Evidence-Datei eines Published Works | Zielplatzierung, Crop-Schutz, Responsive-Behandlung, Kontrastregel und Alt-Text sind dokumentiert | Spätere Komponenten können die Regel ohne Interpretation umsetzen. |
| Abweichendes Seitenverhältnis | Originalformat passt nicht zur geplanten Katalogkante | Readiness hält vollständige Hero-Darstellung fest und benennt die zulässige Katalogbehandlung | Keine starre Reservierung oder destruktiver Crop ohne Creator-Entscheidung. |
| GM- oder nicht freigegebenes Material | Cheat Sheet oder ausgeschlossene Datei | Nur als lesbares, benanntes Evidence-Material freigegeben beziehungsweise explizit ausgeschlossen | Nie als Hintergrund, Hero oder dekorative Galerie verwenden. |

</frozen-after-approval>

## Code Map

- `src/content/works/abythera.md`, `src/content/works/ephemera.md`, `src/content/works/daggerheart-item-bundle.md` -- kanonische Published-Einträge mit ausschließlich den zu prüfenden Asset-Referenzen und Alt-Texten; nicht verändern.
- `src/assets/works/abythera/`, `src/assets/works/ephemera/`, `src/assets/works/daggerheart-item-bundle/` -- freigegebene und ausgeschlossene Originalmedien; nur visuell begutachten.
- `_bmad-output/planning-artifacts/ux-designs/ux-websiteDraft-2026-09-28/DESIGN.md` -- Saffron Myth Theatre, stabile Textfelder, Galerie-Reihenfolge und responsive Bildanforderungen.
- `_bmad-output/planning-artifacts/ux-designs/ux-websiteDraft-2026-09-28/EXPERIENCE.md` -- Detail-Anatomie, Evidenz-Regel für GM-Material, Medien- und Accessibility-Verhalten.
- `_bmad-output/implementation-artifacts/story-2-3-art-direction-release-readiness.md` -- neu; einziges Ergebnis der Art-Direction-Review.

## Tasks & Acceptance

**Execution:**
- [x] `_bmad-output/implementation-artifacts/story-2-3-art-direction-release-readiness.md` -- pro Work und freigegebenem Asset die bestätigte Zielplatzierung, Rolle, Crop-Schutz, Responsive-Behandlung, Kontrastregel, Alt-Text, Limitierung und Freigabe dokumentieren -- spätere öffentliche Oberflächen erhalten eine umsetzbare Bildanweisung.
- [x] `_bmad-output/implementation-artifacts/story-2-3-art-direction-release-readiness.md` -- ausgeschlossene Dateien und Ephemeras GM-Cheat-Sheet mit ihrer verbindlichen Nichtverwendung beziehungsweise Evidence-Behandlung markieren -- Spoiler, Layout- und Accessibility-Risiken bleiben kontrollierbar.
- [x] `package.json` -- `npm run lint` und `npm run build` ausführen -- die reine Readiness-Dokumentation verändert die bestehende Website- und Content-Validierung nicht.

**Acceptance Criteria:**
- Given ein späteres Katalog-, Detail-, Discovery-, Featured- oder Evidence-Layout eine freigegebene Datei verwendet, when die Release-Readiness gelesen wird, then sind Bildrolle, Zielplatzierung, Crop-Grenzen, responsive Behandlung und ein kontextbezogener Alt-Text eindeutig.
- Given ein Hero-Bild von einem festen Katalogformat abweicht, when die spätere Umsetzung die Katalogkante bildet, then folgt sie der vom Creator bestätigten Regel, ohne die Bildidentität oder relevante sichtbare Inhalte unkontrolliert zu verlieren.
- Given Ephemeras GM-Cheat-Sheet oder ein ausgeschlossener Asset-Pfad in Betracht gezogen wird, when eine öffentliche Fläche entsteht, then ist GM-Material nur als lesbares Evidence-Element zulässig und ausgeschlossene Dateien bleiben absent.
- Given die Review abgeschlossen ist, when eine Implementierung die veröffentlichten Work-Bilder verwendet, then kann sie Saffron Myth Theatre, stabile Copy-Kontraste, Produktunterscheidung und die vorgegebene mobile Lesereihenfolge einhalten, ohne ergänzende Bildgenerierung.

## Implementation Notes

- Das Readiness-Dokument referenziert nur die bereits freigegebenen Originaldateien und ändert weder Work-Frontmatter noch öffentliche Komponenten.
- Alle abweichenden Hochformate folgen der bestätigten 2:3-Katalogkante mit tonal passendem Letterboxing statt inhaltlichem Crop.

## Spec Change Log

## Review Triage Log

| Verdict | Evidence |
|---------|----------|
| false | Die scheinbare Mojibake steht nur in der PowerShell-serialisierten temporären Diff-Datei. Die Arbeitsdateien wurden direkt erneut gelesen und enthalten korrekte UTF-8-Zeichen. |
| patch | Das Readiness-Dokument nannte Freigaben ohne nachvollziehbare Herkunft. Es verweist jetzt auf die Creator-Entscheidung und die festgehaltene Story-2.2-Freigabe vom 2026-09-29. |
| patch | Zwei ausgeschlossene Ephemera-Dateien hatten keinen vollständigen Pfad. Alle drei Exklusionen verwenden jetzt ihren kanonischen Asset-Pfad. |
| patch | Der GM-Evidence-Block hatte keine konkrete Offenlegung. Er verlangt jetzt ein sichtbares englisches Label und eine kurze Textzusammenfassung des gezeigten Nachweises, ohne das Sheet als Hintergrund oder Hero zu verwenden. |
| patch | Die Framework-Galerie hatte keinen klaren Lesbarkeits-Fallback. Bei unlesbaren Details wird sie ausgelassen; alle wesentlichen Informationen bleiben angrenzender HTML-Text. |
| patch | Informationsbilder brauchen neben knappen Alt-Texten einen textlichen Produktkontext. Für das GM-Sheet ist dieser nun Pflicht; die Framework-Galerie darf keine wesentlichen Informationen exklusiv tragen. |
| patch | Die feste Katalogkante hatte keine technische Ausrichtung oder Layout-Shift-Regel. Sie verlangt nun zentriertes `object-fit: contain`, ein vorab reserviertes 2:3-Verhältnis und tonales Letterboxing. |

## Design Notes

- Die Readiness ist absichtlich ein Begleitdokument statt neuer Content-Felder: Bildrollen und öffentliche Produktdaten bleiben in den vorhandenen kanonischen Work-Einträgen, während Platzierungsentscheidungen mit zukünftigen Komponenten mitwachsen können.

## Verification

**Commands:**
- `npm run lint` -- erwartet: die vorhandenen Quell- und Skriptprüfungen bleiben erfolgreich.
- `npm run build` -- erwartet: Astro, Works-Validator und statische Routenprüfung bleiben erfolgreich.

**Manual checks (if no CLI):**
- Jede in den drei Published-Work-Dateien referenzierte Mediendatei erscheint in der Readiness mit Platzierung, Crop-/Responsive-Regel, Kontrastregel und Alt-Text; ausgeschlossene Dateien und das GM-Cheat-Sheet sind eindeutig begrenzt.

**Ausgeführt:**

- `npm run lint` -- bestanden.
- `npm run build` -- bestanden; enthält Astro-Build, Works-Fixtures, Published-Validator und statische Routenprüfung.
