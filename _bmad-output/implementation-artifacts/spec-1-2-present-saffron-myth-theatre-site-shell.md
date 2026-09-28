---
title: 'Story 1.2: Saffron-Myth-Theatre-Site-Shell'
type: 'feature'
created: '2026-09-28'
status: 'done'
route: 'dispatch'
review_loop_iteration: 0
baseline_commit: 'NO_VCS'
context:
  - '_bmad-output/implementation-artifacts/epic-1-context.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Die vorhandenen öffentlichen Seiten sind zugänglich, haben aber noch eine neutrale Dokumentoptik und keine globale Navigation. Besucher erkennen weder die Saffron-Myth-Theatre-Identität noch können sie Works, About und Ko-fi zuverlässig über jede Route erreichen.

**Approach:** Eine gemeinsame, responsive und JavaScript-unabhängige Site-Shell etabliert die dunkle, präzise Markenbühne, ein dreischichtiges CSS-Token-System sowie die globale Navigation. Die gewählte Typografie ist Source Serif 4 für Display-Texte und Atkinson Hyperlegible für lesbaren UI- und Fließtext; die Wortmarke wird durch ein kleines Maker-Siegel ergänzt.

## Boundaries & Constraints

**Always:** Native CSS Custom Properties strikt als Primitive-, Semantic- und Component-Layer führen. Night Mineral und Night Deep dominieren; Chalk und Mist Blue bleiben auf opaken dunklen Flächen lesbar, Saffron kennzeichnet primäre Aktion und aktive Auswahl, Coral bleibt ungenutzt, solange kein bedeutungsvoller Sonderfall besteht. Die Shell enthält auf jeder Route eine echte Hauptnavigation mit Maker-Siegel plus Wortmarke, Works, About und einem im selben Tab öffnenden Ko-fi-Link zu `https://ko-fi.com/talesbyxero`. Aktive interne Navigation kombiniert Saffron-Regel und `aria-current="page"`. Controls sind mindestens 44 mal 44 CSS-Pixel, Fokuszustände klar sichtbar, externe Ziele zugänglich bezeichnet und `prefers-reduced-motion` zeigt alle Inhalte ohne Bewegung.

**Never:** Keine React-, Tailwind-, GSAP-, Lenis- oder Vanta-Abhängigkeiten ergänzen. Keine Rundkarten, Glassmorphism, diffusen Schatten, AI-Purple-Verläufe, Pergament-, Runen- oder Kerzendekor, gefüllten aktiven Tabs, `target="_blank"`, JavaScript-pflichtige Navigation oder Shop-/Supportdruckmechaniken einführen. Produktbilder und die finale About-Praxisbeschreibung bleiben für spätere Stories ausgenommen.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Desktop-Navigation | Viewport ab Desktop-Breakpoint auf einer internen Route | Maker-Siegel und Wortmarke sowie Works, About und Ko-fi erscheinen in einer ruhigen Zeile; die aktuelle Route trägt Unterregel und `aria-current` | Links bleiben reguläre HTML-Links ohne Script-Abhängigkeit. |
| Mobile Navigation | Viewport unterhalb des Breakpoints oder JavaScript deaktiviert | Ein deutlich beschriftetes, per Tastatur bedienbares Menü bietet dieselben Ziele, bevor Desktop-Links umbrechen könnten | Das native Menü bleibt ohne JavaScript vollständig nutzbar. |
| Externes Ziel | Aktivierung von Ko-fi | Der Browser öffnet `https://ko-fi.com/talesbyxero` im selben Tab; die externe Natur ist im sichtbaren Text oder Accessible Name erkennbar | Kein Popup und kein neuer Tab. |
| Bewegungsreduktion | `prefers-reduced-motion: reduce` | Alle Shell-Inhalte sind sofort sichtbar und nicht essentielle Übergänge sind deaktiviert | Keine Information hängt an Motion oder Hover. |

</frozen-after-approval>

## Code Map

- `package.json`, `package-lock.json` -- bestehende npm-Toolchain; um selbstgehostete Font-Pakete erweitern, ohne Astro- oder TypeScript-Versionen zu ändern.
- `src/layouts/BaseLayout.astro` -- bestehende gemeinsame Dokumentstruktur; gemeinsame Navigation in die Shell einhängen und den aktiven Pfad an die Navigation weiterreichen.
- `src/components/common/SiteNavigation.astro` -- neu; semantische Desktop- und native Mobile-Navigation mit Markenlink, aktiven Zuständen und Ko-fi-Kennzeichnung.
- `src/styles/global.css` -- bestehender globaler Style-Einstieg; Rohwerte durch Token-Layer, Fonts, responsive Shell-, Fokus- und Reduced-Motion-Regeln ersetzen.
- `src/pages/index.astro`, `src/pages/works/index.astro`, `src/pages/about.astro` -- vorhandene statische Seiten; nur die erforderliche Layout-Prop für den aktiven Navigationszustand hinzufügen, Seiteninhalt und je ein `h1` bewahren.
- `assets/TbX_logo.png` -- vorhandenes quadratisches Maker-Siegel; nach `src/assets/brand/` übernehmen und ausschließlich als kleines, neben der Wortmarke dekoratives Signet nutzen.
- `scripts/verify-static-pages.mjs` -- bestehende Build-Prüfung; um Navigation, aktive Route, Ko-fi-Ziel und fehlende Client-Skripte erweitern.

## Tasks & Acceptance

**Execution:**
- [x] `package.json`, `package-lock.json`, `src/styles/global.css` -- Source Serif 4 und Atkinson Hyperlegible lokal einbinden und das drei Ebenen umfassende Token-, Typografie-, Fokus-, Responsive- und Reduced-Motion-System implementieren -- die Shell erhält eine belastbare, selbstgehostete visuelle Grundlage.
- [x] `src/assets/brand/TbX_logo.png`, `src/components/common/SiteNavigation.astro`, `src/layouts/BaseLayout.astro` -- Maker-Siegel neben der Wortmarke, semantische Hauptnavigation sowie native Mobile-Menüvariante implementieren -- alle öffentlichen Ziele bleiben auf jedem Gerät und ohne JavaScript erreichbar.
- [x] `src/pages/index.astro`, `src/pages/works/index.astro`, `src/pages/about.astro` -- aktiven Routenkontext an die Shell übergeben, ohne Seitenhierarchie oder Kerninhalt zu ändern -- der aktuelle Bereich wird nicht nur über Farbe erkennbar.
- [x] `scripts/verify-static-pages.mjs` -- erzeugte Desktop- und mobile Navigation, `aria-current`, Ko-fi-URL, Same-Tab-Konvention und vorhandene Story-1.1-Invarianten prüfen -- der Produktionsbuild sichert die Shell gegen Regressionen.
- [x] `package.json` und die Shell-Dateien -- Lint und Produktionsbuild ausführen; Navigation bei 375, 768, 1024 und 1440 CSS-Pixeln sowie mit Tastatur und aktivierter Bewegungsreduktion prüfen -- die visuelle und zugängliche Übergabe ist nachvollziehbar.

**Acceptance Criteria:**
- Given eine öffentliche Route lädt, when die Shell auf Desktop oder Mobile rendert, then sind Maker-Siegel plus Wortmarke, Works, About und Ko-fi sichtbar oder über ein klar beschriftetes, keyboard-operables Mobile-Menü vor Link-Umbruch erreichbar.
- Given eine interne Route ist aktiv, when die Navigation rendert, then zeigt sie eine Saffron-Regel und zusätzlich `aria-current="page"` statt eines gefüllten Tabs.
- Given Shell-Komponenten gestylt werden, when visuelle Werte eingesetzt werden, then konsumieren sie ausschließlich Component- oder Semantic-Tokens über der Primitive-Ebene.
- Given die Shell auf allen Routen erscheint, when sie wahrgenommen wird, then dominieren Night Mineral, Night Deep, Chalk und Mist Blue; Saffron bleibt ein präziser Akzent und die Oberfläche vermeidet generische gerundete Karten.
- Given ein Link oder Menü-Control fokussiert oder aktiviert wird, when Tastatur oder Touch verwendet werden, then sind Fokus, Aktivierung und mindestens 44-mal-44-Pixel-Ziele eindeutig; Ko-fi ist als externes Same-Tab-Ziel bezeichnet.
- Given `prefers-reduced-motion: reduce` aktiv ist, when die Shell gerendert wird, then startet keine nicht essentielle Motion und jeder Inhalt bleibt unmittelbar sichtbar.

## Implementation Notes

- `SiteNavigation.astro` liefert auf allen drei statischen Routen Markenlink, Works, About und den gekennzeichneten Same-Tab-Ko-fi-Link; unterhalb von 1024 CSS-Pixeln bleibt die Navigation als natives `<details>`-Menü ohne JavaScript nutzbar.
- Source Serif 4 und Atkinson Hyperlegible werden über lokale `@fontsource`-Pakete gebündelt. `global.css` führt Primitive-, Semantic- und Component-Tokens; Shell-Selektoren konsumieren ausschließlich Semantic- oder Component-Tokens.
- Die Saffron-Myth-Theatre-Shell nutzt Night Mineral und Night Deep als dominante Felder, Chalk und Mist Blue für Lesbarkeit sowie Saffron ausschließlich für die obere Regel und aktive Navigation.
- `npm run build` prüft zusätzlich die generierten Routen auf Navigation, Maker-Siegel, aktive Route, Ko-fi, Mobile-Menü, fehlende Client-Skripte und Reduced-Motion-Regel.

## Spec Change Log

## Review Triage Log

| Verdict | Evidence |
|---------|----------|
| false | `src/components/common/SiteNavigation.astro` exists and contains the shared brand, Works, About, Ko-fi and active-route markup; the non-Git directory snapshot omitted nested new files. |
| false | `src/layouts/BaseLayout.astro` imports and renders `SiteNavigation` for every public route, passing each route's `currentPath`. |
| false | `src/styles/global.css` imports both local font packages and contains the token, responsive, focus and reduced-motion rules; `npm run build` emits and verifies the complete shell. |
| false | The global stylesheet contains explicit primitive, semantic and component token sections; the review snapshot omitted the changed source tree. |
| false | `src/assets/brand/TbX_logo.png` exists and is imported as a decorative maker seal next to the wordmark. |
| false | All three page components pass `currentPath` to `BaseLayout`; generated HTML contains the corresponding `aria-current="page"` link. |
| false | `SiteNavigation.astro` provides a native `<details><summary>Menu</summary>` fallback with all navigation destinations. |
| false | The rendered navigation is semantic, labels Ko-fi as external, uses 44-pixel controls and has visible focus styling. |
| false | `scripts/verify-static-pages.mjs` exists and the successful production build verifies navigation, active routes, Ko-fi, the mobile menu and no client scripts. |
| false | The implementation files, checked task entries and successful build verification all exist; the reported absence is caused by an incomplete non-Git snapshot. |
| medium | Shell selector rules in `src/styles/global.css` directly consume several `--primitive-*` tokens, bypassing the required semantic/component boundary. This weakens the token contract that later components must follow. |

## Design Notes

Die Shell übersetzt Saffron Myth Theatre als strukturierte Nachtszene statt als Fantasy-Shop: eine feine obere Regel, ein kleines Siegel als Gegenpol zur Wortmarke und viel ruhige dunkle Fläche. Auf Desktop bleiben die Navigationsziele in einer Linie; mobil macht ein scharf gerahmtes natives Menü die gleiche Informationsarchitektur sichtbar. Saffron markiert ausschließlich Richtung und Auswahl, nie großflächige Dekoration.

## Verification

**Commands:**
- `npm run lint` -- erwartet: geänderte Astro-, CSS- und Verifikationsdateien bestehen die Prüfung.
- `npm run build` -- erwartet: alle drei statischen Routen bauen und die erweiterte Shell-Prüfung besteht.

**Manual checks (if no CLI):**
- Bei 375, 768, 1024 und 1440 CSS-Pixeln sicherstellen, dass keine Navigation umbricht, das Mobile-Menü klar bedienbar bleibt und die Reihenfolge der Inhalte erhalten ist.
- Ausschließlich per Tastatur Skip-Link, Markenlink, Navigation, Mobile-Menü und Ko-fi erreichen; mit aktivierter Bewegungsreduktion bleiben alle Inhalte sofort sichtbar.
