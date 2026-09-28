import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const pages = ["index.html", "works/index.html", "about/index.html"];
const globalStyles = await readFile(resolve("src/styles/global.css"), "utf8");
const hasReducedMotionFallback = /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?animation-duration:\s*0\.01ms\s*!important;/iu.test(globalStyles);

if (!hasReducedMotionFallback) {
  throw new Error("Reduced-motion fallback is missing from the global shell styles.");
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

console.log("Verified static routes, shared navigation, active routes, Ko-fi, and no client scripts.");
