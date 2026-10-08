import { access, readFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, parse, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "js-yaml";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const worksDirectory = resolve(projectRoot, "src/content/works");
const workAssetsDirectory = resolve(projectRoot, "src/assets/works");
const worksCatalogPage = resolve(projectRoot, "src/pages/works/index.astro");
const worksCatalogComponent = resolve(projectRoot, "src/components/works/WorksCatalog.astro");
const pages = ["index.html", "works/index.html", "about/index.html"];
const typeLabels = {
  "one-shot": "One-shot",
  "campaign-framework": "Campaign framework",
  "item-bundle": "Item bundle"
};
const globalStyles = await readFile(resolve("src/styles/global.css"), "utf8");
const worksCatalogSource = await readFile(worksCatalogPage, "utf8");
const worksCatalogComponentSource = await readFile(worksCatalogComponent, "utf8");
const worksContentConfig = await readFile(resolve("src/content.config.ts"), "utf8");
const hasReducedMotionFallback = /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?animation-duration:\s*0\.01ms\s*!important;/iu.test(globalStyles);
const hasContainedHero = /\.work-hero img\s*\{[\s\S]*?object-fit:\s*contain;/u.test(globalStyles);
const hasCatalogHeroFrame =
  /--primitive-catalog-hero-ratio:\s*2\s*\/\s*3;/u.test(globalStyles) &&
  /\.work-catalog-media\s*\{[\s\S]*?aspect-ratio:\s*var\(--work-catalog-hero-ratio\);/u.test(globalStyles) &&
  /\.work-catalog-media\s+\.work-hero\s*\{[\s\S]*?aspect-ratio:\s*auto;/u.test(globalStyles);
const hasConditionalEmptyState =
  /catalogWorks\.length\s*>\s*0\s*\?[\s\S]*?No published works are available here\./u.test(worksCatalogComponentSource);
const hasHeroOnlyCatalogSource =
  /work\.data\.images\.find\(\(image\)(?::[^=]+)?\s*=>\s*image\.role\s*===\s*"hero"\)/u.test(worksCatalogComponentSource) &&
  /Published work "\$\{work\.data\.slug\}" is missing its hero image\./u.test(worksCatalogComponentSource);
const workHeroSource = await readFile(resolve("src/components/works/WorkHero.astro"), "utf8");
const hasPublishedHeroResolver =
  /schema:\s*\(\{\s*image\s*\}\)\s*=>/u.test(worksContentConfig) &&
  /src:\s*image\(\),\s*role:\s*z\.literal\("hero"\)/u.test(worksContentConfig) &&
  /const src = image\.src\.src;/u.test(workHeroSource) &&
  !/import\.meta\.glob/u.test(workHeroSource);
const hasPublishedCatalogSource =
  /const publishedWorks = await getPublishedWorks\(\);/u.test(worksCatalogSource) &&
  /const publishedWorks = works\.filter\(/u.test(worksCatalogComponentSource) &&
  /const catalogWorks = \[\.\.\.curatedWorks, \.\.\.remainingWorks\];/u.test(worksCatalogComponentSource);
const curatedWorkSlugs = ["abythera", "ephemera", "daggerheart-item-bundle"];

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
const escapeHtml = (value) => value
  .replace(/&/gu, "&amp;")
  .replace(/</gu, "&lt;")
  .replace(/>/gu, "&gt;")
  .replace(/"/gu, "&quot;")
  .replace(/'/gu, "&#39;");

async function readWorks() {
  const files = await (await import("node:fs/promises")).readdir(worksDirectory, { withFileTypes: true });
  const entries = await Promise.all(
    files
      .filter((file) => file.isFile() && file.name.endsWith(".md"))
      .map(async (file) => {
        const contents = await readFile(resolve(worksDirectory, file.name), "utf8");
        const match = /^---\s*\r?\n([\s\S]*?)\r?\n---/u.exec(contents);

        if (!match) {
          throw new Error(`Missing YAML frontmatter in ${file.name}.`);
        }

        return load(match[1]);
      })
  );

  return entries;
}

async function readWorkAssets(directory = workAssetsDirectory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const paths = await Promise.all(entries.map(async (entry) => {
    const entryPath = resolve(directory, entry.name);

    if (entry.isDirectory()) {
      return readWorkAssets(entryPath);
    }

    return entry.isFile() ? [entryPath] : [];
  }));

  return paths.flat();
}

async function hashFile(filePath) {
  return createHash("sha256").update(await readFile(filePath)).digest("hex");
}

const works = await readWorks();
const publishedWorks = works.filter((work) => work.status === "published");
const unpublishedSlugs = [...works.filter((work) => work.status !== "published").map((work) => work.slug), "unknown-work"];

if (!hasReducedMotionFallback || !hasContainedHero || !hasCatalogHeroFrame) {
  throw new Error("Reduced-motion fallback, contained work-hero styling, or the 2:3 catalog hero frame is missing from the global styles.");
}

if (!hasConditionalEmptyState || !hasHeroOnlyCatalogSource || !hasPublishedHeroResolver || !hasPublishedCatalogSource) {
  throw new Error("The Works catalog is missing its published-only query, conditional empty state, hero resolver, or hero-only work-specific error handling.");
}

for (const page of pages) {
  const html = await readFile(resolve("dist", page), "utf8");
  const headingCount = (html.match(/<h1(?:\s[^>]*)?>/giu) ?? []).length;
  const hasSkipLink = /<a[^>]+href="#main-content"[^>]*>Skip to main content<\/a>/iu.test(html);
  const hasHeader = /<header(?:\s[^>]*)?>/iu.test(html);
  const hasMain = /<main(?:\s[^>]*)?>/iu.test(html);
  const hasFooter = /<footer(?:\s[^>]*)?>/iu.test(html);
  const hasCoreContent = /<main[^>]*>[\s\S]*?<p(?:\s[^>]*)?>/iu.test(html);
  const hasBrand = /<a[^>]+class="[^"]*\bbrand-link\b[^"]*"[^>]+href="\/"[^>]*>/iu.test(html);
  const hasMakerSeal = /<img[^>]+class="brand-seal"[^>]+alt=""[^>]*>/iu.test(html);
  const hasWorksLink = /<a[^>]+href="\/works"[^>]*>Works<\/a>/iu.test(html);
  const hasAboutLink = /<a[^>]+href="\/about"[^>]*>About<\/a>/iu.test(html);
  const hasKofiLink = /<a[^>]+href="https:\/\/ko-fi\.com\/talesbyxero"[^>]*>Ko-fi\s*<span[^>]*>\(external\)<\/span><\/a>/iu.test(html);
  const expectedCurrentPath = page === "index.html" ? "/" : `/${page.split("/")[0]}`;
  const hasActiveInternalLink = new RegExp(`<a[^>]+href="${expectedCurrentPath === "/" ? "\\/" : expectedCurrentPath}"[^>]+aria-current="page"[^>]*>`, "iu").test(html);
  const hasMobileMenu = /<details[^>]+class="mobile-navigation"[^>]*>[\s\S]*?<summary>Menu<\/summary>[\s\S]*?<a[^>]+href="\/works"[\s\S]*?<a[^>]+href="\/about"[\s\S]*?https:\/\/ko-fi\.com\/talesbyxero/iu.test(html);
  const hasNativeLink = /<a[^>]+href="\/(?:works|about)?"/iu.test(html);
  const hasNewTabTarget = /target="_blank"/iu.test(html);
  const hasClientScript = /<script(?:\s[^>]*)?>/iu.test(html);

  if (page === "about/index.html") {
    const hasPracticeStatement = /I have more than ten years of tabletop experience/iu.test(html);
    const hasOriginalWorkStatement = /writing and running original\s+adventures and campaigns/iu.test(html);
    const hasInPersonRefinementStatement = /My publications begin in play and are refined through in-person table sessions/iu.test(html);
    const hasAboutKofiLink = /<main\b[^>]*>[\s\S]*?<a[^>]+href="https:\/\/ko-fi\.com\/talesbyxero"[^>]*>Ko-fi\s*<span[^>]*>\(external\)<\/span><\/a>[\s\S]*?<\/main>/iu.test(html);

    if (!hasPracticeStatement || !hasOriginalWorkStatement || !hasInPersonRefinementStatement || !hasAboutKofiLink) {
      throw new Error("About practice or same-tab Ko-fi verification failed.");
    }
  }

  if (
    headingCount !== 1 ||
    !hasSkipLink ||
    !hasHeader ||
    !hasMain ||
    !hasFooter ||
    !hasCoreContent ||
    !hasNativeLink ||
    !hasBrand ||
    !hasMakerSeal ||
    !hasWorksLink ||
    !hasAboutLink ||
    !hasKofiLink ||
    !hasActiveInternalLink ||
    !hasMobileMenu ||
    hasClientScript ||
    hasNewTabTarget
  ) {
    throw new Error(`Static HTML verification failed for ${page}.`);
  }
}

const worksCatalogHtml = await readFile(resolve("dist", "works/index.html"), "utf8");
const worksCatalogMain = /<main\b[^>]*>([\s\S]*?)<\/main>/iu.exec(worksCatalogHtml)?.[1] ?? "";
const catalogTiles = [...worksCatalogMain.matchAll(/<a(?=[^>]*\bclass="[^"]*\bwork-catalog-tile\b[^"]*")(?=[^>]*\bhref="\/works\/([^"]+)")[^>]*>([\s\S]*?)<\/a>/gu)];
const catalogSlugs = catalogTiles.map(([, slug]) => slug);
const builtAssets = await readdir(resolve("dist", "_astro"));
const approvedHeroPaths = new Set(
  publishedWorks.flatMap((work) =>
    work.images
      .filter((image) => image.role === "hero")
      .map((image) => resolve(worksDirectory, image.src))
  )
);
const workAssets = await Promise.all((await readWorkAssets()).map(async (assetPath) => ({
  assetPath,
  hash: await hashFile(assetPath)
})));
const sourcePathsByHash = new Map();
for (const workAsset of workAssets) {
  const paths = sourcePathsByHash.get(workAsset.hash) ?? [];
  paths.push(workAsset.assetPath);
  sourcePathsByHash.set(workAsset.hash, paths);
}
const workAssetExtensions = new Set(workAssets.map(({ assetPath }) => parse(assetPath).ext.toLowerCase()));
const emittedWorkAssets = await Promise.all(
  builtAssets
    .filter((asset) => workAssetExtensions.has(parse(asset).ext.toLowerCase()))
    .map(async (asset) => ({ asset, hash: await hashFile(resolve("dist", "_astro", asset)) }))
);
const emittedUnapprovedWorkAssets = [];
const ambiguousEmittedWorkAssets = [];
for (const emittedAsset of emittedWorkAssets) {
  const sourcePaths = sourcePathsByHash.get(emittedAsset.hash);
  if (!sourcePaths) {
    continue;
  }

  const approvedPaths = sourcePaths.filter((assetPath) => approvedHeroPaths.has(assetPath));
  if (approvedPaths.length === 0) {
    emittedUnapprovedWorkAssets.push({
      asset: emittedAsset.asset,
      sourcePaths: sourcePaths.map((assetPath) => relative(workAssetsDirectory, assetPath).replace(/\\/gu, "/"))
    });
  } else if (approvedPaths.length !== sourcePaths.length) {
    ambiguousEmittedWorkAssets.push({
      asset: emittedAsset.asset,
      sourcePaths: sourcePaths.map((assetPath) => relative(workAssetsDirectory, assetPath).replace(/\\/gu, "/"))
    });
  }
}
const orderedPublishedSlugs = [
  ...curatedWorkSlugs.filter((slug) => publishedWorks.some((work) => work.slug === slug)),
  ...publishedWorks
    .map((work) => work.slug)
    .filter((slug) => !curatedWorkSlugs.includes(slug))
];
const catalogDetails = publishedWorks.map((work) => {
  const hero = work.images.find((image) => image.role === "hero");
  const tile = catalogTiles.find(([, slug]) => slug === work.slug);
  const tileMarkup = tile?.[2] ?? "";
  const heroFilename = parse(hero.src);
  const emittedHeroAsset = builtAssets.find((asset) => asset.startsWith(`${heroFilename.name}.`) && asset.endsWith(heroFilename.ext));
  const heroPattern = new RegExp(
    `<img(?=[^>]*\\bsrc="\\/_astro\\/${escapeRegExp(heroFilename.name)}\\.[^"]+${escapeRegExp(heroFilename.ext)}")(?=[^>]*\\balt="${escapeRegExp(escapeHtml(hero.alt))}")(?=[^>]*\\bloading="${catalogSlugs[0] === work.slug ? "eager" : "lazy"}")(?=[^>]*\\bfetchpriority="${catalogSlugs[0] === work.slug ? "high" : "auto"}")[^>]*>`,
    "u"
  );
  const typePattern = new RegExp(
    `<p(?=[^>]*\\bclass="[^"]*\\bwork-type-label\\b[^"]*")[^>]*>${escapeRegExp(typeLabels[work.type])}<\\/p>`,
    "u"
  );
  const heroIndex = tileMarkup.indexOf("work-catalog-media");
  const typeIndex = tileMarkup.search(typePattern);
  const titleIndex = tileMarkup.indexOf(`<h2>${escapeHtml(work.title)}</h2>`);
  const premiseIndex = tileMarkup.indexOf(`<p class="work-catalog-premise">${escapeHtml(work.premise)}</p>`);

  return {
    hasTile: Boolean(tile),
    hasEmittedHeroAsset: Boolean(emittedHeroAsset),
    hasHero: heroPattern.test(tileMarkup),
    hasSingleHero: (tileMarkup.match(/<img(?:\s[^>]*)?>/giu) ?? []).length === 1,
    hasSameTabLink: !/\btarget=/iu.test(tile?.[0] ?? ""),
    hasOrderedTileContent:
      heroIndex >= 0 &&
      typeIndex >= heroIndex &&
      titleIndex >= typeIndex &&
      premiseIndex >= titleIndex
  };
});
const hasUnpublishedCatalogContent = works
  .filter((work) => work.status !== "published")
  .some((work) =>
    worksCatalogMain.includes(`/works/${work.slug}`) ||
    (typeof work.title === "string" && worksCatalogMain.includes(escapeHtml(work.title)))
  );

if (
  catalogTiles.length !== publishedWorks.length ||
  catalogSlugs.join("|") !== orderedPublishedSlugs.join("|") ||
  catalogDetails.some((details) => Object.values(details).some((value) => !value)) ||
  hasUnpublishedCatalogContent ||
  emittedUnapprovedWorkAssets.length > 0 ||
  ambiguousEmittedWorkAssets.length > 0
) {
  throw new Error(
    `Works catalog static HTML verification failed: ${JSON.stringify({
      catalogSlugs,
      orderedPublishedSlugs,
      catalogDetails,
      hasUnpublishedCatalogContent,
      emittedUnapprovedWorkAssets,
      ambiguousEmittedWorkAssets
    })}.`
  );
}

for (const work of publishedWorks) {
  const page = `works/${work.slug}/index.html`;
  const html = await readFile(resolve("dist", page), "utf8");
  const hero = work.images.find((image) => image.role === "hero");
  const heroFilename = parse(hero.src);
  const builtAssets = await readdir(resolve("dist", "_astro"));
  const emittedHeroAsset = builtAssets.find((asset) => asset.startsWith(`${heroFilename.name}.`) && asset.endsWith(heroFilename.ext));
  const heroSourcePattern = new RegExp(
    `<img(?=[^>]*\\bsrc="\\/_astro\\/${escapeRegExp(heroFilename.name)}\\.[^"]+${escapeRegExp(heroFilename.ext)}")(?=[^>]*\\balt="${escapeRegExp(escapeHtml(hero.alt))}")(?=[^>]*\\bloading="lazy")[^>]*>`,
    "u"
  );
  const compatibilityPattern = new RegExp(
    `<span(?=[^>]*\\bclass="[^"]*\\bdaggerheart-compatibility\\b[^"]*")[^>]*>${escapeRegExp(escapeHtml(work.compatibility))}</span>`,
    "u"
  );
  const mainMarkup = /<main\b[^>]*>([\s\S]*?)<\/main>/iu.exec(html)?.[1] ?? "";
  const headingCount = (mainMarkup.match(/<h1(?:\s[^>]*)?>/giu) ?? []).length;
  const workImageCount = (mainMarkup.match(/<img(?:\s[^>]*)?>/giu) ?? []).length;
  const typeIndex = mainMarkup.indexOf(typeLabels[work.type]);
  const compatibilityIndex = mainMarkup.search(compatibilityPattern);
  const titleIndex = mainMarkup.indexOf(`<h1>${escapeHtml(work.title)}</h1>`);
  const premiseIndex = mainMarkup.indexOf(`<p class="work-premise">${escapeHtml(work.premise)}</p>`);
  const hookIndex = mainMarkup.indexOf(`<p class="work-hook">${escapeHtml(work.hook)}</p>`);
  const factsIndex = mainMarkup.indexOf("work-facts-strip");
  const heroIndex = mainMarkup.indexOf("work-hero");
  const hasMoment = typeof work.theMoment === "string" && work.theMoment.trim().length > 0;
  const momentHeadingIndex = hasMoment ? mainMarkup.indexOf("Inside") : -1;
  const momentIndex = hasMoment ? mainMarkup.indexOf(`<p>${escapeHtml(work.theMoment)}</p>`) : -1;
  const tableUseHeadingIndex = mainMarkup.indexOf("At the table");
  const tableUseIndex = mainMarkup.indexOf(`<p>${escapeHtml(work.tableUse)}</p>`);
  const authorsNoteHeadingIndex = mainMarkup.indexOf("A note from Xero");
  const authorsNoteIndex = mainMarkup.indexOf(`<p>${escapeHtml(work.authorsNote)}</p>`);
  const facts = [...mainMarkup.matchAll(/<div class="work-fact"><dt>([^<]+)<\/dt><dd>([^<]+)<\/dd><\/div>/giu)];
  const hasCanonicalFacts = facts.length === work.facts.length && facts.every(([match], index) => match === `<div class="work-fact"><dt>${escapeHtml(work.facts[index].label)}</dt><dd>${escapeHtml(work.facts[index].value)}</dd></div>`);
  const hasDescription = html.includes(`<meta name="description" content="${escapeHtml(work.seo.description)}">`);
  const seoTitle = work.seo.title.endsWith(" | Tales by Xero") ? work.seo.title : `${work.seo.title} | Tales by Xero`;
  const hasSeoTitle = html.includes(`<title>${escapeHtml(seoTitle)}</title>`);
  const hasDesktopActiveWorksLink = /<div class="desktop-navigation">[\s\S]*?<a[^>]+class="[^"]*\bnavigation-link\b[^"]*\bis-current\b[^"]*"[^>]+href="\/works"[^>]+aria-current="page"[^>]*>Works<\/a>/iu.test(html);
  const hasMobileActiveWorksLink = /<details[^>]+class="mobile-navigation"[^>]*>[\s\S]*?<a[^>]+class="[^"]*\bnavigation-link\b[^"]*\bis-current\b[^"]*"[^>]+href="\/works"[^>]+aria-current="page"[^>]*>Works<\/a>/iu.test(html);
  const hasHero = new RegExp(`<figure[^>]+class="work-hero"[^>]+style="--work-hero-aspect-ratio: ${escapeRegExp(String(hero.aspectRatio))}"[^>]*>[\\s\\S]*?${heroSourcePattern.source}`, "u").test(mainMarkup);
  const hasClientScript = /<script(?:\s[^>]*)?>/iu.test(html);

  const checks = {
    headingCount: headingCount === 1,
    hasDescription,
    hasSeoTitle,
    hasDesktopActiveWorksLink,
    hasMobileActiveWorksLink,
    hasHero,
    hasEmittedHeroAsset: Boolean(emittedHeroAsset),
    hasCompatibility: compatibilityIndex >= 0,
    hasCanonicalFacts,
    hasHeroOnlyMedia: workImageCount === 1,
    hasNoClientScript: !hasClientScript,
    hasOrderedContent:
      typeIndex >= 0 &&
      compatibilityIndex >= typeIndex &&
      titleIndex >= compatibilityIndex &&
      premiseIndex >= titleIndex &&
      hookIndex >= premiseIndex &&
      factsIndex >= hookIndex &&
       heroIndex >= factsIndex &&
       (!hasMoment || (momentHeadingIndex >= heroIndex && momentIndex >= momentHeadingIndex)) &&
       tableUseHeadingIndex >= (hasMoment ? momentIndex : heroIndex) &&
      tableUseIndex >= tableUseHeadingIndex &&
      authorsNoteHeadingIndex >= tableUseIndex &&
      authorsNoteIndex >= authorsNoteHeadingIndex
  };

  if (Object.values(checks).some((value) => !value)) {
    throw new Error(`Work-detail static HTML verification failed for ${page}: ${JSON.stringify(checks)}.`);
  }
}

for (const unpublishedSlug of unpublishedSlugs) {
  try {
    await access(resolve("dist", "works", unpublishedSlug, "index.html"));
    throw new Error(`Unpublished work route exists for ${unpublishedSlug}.`);
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Unpublished work route exists")) {
      throw error;
    }

    if (error?.code !== "ENOENT") {
      throw error;
    }
  }
}

console.log("Verified static routes, the published Works catalog, work details, shared navigation, active routes, Ko-fi, and no client scripts.");
