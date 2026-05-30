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
  // ── Hero slides (home page carousel) ──────────────────────
  {
    key: "hero_slides",
    title: "Hero Slides",
    description: "The rotating hero banner on the home page.",
    itemTitle: (d) => d.label || d.title,
    fields: [
      { name: "label", label: "Label (small text)", type: "text" },
      { name: "title", label: "Title (line breaks = \\n)", type: "textarea" },
      { name: "subtitle", label: "Subtitle", type: "textarea" },
      { name: "bg", label: "Background image URL", type: "image" },
    ],
    defaults: [
      { label: "Welcome Home", title: "Christ Kingdom\nSalvation Church", subtitle: "A non-profit Pentecostal church bringing all people to the saving knowledge of our Lord Jesus Christ.", bg: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1920&auto=format&fit=crop" },
      { label: "Join Us for Worship", title: "Experience the\nPower of God", subtitle: "Every Sunday we gather to worship, praise, and grow together in the Spirit.", bg: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=1920&auto=format&fit=crop" },
      { label: "Growing Together", title: "Building Faith,\nTransforming Lives", subtitle: "We exist to establish responsible, self-sustaining churches filled with committed, Spirit-filled Christians.", bg: "/ckspc-photos/3rdhero.png" },
    ],
  },
  // ── Stats strip (key numbers) ────────────────────────────
  {
    key: "stats",
    title: "Stats Strip",
    description: "The key-number strip below the welcome section on the home page.",
    itemTitle: (d) => `${d.number} — ${d.label}`,
    fields: [
      { name: "number", label: "Number / figure", type: "text" },
      { name: "label", label: "Label", type: "text" },
    ],
    defaults: [
      { number: "1994", label: "Founded" },
      { number: "5+", label: "Branches" },
      { number: "30+", label: "Years of Ministry" },
      { number: "1000+", label: "Members" },
    ],
  },
  // ── Services (worship schedule) ──────────────────────────
  {
    key: "services",
    title: "Services",
    description: "The service cards on the home page (Sunday Worship, Midweek, etc.).",
    itemTitle: (d) => d.title,
    fields: [
      { name: "title", label: "Service name", type: "text" },
      { name: "desc", label: "Description", type: "textarea" },
      { name: "time", label: "Day & time", type: "text" },
      { name: "img", label: "Photo URL", type: "image", optional: true },
    ],
    defaults: [
      { title: "Sunday Worship", desc: "Join us every Sunday morning for a powerful time of worship, praise, and the preaching of God's Word.", time: "Sundays 9:00 AM", img: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=700&auto=format&fit=crop" },
      { title: "Midweek Service", desc: "Recharge your spirit midweek with prayer, Bible study, and fellowship with other believers.", time: "Wednesdays 7:00 PM", img: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=700&auto=format&fit=crop" },
      { title: "Friday Prayer Meeting", desc: "A dedicated time of intercessory prayer and spiritual warfare to seek God's face together.", time: "Fridays 7:00 PM", img: "https://images.unsplash.com/photo-1545987796-200677ee1011?q=80&w=700&auto=format&fit=crop" },
      { title: "Women's Fellowship", desc: "Building strong women of faith through fellowship, Bible reading, and mutual encouragement.", time: "Wednesdays after Service", img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=700&auto=format&fit=crop" },
      { title: "Youth Ministry", desc: "Raising the next generation of Spirit-filled leaders through dynamic worship and mentorship.", time: "Saturdays 4:00 PM", img: "https://images.unsplash.com/photo-1523803326055-9729b9e02e5a?q=80&w=700&auto=format&fit=crop" },
      { title: "Special Programs", desc: "Weddings, conventions, revival meetings, and special celebrations throughout the year.", time: "As Announced", img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=700&auto=format&fit=crop" },
    ],
  },
  // ── Founder section ──────────────────────────────────────
  {
    key: "founder",
    title: "Founder",
    description: "The founder tribute section on the home page. Typically one item but can hold multiple figures.",
    itemTitle: (d) => d.name,
    fields: [
      { name: "name", label: "Full name", type: "text" },
      { name: "role", label: "Role / years", type: "text" },
      { name: "imageUrl", label: "Photo URL", type: "image", optional: true },
      { name: "bio1", label: "Bio paragraph 1", type: "textarea" },
      { name: "bio2", label: "Bio paragraph 2", type: "textarea", optional: true },
      { name: "bio3", label: "Bio paragraph 3", type: "textarea", optional: true },
      { name: "quote", label: "Quote", type: "textarea", optional: true },
    ],
    defaults: [
      { name: "Prophetess Beatrice Esther Afua Agyapomaa", role: "Founder & Leader (1929 – 2014)", imageUrl: "/ckspc-photos/97b65d_898e5de6fb484e80a4b783c59d8bc950.jpg", bio1: "Born on February 8, 1929 at Kwahu Tafo, Prophetess Beatrice Esther Afua Agyapomaa was converted to a saving knowledge of our Lord Jesus Christ and received a divine calling to ministry through Prophetess Paulina Agyekumwaa.", bio2: "By 1983, she had begun winning souls for Jesus Christ, starting with 37 converts. Through her unwavering faith and dedication, the Lord used her mightily for the conversion of souls and the outpouring of miracles. On March 20, 1994, God fulfilled His prophecy by giving the church its present name — Christ Kingdom Salvation Pentecostal Church.", bio3: "Under her guidance, the church witnessed immense growth spiritually and physically, expanding to multiple branches across Ghana. She faithfully served the Lord until her call to eternity on December 8, 2014.", quote: "“Nyame som yɛ kyen kyen soo soo” — The call to serve God is to suffer before gain." },
    ],
  },
  // ── Media videos (media page) ────────────────────────────
  {
    key: "media_videos",
    title: "Media Videos",
    description: "Video highlights shown on the Media & Gallery page.",
    itemTitle: (d) => d.title,
    fields: [
      { name: "title", label: "Title", type: "text" },
      { name: "label", label: "Category label", type: "text" },
      { name: "imageUrl", label: "Thumbnail URL", type: "image" },
      { name: "videoUrl", label: "Video URL (optional)", type: "text", optional: true },
    ],
    defaults: [
      { title: "The Power of Community Worship", label: "Sunday Service", imageUrl: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1200", videoUrl: "" },
      { title: "Easter Sunrise Celebration", label: "Special Event", imageUrl: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=800", videoUrl: "" },
      { title: "Youth Ministry Retreat", label: "Youth Program", imageUrl: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=800", videoUrl: "" },
    ],
  },
  // ── Media gallery photos ─────────────────────────────────
  {
    key: "media_gallery",
    title: "Media Gallery",
    description: "Photo gallery on the Media & Gallery page.",
    itemTitle: (d) => d.alt || d.imageUrl,
    fields: [
      { name: "imageUrl", label: "Photo URL", type: "image" },
      { name: "alt", label: "Description / alt text", type: "text" },
      { name: "category", label: "Category", type: "select", options: ["worship", "community"] },
    ],
    defaults: [
      { imageUrl: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=800", alt: "Worship gathering", category: "worship" },
      { imageUrl: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=800", alt: "Community prayer", category: "worship" },
      { imageUrl: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=800", alt: "Fellowship event", category: "community" },
      { imageUrl: "https://images.unsplash.com/photo-1523803326055-9729b9e02e5a?q=80&w=800", alt: "Church ceremony", category: "worship" },
      { imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800", alt: "Community outreach", category: "community" },
      { imageUrl: "https://images.unsplash.com/photo-1545987796-200677ee1011?q=80&w=800", alt: "Night worship", category: "worship" },
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
