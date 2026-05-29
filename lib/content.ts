import { eq } from "drizzle-orm";
import { db } from "./db";
import { siteContent } from "./db/schema";

// ============================================================
// Editable website content — single source of truth.
//
// Each home section declares its editable fields (for the admin
// form) and its default copy (used when no DB row exists, and as
// the seed). Public components merge DB data over these defaults,
// so the site always renders even before anything is edited.
// ============================================================

export type FieldType = "text" | "textarea";

export type SectionField = {
  name: string;
  label: string;
  type: FieldType;
};

export type SectionSchema = {
  key: string;
  title: string;
  description: string;
  fields: SectionField[];
  defaults: Record<string, string>;
};

export const HOME_SECTIONS: SectionSchema[] = [
  {
    key: "welcome",
    title: "Welcome",
    description: "The intro block under the hero.",
    fields: [
      { name: "label", label: "Eyebrow label", type: "text" },
      { name: "title", label: "Heading", type: "textarea" },
      { name: "body", label: "Paragraph", type: "textarea" },
    ],
    defaults: {
      label: "Welcome to CKSPC",
      title: "Bringing All People to the Saving Knowledge of Christ",
      body: "Christ Kingdom Salvation Pentecostal Church is a non-profit Pentecostal church headquartered in Accra, Ghana. We exist to bring all people everywhere to the saving knowledge of our Lord Jesus Christ through the proclamation of the gospel, the planting of churches and the equipping of believers for every God-glorifying service.",
    },
  },
  {
    key: "vision_mission",
    title: "Vision & Mission",
    description: "The two-block vision/mission band.",
    fields: [
      { name: "visionLabel", label: "Vision label", type: "text" },
      { name: "visionTitle", label: "Vision heading", type: "textarea" },
      { name: "visionBody", label: "Vision text", type: "textarea" },
      { name: "missionLabel", label: "Mission label", type: "text" },
      { name: "missionTitle", label: "Mission heading", type: "textarea" },
      { name: "missionBody", label: "Mission text", type: "textarea" },
    ],
    defaults: {
      visionLabel: "Our Vision",
      visionTitle: "A Global Pentecostal Church That Is Culturally Relevant",
      visionBody:
        "To become a global Pentecostal church that is culturally relevant in vibrant evangelism, church planting, discipleship and holistic ministry.",
      missionLabel: "Our Mission",
      missionTitle: "Establishing Responsible & Self-Sustaining Churches",
      missionBody:
        "We exist to establish responsible and self-sustaining churches filled with committed, Spirit-filled Christians of character, who will impact their communities.",
    },
  },
  {
    key: "connect_cta",
    title: "Connect / Plan a Visit",
    description: "The closing call-to-action band.",
    fields: [
      { name: "label", label: "Eyebrow label", type: "text" },
      { name: "title", label: "Heading", type: "textarea" },
      { name: "body", label: "Paragraph", type: "textarea" },
      { name: "primaryLabel", label: "Primary button text", type: "text" },
      { name: "primaryHref", label: "Primary button link", type: "text" },
      { name: "secondaryLabel", label: "Secondary button text", type: "text" },
      { name: "secondaryHref", label: "Secondary button link", type: "text" },
    ],
    defaults: {
      label: "We'd Love to Meet You",
      title: "Plan Your Visit to Christ Kingdom Salvation",
      body: "Whether you are seeking a new church family or just exploring faith, our doors and hearts are open to you. Come experience the warmth of our community and the power of Spirit-filled worship.",
      primaryLabel: "Plan Your Visit",
      primaryHref: "/visit",
      secondaryLabel: "Contact Us",
      secondaryHref: "#contact",
    },
  },
];

export type HomeContent = Record<string, Record<string, string>>;

/** Build the defaults map keyed by section. */
export function homeDefaults(): HomeContent {
  return Object.fromEntries(HOME_SECTIONS.map((s) => [s.key, { ...s.defaults }]));
}

/**
 * Load home content from the DB, merged over defaults so every field
 * is always present. Safe to call from server components.
 */
export async function getHomeContent(): Promise<HomeContent> {
  const result = homeDefaults();
  try {
    const rows = await db
      .select()
      .from(siteContent)
      .where(eq(siteContent.page, "home"));
    for (const row of rows) {
      if (result[row.section]) {
        result[row.section] = {
          ...result[row.section],
          ...(row.data as Record<string, string>),
        };
      }
    }
  } catch {
    // DB unreachable → fall back to defaults so the public site still renders.
  }
  return result;
}
