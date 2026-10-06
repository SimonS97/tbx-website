import assert from "node:assert/strict";
import { createServer } from "vite";
import { getViteConfig } from "astro/config";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { URL, fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));

function work(slug, { status = "published", type = "one-shot" } = {}) {
  return {
    id: slug,
    collection: "works",
    data: {
      slug,
      status,
      title: slug,
      type,
      compatibility: "Daggerheart compatible",
      premise: `A premise for ${slug}.`,
      hook: `A hook for ${slug}.`,
      facts: [{ label: "Format", value: "PDF" }],
      images: [{
        role: "hero",
        alt: `Artwork for ${slug}.`,
        aspectRatio: 2 / 3,
        src: { src: `/__catalog-fixture__/${slug}.png`, width: 2, height: 3, format: "png" }
      }],
      externalUrl: `https://www.drivethrurpg.com/product/${slug}`,
      theMoment: "A spoiler-safe moment.",
      tableUse: "A concrete table use.",
      authorsNote: "A concise note.",
      nextWork: slug,
      seo: { title: slug, description: `A description for ${slug}.` }
    }
  };
}

function catalogSlugs(html) {
  return [...html.matchAll(/<a(?=[^>]*\bclass="[^"]*\bwork-catalog-tile\b[^"]*")(?=[^>]*\bhref="\/works\/([^"]+)")[^>]*>/gu)]
    .map(([, slug]) => slug);
}

let vite;

try {
  const createAstroViteConfig = getViteConfig(
    {
      root: projectRoot,
      appType: "custom",
      logLevel: "silent",
      server: { middlewareMode: true, hmr: false, watch: null }
    },
    { root: projectRoot, logLevel: "silent" }
  );
  const config = await createAstroViteConfig({ command: "serve", mode: "test" });
  vite = await createServer(config);

  const { default: WorksCatalog } = await vite.ssrLoadModule("/src/components/works/WorksCatalog.astro?container");
  const container = await AstroContainer.create();
  const render = (works) => container.renderToString(WorksCatalog, {
    props: { works }
  });

  const emptyCatalog = await render([]);
  assert.match(emptyCatalog, /<h1[^>]*>Works<\/h1>/u);
  assert.match(emptyCatalog, /No published works are available here\./u);
  assert.match(emptyCatalog, /<a[^>]*href="\/"[^>]*>Return to Tales by Xero<\/a>/u);
  assert.deepEqual(catalogSlugs(emptyCatalog), [], "an empty published collection renders no catalog tiles");

  const mixedCatalog = await render([
    work("abythera", { type: "campaign-framework" }),
    work("draft-only", { status: "draft" }),
    work("future-work")
  ]);
  assert.deepEqual(catalogSlugs(mixedCatalog), ["abythera", "future-work"]);
  assert.doesNotMatch(mixedCatalog, /draft-only|A premise for draft-only\.|Artwork for draft-only\./u);

  const expandedCatalog = await render([
    work("fourth-work"),
    work("daggerheart-item-bundle", { type: "item-bundle" }),
    work("ephemera"),
    work("abythera", { type: "campaign-framework" })
  ]);
  assert.deepEqual(catalogSlugs(expandedCatalog), ["abythera", "ephemera", "daggerheart-item-bundle", "fourth-work"]);
  assert.match(expandedCatalog, /<a(?=[^>]*\bclass="[^"]*\bwork-catalog-tile\b[^"]*")(?=[^>]*\bhref="\/works\/fourth-work")[^>]*>/u);
  assert.doesNotMatch(expandedCatalog, /<a[^>]+work-catalog-tile[^>]+target=/u);

  const firstTile = /<a(?=[^>]*\bclass="[^"]*\bwork-catalog-tile\b[^"]*")(?=[^>]*\bhref="\/works\/abythera")[^>]*>([\s\S]*?)<\/a>/u.exec(expandedCatalog)?.[1] ?? "";
  const fourthTile = /<a(?=[^>]*\bclass="[^"]*\bwork-catalog-tile\b[^"]*")(?=[^>]*\bhref="\/works\/fourth-work")[^>]*>([\s\S]*?)<\/a>/u.exec(expandedCatalog)?.[1] ?? "";
  assert.match(firstTile, /<img(?=[^>]*\bloading="eager")(?=[^>]*\bfetchpriority="high")[^>]*>/u);
  assert.match(fourthTile, /<img(?=[^>]*\bloading="lazy")(?=[^>]*\bfetchpriority="auto")[^>]*>/u);
  const heroIndex = firstTile.indexOf("work-catalog-media");
  const typeIndex = firstTile.indexOf("Campaign framework");
  const titleIndex = firstTile.indexOf("abythera</h2>");
  const premiseIndex = firstTile.indexOf("A premise for abythera.");
  assert.ok(heroIndex >= 0 && typeIndex >= heroIndex && titleIndex >= typeIndex && premiseIndex >= titleIndex);

  console.log("Rendered Works catalog fixtures: empty state, draft exclusion, curated order, and later published works.");
} finally {
  await vite?.close();
}
