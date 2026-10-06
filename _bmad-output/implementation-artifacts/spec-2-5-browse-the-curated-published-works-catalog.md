---
title: 'Story 2.5: Kuratierten Katalog veroeffentlichter Works durchsuchen'
type: 'feature'
created: '2026-10-06'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
baseline_commit: 'd94dba8a4138a6c30185887f8729c133747af608'
context:
  - 'AGENTS.md'
  - '_bmad-output/implementation-artifacts/epic-2-context.md'
  - '_bmad-output/implementation-artifacts/story-2-3-art-direction-release-readiness.md'
  - '_bmad-output/implementation-artifacts/spec-2-4-present-decision-ready-work-detail-pages.md'
---

<frozen-after-approval reason="human-owned intent - do not modify unless human renegotiates">

## Intent

**Problem:** Obwohl Abythera, Ephemera und das Daggerheart Item Bundle vollstaendige Published-Works mit statischen Detailrouten sind, zeigt `/works` noch den Empty State. Besuchende koennen die vorhandenen Werke weder als Sammlung vergleichen noch per Bild, Typ, Titel und Premise zu einer Detailseite wechseln.

**Approach:** `/works` wird als statischer, datengetriebener Saffron-Myth-Theatre-Katalog aus `getPublishedWorks()` umgesetzt. Die sichtbare Reihenfolge beginnt mit Abythera, Ephemera und dem Daggerheart Item Bundle: vom Campaign Framework ueber das Adventure zur Table Resource. Spaetere Published Works bleiben sichtbar und folgen nach diesen drei Eintraegen. Jedes Work erscheint als ein vollflaechig verlinktes Editorial Tile in der festen inneren Reihenfolge Hero-Bild, Typ, Titel und Premise; die bestehende Empty-State-Alternative bleibt fuer eine leere Published-Collection erhalten.

## Boundaries & Constraints

**Always:** Der Katalog konsumiert ausschliesslich `getPublishedWorks()` und die bestehenden kanonischen Work-Daten; Drafts erhalten kein Tile und keine Katalogverlinkung. Die sichtbare Reihenfolge ist explizit Abythera, Ephemera, Daggerheart Item Bundle und wird als Seitenkomposition umgesetzt, nicht als neues Content-Feld; weitere Published Works bleiben danach in der Abfragereihenfolge sichtbar. Pro Tile wird ausschliesslich das eine Bild mit `role: hero` verwendet und vollstaendig in einer festen 2:3-Katalogkante mit tonal ruhigem Letterboxing gezeigt. `WorkHero.astro` bleibt die einzige statische Hero-URL-Aufloesung; Bildpfade, Alt-Texte, Titel, Typen oder Premises werden nicht dupliziert. Tile-Markup folgt Bild, sichtbarem zentral gemapptem Typ, Titel und Premise; ein einzelner interner Link umfasst die gesamte Karte und fuehrt im selben Tab zu `/works/<slug>`. Katalogcopy liegt auf einem opaken Night-Deep-/Night-Mineral-Feld. Das Layout ist bei kleinen Breiten einspaltig, bleibt tastaturbedienbar und verwendet die vorhandenen sichtbaren Fokus- sowie Reduced-Motion-Regeln.

**Never:** Keine Filter, Gruppierung, Client-JavaScript, React, CTA, Next Work, Karrhold-Route, Galerie, Evidence oder nicht freigegebenes Asset hinzufuegen. Keine Marketplace-Karten mit Rundungen, Schatten, Preis-, Kauf- oder Hover-pflichtiger Information bauen. Keine neue Katalogreihenfolge im Content-Feld erfinden; die vom Creator gewaehlte Reihenfolge bleibt auf diese drei sichtbaren Tiles begrenzt.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|---|---|---|---|
| Published Collection | Ein oder mehrere `published` Works | Ein Tile pro Work mit Hero, Typ, Titel, Premise und Link zur statischen Detailroute | Fehlendes Hero bricht den Build mit einem work-spezifischen Fehler ab. |
| Weitere Published Works | Ein zukuenftiger Published Work ausserhalb der Startreihenfolge | Der Eintrag erscheint nach Abythera, Ephemera und Item Bundle statt still zu fehlen | Die Katalogseite filtert nur nach Published-Status, nie nach der kuratierten Startliste. |
| Draft Work | Ein Work ohne Status `published` | Kein Tile, Link, Bild oder Titel im Katalog | `getPublishedWorks()` schliesst ihn vor dem Rendering aus. |
| Leere Published Collection | `getPublishedWorks()` liefert keine Eintraege | Der heutige klare, zugangliche Empty State bleibt sichtbar | Keine Platzhalterprodukte oder Release-Ankuendigungen. |
| Abweichendes Hero-Format | Das 2:3-Raster trifft auf Ephemera oder Item Bundle | Die gesamte Hero-Datei bleibt per `object-fit: contain` sichtbar; der Rahmen bleibt reserviert | Kein inhaltlicher Crop und keine Textueberlagerung. |

</frozen-after-approval>

## Code Map

- `src/pages/works/index.astro` -- beschraenkt sich auf `getPublishedWorks()` als Produktionsgrenze, reicht die Ergebnisse an die Katalogkomponente weiter und verwendet `mainClass="works-catalog-main"`.
- `src/components/works/WorksCatalog.astro` -- enthaelt die props-reine Published-Gate-, Kuration-, Empty-State- und Tile-Renderlogik; dadurch sind leere, gemischte und erweiterte Datenfaelle ohne Content-Mutation testbar.
- `src/content.config.ts` -- verwendet Astos `image()`-Helfer ausschliesslich fuer `role: hero`, damit nur die in Content tatsaechlich referenzierten Hero-Dateien statisch aufgeloest werden; Galerie-, Vibe- und Evidence-Pfade bleiben Strings und werden dadurch nicht pauschal emitted.
- `src/lib/works.ts` -- `getPublishedWorks()` und `workTypeLabels` sind die einzige Daten- und sichtbare Typquelle; der Hero-Typ modelliert die von Astro aufgeloeste Bildmetadatenform.
- `src/components/works/WorkHero.astro` -- rendert die kanonische Hero-Metadaten-URL, bewahrt Alt-Text, lazy loading und das deklarierte Seitenverhaeltnis; fuer jedes Katalogtile wiederverwenden.
- `src/content/works/*.md` -- kanonische Published-Daten; unveraendert konsumieren. Nur `role: hero` ist fuer den Katalog erlaubt.
- `src/styles/global.css` -- ergaenzt Tokens und Katalogregeln fuer eine asymmetrische, scharf gerahmte Editorial-Strecke; keine rohen Werte ausserhalb des Primitiv-Layers.
- `scripts/test-render-works-catalog.mjs` -- rendert die props-reine Katalogkomponente mit synthetischen Astro-Bildmetadaten fuer Empty State, Draft-Ausschluss, einen vierten Published Work sowie LCP-Prioritaet des ersten Tiles ohne echte Content- oder Asset-Dateien zu mutieren.
- `scripts/verify-static-pages.mjs` -- erweitert `/works` um Published-only-Tiles, kanonische Startreihenfolge, Hero-Ausgabe, interne Ziele, 2:3-Contain-Rahmen, den Ausschluss nichtveroeffentlichter Slugs, Astos Content-Hero-Resolver und einen SHA-256-basierten Ausschluss nicht freigegebener Work-Assets aus `dist`.
- `_bmad-output/implementation-artifacts/story-2-3-art-direction-release-readiness.md` -- verbindliche Katalog-Hero-Freigabe: nur Abythera-Cover, Ephemera `Selfmade_Cover.png` und Item-Bundle-Cover; keine Galerie-/Evidence-Dateien verwenden.

## Tasks & Acceptance

**Execution:**
- [x] `src/content.config.ts`, `src/lib/works.ts`, `src/pages/works/index.astro`, `src/pages/works/[slug].astro`, `src/components/works/WorkHero.astro`, `src/components/works/WorksCatalog.astro` -- Published Works in der freigegebenen Reihenfolge aus `getPublishedWorks()` als semantische, vollflaechig verlinkte Editorial Tiles rendern, nur kanonisch referenzierte Hero-Dateien ueber Astos Content-Image-Metadaten aufloesen und den bestehenden Empty State bedingt beibehalten -- weitere Published Works bleiben ohne eine zweite Assetliste navigierbar, ohne nicht freigegebene Medien auszuliefern.
- [x] `src/styles/global.css` -- den breiten Katalogbereich, die 2:3-Hero-Buehne, opake Copy-Felder und responsive Editorial-Tile-Anordnung mit bestehenden Token-Layern definieren -- die Seite bleibt deutlich ein kuratiertes Portfolio statt eines Card Grids.
- [x] `scripts/test-render-works-catalog.mjs`, `scripts/verify-static-pages.mjs` -- Empty State, Draft-Ausschluss, weitere Published Works und LCP-Prioritaet als Komponententest sowie die ausgegebene `/works`-Anatomie und Work-Asset-Grenze gegen die kanonischen Published-Frontmatters pruefen -- Katalogdaten, Linkziele, Bildreihenfolge, Hero-Auslieferung, Startreihenfolge, Asset-Freigabe und Published-only-Grenze koennen nicht unbemerkt regressieren.
- [x] `package.json`-Skriptkette -- `npm run lint` und `npm run build` ausfuehren -- Astro, Katalog-Renderfixtures, Collection-Validator, Image-Inspektion und statische Pruefung bestehen gemeinsam.

**Acceptance Criteria:**
- Given mindestens ein Published Work, when `/works` statisch gebaut wird, then zeigt der Katalog genau die Published Works als native Links in der festgelegten Reihenfolge.
- Given weitere Works spaeter `published` werden, when `/works` statisch gebaut wird, then bleiben sie nach den drei kuratierten Startwerken als Tiles sichtbar.
- Given ein Katalogtile rendert, when Besuchende es lesen oder fokussieren, then erscheinen Hero-Bild, Type-Label, Titel und Premise in genau dieser DOM-Reihenfolge innerhalb eines grossen, tastaturbedienbaren Linkziels.
- Given ein Hero vom 2:3-Katalogformat abweicht, when es im Tile erscheint, then ist die ganze Datei sichtbar, der 2:3-Rahmen bleibt reserviert und kein Copy-Overlay oder inhaltlicher Crop entsteht.
- Given ein Work Draft oder unbekannt ist, when `/works` gerendert wird, then erscheinen weder dessen Metadaten noch ein Link auf eine Detailroute im Katalog.
- Given keine Published Works existieren, when `/works` rendert, then bleibt der bisherige klare Empty State ohne erfundene Produkte oder Release-Ankuendigung vorhanden.

## Implementation Notes

- Umgesetzt ohne Datenmutation, externe Nebenwirkung oder Deployment. Die Katalogreihenfolge entsteht ausschliesslich als Seitenkomposition aus den Published Works.
- Der Hero-Resolver nutzt Astos Content-Image-Metadaten fuer `role: hero` statt einer Drei-Datei-Map oder eines breiten Asset-Globs. Neue Published Works koennen damit ihre werkseigenen Hero-Pfade nutzen, ohne nicht freigegebene Galerie- oder Evidence-Dateien in den Build aufzunehmen. Die statische Pruefung kontrolliert diese Resolver-Form und die Build-Ausgabe auf nicht freigegebene Work-Assets.
- Die Page behaelt `getPublishedWorks()` als einzige Produktionsgrenze. `WorksCatalog.astro` ist props-rein, damit Empty State, Draft-Ausschluss und spaetere Published Works ohne Content-Mutation gerendert getestet werden koennen.
- Der erste Katalogtile verwendet `loading="eager"` und `fetchpriority="high"`; alle folgenden Tiles bleiben lazy. Die Work-Asset-Grenze wird im Static Verifier ueber SHA-256-Quellidentitaet statt kollisionsanfaellige Dateinamen geprueft.
- Footprint: eine Page, eine props-reine Katalogkomponente, globale Katalog-Stile, Renderfixtures und der bestehende Static Verifier. Keine neue Abhaengigkeit und keine neue clientseitige Oberflaeche.

## Spec Change Log

## Review Triage Log

| Verdict | Evidence |
|---|---|
| medium (defer) | `WorkHero` liefert aktuell untransformierte Originaldateien aus; die Katalogseite macht diese Last sichtbarer. Responsive Formate und Zielgroessen brauchen eine bewusste Bildqualitaetsentscheidung und bleiben als Folgearbeit festgehalten. |
| patch | Der erste sichtbare Katalogtile lud zuvor lazy. `WorksCatalog.astro` uebergibt fuer Index 0 `eager`; der Renderfixture-Test prueft `loading="eager"` plus `fetchpriority="high"`, weitere Tiles bleiben lazy und `auto`. |
| medium (defer) | Eine unabhaengige, maschinenlesbare Platzierungsfreigabe fuer Hero-Assets existiert noch nicht; `role: hero` ist derzeit der kanonische technische Vertrag. Die aktuelle Umsetzung verhindert Nicht-Hero-Emissionen, aber eine allgemeine Creator-Freigabe braucht ein separates Datenmodell. |
| patch | Die fruehere Output-Pruefung ordnete Assets nur nach Basename und Endung zu. Der Static Verifier gleicht jetzt SHA-256-Digests gegen kanonische Published-Hero-Quellen ab und meldet unfreigegebene oder mehrdeutige Work-Assets. |
| medium (defer) | Eine zugaengliche Not-Found-Seite ist in der aktuellen Story nicht vorhanden. Sie ist als eigener Akzeptanzumfang von Story 2.6 geplant und wird dort implementiert. |
| patch | Der Empty State war nur als Quelltext-Zweig sichtbar. `test-render-works-catalog.mjs` rendert die Komponente mit leerer Collection und prueft h1, Text, Ruecklink und fehlende Tiles. |
| patch | Ein weiterer Published Work war nur aus der aktuellen Dreiermenge ableitbar. Die Renderfixture prueft einen vierten, nicht kuratierten Work nach der festen Startreihenfolge und seinen nativen Link. |
| patch | Der Draft-Ausschluss war im aktuellen Content nicht ausuebbar. Die Renderfixture mischt einen Draft in Published-Daten und prueft das Fehlen von Draft-Slug, Titel, Alt-Text und Tile. |
| low (defer) | Die 2:3-Contain-Regel wird durch CSS-Quellvertrag und manuelle Edge-Pruefung bei 375, 768, 1024 und 1440 CSS-Pixeln abgesichert, aber nicht per browsergestuetztem Computed-Style-Test. Diese Regressionsebene gehoert zur geplanten Playwright-/axe-Abdeckung in Story 4.1. |
| patch | Die Renderfixture prueft jetzt ebenfalls die feste DOM-Reihenfolge Hero, Type, Titel und Premise sowie denselben Tab fuer Tile-Links. |
| patch | Der breite eager Asset-Glob nahm auch unfreigegebene Work-Medien in den Build auf. Der Resolver verwendet jetzt Astos `image()`-Schemahelfer ausschliesslich fuer Hero-Rollen; der Produktionsbuild und die SHA-256-Ausgabepruefung bestaetigen die enge Asset-Grenze. |
| patch | Der Katalogbereich war trotz eines eigenen 88rem-Tokens durch die gemeinsame Shell-Breitenregel auf 76rem begrenzt. `works-catalog-main` setzt nun seine eigene Breitenformel mit dem Katalogtoken. |

## Design Notes

- Die Katalogbuehne nutzt bei drei Werken asymmetrische editorielle Gewichte statt einer gleichfoermigen Dreispalten-Kartengruppe. Auf Mobile kollabiert sie in die feste vertikale Tile-Reihenfolge. Saffron markiert nur Produkttyp und Link-Fokus; Kunst bleibt vollstaendig und getrennt von Copy.

## Verification

**Commands:**
- `npm run lint` -- erwartet: Seite, Styles und Static Verifier bestehen ESLint.
- `npm run build` -- erwartet: Published-Work-Validierung, reale Bilddekodierung, `/works`-Katalog und Detailseitenpruefungen bestehen gemeinsam.

**Manual checks:**
- `/works` bei 375, 768, 1024 und 1440 CSS-Pixeln auf Bild-zu-Typ-zu-Titel-zu-Premise-Reihenfolge, vollstaendige Hero-Kunst, sichtbaren Fokus, grossflaechige Touch-/Linkziele, keine horizontale Ueberbreite und keine Rounded-Card-Grid-Wirkung pruefen.

**Ausgefuehrt:**
- `npm run lint` -- bestanden.
- `npm run test:catalog` -- bestanden; rendert Empty State, Draft-Ausschluss, kuratierte Reihenfolge, vierten Published Work sowie Ladeprioritaeten.
- `npm run build` -- bestanden; Astro-Build, Works-Fixtures, Katalog-Renderfixtures, Collection-Validator, Bilddekodierung und Static Verifier schliessen gemeinsam ab.
- `/works` in Edge bei 375, 768, 1024 und 1440 CSS-Pixeln geprueft; die 375-CSS-Pixel-DevTools-Messung bestaetigt keinen horizontalen Overflow, vollstaendige Premise-Breite und den sichtbaren Fokus des Tile-Links.
