import { config } from "dotenv";
config({ path: ".env.local" });

import bcrypt from "bcryptjs";
import { db } from "./index";
import { users, churchProfile, branches, siteContent, contentItems, members, collections as collectionsTable, tithes, expenses } from "./schema";
import { sql, eq } from "drizzle-orm";
import { homeDefaults } from "../content";
import { COLLECTIONS } from "../collections";

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
  const img = {
    madina: "https://lh3.googleusercontent.com/aida-public/AB6AXuBR3xXNOQG1gBkSQxbkVQGCLs0bzmt4AjqSOsWzpiI-LlzfzyLcPbcOR_XEJFY7RxkWmgqTFQPY5x-IlNGFEv5Z1n_cHKaLryYitYuZlc4TBWPwvxmbbtN0L6t5f3Hs7JTjQ67xYvH5I30IUBHJzUx-RybRlL_gZu2j2Io4IALqOi3gHL909KCZZuG5Sg2tWgtcWw6kFjkvFlPK-gOgwDUhG7Zl74YHlTcoWtKHjEP2XGQ5gzuCIFanCBXoxHrN_4eSz3fg6wzj_Hw",
    danfa: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrVl3CICPWzC_eO2LEJWlyVzqtAfHsIeEc9FtDdOGOOrCVWlTiJcqTqDB1ZEBTaibtjALovcUEGA8ZVvVrBMTibj4UWmtBkNHUFKNNyCotgjctubURSJYs_jg438rbPh72ZH3h8SMLcKqQTcM7XFp_hZ_5ifyVrIZzQTduf1EiMFqnN3NuGcEC3C8mc4SrUGjsfRWoIoDK7ijh88a3qxgEi4Nin115qAxBPwSdJ9fE706i1fdDZmdWR8-zy_C-2NIsVIp2Omlhlkk",
    abonya: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcETN_K746-hhGfqa78RkAOabyld1XiKAbt0TmzVS7AzQf3w8rNzPrxk_88_SUu3_17CY7E8fggVfx3Sn2RciVEsc9b_myO6GJrL4bVl5hj16OvlXmb9cEaODxQkRfo4Busa9OVhjRzKbXtW-lJaDu_J_ogdQ4ZBHpE8lJbF6i6NXEENMf_9-FC0cJPF-MKI5ATwwd94zmV3n8hfCyej0wXRDPfI0wlkbOpM8Z1p9ObLV0c-m-HlZOuMOU8D9gjuELH95WnLSZEs8",
    tema: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKr3KLXBzToe5IN9eIZ7lS1A9ZR24wX81zJJGBbH59LHPLk6Hnlri4ybhyajU3x51KFGbW5SHzq-Ei-AI-BzXzI9IXDwf9fApA5tX9oNSNjmfqNJNFAoAiauiAwJ4xQcKJIXP4bYSSR7nMKjfzUg8Tb74nCA8OnWSoyeTGrutbW8FYkVHrqWJAZm2C1zvT_pvlfk1KP7XlPWif3b6Xvvn2tg160mRsyNY--M4UhRGtj8hzJSZc2mS1wE6n2v1tSgBSbzyJe8KwIDA",
    kasoa: "https://lh3.googleusercontent.com/aida-public/AB6AXuAb8ezlHgDnPD66fCB9KE0Zq398UdiVDIArpbQcHriuvmEisPT40PDgJjNDbNEkRSWQlUBArQYcAZMMNGKNxskfJD2xn9PTXLRmmZK6lVyB94pLH5dr8wNYlDuktrco1CbP2jMWsvfw5DB-7jGUky_ZfywcF0qITtvjdvrIdKOult5PF1HE_5EJcT-oQLjFT5kOqF3HOUp-UkIkLdPrytXtSRJrMS064xeAFD5py_ZJN-ziJnPZH9LNXmEpR_3tRueSPoEs8B6b870",
    bawaleshie: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgWsaHifNmfT_YPmzV6G0URnz6P4MgIfAe1u-jHyB2n4VaZ5p183TNlMjuZBrVG2YnUQqmZ6FvKM9x4b8vmd4WFBIQWUV-VlEBljXLR6mbaeD24k8xgORMuWWTPvR87iLGOm8J1WjNeV0zoeqZNEfOhKTC6HRy3y0rVbNfLWgYdCR4G5hflKaGNmcFe1LcFVCtfz1HpJWRlHU87Os8w6XeoWc7XSCGRH5MyogHLH8ueZaLQxPgOfqdH0MltHYgjWj7eefKcaVbJ70",
  };
  const branchRows = [
    { slug: "madina-central", code: "CKSPC-001", name: "Madina Central", region: "Greater Accra", district: "Accra East", tier: "Main Campus", pastor: "Rev. Samuel Boateng", address: "Baba Yara, Madina", area: "Accra, Ghana", serviceTimes: "Sun Service: 8:00 AM - 11:30 AM", phone: "+233 24 647 3136", imageUrl: img.madina, isHq: true, members: 1840, attendanceRate: 0.78, giving: 184500 },
    { slug: "danfa-assembly", code: "CKSPC-002", name: "Danfa Assembly", region: "Greater Accra", district: "Accra East", tier: "Full Branch", pastor: "Pastor Esther Mensah", address: "Danfa Main Road", area: "Near the New Market", serviceTimes: "Sun Service: 8:30 AM - 11:30 AM", phone: "+233 55 987 6543", imageUrl: img.danfa, isHq: false, members: 612, attendanceRate: 0.72, giving: 48300 },
    { slug: "abonya-sanctuary", code: "CKSPC-003", name: "Abonya Sanctuary", region: "Greater Accra", district: "Accra North", tier: "Full Branch", pastor: "Rev. Daniel Owusu", address: "Abonya Hills Estate", area: "Valley View, Accra", serviceTimes: "Sun Service: 9:00 AM - 12:00 PM", phone: "+233 20 456 7890", imageUrl: img.abonya, isHq: false, members: 945, attendanceRate: 0.66, giving: 71200 },
    { slug: "tema-community", code: "CKSPC-004", name: "Tema Community", region: "Greater Accra", district: "Tema", tier: "Full Branch", pastor: "Pastor Akua Nyamekye", address: "Community 9", area: "Near the Roundabout, Tema", serviceTimes: "Sun Service: 8:00 AM - 11:30 AM", phone: "+233 27 111 2222", imageUrl: img.tema, isHq: false, members: 488, attendanceRate: 0.81, giving: 52900 },
    { slug: "kasoa-tabernacle", code: "CKSPC-005", name: "Kasoa Tabernacle", region: "Central", district: "Awutu Senya", tier: "Outpost", pastor: "Pastor Kwame Asante", address: "Kasoa Toll Booth Road", area: "Opposite the new Mall", serviceTimes: "Sun Service: 8:30 AM - 12:00 PM", phone: "+233 54 333 4444", imageUrl: img.kasoa, isHq: false, members: 214, attendanceRate: 0.69, giving: 18400 },
    { slug: "bawaleshie-center", code: "CKSPC-006", name: "Bawaleshie Center", region: "Greater Accra", district: "Accra East", tier: "Outpost", pastor: "Pastor Yaa Dzidzor", address: "East Legon Extension", area: "Bawaleshie Junction", serviceTimes: "Sun Service: 9:00 AM - 12:00 PM", phone: "+233 26 555 6666", imageUrl: img.bawaleshie, isHq: false, members: 178, attendanceRate: 0.74, giving: 14200 },
  ];
  for (const b of branchRows) {
    await db
      .insert(branches)
      .values(b)
      .onConflictDoUpdate({ target: branches.slug, set: b });
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

  // ── Website collections (leadership, ministries, gallery) ──
  for (const col of COLLECTIONS) {
    await db.delete(contentItems).where(eq(contentItems.collection, col.key));
    let sort = 0;
    for (const data of col.defaults) {
      await db.insert(contentItems).values({
        collection: col.key,
        sort: sort++,
        data,
        updatedBy: "seed",
      });
    }
  }

  // ── Members ────────────────────────────────────────────────
  const ghNames = [
    ["Kwame", "Asante"], ["Ama", "Mensah"], ["Kofi", "Owusu"], ["Akua", "Boateng"],
    ["Yaw", "Appiah"], ["Abena", "Darko"], ["Kwesi", "Frimpong"], ["Efua", "Nyamekye"],
    ["Kojo", "Tetteh"], ["Afia", "Adjei"], ["Nana", "Osei"], ["Adwoa", "Bonsu"],
    ["Kwabena", "Agyemang"], ["Akosua", "Nkrumah"], ["Papa", "Amankwah"],
  ];
  const statuses = ["Full Member", "Full Member", "Full Member", "New Convert", "Visitor"];
  const depts = ["Choir", "Ushering", "Protocol", "Media", "Youth", "Children", "Welfare", "Prayer"];
  const branchNames = branchRows.map((b) => b.name);
  await db.delete(members);
  for (let i = 0; i < ghNames.length; i++) {
    const [first, last] = ghNames[i];
    await db.insert(members).values({
      memberId: `CKSPC-M-${String(i + 1).padStart(4, "0")}`,
      firstName: first,
      lastName: last,
      gender: i % 2 === 0 ? "Male" : "Female",
      phone: `+233 ${20 + (i % 8)}0 ${100 + i * 7} ${2000 + i * 13}`,
      branch: branchNames[i % branchNames.length],
      status: statuses[i % statuses.length],
      joinedDate: `${2018 + (i % 6)}-0${(i % 9) + 1}-15`,
      baptised: i % 3 !== 0,
      department: depts[i % depts.length],
      isMinor: i === 14,
    });
  }

  // ── Finance — Collections ─────────────────────────────────
  await db.delete(collectionsTable);
  const finBranches = ["Madina Central", "Danfa Assembly", "Tema Community"];
  const finDates = ["2026-05-04", "2026-05-11", "2026-05-18", "2026-05-25"];
  let colIdx = 1;
  for (const d of finDates) {
    for (const br of finBranches) {
      const t = Math.round(8000 + Math.random() * 6000);
      const o = Math.round(2000 + Math.random() * 3000);
      await db.insert(collectionsTable).values({
        collectionId: `COL-2026-${String(colIdx++).padStart(3, "0")}`,
        date: d,
        branch: br,
        service: "Sunday Service",
        tithes: t,
        offerings: o,
        thanksgiving: Math.round(500 + Math.random() * 1500),
        designated: Math.round(200 + Math.random() * 800),
        welfareFund: Math.round(100 + Math.random() * 400),
        recorder: ghNames[colIdx % ghNames.length].join(" "),
        approver: colIdx % 3 === 0 ? null : "Rev. Samuel Boateng",
        status: colIdx % 3 === 0 ? "Pending" : "Approved",
      });
    }
  }

  // ── Finance — Expenses ────────────────────────────────────
  await db.delete(expenses);
  const expCats = ["Utilities", "Rent", "Equipment", "Event", "Ministry"];
  const expDescs = ["Electricity bill May", "Hall rental for revival", "New microphone set", "Youth camp catering", "Evangelism transport"];
  for (let i = 0; i < 8; i++) {
    await db.insert(expenses).values({
      expenseId: `EXP-2026-${String(i + 1).padStart(3, "0")}`,
      date: `2026-05-${String(3 + i * 3).padStart(2, "0")}`,
      branch: finBranches[i % finBranches.length],
      category: expCats[i % expCats.length],
      description: expDescs[i % expDescs.length],
      amount: Math.round(500 + Math.random() * 4000),
      requestor: ghNames[i % ghNames.length].join(" "),
      approver: i % 2 === 0 ? "National Admin" : null,
      status: i % 2 === 0 ? "Approved" : "Pending",
    });
  }

  // ── Finance — Tithes ──────────────────────────────────────
  await db.delete(tithes);
  for (let i = 0; i < 10; i++) {
    await db.insert(tithes).values({
      date: `2026-05-${String(4 + i * 2).padStart(2, "0")}`,
      memberId: `CKSPC-M-${String(i + 1).padStart(4, "0")}`,
      memberName: ghNames[i].join(" "),
      branch: branchNames[i % branchNames.length],
      amount: Math.round(100 + Math.random() * 900),
      mode: ["Cash", "Mobile Money", "Bank Transfer"][i % 3],
    });
  }

  const [{ count: userCount }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(users);
  const [{ count: memberCount }] = await db.select({ count: sql<number>`count(*)::int` }).from(members);
  const [{ count: colCount }] = await db.select({ count: sql<number>`count(*)::int` }).from(collectionsTable);
  console.log(`✓ Seed complete. ${userCount} users, ${branchRows.length} branches, ${memberCount} members, ${colCount} collections.`);
  console.log("  Login: overseer@ckspc.org / ckspc-admin");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
