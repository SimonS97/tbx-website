import assert from "node:assert/strict";
import { resolve } from "node:path";
import process from "node:process";
import { getPublishedEntries, validatePublishedImages, validateWorks } from "./validate-works.mjs";

const root = process.cwd();

function work(slug, overrides = {}) {
  return {
    label: `${slug}.md`,
    filePath: resolve(root, "src/content/works", `${slug}.md`),
    data: {
      slug,
      status: "published",
      title: slug,
      type: "campaign-framework",
      compatibility: "Daggerheart",
      premise: "A verified premise.",
      hook: "A verified hook.",
      facts: [{ label: "Format", value: "PDF" }],
      images: [
        {
          src: `../../assets/works/${slug}/hero.jpg`,
          alt: `Context for ${slug}.`,
          role: "hero",
          width: 1600,
          height: 900
        }
      ],
      externalUrl: `https://www.drivethrurpg.com/product/${slug}`,
      theMoment: "A spoiler-safe moment.",
      tableUse: "A concrete table use.",
      authorsNote: "A concise note.",
      nextWork: slug === "first-work" ? "second-work" : "first-work",
      discovery: {
        route: "campaign",
        order: 1
      },
      seo: { title: slug, description: "A search description." },
      ...overrides
    }
  };
}

function errorsFor(works) {
  return validateWorks(works, {
    assetInfo: () => ({ exists: true, isRegularFile: true, isOwnedByWork: true })
  });
}

const validCycle = [work("first-work"), work("second-work")];
assert.deepEqual(errorsFor(validCycle), [], "a published recommendation cycle is valid");

const withoutDiscovery = [
  work("discovery-free", { discovery: undefined, nextWork: "first-work" }),
  work("first-work", { nextWork: "discovery-free" })
];
assert.deepEqual(errorsFor(withoutDiscovery), [], "published works may omit optional discovery");

const withoutMoment = [
  work("moment-free", { theMoment: undefined, nextWork: "first-work" }),
  work("first-work", { nextWork: "moment-free" })
];
assert.deepEqual(errorsFor(withoutMoment), [], "published works may omit an optional inside section");

const validIncludedWith = [
  work("included-work", {
    includedWith: {
      work: "first-work",
      label: "Included with First Work",
      notice: "Owners of First Work do not need to purchase this separately."
    },
    nextWork: "first-work"
  }),
  work("first-work", { nextWork: "included-work" })
];
assert.deepEqual(errorsFor(validIncludedWith), [], "a published work may reference its published inclusion relationship");

const missingNextWork = [work("missing-next-work", { nextWork: "absent-work" })];
assert.match(
  errorsFor(missingNextWork).join("\n"),
  /nextWork must reference another published work/u,
  "a published work cannot point its next-work route at a missing work"
);

const draft = work("draft-work", {
  status: "draft",
  facts: [],
  images: [],
  externalUrl: "not a URL",
  nextWork: "missing-work"
});
assert.deepEqual(errorsFor([draft]), [], "drafts do not require publication data");
assert.deepEqual(getPublishedEntries([draft]), [], "drafts are excluded from published entries");

const invalidPublication = [
  work("invalid-work", {
    images: [
      { src: "../../assets/works/other-work/hero.jpg", alt: "", role: "hero", width: 1600, height: 900 },
      { src: "../../assets/works/invalid-work/second.jpg", alt: "Second image.", role: "hero", width: 1600, height: 900 }
    ],
    externalUrl: "http://example.com/product",
    nextWork: "invalid-work",
    discovery: { route: "table", order: 1 },
    includedWith: { work: "draft-work", label: "Included", notice: "A notice." },
    campaignRelation: { work: "missing-work", label: "Campaign", standalone: true }
  }),
  draft
];
const invalidErrors = errorsFor(invalidPublication).join("\n");
for (const expectedError of [
  "exactly one hero image",
  "must belong to src/assets/works/invalid-work/",
  "contextual alt text",
  "HTTPS DriveThruRPG URL",
  "cannot reference itself",
  "includedWith.work must reference a published work",
  "campaignRelation.work must reference a published campaign framework"
]) {
  assert.match(invalidErrors, new RegExp(expectedError, "u"));
}

const oneShotWithoutVibe = [
  work("one-shot", { type: "one-shot", discovery: { route: "one-shot", order: 1 } }),
  work("first-work")
];
assert.match(errorsFor(oneShotWithoutVibe).join("\n"), /discovery\.route one-shot requires a complete vibe object/u);

const validOneShot = [
  work("one-shot", {
    type: "one-shot",
    discovery: {
      route: "one-shot",
      order: 1,
      vibe: { id: "tense", order: 1, label: "Tense", hook: "A tense session." }
    }
  }),
  work("first-work", { nextWork: "one-shot" })
];
assert.deepEqual(errorsFor(validOneShot), [], "a typed one-shot discovery entry is valid");

const invalidVibe = [
  work("invalid-vibe", {
    type: "one-shot",
    discovery: {
      route: "one-shot",
      order: 1,
      vibe: { id: "Not kebab case", order: 0, label: "Tense", hook: "A tense session." }
    }
  }),
  work("first-work", { nextWork: "invalid-vibe" })
];
const invalidVibeErrors = errorsFor(invalidVibe).join("\n");
assert.match(invalidVibeErrors, /requires a kebab-case vibe\.id/u);
assert.match(invalidVibeErrors, /requires a positive integer vibe\.order/u);

const invalidDiscoveryType = [
  work("wrong-discovery", { discovery: { route: "table", order: 1 } }),
  work("first-work", { nextWork: "wrong-discovery" })
];
assert.match(errorsFor(invalidDiscoveryType).join("\n"), /discovery\.route table requires type item-bundle/u);

const selfRelations = [
  work("self-work", {
    nextWork: "first-work",
    includedWith: { work: "self-work", label: "Included", notice: "A notice." },
    campaignRelation: { work: "self-work", label: "Campaign", standalone: true }
  }),
  work("first-work", { nextWork: "self-work" })
];
const selfRelationErrors = errorsFor(selfRelations).join("\n");
for (const expectedError of [
  "includedWith.work cannot reference itself",
  "campaignRelation.work cannot reference itself"
]) {
  assert.match(selfRelationErrors, new RegExp(expectedError, "u"));
}

const nonRegularAsset = validateWorks([work("asset-work"), work("first-work", { nextWork: "asset-work" })], {
  assetInfo: () => ({ exists: true, isRegularFile: false, isOwnedByWork: false })
}).join("\n");
assert.match(nonRegularAsset, /must be a regular file owned by src\/assets\/works\/asset-work\//u);

const validImageMetadata = work("image-metadata", {
  images: [{
    src: "../../assets/works/image-metadata/hero.jpg",
    alt: "Context for image metadata.",
    role: "hero",
    width: 1600,
    height: 900,
    aspectRatio: 16 / 9
  }]
});
const inspectedPaths = [];
const decodedPaths = [];
assert.deepEqual(
  await validatePublishedImages([validImageMetadata], {
    getImageMetadata: async (assetPath) => {
      inspectedPaths.push(assetPath);
      return { width: 1600, height: 900 };
    },
    decodeImage: async (assetPath) => {
      decodedPaths.push(assetPath);
    }
  }),
  [],
  "matching declared dimensions and ratio pass image inspection"
);
assert.deepEqual(decodedPaths, inspectedPaths, "every inspected image is fully decoded");

const aspectRatioMismatch = await validatePublishedImages([
  work("ratio-mismatch", {
    images: [{
      src: "../../assets/works/ratio-mismatch/hero.jpg",
      alt: "Context for a mismatched ratio.",
      role: "hero",
      aspectRatio: 1.5
    }]
  })
], {
  getImageMetadata: async () => ({ width: 1600, height: 900 }),
  decodeImage: async () => undefined
});
assert.match(aspectRatioMismatch.join("\n"), /aspectRatio 1\.5 does not match intrinsic ratio/u);

const unreadableImage = await validatePublishedImages([
  work("unreadable-image")
], {
  getImageMetadata: async () => ({ width: 1600, height: 900 }),
  decodeImage: async () => {
    throw new Error("Unreadable fixture image.");
  }
});
assert.match(unreadableImage.join("\n"), /could not be fully decoded/u);

console.log("Validated Works fixtures: draft gating, valid references, image inspection, invalid publication, and recommendation cycles.");
