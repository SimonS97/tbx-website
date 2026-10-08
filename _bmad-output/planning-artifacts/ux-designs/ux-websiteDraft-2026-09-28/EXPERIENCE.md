---
title: Tales by Xero Experience Specification
status: final
created: 2026-09-28
updated: 2026-10-08
sources:
  - ../../briefs/brief-websiteDraft-2026-09-28/brief.md
  - ../../../brainstorming/brainstorm-tales-by-xero-art-directions-2026-09-28/direction-comparison.html
  - DESIGN.md
---

# Foundation

Tales by Xero ist eine responsive, statisch ausgelieferte oeffentliche Portfolio- und Werbewebsite. Sie vermittelt Daggerheart-kompatible Werke, fuehrt bewusst zu DriveThruRPG und bietet einen externen Ko-fi-Link. Sie enthaelt weder Commerce, Konto, Abo, Warenkorb noch Checkout-Verhalten.

Die Oberflaeche ist Englisch. Deutsche Quellseiten duerfen als echte Produktbelege erscheinen, erhalten aber englischen Kontext. `DESIGN.md` ist die Autoritaet fuer die visuelle Identitaet; dieses Dokument definiert Informationsarchitektur, Verhalten, Zustaende und Zugaenglichkeit. Bei Widerspruch zwischen historischen Studien, importierten Materialien oder Mockups haben diese beiden Spines Vorrang.

# Information Architecture

## Global destinations

| Ziel | Route | Zweck |
|---|---|---|
| Home | `/` | Zweiaktige Entdeckung: Astral Spread, Astral Rule und eingebetteter Work Index. |
| Works | `/works` | Direkt verlinkbarer, vollstaendiger Katalog derselben veroeffentlichten Werke. |
| Product detail | `/works/:slug` | Produktentscheidung, echte Belege und bewusste DriveThruRPG-Uebergabe. |
| About Tales by Xero | `/about` | Kurze Aussage zu Creator und Arbeitsweise. |
| Ko-fi | externe URL | Spamfreie Updates zu Veroeffentlichungen; keine On-site-Verkaufsflaeche. |

Home und `/works` sind beide absichtliche Wege in denselben Bestand. Home ist die gefuehrte Entdeckung mit eingebettetem Index; `/works` ist die kanonische, direkt erreichbare Katalogadresse. Beide verwenden dieselben veroeffentlichten Daten, dieselbe Reihenfolge und dieselbe Entscheidungsinformation.

## Home and Work Index

1. Navigation mit Home, Works, About und Ko-fi.
2. Astral Threshold als ruhiger, produktneutraler Hintergrund fuer den Home-Opener.
3. Astral Spread mit bis zu drei direkten Produktrouten: `Run something tonight`, `Build a campaign around it` und `Bring something to the table`. Eine Route erscheint nur, wenn ein starkes veroeffentlichtes Werk sie repraesentiert.
4. Astral Rule mit `All published works` und `Continue through the portfolio`, die zum eingebetteten Work Index verankert.
5. Work Index mit stabiler Reihenfolge: Artwork, Typ und Kompatibilitaet, Titel und Praemisse, verifizierte Fakten, Detailaktion.
6. Kurzer Arbeitsweise-Ausklang mit Route zu About. Ko-fi bleibt eine globale externe Route, keine Abschlusskampagne.

Der Work Index ist die vollstaendige Browse-Ansicht der ersten Version. Produkttypfilter sind aufgeschoben, bis ein spaeterer Inventarentscheid sichtbare Controls, URL-Verhalten, Leerzustand und Tastatursemantik festlegt.

## Product detail anatomy

1. Rueckroute zu Works.
2. Produkttyp und Kompatibilitaet.
3. Titel und Ein-Satz-Praemisse.
4. Spoilerarmer Hook.
5. Sichtbarer `Product evidence`-Hinweis, wenn kuratierte Belege vorhanden sind; er liegt im ersten praktischen Viewport und verankert zum Reader.
6. Nur bereitgestellte Fakten sowie explizite DriveThruRPG-Uebergabe und optionale Rueckroute zu allen Werken.
7. Vollstaendliches offizielles Produktcover ohne dekorativen Overlay-Rahmen.
8. Evidence Reader bei zwei bis fuenf freigegebenen oeffentlichen Supporting Assets.
9. Produktbezogenes `At the table` oder `A note from Xero` nur, wenn der Inhalt geliefert ist.
10. Next-work- oder Rueckroute als Abschluss.

Eine Detailseite darf direkt vom Hero in den Evidence Reader fuehren, wenn ein generisches Einleitungskapitel keine eigene Entscheidungsinformation liefert.

## About Tales by Xero anatomy

1. Kurze Creator- und Arbeitsweise-Aussage: erst mit echten Gruppen gespielt, dann fuer Veroeffentlichung ueberarbeitet.
2. Konkrete Einordnung, dass Material Improvisation, Situationen und praktische Spielhilfe ueber starre Skripte stellt.
3. Route zu `/works` fuer Besucher, die nach der Aussage direkt einen passenden Titel suchen.
4. Sichtbarer, nicht aufdringlicher Ko-fi-Link fuer Updates.

Freigegebene Kompositionsreferenzen: [Home und Work Index](mockups/home-astral-threshold-work-index.html) sowie [Abythera Product Detail](mockups/product-detail-abythera-evidence-reader.html). Spines haben Vorrang bei Konflikten.

# Voice and Tone

Die sichtbare Microcopy ist Englisch, konkret und leicht dramatisch. Sie benennt spielbare Szenen und praktische Folgen statt generischer Fantasy-Superlative. Zieltexte beschreiben die tatsaechliche Uebergabe: `View on DriveThruRPG`, nicht eine On-site-Kaufbehauptung.

| Tun | Nicht tun |
|---|---|
| `Run something tonight` | `Begin an unforgettable journey` |
| `Open the material before you commit to it.` | `Discover a world beyond imagination` |
| `View on DriveThruRPG` | `Buy now` |
| Eine belegbare Aussage zum Material | `Epic`, `masterfully crafted` oder erfundene Praezision |
| Ruhige Einladung ohne Druck | Countdowns, Knappheit, Pop-ups oder wiederholte Kaufaufforderungen |

# Component Patterns

Die visuellen Spezifikationen stehen in `DESIGN.md` unter Components; diese Tabelle definiert das Verhalten.

| Component | Einsatz | Verhaltensregeln |
|---|---|---|
| Navigation | Alle internen Seiten | Desktop zeigt die globale Route in einer Zeile. Bevor Links umbrechen, oeffnet `Menu` dieselben Ziele. Der aktive interne Weg ist programmatisch markiert; Ko-fi ist sichtbar als externes Ziel benannt. |
| Classification | Work Index und Product Detail | Typ und Kompatibilitaet erscheinen vor Lore. Text traegt die Bedeutung; Farbe unterstuetzt nur. Fehlende Produktdaten werden nicht erfunden. |
| Astral Spread | Home | Jede Karte ist eine direkte interne Produktroute. Hover und Fokus duerfen die Karte hervorheben; Label und Ziel bleiben immer sichtbar. Auf Touch oeffnet ein Tippen das Detail direkt. |
| Astral Rule | Home | Ein einzelner Anker zwischen Spread und eingebettetem Index. Aktivierung springt zu `#works`; keine zweite breite Trennung folgt direkt darunter. |
| Work Index | Home und `/works` | Jede Zeile verlinkt auf ein internes Detail und behaelt Artwork, Classification, Titel/Praemisse, Fakten und Aktion in derselben Reihenfolge. Kein Auto-Sortieren, Filter oder Carousel in v1. |
| Product Detail Hero | Product Detail | Offizielles Cover bleibt vollstaendig. Der `Product evidence`-Hinweis fuehrt, wenn vorhanden, zum Reader. Detail-CTAs benennen DriveThruRPG sichtbar. |
| Product Evidence Reader | Product Detail | Ein geordneter Button-Index waehlt ein Asset lokal aus. Auswahl aktualisiert Kategorie, Titel, Beschreibung, Callout, Caption, Originalroute und Bild, ohne Fokus zu stehlen oder die Seite zu verlassen. |
| evidence-dialog | Product Detail | Vorschaubild oeffnet einen nativen Dialog. Escape oder Backdrop-Klick schliessen ihn; danach kehrt Fokus zum ausloesenden Vorschaubild zurueck. Die direkte Originalroute bleibt unabhaengig davon nutzbar. |
| button-primary | DriveThruRPG-Uebergabe | Primaere Aktion bleibt klarer Link, hat sichtbaren Fokus und keine On-site-Checkout-Optik. |
| button-secondary | Rueck- und Browse-Routen | Unterstuetzt die primaere Aktion, dupliziert aber nie deren Absicht. |

## Evidence content contract

Ein Evidence-Reader-Eintrag braucht: explizite Reihenfolge, sichtbares Label, Kategorie, Original-Asset-URL, kontextgerechten Alt-Text, praktischen Titel und Beschreibung, einen optionalen Callout, eine Caption und ein Label fuer die direkte Originalroute. Das initial gewaehlte Element ist pro Produkt explizit festgelegt.

Der Reader erscheint nur bei zwei bis fuenf freigegebenen oeffentlichen Assets. Bei weniger Assets bleibt der normale Detailfluss bestehen; bei mehr als fuenf Assets braucht die Informationsarchitektur eine neue Entscheidung statt eines unendlichen Indexes.

# State Patterns

| Zustand | Flaeche | Behandlung |
|---|---|---|
| Statischer Erstaufruf | Alle internen Inhaltsseiten | Inhalt ist als statische Seite vorhanden. Keine Ladeanimation; Medien reservieren ihre endgueltige Groesse. |
| Bild laedt | Alle Produktflaechen | Tonaler, dimensionsgleicher Platzhalter ohne Shimmer. Hero-Medien laden priorisiert, darunterliegende Medien lazy. |
| Medium nicht verfuegbar | Alle Produktflaechen | Reservierte Bildflaeche und zugehoeriger Produktkontext bleiben sichtbar. Zeige eine klare Textmeldung mit dem vorhandenen Alt- oder Caption-Kontext. Verberge Vollansicht und direkte Originalroute fuer das fehlgeschlagene Asset; erfinde kein Ersatzbild. |
| Kein veroeffentlichtes Werk | Home, Works | Verstecke die betroffene Produktroute. Hat der gesamte Katalog keine Veroeffentlichung, erscheint eine ruhige Nachricht statt einer Verkaufsaufforderung. |
| Fehlender Produkttyp | Home | Die zugehoerige Astral-Spread-Route erscheint nicht. Kein leeres Card-Slot. |
| Evidence selection | Product Detail | Ausgewaehlter Indexbutton hat programmatischen Zustand. Kontext und Bild aktualisieren sofort; ein Live-Text bestaetigt den neuen Namen ohne Fokuswechsel. |
| Full-size evidence | Product Detail | Aktivierung des Vorschaubilds oeffnet einen nativen Dialog. Escape oder Klick/Tap auf den Backdrop schliesst ihn. Die explizite Originalroute funktioniert auch ohne Dialog. |
| Externe Produkt-URL fehlt | Product Detail | Kein toter CTA. Unveroeffentlichte Werke bleiben aus der oeffentlichen Entdeckung heraus, ausser der Creator kennzeichnet sie bewusst als Vorbereitung. |
| Unbekanntes oder zurueckgezogenes Werk | `/works/:slug` | Statische 404-Antwort mit kurzer Einordnung und klaren Rueckrouten zu `/works` und Home. Kein Produktbild und kein externer CTA. |
| Externer Aufruf | DriveThruRPG, Ko-fi | DriveThruRPG und Ko-fi verlassen die Seite im selben Tab. Eine direkte Original-Asset-Route aus dem Evidence Reader darf mit klarer Beschriftung einen neuen Tab nutzen. |

# Interaction Primitives

## Motion

Motion zeigt Hierarchie, Erzaehlreihenfolge oder direkte Rueckmeldung. Astral-Spread-Karten duerfen auf Hover oder Fokus leicht hervorheben. Bilder im Evidence Reader duerfen minimal skalieren. Der Inhalt bleibt ohne diese Effekte vollstaendig lesbar.

Unter `prefers-reduced-motion` werden nicht essenzielle Uebergaenge sofort oder statisch gezeigt. Verboten sind Scroll-Hijacking, Scroll-Snap als Pflichtnavigation, automatische Karussells, Endlos-Marquees, kontinuierliche Partikel, autonome Kartenbewegung und Bewegung als alleiniger Informationstraeger.

## Navigation and external handoff

Browser Back stellt die vorherige interne Route wieder her. Home-Links zu `#works` sind lokale Anker; `/works` bleibt die direkt adressierbare Katalogroute. Die Website simuliert keinen Kauf. DriveThruRPG und Ko-fi sind klar externe Ziele, nicht Teil eines On-site-Checkout-Flows.

Ausgehende Produktklicks duerfen als bewusste, datensparsame Aktion gemessen werden. Anbieter, Consent-Grundlage, Aufbewahrung und Datenschutzhinweis sind Architektur- und Rechtsentscheidungen, keine UX-Annahme.

# Accessibility Floor

- Semantische Landmarks, sichtbarer Skip Link, genau ein `h1` pro Seite und logische Ueberschriftenfolge.
- Text erfuellt mindestens WCAG AA. `{colors.chalk}` und `{colors.mist-blue}` erscheinen nur auf verlaesslich dunklen Feldern; `{colors.void}` erscheint auf `{colors.stage-saffron}` fuer primaere Aktionen.
- Jedes Bild hat kontextgerechten Alt-Text. Dekorative Texturen, Schwellengeometrie und wiederholte Maker-Siegel sind fuer Screenreader verborgen.
- Alle Controls funktionieren per Tastatur und nutzen `:focus-visible` mit `{colors.focus-ring}`. Tab-Reihenfolge folgt der sichtbaren Lesereihenfolge.
- `Menu` exponiert seinen Auf-/Zu-Zustand programmatisch. Escape schliesst das geoeffnete Menu und bringt den Fokus zum Trigger zurueck. Kein Ziel verschwindet allein wegen einer kleinen Breite.
- Evidence-Reader-Controls sind native Buttons mit ausgewaehltem Zustand. Der Dialog schliesst mit Escape oder Backdrop-Klick; die direkte Originalroute bleibt ohne Dialog nutzbar.
- Kompakte Controls haben mindestens 44 mal 44 CSS-Pixel Touch-Flaeche.
- Keine Bedeutung haengt nur an Farbe, Hover, Bewegung oder Bildinhalt.

# Responsive and Platform

Die Website ist responsive Web: visuell desktop-first komponiert, im Verhalten mobile-first. Pruefen bei 375px, 768px, 1024px und 1440px Breite.

| Breite | Verhalten |
|---|---|
| 1440px und groesser | Astral Spread bleibt als grosse gefaecherte Dreikarten-Komposition sichtbar. Work Index nutzt seine vollstaendige Entscheidungsreihenfolge in einer Zeile. |
| 1024px bis 1439px | Gleiche Informationsreihenfolge; Karten und Work-Index-Spalten verdichten sich ohne Fakten zu verstecken. |
| 768px bis 1023px | Home-Opener und Reader wechseln zu vertikalerer Lesereihenfolge. Reader-Index darf zwei Spalten nutzen, solange jeder Beleg klar bleibt. |
| Unter 768px | Navigation nutzt Menu. Astral Spread, Work Index und Product Detail werden einspaltig. Reader-Index wird vor dem gewaehlten Beleg direkt lesbar gestapelt. |

Astral Threshold nutzt `tbxBg2.jpeg` als eigene Mobile-Rekomposition, nicht als destruktiven Desktop-Crop. Der Hero zeigt Navigation, erste Routenpraemisse, Spread und `Continue through the portfolio` in jeder praktischen ersten Viewporthoehe. Keine feste Viewporthoehe darf eine inhaltliche Aktion unzugaenglich machen.

# Inspiration and Anti-patterns

Die visuelle Richtung und ihre abgelehnten Alternativen stehen verbindlich in `DESIGN.md`, insbesondere in Brand & Style, Layout & Spacing sowie Do's and Don'ts. Dieses Dokument fuegt keine zweite visuelle Autoritaet hinzu.

# Key Flows

## Mara waehlt einen sofort spielbaren Abend

1. Mara, eine erfahrene Daggerheart-Spielleiterin, landet ueber eine geteilte URL oder Suche auf Home.
2. Astral Threshold vermittelt die gemeinsame Welt; die drei Karten benennen die Auswahl nach Spielabsicht statt nach Marketingkategorie.
3. Sie waehlt `Run something tonight` und oeffnet Ephemera.
4. Auf der Detailseite liest sie Typ, Kompatibilitaet, Praemisse, Hook und bereitgestellte Fakten vor der externen Aktion.
5. **Klimax:** Die konkrete Spielsituation passt zu ihrer Gruppe, und sie aktiviert `View on DriveThruRPG` mit klarer Erwartung an das Ziel.
6. Sie landet auf DriveThruRPG, ohne einen On-site-Kaufprozess oder falsche Knappheit erlebt zu haben.

Fehlerpfad: Ist ein passender One-Shot nicht veroeffentlicht, erscheint seine Route im Spread nicht; Mara kann den Work Index durchsuchen oder einen anderen veroeffentlichten Weg waehlen.

## Jonas prueft ein Kampagnen-Framework

1. Jonas kennt Daggerheart und oeffnet die direkt geteilte Route `/works`.
2. Der Work Index zeigt fuer jedes Werk dieselbe Faktenreihenfolge. Er oeffnet Abythera wegen Typ, Kompatibilitaet und Hub-Praemisse.
3. Die Detailseite zeigt das vollstaendige Cover, Produktinformationen und den `Product evidence`-Hinweis.
4. Im Evidence Reader waehlt Jonas Campaign Framework und Karrhold Reference. Die echten Originalseiten zeigen, wie Material und GM-Unterstuetzung aussehen.
5. **Klimax:** Jonas erkennt, dass Karrhold nicht nur beworben, sondern als nutzbare GM-Referenz belegt ist, und wechselt bewusst zu DriveThruRPG.
6. Er kann alternativ zu Ko-fi gehen, wenn er nur zukuenftige Veroeffentlichungen verfolgen will.

Fehlerpfad: Ist die Vollansicht im Browser nicht verfuegbar oder geschlossen, bleibt `Open full page` als direkte Originalroute vorhanden.

## Leila bringt Material an den Tisch

1. Leila kennt Daggerheart erst seit kurzem und landet auf Home, weil ihre Gruppe nach sofort nutzbaren Tischmaterialien sucht.
2. Sie sieht `Bring something to the table` und oeffnet das Daggerheart Item Bundle, ohne dass die Seite es als allgemeinen PnP-Einstiegskurs ausgibt.
3. Typ und sichtbare `Daggerheart compatible`-Angabe machen die Voraussetzung klar; Premise und Fakten erklaeren druckbare Varianten und den Umfang.
4. Sie vergleicht den Eintrag mit den anderen veroeffentlichten Werken ueber `/works`.
5. **Klimax:** Leila erkennt, dass das Bundle zu der Daggerheart-Runde ihrer Gruppe passt, und aktiviert `View on DriveThruRPG` mit klarer Systemerwartung.
6. Sie erreicht DriveThruRPG ohne On-site-Kaufprozess oder die implizite Behauptung, das Material passe zu jedem Rollenspielsystem.

Fehlerpfad: Ist Daggerheart nicht das System ihrer Gruppe, bleibt sie auf `/works` und waehlt keinen unpassenden externen CTA.

## Devon prueft die Arbeitsweise

1. Devon entdeckt einen Work-Index-Eintrag ueber eine Suche, moechte aber vor dem externen Wechsel wissen, wie Tales by Xero arbeitet.
2. Devon folgt `How Tales by Xero is made` nach `/about`.
3. Die kurze Aussage erklaert die Table-tested-Arbeitsweise ohne gruenderhafte Selbstinszenierung oder Kaufdruck.
4. Devon kehrt ueber die sichtbare Works-Route zum Katalog zurueck und oeffnet ein passendes Detail.
5. **Klimax:** Die Arbeitsweise liefert genug Vertrauen, um eine konkrete Produktseite mit klarer Erwartung weiter zu pruefen.
6. Devon entscheidet selbst zwischen einer Produktdetailroute und dem externen Ko-fi-Link fuer spaetere Updates.

Fehlerpfad: Sucht Devon nur nach einer schnellen Uebersicht, fuehrt die Works-Route ohne Umweg wieder zum direkt verlinkbaren Katalog.

# Content and Asset Rules

Jedes oeffentliche Produkt braucht mindestens Titel, Produkttyp, Kompatibilitaet, Praemisse, Hero-Bild, externe URL und einen freigegebenen Hook oder Table-Use-Beleg. Systemkompatibilitaet, Spielzeit, Gruppengroesse, Content Warnings und Fakten werden nur dargestellt, wenn sie geliefert sind.

Bestehende KI-generierte Produktkunst darf als klar kuratiertes produktspezifisches Material dienen, nie als austauschbares Ambient Wallpaper. Der Astral-Threshold-Hintergrund ist dekorativ und fuer Assistenztechnik verborgen; Produktbilder und Dokumentseiten haben beschreibenden Kontext. Die bereitgestellte deutsche Cheat Sheet bleibt ein lesbarer Beleg, keine unleserliche Hintergrundtextur.
