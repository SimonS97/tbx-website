---
title: 'Produkt-Assets vereinheitlichen und sichere Bildleseregel festhalten'
type: 'chore'
created: '2026-09-29'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
baseline_commit: '5f1f538d047641990275ebfce5b2fb5ce2b9558f'
context:
  - 'AGENTS.md'
  - '_bmad-output/implementation-artifacts/epic-2-context.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Die neu bereitgestellten Produktbilder liegen bereits in den werkseigenen Asset-Ordnern, verwenden aber teilweise Großschreibung, Leerzeichen, Unterstriche oder unklare Arbeitsnamen. Große gleichzeitige Bildlesevorgänge können außerdem einen Bad Request verursachen.

**Approach:** Alle Produktbilder erhalten eindeutige, sprechende `kebab-case`-Dateinamen, ohne Bilddaten zu verändern oder ihre Werkszuordnung zu ändern. Der verwaltete Projektkontext erhält eine verbindliche Regel, dass Bilddateien höchstens zu dritt pro Tool-Aufruf gelesen werden.

## Boundaries & Constraints

**Always:** Dateien bleiben in ihrem bestehenden Ordner unter `src/assets/works/<work-slug>/`; die Erweiterung bleibt erhalten. Bereits gültige Namen bleiben unverändert. Jede Umbenennung beschreibt die Bildrolle, etwa `hero-cover`, `npc-portrait`, `gm-cheat-sheet` oder `product-preview`. Bildinhalte werden zur Auswahl und späteren Umsetzung nur in Gruppen von maximal drei Dateien pro Tool-Aufruf gelesen.

**Never:** Keine Bilddatei neu generieren, komprimieren, zuschneiden, verschieben oder löschen. Keine Produkt- oder Inhaltsdatei erstellen, keine öffentlichen Routen ändern und keine historischen BMad-Prototypen anpassen. Keine bestehende Marken-Asset-Datei außerhalb der Work-Ordner umbenennen.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Bereits gültiger Name | Datei folgt bereits `kebab-case` | Dateipfad bleibt unverändert | Keine unnötige Umbenennung. |
| Arbeitsname | Datei enthält Leerzeichen, Unterstriche oder Großschreibung | Die Datei erhält einen eindeutigen, beschreibenden `kebab-case`-Namen im selben Work-Ordner | Die Dateierweiterung bleibt erhalten. |
| Bildprüfung | Mehrere Bilder sollen visuell geprüft werden | Höchstens drei Bilddateien werden pro Tool-Aufruf geladen | Größere Mengen werden in aufeinanderfolgende Gruppen geteilt. |

</frozen-after-approval>

## Code Map

- `src/assets/works/` -- enthält die neu abgelegten, noch nicht versionierten Werkbilder; nur Namen ändern und die vorhandene Zuordnung zu den sieben Work-Slugs bewahren.
- `src/assets/works/abythera/` -- enthält Cover, Harmony-Portrait, Kampagnenübersicht, Karrhold-Referenz und Produktübersicht.
- `src/assets/works/ephemera/`, `src/assets/works/karrhold/`, `src/assets/works/thorns-of-blossomtide/` -- enthalten mehrere kuratierbare Szenen-, NPC-, Karten- und Materialbilder; Bildrolle wird in den Namen kenntlich.
- `src/assets/works/amber-tide/`, `src/assets/works/weeping-rift/`, `src/assets/works/daggerheart-item-bundle/` -- enthalten überwiegend bereits gültige Namen; nur abweichende CamelCase-Namen vereinheitlichen.
- `AGENTS.md` -- verwalteter BMad-Projektkontext; ergänzt die maximale Batchgröße für Tool-Aufrufe, die Bilddateien lesen.
- `package.json` -- stellt `npm run lint` und `npm run build` zur Validierung bereit; keine Konfigurationsänderung erforderlich.

## Tasks & Acceptance

**Execution:**
- [x] `src/assets/works/**` -- alle Namen mit Großbuchstaben, Leerzeichen oder Unterstrichen in eindeutiges `kebab-case` überführen und die Bildrollen benennen -- spätere Content-Einträge und Komponenten erhalten stabile, lesbare Asset-Referenzen.
- [x] `AGENTS.md` -- die verbindliche Regel „höchstens drei Bilddateien pro Tool-Aufruf lesen“ in den verwalteten BMad-Kontext aufnehmen -- künftige Bildprüfungen vermeiden die bekannte Request-Grenze.
- [x] `src/assets/works/**`, `package.json` -- vollständige Assetliste auf Namen und Verzeichnistreue prüfen sowie Lint und Produktionsbuild ausführen -- die Pflegearbeit verändert die bestehende Website-Basis nicht.

**Acceptance Criteria:**
- Given ein Work-Asset liegt unter `src/assets/works/<work-slug>/`, when die Umbenennung abgeschlossen ist, then sein Name verwendet ausschließlich Kleinbuchstaben, Ziffern und Bindestriche vor der unveränderten Erweiterung.
- Given mehrere Bilder eines Werks vorhanden sind, when sie zukünftig referenziert werden, then lassen die Dateinamen ihre Funktion unterscheiden, ohne ihre Zuordnung zum Work-Ordner zu verlieren.
- Given eine Bildprüfung durch ein Tool erfolgt, when mehrere Dateien geprüft werden müssen, then werden höchstens drei Bilder in einem einzelnen Tool-Aufruf geladen.
- Given die Asset-Pflege abgeschlossen ist, when `npm run lint` und `npm run build` laufen, then bestehen beide Befehle ohne durch die Umbenennungen verursachte Fehler.

## Implementation Notes

- Umbenannt wurden nur Dateien mit Großschreibung, Leerzeichen oder Unterstrichen. Bereits gültige `kebab-case`-Namen sowie die Werk-Ordner blieben unverändert.
- Zusätzliche Bilder für Ephemera, Karrhold und Thorns of Blossomtide sind anhand ihrer sichtbaren Rolle benannt, darunter Szenen, NPC-Porträts, Karten und GM-Material.
- `AGENTS.md` begrenzt das Lesen von Bilddateien per Tool-Aufruf dauerhaft auf drei Dateien.
- Nach `npm ci` aus der bestehenden Lockdatei bestanden die Namensprüfung, `npm run lint` und `npm run build`. Astro weist erwartungsgemäß auf die noch leere Works-Collection hin.
## Spec Change Log

## Review Triage Log

## Verification

**Commands:**
- `npm run lint` -- erwartet: die bestehende Astro- und Skriptprüfung endet erfolgreich.
- `npm run build` -- erwartet: der statische Build, die Works-Validierungsfixtures und die statischen Prüfungen enden erfolgreich.

**Manual checks (if no CLI):**
- Die Asset-Dateinamen unter `src/assets/works/` auf ausschließlich `kebab-case` und eine unveränderte Werkzuordnung prüfen.
