import {
  pgTable,
  serial,
  uuid,
  text,
  jsonb,
  timestamp,
  integer,
  boolean,
  doublePrecision,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// ============================================================
// IDENTITY & ACCESS
// ============================================================

/** Application users (staff/leadership accounts that log into the admin). */
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  // Role key — must match a key in lib/auth/rbac.ts ROLES.
  role: text("role").notNull().default("member"),
  // Branch scope ("HQ" for national roles, branch name otherwise). Null = all.
  branch: text("branch"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

// ============================================================
// ORGANIZATION
// ============================================================

/** Singleton-ish church profile (org identity layer, MD §4). Row id = 1. */
export const churchProfile = pgTable("church_profile", {
  id: integer("id").primaryKey().default(1),
  name: text("name").notNull(),
  shortName: text("short_name"),
  denomination: text("denomination"),
  founded: integer("founded"),
  mission: text("mission"),
  vision: text("vision"),
  hq: text("hq"),
  country: text("country"),
  currency: text("currency"),
  timezone: text("timezone"),
  phone: text("phone"),
  email: text("email"),
  founder: text("founder"),
  social: jsonb("social").$type<Record<string, string>>(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type ChurchProfile = typeof churchProfile.$inferSelect;

/** Branches (MD §5). Mirrors the operational branch directory. */
export const branches = pgTable("branches", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  code: text("code").notNull(),
  name: text("name").notNull(),
  region: text("region"),
  district: text("district"),
  tier: text("tier"),
  pastor: text("pastor"),
  address: text("address"),
  area: text("area"),
  serviceTimes: text("service_times"),
  phone: text("phone"),
  email: text("email"),
  imageUrl: text("image_url"),
  isHq: boolean("is_hq").notNull().default(false),
  // Operational metrics (mirrors mock data; later computed).
  members: integer("members").default(0),
  attendanceRate: doublePrecision("attendance_rate"),
  giving: doublePrecision("giving"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Branch = typeof branches.$inferSelect;

// ============================================================
// EDITABLE WEBSITE CONTENT (CMS layer — MD §12 + "editable website")
// ============================================================

/**
 * Flexible content store for public-site sections. One row per
 * (page, section). `data` holds the section's editable fields as JSON,
 * so each public component owns its own shape and falls back to its
 * hardcoded defaults when no row exists.
 */
export const siteContent = pgTable(
  "site_content",
  {
    id: serial("id").primaryKey(),
    page: text("page").notNull(), // e.g. "home"
    section: text("section").notNull(), // e.g. "hero", "welcome"
    data: jsonb("data").$type<Record<string, unknown>>().notNull(),
    visible: boolean("visible").notNull().default(true),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
    updatedBy: text("updated_by"),
  },
  (t) => ({
    pageSectionUnq: uniqueIndex("site_content_page_section_unq").on(t.page, t.section),
  })
);

export type SiteContent = typeof siteContent.$inferSelect;
export type NewSiteContent = typeof siteContent.$inferInsert;

/**
 * Generic list/collection store for editable website lists —
 * leadership, ministries, gallery, etc. One row per item; `data`
 * holds the item's fields (shape defined per collection in
 * lib/collections.ts). `sort` controls display order.
 */
export const contentItems = pgTable("content_items", {
  id: serial("id").primaryKey(),
  collection: text("collection").notNull(), // e.g. "leadership"
  sort: integer("sort").notNull().default(0),
  visible: boolean("visible").notNull().default(true),
  data: jsonb("data").$type<Record<string, string>>().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  updatedBy: text("updated_by"),
});

export type ContentItem = typeof contentItems.$inferSelect;
export type NewContentItem = typeof contentItems.$inferInsert;
