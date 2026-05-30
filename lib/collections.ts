import { asc, eq } from "drizzle-orm";
import { db } from "./db";
import { contentItems, type ContentItem } from "./db/schema";

// ============================================================
// Editable website COLLECTIONS (lists) — leadership, ministries,
// gallery, etc. Each collection declares its editable fields and
// its default seed items. The same registry drives the admin
// editor UI, the seed, and the public fallbacks.
// ============================================================

export type FieldType = "text" | "textarea" | "image" | "select";

export type CollectionField = {
  name: string;
  label: string;
  type: FieldType;
  options?: string[]; // for select
  optional?: boolean;
};

export type CollectionDef = {
  key: string;
  title: string;
  description: string;
  /** Builds the short label shown for each item in the admin list. */
  itemTitle: (d: Record<string, string>) => string;
  fields: CollectionField[];
  defaults: Record<string, string>[];
};

const LEADERSHIP_TIERS = [
  "Presiding Leaders",
  "Branch Pastors",
  "Pastors",
  "Elders",
  "Deacons & Deaconesses",
];

export const COLLECTIONS: CollectionDef[] = [
  {
    key: "leadership",
    title: "Leadership",
    description: "The leadership team shown on the Leadership page, grouped by tier.",
    itemTitle: (d) => `${d.name}${d.tier ? ` · ${d.tier}` : ""}`,
    fields: [
      { name: "tier", label: "Tier", type: "select", options: LEADERSHIP_TIERS },
      { name: "name", label: "Full name", type: "text" },
      { name: "title", label: "Title / role", type: "text" },
      { name: "initials", label: "Initials (fallback avatar)", type: "text" },
      { name: "imageUrl", label: "Photo URL", type: "image", optional: true },
      { name: "branch", label: "Branch (optional)", type: "text", optional: true },
      { name: "description", label: "Short bio (optional)", type: "textarea", optional: true },
    ],
    defaults: [
      { tier: "Presiding Leaders", name: "Apostle Paul Kweku Paintsil", title: "Head of Church & Founder", initials: "PP", imageUrl: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1600&auto=format&fit=crop", branch: "", description: "Leading the body of Christ with apostolic vision and unwavering faith since the church's founding." },
      { tier: "Presiding Leaders", name: "Apostle John A. Appiah", title: "Presiding Apostle", initials: "JA", imageUrl: "https://images.unsplash.com/photo-1520975869018-54f1a0d7d34b?q=80&w=1600&auto=format&fit=crop", branch: "", description: "Shepherding the flock with wisdom and the gift of prophetic ministry." },
      { tier: "Presiding Leaders", name: "Presiding Elder Antwi", title: "Presiding Elder", initials: "EA", imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1600&auto=format&fit=crop", branch: "", description: "A pillar of counsel, prayer, and steadfast service to the body." },
      { tier: "Branch Pastors", name: "Pastor Emmanuel Mensah", title: "Branch Pastor", initials: "EM", imageUrl: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=1200&auto=format&fit=crop", branch: "Madina HQ", description: "" },
      { tier: "Branch Pastors", name: "Pastor David Owusu", title: "Branch Pastor", initials: "DO", imageUrl: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1200&auto=format&fit=crop", branch: "Danfa", description: "" },
      { tier: "Branch Pastors", name: "Pastor Grace Addo", title: "Branch Pastor", initials: "GA", imageUrl: "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=1200&auto=format&fit=crop", branch: "Abonya", description: "" },
      { tier: "Branch Pastors", name: "Pastor Michael Tetteh", title: "Branch Pastor", initials: "MT", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop", branch: "Tema", description: "" },
      { tier: "Branch Pastors", name: "Pastor Abigail Asante", title: "Branch Pastor", initials: "AA", imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop", branch: "Kasoa", description: "" },
      { tier: "Branch Pastors", name: "Pastor Samuel Boateng", title: "Branch Pastor", initials: "SB", imageUrl: "https://images.unsplash.com/photo-1541647376583-8934aaf3448a?q=80&w=1200&auto=format&fit=crop", branch: "Bawaleshie", description: "" },
      { tier: "Pastors", name: "Pastor Joseph Agyemang", title: "Pastor", initials: "JA", imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop", branch: "", description: "Teaching & discipleship." },
      { tier: "Pastors", name: "Pastor Rebecca Darko", title: "Pastor", initials: "RD", imageUrl: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1200&auto=format&fit=crop", branch: "", description: "Counseling & prayer." },
      { tier: "Pastors", name: "Pastor Daniel Asare", title: "Pastor", initials: "DA", imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1200&auto=format&fit=crop", branch: "", description: "Outreach & evangelism." },
      { tier: "Pastors", name: "Pastor Esther Bonsu", title: "Pastor", initials: "EB", imageUrl: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=1200&auto=format&fit=crop", branch: "", description: "Women & family ministry." },
      { tier: "Elders", name: "Elder Francis Osei", title: "Elder", initials: "FO", imageUrl: "", branch: "", description: "" },
      { tier: "Elders", name: "Elder Martha Adjei", title: "Elder", initials: "MA", imageUrl: "", branch: "", description: "" },
      { tier: "Elders", name: "Elder Benjamin Kwame", title: "Elder", initials: "BK", imageUrl: "", branch: "", description: "" },
      { tier: "Elders", name: "Elder Sarah Mensah", title: "Elder", initials: "SM", imageUrl: "", branch: "", description: "" },
      { tier: "Deacons & Deaconesses", name: "Deacon Peter Nkrumah", title: "Deacon", initials: "PN", imageUrl: "", branch: "", description: "" },
      { tier: "Deacons & Deaconesses", name: "Deaconess Agnes Asiedu", title: "Deaconess", initials: "AA", imageUrl: "", branch: "", description: "" },
      { tier: "Deacons & Deaconesses", name: "Deacon Isaac Amankwah", title: "Deacon", initials: "IA", imageUrl: "", branch: "", description: "" },
      { tier: "Deacons & Deaconesses", name: "Deaconess Comfort Afia", title: "Deaconess", initials: "CA", imageUrl: "", branch: "", description: "" },
    ],
  },
  {
    key: "ministries",
    title: "Ministries",
    description: "The ministry cards on the Ministries page. Items with a photo render as image cards; without, as icon cards.",
    itemTitle: (d) => d.title,
    fields: [
      { name: "title", label: "Ministry name", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "imageUrl", label: "Background photo URL (optional)", type: "image", optional: true },
      { name: "label", label: "Tag label (optional, e.g. NEXT GEN)", type: "text", optional: true },
      { name: "buttonText", label: "Button text (optional)", type: "text", optional: true },
    ],
    defaults: [
      { title: "Youth Ministry", description: "Empowering the next generation to lead with faith, compassion, and unwavering purpose.", imageUrl: "https://images.unsplash.com/photo-1523803326055-9729b9e02e5a?q=80&w=1200&auto=format&fit=crop", label: "NEXT GEN", buttonText: "Join the Movement" },
      { title: "Women of Grace", description: "Cultivating strength, sisterhood, and spiritual depth.", imageUrl: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=800&auto=format&fit=crop", label: "", buttonText: "" },
      { title: "Men of Valor", description: "Building steadfast leaders grounded in Biblical truth.", imageUrl: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=800&auto=format&fit=crop", label: "", buttonText: "" },
      { title: "Children's Ministry", description: "Planting seeds of faith in a safe, joyous environment.", imageUrl: "", label: "", buttonText: "" },
      { title: "Worship & Arts", description: "Expressing devotion through music, media, and creative arts.", imageUrl: "", label: "", buttonText: "" },
    ],
  },
  {
    key: "gallery",
    title: "Gallery",
    description: "The scrolling photo strip on the home page.",
    itemTitle: (d) => d.caption || d.imageUrl,
    fields: [
      { name: "imageUrl", label: "Photo URL", type: "image" },
      { name: "caption", label: "Caption (optional)", type: "text", optional: true },
    ],
    defaults: [
      { imageUrl: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=600&auto=format&fit=crop", caption: "" },
      { imageUrl: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=600&auto=format&fit=crop", caption: "" },
      { imageUrl: "https://images.unsplash.com/photo-1545987796-200677ee1011?q=80&w=600&auto=format&fit=crop", caption: "" },
      { imageUrl: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=600&auto=format&fit=crop", caption: "" },
      { imageUrl: "https://images.unsplash.com/photo-1523803326055-9729b9e02e5a?q=80&w=600&auto=format&fit=crop", caption: "" },
      { imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop", caption: "" },
    ],
  },
];

export function getCollectionDef(key: string): CollectionDef | undefined {
  return COLLECTIONS.find((c) => c.key === key);
}

/** Admin: full rows (id, sort, visible, data) ordered by sort. */
export async function getCollectionRows(key: string): Promise<ContentItem[]> {
  try {
    return await db
      .select()
      .from(contentItems)
      .where(eq(contentItems.collection, key))
      .orderBy(asc(contentItems.sort), asc(contentItems.id));
  } catch {
    return [];
  }
}

/**
 * Public: just the visible items' data arrays, ordered.
 * Falls back to the collection defaults if the DB is empty/unreachable,
 * so public pages never render blank.
 */
export async function getCollectionItems(key: string): Promise<Record<string, string>[]> {
  const def = getCollectionDef(key);
  const rows = await getCollectionRows(key);
  if (rows.length === 0) return def ? def.defaults : [];
  return rows.filter((r) => r.visible).map((r) => r.data);
}
