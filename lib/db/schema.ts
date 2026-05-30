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

// ============================================================
// MEMBERS
// ============================================================

export const members = pgTable("members", {
  id: serial("id").primaryKey(),
  memberId: text("member_id").notNull().unique(), // e.g. CKSPC-M-0001
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  otherNames: text("other_names"),
  gender: text("gender"), // Male / Female
  dateOfBirth: text("date_of_birth"),
  phone: text("phone"),
  email: text("email"),
  address: text("address"),
  branch: text("branch"), // branch name
  status: text("status").notNull().default("Full Member"), // Full Member, New Convert, Visitor, Inactive, Transferred
  joinedDate: text("joined_date"),
  baptised: boolean("baptised").default(false),
  department: text("department"),
  cellGroup: text("cell_group"),
  isMinor: boolean("is_minor").default(false),
  notes: text("notes"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Member = typeof members.$inferSelect;
export type NewMember = typeof members.$inferInsert;

// ============================================================
// FINANCE
// ============================================================

/** Sunday / midweek collection records. */
export const collections = pgTable("collections", {
  id: serial("id").primaryKey(),
  collectionId: text("collection_id").notNull().unique(), // COL-2026-001
  date: text("date").notNull(),
  branch: text("branch").notNull(),
  service: text("service").notNull(), // "Sunday Service", "Midweek", etc.
  tithes: doublePrecision("tithes").default(0),
  offerings: doublePrecision("offerings").default(0),
  thanksgiving: doublePrecision("thanksgiving").default(0),
  designated: doublePrecision("designated").default(0),
  welfareFund: doublePrecision("welfare_fund").default(0),
  recorder: text("recorder").notNull(),
  approver: text("approver"),
  status: text("status").notNull().default("Pending"), // Pending, Approved, Rejected
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Collection = typeof collections.$inferSelect;
export type NewCollection = typeof collections.$inferInsert;

/** Tithe ledger — individual tithe records linked to members. */
export const tithes = pgTable("tithes", {
  id: serial("id").primaryKey(),
  date: text("date").notNull(),
  memberId: text("member_id"), // links to members.memberId
  memberName: text("member_name").notNull(),
  branch: text("branch").notNull(),
  amount: doublePrecision("amount").notNull(),
  mode: text("mode").notNull().default("Cash"), // Cash, Mobile Money, Bank Transfer, Cheque
  collectionId: text("collection_id"), // links to collections.collectionId
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Tithe = typeof tithes.$inferSelect;

/** Expense requests. */
export const expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),
  expenseId: text("expense_id").notNull().unique(), // EXP-2026-001
  date: text("date").notNull(),
  branch: text("branch").notNull(),
  category: text("category").notNull(), // Utilities, Rent, Equipment, Event, Ministry
  description: text("description").notNull(),
  amount: doublePrecision("amount").notNull(),
  requestor: text("requestor").notNull(),
  approver: text("approver"),
  status: text("status").notNull().default("Pending"), // Pending, Approved, Rejected
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Expense = typeof expenses.$inferSelect;
export type NewExpense = typeof expenses.$inferInsert;
