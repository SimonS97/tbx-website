import { existsSync, lstatSync, realpathSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import { dirname, relative, resolve, sep } from "node:path";
import process from "node:process";
import { URL, fileURLToPath } from "node:url";
import { load } from "js-yaml";
import sharp from "sharp";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const worksDirectory = resolve(projectRoot, "src/content/works");
const assetsDirectory = resolve(projectRoot, "src/assets/works");
const validRoles = new Set(["hero", "gallery", "vibe", "evidence"]);
const kebabCase = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;
// Allows ratios rounded to three decimal places while rejecting material metadata drift.
const aspectRatioTolerance = 0.0005;

function hasText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function sourcePath(work, image) {
  if (typeof image.src !== "string") {
    return null;
  }

  if (image.src.startsWith("src/") || image.src.startsWith("src\\")) {
    return resolve(projectRoot, image.src);
  }

  return resolve(dirname(work.filePath), image.src);
}

function requirePublishedText(errors, work, field) {
  if (!hasText(work.data[field])) {
    errors.push(`${work.label}: published works require ${field}.`);
  }
}

function requirePublishedObject(errors, work, field) {
  if (work.data[field] === null || typeof work.data[field] !== "object") {
    errors.push(`${work.label}: published works require ${field}.`);
  }
}

export function getPublishedEntries(works) {
  return works.filter((work) => work.data.status === "published");
}

function getAssetInfo(assetPath, expectedAssetDirectory) {
  try {
    const realAssetPath = realpathSync(assetPath);
    const realAssetDirectory = realpathSync(expectedAssetDirectory) + sep;
    const realAssetsDirectory = realpathSync(assetsDirectory) + sep;

    return {
      exists: true,
      isRegularFile: lstatSync(assetPath).isFile(),
      isOwnedByWork:
        lstatSync(expectedAssetDirectory).isDirectory() &&
        !lstatSync(expectedAssetDirectory).isSymbolicLink() &&
        realAssetPath.startsWith(realAssetDirectory) &&
        realAssetPath.startsWith(realAssetsDirectory)
    };
  } catch {
    return { exists: false, isRegularFile: false, isOwnedByWork: false };
  }
}

export function validateWorks(works, { assetInfo = getAssetInfo } = {}) {
  const errors = [];
  const bySlug = new Map();

  for (const work of works) {
    const { data } = work;
    const filename = work.filePath ? work.filePath.split(/[\\/]/u).pop().replace(/\.md$/iu, "") : null;

    if (!kebabCase.test(data.slug ?? "")) {
      errors.push(`${work.label}: slug must be kebab-case.`);
    }

    if (filename !== null && filename !== data.slug) {
      errors.push(`${work.label}: filename stem must match slug ${data.slug}.`);
    }

    if (bySlug.has(data.slug)) {
      errors.push(`${work.label}: duplicate slug ${data.slug}.`);
    } else {
      bySlug.set(data.slug, work);
    }
  }

  for (const work of getPublishedEntries(works)) {
    const { data } = work;
    const expectedAssetDirectory = resolve(projectRoot, "src/assets/works", data.slug);

    for (const field of [
      "title",
      "compatibility",
      "premise",
      "hook",
       "tableUse",
      "authorsNote",
      "externalUrl",
      "nextWork"
    ]) {
      requirePublishedText(errors, work, field);
    }

    requirePublishedObject(errors, work, "seo");

    if (!Array.isArray(data.facts) || data.facts.length === 0) {
      errors.push(`${work.label}: published works require at least one fact.`);
    }

    if (!Array.isArray(data.images) || data.images.length === 0) {
      errors.push(`${work.label}: published works require at least one image.`);
    } else {
      const heroCount = data.images.filter((image) => image?.role === "hero").length;
      if (heroCount !== 1) {
        errors.push(`${work.label}: published works require exactly one hero image.`);
      }

      for (const image of data.images) {
        if (!image || !validRoles.has(image.role) || !hasText(image.alt)) {
          errors.push(`${work.label}: every image needs an allowed role and contextual alt text.`);
        }

        const assetPath = image ? sourcePath(work, image) : null;
        if (assetPath === null || !assetPath.startsWith(expectedAssetDirectory + sep)) {
          errors.push(`${work.label}: image ${image?.src ?? "(missing)"} must belong to src/assets/works/${data.slug}/.`);
          continue;
        }

        const asset = assetInfo(assetPath, expectedAssetDirectory);
        if (!asset.exists) {
          errors.push(`${work.label}: image ${image.src} does not exist.`);
        } else if (!asset.isRegularFile || !asset.isOwnedByWork) {
          errors.push(`${work.label}: image ${image.src} must be a regular file owned by src/assets/works/${data.slug}/.`);
        }
      }
    }

    try {
      const url = new URL(data.externalUrl);
      if (url.protocol !== "https:" || !/(^|\.)drivethrurpg\.com$/iu.test(url.hostname)) {
        errors.push(`${work.label}: externalUrl must be an HTTPS DriveThruRPG URL.`);
      }
    } catch {
      errors.push(`${work.label}: externalUrl must be a valid URL.`);
    }

    const nextWork = bySlug.get(data.nextWork);
    if (data.nextWork === data.slug) {
      errors.push(`${work.label}: nextWork cannot reference itself.`);
    } else if (!nextWork || nextWork.data.status !== "published") {
      errors.push(`${work.label}: nextWork must reference another published work.`);
    }

    if (data.discovery) {
      const expectedType = {
        "one-shot": "one-shot",
        campaign: "campaign-framework",
        table: "item-bundle"
      }[data.discovery.route];

      if (data.type !== expectedType) {
        errors.push(`${work.label}: discovery.route ${data.discovery.route} requires type ${expectedType}.`);
      }

      if (
        data.discovery.route === "one-shot" &&
        (!hasText(data.discovery.vibe?.label) || !hasText(data.discovery.vibe?.hook))
      ) {
        errors.push(`${work.label}: discovery.route one-shot requires a complete vibe object.`);
      }

      if (data.discovery.route === "one-shot" && !kebabCase.test(data.discovery.vibe?.id ?? "")) {
        errors.push(`${work.label}: discovery.route one-shot requires a kebab-case vibe.id.`);
      }

      if (
        data.discovery.route === "one-shot" &&
        (!Number.isInteger(data.discovery.vibe?.order) || data.discovery.vibe.order <= 0)
      ) {
        errors.push(`${work.label}: discovery.route one-shot requires a positive integer vibe.order.`);
      }

      if (data.discovery.route !== "one-shot" && data.discovery.vibe !== undefined) {
        errors.push(`${work.label}: only discovery.route one-shot may define vibe.`);
      }
    }

    if (data.includedWith) {
      const includedTarget = bySlug.get(data.includedWith.work);
      if (includedTarget?.data.slug === data.slug) {
        errors.push(`${work.label}: includedWith.work cannot reference itself.`);
      } else if (!includedTarget || includedTarget.data.status !== "published") {
        errors.push(`${work.label}: includedWith.work must reference a published work.`);
      }
    }

    if (data.campaignRelation) {
      const campaignTarget = bySlug.get(data.campaignRelation.work);
      if (campaignTarget?.data.slug === data.slug) {
        errors.push(`${work.label}: campaignRelation.work cannot reference itself.`);
      } else if (!campaignTarget || campaignTarget.data.status !== "published" || campaignTarget.data.type !== "campaign-framework") {
        errors.push(`${work.label}: campaignRelation.work must reference a published campaign framework.`);
      }
    }
  }

  return errors;
}

async function getImageMetadata(assetPath) {
  return sharp(assetPath, { failOn: "error" }).metadata();
}

async function decodeImage(assetPath) {
  // Raw output requires sharp to decode the entire source rather than only read headers.
  await sharp(assetPath, { failOn: "error" }).raw().toBuffer();
}

export async function validatePublishedImages(
  works,
  { getImageMetadata: inspectMetadata = getImageMetadata, decodeImage: fullyDecodeImage = decodeImage } = {}
) {
  const errors = [];

  for (const work of getPublishedEntries(works)) {
    const expectedAssetDirectory = resolve(projectRoot, "src/assets/works", work.data.slug);

    if (!Array.isArray(work.data.images)) {
      continue;
    }

    for (const image of work.data.images) {
      const assetPath = image ? sourcePath(work, image) : null;
      if (assetPath === null || !assetPath.startsWith(expectedAssetDirectory + sep)) {
        continue;
      }

      try {
        const metadata = await inspectMetadata(assetPath);
        await fullyDecodeImage(assetPath);

        if (!Number.isInteger(metadata.width) || metadata.width <= 0 || !Number.isInteger(metadata.height) || metadata.height <= 0) {
          errors.push(`${work.label}: image ${image.src} has no valid intrinsic dimensions.`);
          continue;
        }

        if (image.width !== undefined && image.width !== metadata.width) {
          errors.push(`${work.label}: image ${image.src} width ${image.width} does not match intrinsic width ${metadata.width}.`);
        }

        if (image.height !== undefined && image.height !== metadata.height) {
          errors.push(`${work.label}: image ${image.src} height ${image.height} does not match intrinsic height ${metadata.height}.`);
        }

        if (image.aspectRatio !== undefined) {
          if (!Number.isFinite(image.aspectRatio)) {
            errors.push(`${work.label}: image ${image.src} aspectRatio must be a finite number.`);
          } else {
            const intrinsicAspectRatio = metadata.width / metadata.height;
            if (Math.abs(image.aspectRatio - intrinsicAspectRatio) > aspectRatioTolerance) {
              errors.push(`${work.label}: image ${image.src} aspectRatio ${image.aspectRatio} does not match intrinsic ratio ${intrinsicAspectRatio.toFixed(6)} within tolerance ${aspectRatioTolerance}.`);
            }
          }
        }
      } catch {
        errors.push(`${work.label}: image ${image?.src ?? "(missing)"} could not be fully decoded.`);
      }
    }
  }

  return errors;
}

async function findMarkdownFiles(directory) {
  if (!existsSync(directory)) {
    return [];
  }

  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve(directory, entry.name);
      return entry.isDirectory()
        ? findMarkdownFiles(entryPath)
        : entry.isFile() && entry.name.endsWith(".md")
          ? [entryPath]
          : [];
    })
  );

  return files.flat();
}

async function readWorks() {
  const files = await findMarkdownFiles(worksDirectory);
  const works = [];

  for (const filePath of files) {
    if (dirname(filePath) !== worksDirectory) {
      throw new Error(`${relative(projectRoot, filePath)}: Work files must lie directly in src/content/works/.`);
    }

    const contents = await readFile(filePath, "utf8");
    const match = /^---\s*\r?\n([\s\S]*?)\r?\n---/u.exec(contents);

    if (!match) {
      throw new Error(`${relative(projectRoot, filePath)}: missing YAML frontmatter.`);
    }

    works.push({
      label: relative(projectRoot, filePath),
      filePath,
      data: load(match[1]) ?? {}
    });
  }

  return works;
}

async function main() {
  const works = await readWorks();
  const errors = [...validateWorks(works), ...(await validatePublishedImages(works))];

  if (errors.length > 0) {
    throw new Error(`Works validation failed:\n- ${errors.join("\n- ")}`);
  }

  console.log("Validated Works collection publication rules.");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await main();
}
