import { asc, desc, eq } from "drizzle-orm";
import { db } from "./db";
import { branches, type Branch } from "./db/schema";

export type { Branch };

export const BRANCH_TIERS = [
  "Main Campus",
  "Full Branch",
  "Outpost",
  "Cell Group",
] as const;

/**
 * All branches for the public directory + admin list.
 * HQ first, then by name. Safe to call from server components;
 * returns [] if the DB is unreachable so the site still renders.
 */
export async function getBranches(): Promise<Branch[]> {
  try {
    return await db
      .select()
      .from(branches)
      .orderBy(desc(branches.isHq), asc(branches.name));
  } catch {
    return [];
  }
}

export async function getBranchBySlug(slug: string): Promise<Branch | null> {
  try {
    const [row] = await db.select().from(branches).where(eq(branches.slug, slug));
    return row ?? null;
  } catch {
    return null;
  }
}

/** Turn a branch name into a URL-safe slug. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

/** A maps link for the "Get Directions" button. */
export function mapsUrl(b: Pick<Branch, "name" | "address" | "area">): string {
  const q = [b.name, b.address, b.area].filter(Boolean).join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}
