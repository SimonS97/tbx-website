import { getCollection, type CollectionEntry } from "astro:content";

export type Work = CollectionEntry<"works">;
export type WorkType = Work["data"]["type"];

export const workTypeLabels: Record<WorkType, string> = {
  "one-shot": "One-shot",
  "campaign-framework": "Campaign framework",
  "item-bundle": "Item bundle"
};

export type PublishedWork = Work & {
  data: Work["data"] & {
    status: "published";
    title: string;
    compatibility: string;
    premise: string;
    hook: string;
    facts: Array<{ label: string; value: string }>;
    images: Array<{
      src: string;
      alt: string;
      role: "hero" | "gallery" | "vibe" | "evidence";
      width?: number;
      height?: number;
      aspectRatio?: number;
    }>;
    externalUrl: string;
    theMoment: string;
    tableUse: string;
    authorsNote: string;
    nextWork: string;
    discovery?:
      | { route: "one-shot"; order: number; vibe: { label: string; hook: string } }
      | { route: "campaign" | "table"; order: number };
    includedWith?: { work: string; label: string; notice: string };
    campaignRelation?: { work: string; label: string; standalone: boolean };
    seo: { title: string; description: string };
  };
};

/** Returns the only collection entries that public routes may render. */
export async function getPublishedWorks(): Promise<PublishedWork[]> {
  const works = await getCollection("works", ({ data }) => data.status === "published");

  return works as PublishedWork[];
}
