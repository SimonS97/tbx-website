---
title: Tales by Xero
status: final
created: 2026-09-28
updated: 2026-09-28
---

# PRD: Tales by Xero

## 0. Document Purpose

Dieses PRD definiert die erste oeffentliche Version von **Tales by Xero**, einer englischsprachigen Portfolio- und Promotions-Website fuer Daggerheart-kompatible Tabletop-RPG-Werke. Es richtet sich an UX, Architektur, Umsetzung und Content-Pflege. Funktionale Anforderungen sind global als FR-IDs nummeriert; verbindliche visuelle und Interaktionsentscheidungen bauen auf `../../ux-designs/ux-websiteDraft-2026-09-28/DESIGN.md` und `EXPERIENCE.md` auf, statt sie zu duplizieren.

Die Website verkauft nichts selbst. Sie macht reale, veroeffentlichte Werke nachvollziehbar und fuehrt Interessierte bewusst zu deren externen DriveThruRPG-Produktseiten. Der Erstentwurf entstand im Coaching Path; noch nicht entschiedene Punkte stehen explizit unter [Open Questions](#10-open-questions).

## 1. Vision

Tales by Xero ist die eigene Buehne eines Solo-Creators fuer spielbereite Daggerheart-Inhalte. Statt eines austauschbaren Katalogs oder eines zweiten Shops zeigt die Website, dass hinter jedem Werk echte Spieltisch-Erfahrung, eine konkrete kreative Absicht und sorgfaeltig gemachte Materialien stehen. Besucherinnen und Besucher sollen innerhalb weniger Sekunden erkennen: Diese Produkte wurden nicht anonym zusammengestellt, sondern fuer echte Runden entwickelt und nach dem Spielen verfeinert.

Die Startseite beantwortet nicht zuerst "Was wird hier verkauft?", sondern "Welche Session brauche ich gerade?". Sie bietet hoechstens drei intent-basierte **Discovery Routes**: einen kuratierten One-Shot-Einstieg nach Stimmung, einen Kampagnen-Einstieg und einen Einstieg ueber physische Spielmaterialien. So wird ein wachsender Katalog entdeckbar, ohne wie ein Marketplace oder ein kuenstlich dichtes Kartenraster zu wirken.

Die visuelle Richtung **Saffron Myth Theatre** inszeniert jedes Werk als konkrete spielbare Szene. Dark Fantasy und Horror duerfen vorkommen, bestimmen aber nicht die ganze Marke: Werke wie Amber Tide sind ein gleichwertiger, warmer Gegenpol. Jeder Produktbesuch kann zu einem klaren DriveThruRPG-Klick fuehren, soll aber auch das Vertrauen und die Neugier wecken, ein passendes naechstes Werk zu entdecken.

Die Website ist ein realer, aber schlanker oeffentlicher Launch, kein kampagnengestutztes Marketingprojekt. Ihr erwarteter Zufluss kommt primaer aus DriveThruRPG-Profil- und Produktlinks sowie organischen Daggerheart-Suchen. Erfolg bedeutet qualifizierte Entdeckung und nachvollziehbare Weiterleitung, nicht eine bestimmte Reichweite oder Conversion-Kampagne.

## 2. Target User

### 2.1 Jobs To Be Done

- Als erfahrene Daggerheart-Spielleitung moechte ich schnell erkennen, ob ein Abenteuer zu meiner naechsten Runde, Gruppe und Stimmung passt, bevor ich eine externe Produktseite oeffne.
- Als TTRPG-erfahrene Person, die Daggerheart gerade entdeckt, moechte ich ein klares, community-gemachtes Werk finden, das den fiction-first Spielstil respektiert.
- Als Spielleitung mit wechselnder Verfuegbarkeit moechte ich ein Kampagnengeruest finden, das Ausfaelle nicht zum Abbruch der Geschichte macht.
- Als Spielleitung oder Spieler moechte ich physische, druckbare Gegenstaende finden, die ohne uebermaessliche Vorbereitung an den Tisch passen.
- Als von DriveThruRPG kommende Person moechte ich nachvollziehen koennen, wer hinter einem Werk steht und ob die Qualitaet des Produkts verlässlich wirkt.
- Als interessierte Person moechte ich weitere passende Werke entdecken, ohne mich durch einen generischen Shop oder aufdringliche Marketingmechanik arbeiten zu muessen.

### 2.2 Non-Users (v1)

- Vollstaendige Pen-and-Paper-Neulinge ohne bestehendes TTRPG-Interesse oder Zugang zu einer erfahrenen Gruppe.
- Personen, die einen Warenkorb, Zahlung, Konto, Abo oder Checkout auf der Website erwarten.
- Personen, die ein starres, vollstaendig vorgegebenes Abenteuer ohne Improvisation und Spielerentscheidung suchen.

### 2.3 Key User Journeys

- **UJ-1. Mara findet ein One-Shot fuer die naechste Runde.**
  - **Persona + context:** Mara leitet regelmaessig Daggerheart und sucht fuer die bevorstehende Runde etwas, das zu Energie und Geschmack der Gruppe passt.
  - **Entry state:** Sie kommt ueber eine Daggerheart-Suche oder einen Link auf die Startseite.
  - **Path:** Sie erkennt im ersten Viewport den sorgfaeltigen, eigenen Charakter der Website und die Discovery Routes. Sie waehlt **Run something tonight**. Die Website zeigt eine zugängliche, stimmungsbasierte Auswahl veroeffentlichter One-Shots. Mara waehlt ein Werk, liest Hook und Faktenleiste, vertieft sich in den spoilerarmen Moment und klickt bewusst zu DriveThruRPG.
  - **Climax:** Mara kann benennen, warum dieses Abenteuer zu ihrer konkreten Session passt.
  - **Resolution:** Sie ist auf der externen Produktseite oder entdeckt vor dem Wechsel ein sinnvoll verknuepftes Folgewerk.

- **UJ-2. Jonas prueft ein Werk nach einem DriveThruRPG-Link.**
  - **Persona + context:** Jonas hat ein Tales-by-Xero-Produkt auf DriveThruRPG entdeckt und folgt einem Link aus Produktbeschreibung oder Creator-Profil zur Produktdetailseite.
  - **Entry state:** Er landet direkt auf einem bestimmten Werk, ohne vorher die Startseite gesehen zu haben.
  - **Path:** Die Detailseite zeigt sofort Produkttyp, Daggerheart-Kompatibilitaet, Hook und verifizierte Tisch-Fakten. Jonas erkennt eine klare, persoenliche kreative Absicht, sieht einen spoilerarmen Szenen- oder NPC-Hook und kann zu DriveThruRPG zurueckkehren. Danach sieht er eine kuratierte Empfehlung fuer genau ein weiteres Werk.
  - **Climax:** Jonas vertraut der Sorgfalt des Creators und versteht den konkreten Nutzen des verlinkten Produkts.
  - **Resolution:** Er folgt dem DriveThruRPG-CTA oder vertieft seine Entdeckung mit dem empfohlenen naechsten Werk.

- **UJ-3. Aisha ordnet den Creator ein und bleibt informiert.**
  - **Persona + context:** Aisha hat mehrere Werke gesehen und moechte wissen, ob Tales by Xero reale Spielpraxis und eine eigene Handschrift mitbringt.
  - **Entry state:** Sie nutzt die globale Navigation oder einen ruhigen Abschlusslink auf einer Seite.
  - **Path:** Sie liest die kurze About-Seite mit der Spielpraxis, dem Fokus auf physische Tische und dem playtest-basierten Prozess. Sie sieht Ko-fi als eindeutig externen, gelegentlichen Update- und optionalen Supportkanal.
  - **Climax:** Aisha versteht, wer die Werke macht und warum sie veroeffentlicht werden.
  - **Resolution:** Sie kann Ko-fi freiwillig besuchen oder zu Works zurueckkehren, ohne zu einer Registrierung oder Unterstuetzung gedraengt zu werden.

## 3. Glossary

- **Author's Note** - Kurzer, werkbezogener persoenlicher Absatz ueber Ursprung, kreative Absicht und gewuenschte Tisch-Erfahrung eines Werks.
- **Discovery Route** - Einer von maximal drei intent-basierten Einstiegen auf der Startseite: `Run something tonight`, `Build a campaign around it` oder `Bring something to the table`.
- **Facts Strip** - Die kompakte, variable Zeile direkt am Produkthook. Sie zeigt nur verifizierte, werkrelevante Fakten.
- **Next Work** - Genau eine kuratierte, primaere Empfehlung fuer ein inhaltlich passendes weiteres veroeffentlichtes Werk auf einer Produktdetailseite.
- **One-Shot Vibe Selection** - Die Auswahlstufe innerhalb von `Run something tonight`, die veroeffentlichte One-Shots nach der gesuchten Session-Stimmung anbietet.
- **Published Work** - Ein oeffentlich verfuegbares Werk mit vollstaendigen Mindestdaten und einer funktionierenden externen Produkt-URL.
- **Works** - Die oeffentliche Sammlung aller Published Works auf Tales by Xero; kein Shop und keine Preisvergleichsseite.

## 4. Features

### 4.1 Brand Stage and Global Navigation

**Description:** Die Website praesentiert eine zusammenhaengende, eigenstaendige Markenwelt nach Saffron Myth Theatre. Die globale Navigation gibt ruhigen Zugang zu Works, About und dem externen Ko-fi-Kanal. Sie priorisiert Lesbarkeit und Orientierung vor dekorativer Inszenierung. Realisiert UJ-1, UJ-2 und UJ-3.

**Functional Requirements:**

#### FR-1: English public interface

Besucher sehen alle oeffentlichen Navigations-, Marketing- und Produkttexte auf Englisch.

**Consequences (testable):**
- Deutsche Quelltexte oder Produktartefakte duerfen nur als bewusst eingeordnete Inhalte erscheinen, nicht als unbeabsichtigte gemischte Oberflaeche.
- Die Inhaltsstruktur muss zukuenftig lokalisierbare Produktfelder erlauben, ohne die v1-Sprache zu aendern.

#### FR-2: Clear global orientation

Besucher koennen von jeder oeffentlichen Seite Works, About und Ko-fi erreichen und erkennen den aktiven Navigationsbereich.

**Consequences (testable):**
- Die Desktop-Navigation zeigt eine reduzierte Wort- oder Bildmarke sowie Works, About und Ko-fi als ruhige Zeile. Eine wiederholte Maker's Seal ist keine persistente Dekoration.
- Bevor Navigationslinks umbrechen, wird auf kleinen Breiten ein klar beschriftetes Menue verwendet.
- Ko-fi ist als externe Destination erkennbar.

#### FR-3: Saffron Myth Theatre consistency

Die Oberflaeche inszeniert Works als spielbare Szenen, nicht als Fantasy-Shop oder generisches Card Grid.

**Consequences (testable):**
- Night Mineral ist die dominante Flaeche; Saffron markiert Primaeraktionen, Auswahl und Produkttypen; Coral bleibt ein seltener Gefahren- oder Wendepunktakzent.
- Produktbilder sind kuratierte, produktspezifische Belege und keine unkontrollierten Hintergrundbilder.
- Die Umsetzung vermeidet Pergamentoptik, Runen-/Kerzendekor, Partikel, Glassmorphism, AI-lila Verlaeufe, diffuse Schatten und dauerhaftes Horror-Rot.

### 4.2 Homepage Discovery

**Description:** Die Startseite vermittelt im ersten Viewport Handwerk, Spieltischnaehe und eine direkt ausfuehrbare Entdeckungsaktion. Sie bietet maximal drei Discovery Routes. Die Route `Run something tonight` hilft bei der Wahl nach Vibe, bevor sie auf ein konkretes Published Work fuehrt. `Build a campaign around it` fuehrt zu Abythera; `Bring something to the table` fuehrt zum Daggerheart Item Bundle. Realisiert UJ-1.

**Functional Requirements:**

#### FR-4: Immediate useful homepage entry

Besucher erhalten auf Desktop im ersten Viewport und auf Mobile spaetestens innerhalb des ersten Viewports eine erkennbare naechste Aktion.

**Consequences (testable):**
- Markenversprechen, primaere Entdeckung und ein sichtbarer Uebergang zu Works sind ohne leeren, dominanten Hero-Raum erreichbar.
- Die Startseite verwendet keinen permanent dominanten Einzelprodukt-Spotlight als Markenanker.

#### FR-5: Three-route discovery model

Besucher koennen hoechstens drei Discovery Routes sehen: `Run something tonight`, `Build a campaign around it` und `Bring something to the table`.

**Consequences (testable):**
- Eine Route erscheint nur, wenn mindestens ein passendes Published Work existiert.
- Die Routen werden als asymmetrische, geschichtete Buehnenanordnung umgesetzt, nicht als gleichfoermiges Raster oder automatisch rotierendes Karussell.
- Label und Ziel jeder Route bleiben ohne Hover oder Animation erkennbar.

#### FR-6: One-Shot Vibe Selection

Besucher koennen innerhalb von `Run something tonight` zwischen mehreren Published Works anhand klar unterschiedlicher Session-Stimmungen waehlen.

**Consequences (testable):**
- Jede Option zeigt mindestens Werkname, kurzen nicht-spoilernden Vibe-Hook und direkten Weg zur Produktdetailseite.
- Die initiale Auswahl umfasst Weeping Rift, Amber Tide und Thorns of Blossomtide, sofern alle zum Launch als Published Work mit bestaetigter externer Produkt-URL vorliegen.
- Die Auswahl ist keine versteckte Hover-Funktion: Touch, Tastatur und Maus erreichen dieselben Inhalte.
- Die Aktivierung der Route darf zuerst die One-Shot Vibe Selection oeffnen; erst die Wahl eines Werks oeffnet dessen Detailseite.
- Diese zweite Auswahlstufe ist eine bewusst beschlossene Ausnahme von der frueheren direkten-Touch-Navigation fuer einfache Discovery Routes.
- Browser-Zurueck stellt den vorherigen Auswahlzustand wieder her, soweit dies auf der Zielplattform moeglich ist.

#### FR-7: Featured Ephemera entry

Besucher koennen Ephemera nach den Discovery Routes als hervorgehobenes, eigenstaendig spielbares Featured Work entdecken.

**Consequences (testable):**
- Die Darstellung kommuniziert sowohl `Play it standalone` als auch die Verbindung als zweite offizielle Abythera-Mission.
- Ephemera wird nicht ausschliesslich als voraussetzender Kampagneninhalt dargestellt.

#### FR-8: Honest table-tested proof

Besucher sehen auf der Startseite einen konkreten, lesbaren Hinweis auf die Spieltisch-Praxis hinter den Werken.

**Consequences (testable):**
- Der Nachweis ist eine konkrete Aussage oder ein reales Artefakt, keine Fake-Metrik oder nummerierte Werbe-Proof-Zone.
- Ein deutscher Cheat Sheet darf als lesbares Evidenz- oder Detailbild erscheinen, nie als Hintergrundtextur.

### 4.3 Works Catalog

**Description:** Works bietet eine vollstaendige, kuratierte Uebersicht aller Published Works. Es verbindet die Breite des Katalogs mit einer klaren Produktorientierung und darf bei wachsendem Bestand filtern oder nach Produkttyp gruppieren. Realisiert UJ-1 und UJ-2.

**Functional Requirements:**

#### FR-9: Published Works only

Besucher sehen auf allen oeffentlichen Discovery Surfaces ausschliesslich Published Works.

**Consequences (testable):**
- Unveroeffentlichte oder in Vorbereitung befindliche Werke werden weder als tote Route noch als Platzhalter dargestellt.
- Neue Werke koennen nach ihrer Veroeffentlichung in Works, geeigneten Discovery Routes und Next Work gepflegt werden.

#### FR-10: Launch catalog coverage

Works kann fuer jedes veroeffentlichte Launch-Werk eine Produktdetailseite oeffnen.

**Consequences (testable):**
- Der initiale Katalog umfasst Abythera, Karrhold, Ephemera, Weeping Rift, Amber Tide, Thorns of Blossomtide und das Daggerheart Item Bundle, sofern die Produktdaten beim Launch vollstaendig sind.
- Einzelne Item Volumes werden als Bestandteile oder Detailverweise des Daggerheart Item Bundle eingeordnet und muessen nicht als dominierende Galerieobjekte auftreten.
- Bei kleinem Katalog zeigt die Seite grosse, kuratierte Spotlights statt kuenstlicher Dichte.

#### FR-11: Product-oriented gallery behavior

Besucher koennen einen Gallery Tile oder eine gruppierte Produktdarstellung oeffnen, um zur jeweiligen Produktdetailseite zu gelangen.

**Consequences (testable):**
- Optionales Filtern erfolgt ohne Seiten-Reload und macht den gewaehlten Zustand programmatisch verfuegbar.
- Jeder Gallery Tile zeigt die feste Informationsreihenfolge Bild, Produkttyp, Titel und kurze Praemisse, auch bei unterschiedlichen Tile-Groessen.
- Produktart, Praemisse und Kompatibilitaet bleiben klarer als atmosphaerische Effekte.
- Auf kleinen Breiten wird die Darstellung einspaltig, bevor Titel oder Fakten unlesbar eng werden.

### 4.4 Product Detail Pages

**Description:** Jede Produktdetailseite laesst eine Spielleitung zuerst die praktische Passung bewerten, danach die Welt und die kreative Absicht erleben und schliesslich bewusst zu DriveThruRPG wechseln. Die verbindliche Inhaltsreihenfolge ist Produkttyp und Kompatibilitaet, Titel, Hook und Facts Strip, Szenenbild, `The moment`, Spieltisch-Nutzen, Author's Note, CTA und Next Work. Der **Hook** ist der ein Satz lange, praezise Nutzen- oder Praemissen-Satz direkt unter dem Titel. Die Seite ist keine Kopie der Marketplace-Beschreibung. Realisiert UJ-1 und UJ-2.

**Functional Requirements:**

#### FR-12: Product detail minimum data

Besucher erhalten fuer jedes Published Work mindestens Titel, Produkttyp, Daggerheart-Kompatibilitaet, Praemisse, Szenenbild, externe Produkt-URL und einen freigegebenen Story- oder Table-Hook.

**Consequences (testable):**
- Die Detailseite startet bei Titel und Praemisse, nicht bei einem rein dekorativen Bildausschnitt.
- Fehlende Daten werden nicht erfunden.

#### FR-13: Hook-first Facts Strip

Besucher sehen direkt beim Produkthook eine Facts Strip mit allen verifizierten, werkrelevanten Fakten.

**Consequences (testable):**
- Die Facts Strip kann Spielzeit, empfohlene Gruppengroesse, Charakterstufe oder Tier, druckbare Materialien, VTT-Maps und vergleichbare verifizierte Fakten enthalten.
- Sie zeigt nur auf das jeweilige Werk zutreffende Daten; fehlende Werte erhalten weder Schaetzungen noch leere Platzhalter.
- Produkttyp und Kompatibilitaet werden nicht ausschliesslich durch Farbe vermittelt.

#### FR-14: Spoiler-safe product depth

Besucher koennen nach Hook und Facts Strip ein produktbezogenes Szenenbild, einen kurzen `The moment`-Hook und den konkreten Nutzen am Spieltisch lesen.

**Consequences (testable):**
- `The moment` verwendet einen spoilerarmen Ort, NPC oder Konflikt, beispielsweise Harmony, Zephyrine, Malrik oder Felbrik, statt eine Synopsis oder Loesung zu verraten.
- Der Nutzen beschreibt Spielstruktur, erwartete Art von Entscheidungen und enthaltene Materialien konkret, einschliesslich der schnellen Spielbereitschaft ohne ueberladenes Handbuch sowie improvisationsfaehiger Situationen statt starrer Handlungsfuehrung, wenn dies fuer das Work zutrifft.
- Texte verwenden lebendige, leicht dramatische, aber praezise Sprache ohne unbelegte Superlative oder kuenstliche Verknappung.

#### FR-15: Product-specific Author's Note

Besucher koennen vor dem externen CTA eine kurze Author's Note lesen.

**Consequences (testable):**
- Die Note umfasst typischerweise zwei bis vier konkrete Saetze zu kreativer Absicht, Ursprung und gewuenschter Tisch-Erfahrung.
- Sie ersetzt weder Hook noch Facts Strip und wiederholt nicht die vollstaendige Produktbeschreibung.

#### FR-16: Accurate external product handoff

Besucher koennen ueber einen klaren, zugänglichen CTA zur tatsaechlichen DriveThruRPG-Destination eines Produkts wechseln.

**Consequences (testable):**
- CTA-Texte benennen die externe Destination, zum Beispiel `View on DriveThruRPG`, und wirken nie wie ein interner Checkout.
- Eine fehlende oder unbestaetigte externe URL erzeugt keinen oeffentlichen CTA.
- Alle externen DriveThruRPG-, Ko-fi- und vergleichbaren Ziele oeffnen im selben Browser-Tab, damit Browser-Zurueck zum kuratierten Tales-by-Xero-Kontext zurueckfuehrt.

#### FR-17: Karrhold and Abythera relationship

Besucher koennen Karrhold als eigenstaendiges Work entdecken und zugleich korrekt verstehen, dass es im Abythera Campaign Framework enthalten ist.

**Consequences (testable):**
- Karrhold besitzt eine eigene, indexierbare Produktdetailseite.
- Die Seite zeigt prominent und eindeutig: `Included with Abythera` sowie den Hinweis, dass bei Besitz des Abythera Campaign Framework kein separater Kauf von Karrhold erforderlich ist.
- Der Hinweis darf keine falsche Aussage ueber Preis, Verfuegbarkeit oder Kaufvoraussetzung treffen.

#### FR-18: Curated Next Work

Besucher erhalten auf jeder Produktdetailseite genau eine primaere Next Work-Empfehlung und einen ruhigeren Link zur vollstaendigen Works-Uebersicht.

**Consequences (testable):**
- Die Empfehlung basiert auf nachvollziehbarer inhaltlicher oder spielpraktischer Passung, nicht auf einer generischen Produktempfehlungsleiste.
- Beispielhafte Verbindungen sind Karrhold zu Abythera oder Ephemera, Ephemera zu Abythera, Weeping Rift zu Amber Tide und das Item Bundle zu einem One-Shot.
- Eine Detailseite zeigt keine konkurrierende Auswahl mehrerer primaerer Folgewerke.

### 4.5 Creator Context and Ko-fi

**Description:** About schafft persoenliches Vertrauen ohne lange Biografie. Ko-fi bleibt eine freiwillige externe Informations- und Supportmoeglichkeit. Realisiert UJ-3.

**Functional Requirements:**

#### FR-19: Concise About page

Besucher koennen eine kurze About-Seite lesen, die die Spielpraxis und Arbeitsweise von Tales by Xero einordnet.

**Consequences (testable):**
- Die Seite vermittelt mehr als zehn Jahre Pen-and-Paper-Praxis ueber verschiedene Systeme sowie das Schreiben und Leiten eigener Abenteuer und Kampagnen.
- Sie erklaert, dass Veroeffentlichungen aus fuer den eigenen, physischen Spieltisch entwickelten und nach Sessions verfeinerten Materialien entstehen.
- Sie bleibt eine kompakte Einordnung und wird keine ausfuehrliche Gruenderbiografie.

#### FR-20: Low-pressure Ko-fi presence

Besucher koennen Ko-fi als externe Informationsseite fuer gelegentliche Updates und optionale Unterstuetzung erreichen.

**Consequences (testable):**
- Die Website verwendet keine Pop-ups, erzwungenen Anmeldungen, Countdowns oder wiederholten Unterstuetzungsaufforderungen.
- Freiwillige Unterstuetzung darf sachlich erwaehnt, aber nicht als primaere Conversion behandelt werden.

### 4.6 Privacy-Preserving Discovery Analytics

**Description:** Die Website misst nur, ob ihre Entdeckungs- und Weiterleitungsreise funktioniert. Analytics unterstuetzen keine Werbung, Profilbildung oder Verhaltenstracking. Realisiert UJ-1 und UJ-2.

**Functional Requirements:**

#### FR-21: Aggregate discovery measurement

Der Betreiber kann aggregiert erkennen, ueber welche Einstiegskanaele Besuche kommen und welche Produktdetailseiten aufgerufen werden.

**Consequences (testable):**
- Die Erfassung umfasst Einstiegsquelle, soweit technisch und datensparsam verfuegbar, sowie Seitenaufrufe pro Produktdetailseite.
- Die Erfassung baut keine Werbe- oder Personenprofile auf.

#### FR-22: Outbound and route measurement

Der Betreiber kann aggregiert pro Produkt den DriveThruRPG-CTA-Klick sowie die Nutzung jeder Discovery Route und der One-Shot Vibe Selection auswerten.

**Consequences (testable):**
- Ein CTA-Ereignis wird erst durch eine aktive Link-Ausloesung erfasst.
- Die Route- und Vibe-Auswahl ist separat auswertbar, ohne Personen ueber mehrere Sitzungen zu verfolgen.
- Ko-fi-Klicks bleiben optional und werden nur erfasst, wenn dies ohne weitere Komplexitaet und ohne Abweichung von den Datenschutzregeln moeglich ist.

## 5. Information Architecture

- **Home:** Markenversprechen, drei Discovery Routes, One-Shot Vibe Selection, Featured Ephemera, Featured Works, konkreter table-tested Nachweis, kurze Creator-Methode und ruhiger Ko-fi-Abschluss.
- **Works:** Kuratierte Uebersicht aller Published Works; optional filterbar oder nach Produkttyp gruppiert, wenn das Produktinventar dies rechtfertigt.
- **Product Detail:** Hook mit Facts Strip, Szenenbild, `The moment`, Spieltisch-Nutzen, Author's Note, DriveThruRPG-CTA und Next Work.
- **About:** Kurze Creator- und Arbeitsweisen-Einordnung.
- **Ko-fi:** Externe Destination, klar als solche gekennzeichnet.

## 6. Cross-Cutting Requirements and Guardrails

### 6.1 Accessibility and Responsive Behavior

- Alle Seiten verwenden semantische Landmarks, einen sichtbaren Skip Link, genau ein `h1` und eine logische Heading-Hierarchie.
- Text erreicht mindestens WCAG-AA-Kontrast. Lesetext steht nur auf opaken oder verlässlich dunklen Flaechen, nie auf unkontrolliertem Bildmaterial.
- Alle interaktiven Elemente sind per Tastatur erreichbar, zeigen einen deutlichen `:focus-visible`-Zustand und haben kompakte Touch-Ziele von mindestens 44 x 44 CSS-Pixeln.
- Jedes informative Bild hat einen kontextgerechten Alternativtext. Dekorative Texturen und wiederholte Maker's Seals sind fuer Screenreader verborgen.
- Inhalt oder Bedeutung darf nicht ausschliesslich von Farbe, Hover, Bewegung oder Bildinhalt abhaengen.
- Verbindliche Testbreiten sind 375 px, 768 px, 1024 px und 1440 px. Mobile folgt immer der Lesereihenfolge Produkttyp und Kompatibilitaet, Titel, Hook und Facts Strip, Bild, `The moment`, Spieltisch-Nutzen, Author's Note, CTA und Next Work.
- `prefers-reduced-motion` deaktiviert nicht essenzielle Bewegung oder zeigt direkt ihren Endzustand. Kein Inhalt wird hinter Animation verborgen.

### 6.2 Motion and Performance

- Bewegung dient ausschliesslich Hierarchie, narrativer Enthuellung oder direktem Feedback. Dauerpartikel, Scroll-Hijacking, Infinite Marquees, Auto-Rotation und Animation auf jeder Karte sind ausgeschlossen.
- Bilder reservieren vor dem Laden ihr endgueltiges Seitenverhaeltnis und verwenden ruhige tonale Platzhalter. Bilder unterhalb des Folds laden lazy; ein Hero-Bild wird nur als primaeres LCP-Element eager geladen.
- Kritische Inhalte haengen nicht von Hover, horizontalem Drag, Pinning oder Scroll-Effekten ab.

### 6.3 Privacy and Data Minimization

- Analytics erfassen ausschliesslich die fuer FR-21 und FR-22 benoetigten aggregierten Ereignisse.
- Werbung, Retargeting, Behavioral Marketing, Verkauf oder Anreicherung personenbezogener Profile sowie unnoetige Identifikatoren sind verboten.
- Die konkrete Analytics-Loesung muss ihren datensparsamen Betrieb und die erforderlichen Transparenzinformationen vor Launch belegen. [ASSUMPTION: Die endgueltige rechtliche Bewertung und Privacy-Information folgt nach Wahl des Tools.]

### 6.4 Hosting and Operations

- Vercel hostet die statisch erzeugte v1-Website ueber die Git-Integration.
- Die Website muss oeffentlich erreichbar sein und darf keine Kernfunktion von bezahlten Shop-, Account- oder Marketingdiensten abhaengig machen.

## 7. Non-Goals (Explicit)

- Kein interner Shop, Checkout, Warenkorb, Zahlung, Abo, Konto oder Kundenkonto.
- Kein Preisvergleich, Kaufdruck, Fake-Dringlichkeit, Pop-up, Countdown, Fake-Testimonial oder Fake-Metrik.
- Keine allgemeine Daggerheart- oder Pen-and-Paper-Einfuehrung fuer vollstaendige Neueinsteiger.
- Keine vollstaendige Produktdaten-Synchronisierung mit DriveThruRPG; die Website ist eine kuratierte Entdeckungs- und Vertrauensflaeche.
- Keine Veroeffentlichung unverfuegbarer oder nur geplanter Werke als oeffentliche Entdeckung.
- Keine Festlegung auf Dark Fantasy oder Horror als alleinige Markenwelt.
- Kein personenbezogenes Tracking, keine Werbetechnologie und kein Retargeting.

## 8. MVP Scope

### 8.1 In Scope

- Oeffentliche englische Home-, Works-, Product-Detail- und About-Seiten sowie ein externer Ko-fi-Link.
- Saffron-Myth-Theatre-Design und die in den UX-Artefakten definierten responsiven, zugänglichen Interaktionsregeln.
- Drei Discovery Routes mit One-Shot Vibe Selection sowie Featured Ephemera.
- Produktdetailseiten fuer vollstaendig vorbereitete Published Works, einschliesslich Facts Strip, `The moment`, Author's Note, DriveThruRPG-CTA und Next Work.
- Eigene Karrhold-Seite mit korrekter Abythera-Einordnung.
- Minimale, aggregierte Analytics fuer Einstiegsquellen, Produktdetailseiten, DriveThruRPG-CTAs und Discovery-Nutzung.

### 8.2 Out of Scope for MVP

- Veroeffentlichungsplanung, Preisgestaltung oder Kaufabwicklung auf Tales by Xero.
- Vollstaendige Mehrsprachigkeit der oeffentlichen Oberflaeche.
- Sichtbare "in preparation"-Werke oder automatische Katalogerweiterungen.
- VTT-Versionen, VTT-Integrationen oder neue Online-Tools als Teil der Website.
- Eine dauerhafte Launch-, Award- oder Kampagnen-Spotlight-Struktur fuer ein einzelnes Werk.
- Ko-fi-spezifische Follow-, Donation- oder Newsletter-Mechaniken innerhalb der Website.

## 9. Success Metrics

**Primary**

- **SM-1:** Die Website ist oeffentlich erreichbar und die aggregierte Verteilung der Einstiegsquellen ist auswertbar. Validiert FR-21.
- **SM-2:** Seitenaufrufe jeder Produktdetailseite sind aggregiert erfassbar, sodass Interesse an einzelnen Works verglichen werden kann. Validiert FR-21.
- **SM-3:** Ausgehende DriveThruRPG-CTA-Klicks sind pro Produkt aggregiert erfassbar. Validiert FR-16 und FR-22.
- **SM-4:** Die Nutzung jeder Discovery Route und der One-Shot Vibe Selection ist aggregiert erfassbar, sodass der Nutzen des "Find your next session"-Einstiegs beurteilt werden kann. Validiert FR-5, FR-6 und FR-22.

**Secondary**

- **SM-5:** Besucher koennen vom verlinkten Werk aus mindestens ein kuratiertes Next Work entdecken, ohne auf einen generischen Produktkatalog angewiesen zu sein. Validiert FR-18.

**Counter-metrics (do not optimize)**

- **SM-C1:** Mehr Analytics-Detail oder Hoechstwerte bei erfassten Events sind kein Erfolg, wenn dafuer personenbezogenes Tracking, Identifier oder Werbetechnologie noetig waeren. Counterbalances SM-1 bis SM-4.
- **SM-C2:** Mehr Seiteninteraktion ist kein Erfolg, wenn CTA, Produktart, Kompatibilitaet oder Facts Strip dadurch langsamer auffindbar werden. Counterbalances SM-4 und SM-5.

## 10. Open Questions

1. Welche Works sind beim tatsaechlichen Launch vollstaendig mit Bildmaterial, freigegebenem `The moment`, Facts Strip, Author's Note und externer URL vorbereitet?
2. Welche finale englische Microcopy und welche konkreten Bilder definieren die drei Optionen der One-Shot Vibe Selection?
3. Soll Works in v1 direkt filterbar sein oder bei dem initialen Katalog nur nach Produkttyp gruppiert werden?
4. Welches cookielose, datensparsame Analytics-Tool erfuellt die Messanforderungen auf dem finalen Hosting, und welche Privacy-Information wird dafuer benoetigt?
5. Welche verbindlichen Next Work-Zuordnungen sollen fuer alle Launch-Werke gelten, einschliesslich Karrhold, Ephemera und dem Item Bundle?

## 11. Assumptions Index

- Abschnitt 6.3 - Auswahl, datensparsame Konfiguration und rechtliche Transparenz der Analytics-Loesung werden vor Launch entschieden.
