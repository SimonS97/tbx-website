import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a kebab-case slug.");
const nonEmptyText = z.string().trim().min(1);
const discovery = z.discriminatedUnion("route", [
  z.object({
    route: z.literal("one-shot"),
    order: z.number().int().positive(),
    vibe: z.object({
      id: slug,
      order: z.number().int().positive(),
      label: nonEmptyText,
      hook: nonEmptyText
    })
  }),
  z.object({ route: z.literal("campaign"), order: z.number().int().positive() }),
  z.object({ route: z.literal("table"), order: z.number().int().positive() })
]);

const works = defineCollection({
  loader: glob({
    base: "./src/content/works",
    pattern: "*.md"
  }),
  schema: z.object({
    slug,
    status: z.enum(["draft", "published"]),
    title: nonEmptyText.optional(),
    type: z.enum(["one-shot", "campaign-framework", "item-bundle"]),
    compatibility: nonEmptyText.optional(),
    premise: nonEmptyText.optional(),
    hook: nonEmptyText.optional(),
    facts: z.array(z.object({ label: nonEmptyText, value: nonEmptyText })).min(1).optional(),
    images: z
      .array(
        z
          .object({
            src: nonEmptyText,
            alt: nonEmptyText,
            role: z.enum(["hero", "gallery", "vibe", "evidence"]),
            width: z.number().int().positive().optional(),
            height: z.number().int().positive().optional(),
            aspectRatio: z.number().positive().optional()
          })
          .refine(
            (image) =>
              (image.width !== undefined && image.height !== undefined) || image.aspectRatio !== undefined,
            "An image needs dimensions or an aspect ratio."
          )
      )
      .min(1)
      .optional(),
    externalUrl: z.url().refine(
      (value) => {
        const url = new URL(value);
        return url.protocol === "https:" && /(^|\.)drivethrurpg\.com$/iu.test(url.hostname);
      },
      "Use an HTTPS DriveThruRPG URL."
    ).optional(),
    theMoment: nonEmptyText.optional(),
    tableUse: nonEmptyText.optional(),
    authorsNote: nonEmptyText.optional(),
    nextWork: slug.optional(),
    discovery: discovery.optional(),
    includedWith: z
      .object({
        work: slug,
        label: nonEmptyText,
        notice: nonEmptyText
      })
      .optional(),
    campaignRelation: z
      .object({
        work: slug,
        label: nonEmptyText,
        standalone: z.boolean()
      })
      .optional(),
    seo: z.object({ title: nonEmptyText, description: nonEmptyText }).optional()
  })
});

export const collections = { works };
