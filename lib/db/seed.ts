import { config } from "dotenv";
config({ path: ".env.local" });

import bcrypt from "bcryptjs";
import { db } from "./index";
import { users, churchProfile, branches, siteContent } from "./schema";
import { sql, eq } from "drizzle-orm";
import { homeDefaults } from "../content";

async function main() {
  console.log("Seeding CKSPC platform database…");

  // ── Church profile (org identity) ──────────────────────────
  await db
    .insert(churchProfile)
    .values({
      id: 1,
      name: "Christ Kingdom Salvation Pentecostal Church",
      shortName: "CKSPC",
      denomination: "Pentecostal",
      founded: 1994,
      mission: "Bringing All People to the Saving Knowledge of Christ",
      vision: "Embracing the Sacred Flow",
      hq: "Madina, Accra · Ghana",
      country: "Ghana",
      currency: "GHS (₵)",
      timezone: "Africa/Accra",
      phone: "+233 30 250 4994",
      email: "office@ckspc.org",
      founder: "Prophetess Beatrice Esther Afua Agyapomaa (1929–2014)",
      social: {
        facebook: "https://facebook.com/ckspc",
        youtube: "https://youtube.com/@ckspc",
      },
    })
    .onConflictDoNothing();

  // ── Branches (mirror the public site directory) ────────────
  const branchRows = [
    { slug: "madina-central", code: "CKSPC-001", name: "Madina Central", region: "Greater Accra", district: "Accra East", tier: "Main Campus", pastor: "Rev. Samuel Boateng", address: "Baba Yara, Madina", area: "Accra, Ghana", serviceTimes: "Sun Service: 8:00 AM - 11:30 AM", phone: "+233 24 647 3136", isHq: true, members: 1840, attendanceRate: 0.78, giving: 184500 },
    { slug: "danfa-assembly", code: "CKSPC-002", name: "Danfa Assembly", region: "Greater Accra", district: "Accra East", tier: "Full Branch", pastor: "Pastor Esther Mensah", address: "Danfa Main Road", area: "Near the New Market", serviceTimes: "Sun Service: 8:30 AM - 11:30 AM", phone: "+233 55 987 6543", isHq: false, members: 612, attendanceRate: 0.72, giving: 48300 },
    { slug: "abonya-sanctuary", code: "CKSPC-003", name: "Abonya Sanctuary", region: "Greater Accra", district: "Accra North", tier: "Full Branch", pastor: "Rev. Daniel Owusu", address: "Abonya Hills Estate", area: "Valley View, Accra", serviceTimes: "Sun Service: 9:00 AM - 12:00 PM", phone: "+233 20 456 7890", isHq: false, members: 945, attendanceRate: 0.66, giving: 71200 },
    { slug: "tema-community", code: "CKSPC-004", name: "Tema Community", region: "Greater Accra", district: "Tema", tier: "Full Branch", pastor: "Pastor Akua Nyamekye", address: "Community 9", area: "Near the Roundabout, Tema", serviceTimes: "Sun Service: 8:00 AM - 11:30 AM", phone: "+233 27 111 2222", isHq: false, members: 488, attendanceRate: 0.81, giving: 52900 },
    { slug: "kasoa-tabernacle", code: "CKSPC-005", name: "Kasoa Tabernacle", region: "Central", district: "Awutu Senya", tier: "Outpost", pastor: "Pastor Kwame Asante", address: "Kasoa Toll Booth Road", area: "Opposite the new Mall", serviceTimes: "Sun Service: 8:30 AM - 12:00 PM", phone: "+233 54 333 4444", isHq: false, members: 214, attendanceRate: 0.69, giving: 18400 },
    { slug: "bawaleshie-center", code: "CKSPC-006", name: "Bawaleshie Center", region: "Greater Accra", district: "Accra East", tier: "Outpost", pastor: "Pastor Yaa Dzidzor", address: "East Legon Extension", area: "Bawaleshie Junction", serviceTimes: "Sun Service: 9:00 AM - 12:00 PM", phone: "+233 26 555 6666", isHq: false, members: 178, attendanceRate: 0.74, giving: 14200 },
  ];
  for (const b of branchRows) {
    await db.insert(branches).values(b).onConflictDoNothing();
  }

  // ── Admin users (RBAC roles) ───────────────────────────────
  const seedUsers = [
    { name: "Apostle K. Asamoah", email: "overseer@ckspc.org", role: "general_overseer", branch: null, password: "ckspc-admin" },
    { name: "National Administrator", email: "admin@ckspc.org", role: "national_admin", branch: null, password: "ckspc-admin" },
    { name: "Rev. Samuel Boateng", email: "madina.pastor@ckspc.org", role: "branch_pastor", branch: "Madina Central", password: "ckspc-admin" },
  ];
  for (const u of seedUsers) {
    const passwordHash = await bcrypt.hash(u.password, 10);
    await db
      .insert(users)
      .values({ name: u.name, email: u.email, role: u.role, branch: u.branch, passwordHash })
      .onConflictDoNothing();
  }

  // ── Initial homepage content (editable website) ────────────
  // Sourced from lib/content.ts so seed and runtime share one definition.
  const defaults = homeDefaults();
  const homeSections = Object.entries(defaults);
  // Reset home content to defaults (dev seed is authoritative).
  await db.delete(siteContent).where(eq(siteContent.page, "home"));
  for (const [section, data] of homeSections) {
    await db
      .insert(siteContent)
      .values({ page: "home", section, data, updatedBy: "seed" });
  }

  const [{ count: userCount }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(users);
  console.log(`✓ Seed complete. ${userCount} users, ${branchRows.length} branches, ${homeSections.length} home sections.`);
  console.log("  Login: overseer@ckspc.org / ckspc-admin");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
