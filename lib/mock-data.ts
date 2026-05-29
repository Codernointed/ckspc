// Mock data for CKSPC platform.
// Replace with API calls once Supabase wiring is done.

export type Branch = {
  slug: string;
  code: string;
  name: string;
  region: string;
  district: string;
  tier: "Main Campus" | "Full Branch" | "Outpost" | "Cell Group";
  pastor: string;
  members: number;
  attendanceRate: number;
  giving: number;
};

export const branches: Branch[] = [
  { slug: "madina-central", code: "CKSPC-001", name: "Madina Central", region: "Greater Accra", district: "Accra East", tier: "Main Campus", pastor: "Rev. Samuel Boateng", members: 1840, attendanceRate: 0.78, giving: 184500 },
  { slug: "kasoa", code: "CKSPC-002", name: "Kasoa", region: "Central", district: "Awutu Senya", tier: "Full Branch", pastor: "Pastor Esther Mensah", members: 612, attendanceRate: 0.72, giving: 48300 },
  { slug: "kumasi-central", code: "CKSPC-003", name: "Kumasi Central", region: "Ashanti", district: "Kumasi Metro", tier: "Full Branch", pastor: "Rev. Daniel Owusu", members: 945, attendanceRate: 0.66, giving: 71200 },
  { slug: "tema", code: "CKSPC-004", name: "Tema Community 4", region: "Greater Accra", district: "Tema", tier: "Full Branch", pastor: "Pastor Akua Nyamekye", members: 488, attendanceRate: 0.81, giving: 52900 },
  { slug: "takoradi", code: "CKSPC-005", name: "Takoradi", region: "Western", district: "Sekondi-Takoradi", tier: "Outpost", pastor: "Pastor Kwame Asante", members: 214, attendanceRate: 0.69, giving: 18400 },
  { slug: "ho", code: "CKSPC-006", name: "Ho", region: "Volta", district: "Ho Central", tier: "Outpost", pastor: "Pastor Yaa Dzidzor", members: 178, attendanceRate: 0.74, giving: 14200 },
];

export function getBranch(slug: string): Branch | undefined {
  return branches.find((b) => b.slug === slug);
}

export const attendanceLast8Weeks = [
  { week: "Wk 12", physical: 2820, online: 410 },
  { week: "Wk 13", physical: 2940, online: 380 },
  { week: "Wk 14", physical: 3010, online: 460 },
  { week: "Wk 15", physical: 2860, online: 490 },
  { week: "Wk 16", physical: 3120, online: 520 },
  { week: "Wk 17", physical: 3240, online: 480 },
  { week: "Wk 18", physical: 3180, online: 540 },
  { week: "Wk 19", physical: 3330, online: 590 },
];

export const branchAttendance = [
  { week: "Wk 12", value: 1340 },
  { week: "Wk 13", value: 1410 },
  { week: "Wk 14", value: 1380 },
  { week: "Wk 15", value: 1290 },
  { week: "Wk 16", value: 1450 },
  { week: "Wk 17", value: 1490 },
  { week: "Wk 18", value: 1420 },
  { week: "Wk 19", value: 1510 },
];

export const upcomingEvents = [
  { when: "Sun · 28 May · 8:00", what: "Sunday Service", who: "Madina Central · all branches via livestream", featured: true },
  { when: "Wed · 31 May · 18:30", what: "Midweek Prayer & Bible Study", who: "All branches" },
  { when: "Fri · 02 Jun · 19:00", what: "Youth Vigil — 'Set Apart'", who: "Madina Central · youth fellowship" },
  { when: "Sat · 03 Jun · 09:00", what: "Welfare Home-Visit Round", who: "Kasoa · welfare team" },
  { when: "Sun · 04 Jun · 10:30", what: "New Convert Class — Cohort IV", who: "Kumasi Central · 24 enrolled" },
];

export const announcements = [
  { when: "Today · 09:42", who: "National Admin", what: "Quarterly remittance window opens Monday. Branch finance officers, please confirm reconciliation before close of business Friday." },
  { when: "Yesterday", who: "General Overseer's office", what: "Founders' Day rehearsal moved to 17 June. Choir and protocol leads to confirm attendance." },
  { when: "2 days ago", who: "National IT", what: "Two-factor authentication is now mandatory for all branch finance accounts." },
];

export const welfareCases = {
  open: 23,
  underReview: 8,
  approvedThisMonth: 14,
  disbursedThisMonth: 11,
  fundBalance: 38420,
};

export const finance = {
  monthIncome: 412600,
  monthExpense: 287400,
  ytdIncome: 1834200,
  ytdExpense: 1306800,
  remittancePending: 41200,
};

export const inventoryAlerts = [
  { label: "Generator (Madina) — service overdue by 11 days", severity: "warning" as const },
  { label: "Offering envelopes — 3 branches below threshold", severity: "warning" as const },
  { label: "Camera 02 (Kumasi) — flagged for repair", severity: "danger" as const },
];

export const alerts = [
  { badge: "DROP", text: "Kumasi Central attendance fell 12% week-over-week", severity: "warning" as const },
  { badge: "OVERDUE", text: "Takoradi remittance overdue by 6 days", severity: "danger" as const },
  { badge: "WELFARE", text: "3 critical-urgency welfare cases awaiting branch pastor approval", severity: "warning" as const },
];

export type NavGroup = {
  heading: string;
  items: { label: string; href: string; count?: string }[];
};

export const navGroups: NavGroup[] = [
  {
    heading: "Overview",
    items: [
      { label: "HQ Dashboard", href: "/hq" },
      { label: "Branch view", href: "/branch/madina-central" },
    ],
  },
  {
    heading: "People",
    items: [
      { label: "Members", href: "/members", count: "4,277" },
      { label: "Departments", href: "/departments", count: "12" },
      { label: "Fellowships", href: "/fellowships", count: "7" },
      { label: "Staff & HR", href: "/hr" },
    ],
  },
  {
    heading: "Ledger",
    items: [
      { label: "Finance", href: "/finance" },
      { label: "Welfare", href: "/welfare", count: "23" },
      { label: "Inventory", href: "/inventory" },
    ],
  },
  {
    heading: "Worship & Word",
    items: [
      { label: "Sermons", href: "/sermons" },
      { label: "Devotions", href: "/devotions" },
      { label: "Events", href: "/events", count: "9" },
      { label: "Communications", href: "/comms" },
    ],
  },
  {
    heading: "Public site",
    items: [
      { label: "Website content", href: "/website" },
    ],
  },
  {
    heading: "Administration",
    items: [
      { label: "Reports", href: "/reports" },
      { label: "Roles & access", href: "/roles" },
      { label: "Audit log", href: "/audit" },
      { label: "Settings", href: "/settings" },
    ],
  },
];

export const formatGHS = (n: number) =>
  "₵" + n.toLocaleString("en-GH", { maximumFractionDigits: 0 });

// ============================================================
// MEMBERS
// ============================================================
export type MemberStatus = "Visitor" | "New Convert" | "Full Member" | "Inactive" | "Transferred";
export type Member = {
  id: string;
  name: string;
  gender: "M" | "F";
  age: number;
  branch: string;
  status: MemberStatus;
  joined: string;
  phone: string;
  email: string;
  baptized: boolean;
  department?: string;
  cell?: string;
  attendance: number; // % over last 12 weeks
  giving: number;
  minor: boolean;
};

export const members: Member[] = [
  { id: "CKSPC-M-0001", name: "Akosua Mensah", gender: "F", age: 34, branch: "Madina Central", status: "Full Member", joined: "2018-03-12", phone: "+233 24 555 0101", email: "akosua@example.gh", baptized: true, department: "Women's Fellowship", cell: "Madina-NorthA", attendance: 92, giving: 5400, minor: false },
  { id: "CKSPC-M-0002", name: "Kwame Owusu", gender: "M", age: 41, branch: "Madina Central", status: "Full Member", joined: "2014-08-04", phone: "+233 24 555 0102", email: "kwame@example.gh", baptized: true, department: "Choir / Music Ministry", cell: "Madina-CentralB", attendance: 88, giving: 8200, minor: false },
  { id: "CKSPC-M-0003", name: "Ama Asare", gender: "F", age: 28, branch: "Kasoa", status: "Full Member", joined: "2020-01-19", phone: "+233 27 555 0103", email: "ama@example.gh", baptized: true, department: "Ushering Ministry", cell: "Kasoa-A", attendance: 76, giving: 2300, minor: false },
  { id: "CKSPC-M-0004", name: "Yaw Boateng", gender: "M", age: 52, branch: "Kumasi Central", status: "Full Member", joined: "2009-07-22", phone: "+233 50 555 0104", email: "yaw@example.gh", baptized: true, department: "Evangelism / Outreach", cell: "Kumasi-Asokwa", attendance: 81, giving: 6100, minor: false },
  { id: "CKSPC-M-0005", name: "Esi Darko", gender: "F", age: 19, branch: "Tema Community 4", status: "New Convert", joined: "2025-09-08", phone: "+233 55 555 0105", email: "esi@example.gh", baptized: false, department: "Youth Ministry", cell: "Tema-Youth", attendance: 68, giving: 240, minor: false },
  { id: "CKSPC-M-0006", name: "Kojo Mensah Jr.", gender: "M", age: 12, branch: "Madina Central", status: "Full Member", joined: "2017-04-02", phone: "—", email: "—", baptized: false, department: "Children's Ministry", cell: "Madina-Kids", attendance: 95, giving: 0, minor: true },
  { id: "CKSPC-M-0007", name: "Adwoa Quartey", gender: "F", age: 46, branch: "Madina Central", status: "Full Member", joined: "2011-11-30", phone: "+233 24 555 0107", email: "adwoa@example.gh", baptized: true, department: "Prayer Ministry", cell: "Madina-NorthB", attendance: 84, giving: 4800, minor: false },
  { id: "CKSPC-M-0008", name: "Kwesi Appiah", gender: "M", age: 24, branch: "Kasoa", status: "Visitor", joined: "2026-05-18", phone: "+233 27 555 0108", email: "—", baptized: false, attendance: 33, giving: 0, minor: false },
  { id: "CKSPC-M-0009", name: "Nana Yaa Kuffour", gender: "F", age: 38, branch: "Takoradi", status: "Full Member", joined: "2016-06-15", phone: "+233 55 555 0109", email: "nanayaa@example.gh", baptized: true, department: "Women's Fellowship", cell: "Takoradi-A", attendance: 71, giving: 3200, minor: false },
  { id: "CKSPC-M-0010", name: "Kofi Anane", gender: "M", age: 67, branch: "Ho", status: "Full Member", joined: "2002-02-10", phone: "+233 24 555 0110", email: "kofi@example.gh", baptized: true, department: "Men's Fellowship", cell: "Ho-Elders", attendance: 88, giving: 5600, minor: false },
  { id: "CKSPC-M-0011", name: "Abena Nyarko", gender: "F", age: 31, branch: "Madina Central", status: "Inactive", joined: "2015-10-04", phone: "+233 24 555 0111", email: "abena@example.gh", baptized: true, attendance: 22, giving: 400, minor: false },
  { id: "CKSPC-M-0012", name: "Samuel Tetteh", gender: "M", age: 36, branch: "Tema Community 4", status: "Full Member", joined: "2019-05-25", phone: "+233 50 555 0112", email: "samuel@example.gh", baptized: true, department: "Media / Broadcast Team", cell: "Tema-Media", attendance: 79, giving: 4400, minor: false },
  { id: "CKSPC-M-0013", name: "Aba Hayford", gender: "F", age: 29, branch: "Kumasi Central", status: "Full Member", joined: "2021-03-14", phone: "+233 55 555 0113", email: "aba@example.gh", baptized: true, department: "Singles Fellowship", cell: "Kumasi-Singles", attendance: 82, giving: 2900, minor: false },
  { id: "CKSPC-M-0014", name: "Edem Adjei", gender: "M", age: 15, branch: "Ho", status: "Full Member", joined: "2014-07-21", phone: "—", email: "—", baptized: true, department: "Teens Ministry", cell: "Ho-Teens", attendance: 90, giving: 0, minor: true },
  { id: "CKSPC-M-0015", name: "Akua Sarpong", gender: "F", age: 44, branch: "Madina Central", status: "Full Member", joined: "2012-09-11", phone: "+233 24 555 0115", email: "akua@example.gh", baptized: true, department: "Ushering Ministry", cell: "Madina-SouthA", attendance: 87, giving: 6700, minor: false },
];

export function getMember(id: string): Member | undefined {
  return members.find((m) => m.id === id);
}

// ============================================================
// DEPARTMENTS & FELLOWSHIPS
// ============================================================
export type Department = {
  slug: string;
  name: string;
  type: "Ministry" | "Fellowship" | "Administrative";
  scope: "HQ" | "Branch";
  branch?: string;
  head: string;
  members: number;
  meeting: string;
  active: boolean;
};

export const departments: Department[] = [
  { slug: "choir-music", name: "Choir / Music Ministry", type: "Ministry", scope: "Branch", branch: "Madina Central", head: "Bro. Daniel Asante", members: 64, meeting: "Thu · 18:00 · Auditorium", active: true },
  { slug: "ushering", name: "Ushering Ministry", type: "Ministry", scope: "Branch", branch: "Madina Central", head: "Sis. Adwoa Pokuaa", members: 38, meeting: "Sat · 09:00 · Foyer", active: true },
  { slug: "prayer", name: "Prayer Ministry", type: "Ministry", scope: "Branch", branch: "Madina Central", head: "Eld. Stephen Kufuor", members: 52, meeting: "Tue · 05:30 · Prayer Hall", active: true },
  { slug: "evangelism", name: "Evangelism / Outreach", type: "Ministry", scope: "Branch", branch: "Madina Central", head: "Sis. Hannah Boakye", members: 41, meeting: "Sat · 14:00 · Field", active: true },
  { slug: "children", name: "Children's Ministry", type: "Ministry", scope: "Branch", branch: "Madina Central", head: "Sis. Faustina Owusu", members: 87, meeting: "Sun · 08:30 · Sunday School Hall", active: true },
  { slug: "youth", name: "Youth Ministry", type: "Ministry", scope: "Branch", branch: "Madina Central", head: "Pst. Caleb Anyetei", members: 132, meeting: "Fri · 18:30 · Youth Hall", active: true },
  { slug: "teens", name: "Teens Ministry", type: "Ministry", scope: "Branch", branch: "Madina Central", head: "Sis. Mary Frempong", members: 58, meeting: "Sun · 10:30 · Teens Hall", active: true },
  { slug: "media", name: "Media / Broadcast Team", type: "Ministry", scope: "Branch", branch: "Madina Central", head: "Bro. Felix Dadzie", members: 22, meeting: "Sat · 16:00 · Media Room", active: true },
  { slug: "editorial", name: "Editorial Department", type: "Administrative", scope: "HQ", head: "Mrs. Charity Adusei", members: 9, meeting: "Mon · 14:00 · HQ Boardroom", active: true },
  { slug: "media-comms", name: "Media & Communications", type: "Administrative", scope: "HQ", head: "Mr. Ebenezer Asare", members: 15, meeting: "Wed · 11:00 · HQ Studio", active: true },
  { slug: "hr-personnel", name: "HR / Personnel", type: "Administrative", scope: "HQ", head: "Mrs. Joyce Tetteh", members: 6, meeting: "Mon · 09:00 · HQ Boardroom", active: true },
  { slug: "legal", name: "Legal & Compliance", type: "Administrative", scope: "HQ", head: "Mr. Kwabena Adu", members: 3, meeting: "By appointment", active: true },
];

export const fellowships: Department[] = [
  { slug: "men", name: "Men's Fellowship", type: "Fellowship", scope: "Branch", branch: "Madina Central", head: "Eld. Kwame Owusu", members: 184, meeting: "Sat · 06:00 · Hall A", active: true },
  { slug: "women", name: "Women's Fellowship", type: "Fellowship", scope: "Branch", branch: "Madina Central", head: "Mrs. Beatrice Owusu", members: 296, meeting: "Sat · 14:00 · Hall A", active: true },
  { slug: "youth-fell", name: "Youth Fellowship", type: "Fellowship", scope: "Branch", branch: "Madina Central", head: "Pst. Caleb Anyetei", members: 132, meeting: "Fri · 18:30 · Youth Hall", active: true },
  { slug: "singles", name: "Singles Fellowship", type: "Fellowship", scope: "Branch", branch: "Madina Central", head: "Bro. Daniel Asante", members: 68, meeting: "Sat · 17:00 · Hall B", active: true },
  { slug: "couples", name: "Couples Fellowship", type: "Fellowship", scope: "Branch", branch: "Madina Central", head: "Rev. & Mrs. Boateng", members: 44, meeting: "Sun · 16:00 · Hall A", active: true },
  { slug: "biz-pro", name: "Business Professionals Fellowship", type: "Fellowship", scope: "Branch", branch: "Madina Central", head: "Mr. Kojo Antwi", members: 51, meeting: "Last Sat · 09:00 · Boardroom", active: true },
  { slug: "campus", name: "Campus Ministry / Student Fellowship", type: "Fellowship", scope: "Branch", branch: "Madina Central", head: "Sis. Linda Aboagye", members: 78, meeting: "Wed · 17:30 · Youth Hall", active: true },
];

// ============================================================
// STAFF / HR
// ============================================================
export type Staff = {
  id: string;
  name: string;
  category: "Ordained" | "Lay Leader" | "Department Head" | "Worker" | "Administrative" | "Support";
  role: string;
  branch: string;
  startDate: string;
  employmentType: "Full-time" | "Part-time" | "Volunteer";
  leaveBalance: number;
  stipend?: number;
  supervisor: string;
};

export const staff: Staff[] = [
  { id: "STAFF-001", name: "Apostle K. Asamoah", category: "Ordained", role: "General Overseer", branch: "HQ — Madina", startDate: "1994-02-01", employmentType: "Full-time", leaveBalance: 12, stipend: 9200, supervisor: "—" },
  { id: "STAFF-002", name: "Rev. Samuel Boateng", category: "Ordained", role: "Senior Pastor", branch: "Madina Central", startDate: "2005-09-10", employmentType: "Full-time", leaveBalance: 10, stipend: 6800, supervisor: "Apostle K. Asamoah" },
  { id: "STAFF-003", name: "Pastor Esther Mensah", category: "Ordained", role: "Branch Pastor", branch: "Kasoa", startDate: "2014-01-19", employmentType: "Full-time", leaveBalance: 18, stipend: 5400, supervisor: "Apostle K. Asamoah" },
  { id: "STAFF-004", name: "Rev. Daniel Owusu", category: "Ordained", role: "Branch Pastor", branch: "Kumasi Central", startDate: "2009-04-22", employmentType: "Full-time", leaveBalance: 6, stipend: 5800, supervisor: "Apostle K. Asamoah" },
  { id: "STAFF-005", name: "Pastor Akua Nyamekye", category: "Ordained", role: "Branch Pastor", branch: "Tema Community 4", startDate: "2017-07-04", employmentType: "Full-time", leaveBalance: 15, stipend: 5200, supervisor: "Apostle K. Asamoah" },
  { id: "STAFF-006", name: "Eld. Stephen Kufuor", category: "Lay Leader", role: "Head of Prayer", branch: "Madina Central", startDate: "2010-03-15", employmentType: "Volunteer", leaveBalance: 0, supervisor: "Rev. Samuel Boateng" },
  { id: "STAFF-007", name: "Mrs. Joyce Tetteh", category: "Administrative", role: "National HR Officer", branch: "HQ — Madina", startDate: "2018-11-01", employmentType: "Full-time", leaveBalance: 14, stipend: 4600, supervisor: "Apostle K. Asamoah" },
  { id: "STAFF-008", name: "Mr. Felix Dadzie", category: "Worker", role: "Media Lead", branch: "Madina Central", startDate: "2020-02-28", employmentType: "Part-time", leaveBalance: 8, stipend: 1800, supervisor: "Rev. Samuel Boateng" },
  { id: "STAFF-009", name: "Sis. Faustina Owusu", category: "Department Head", role: "Children's Ministry Head", branch: "Madina Central", startDate: "2016-08-12", employmentType: "Volunteer", leaveBalance: 0, supervisor: "Rev. Samuel Boateng" },
  { id: "STAFF-010", name: "Mr. Daniel Mensah", category: "Support", role: "Facility Lead", branch: "Madina Central", startDate: "2013-06-01", employmentType: "Full-time", leaveBalance: 11, stipend: 1900, supervisor: "Rev. Samuel Boateng" },
];

export const pendingLeave = [
  { id: "LV-441", staff: "Mr. Felix Dadzie", type: "Annual", from: "2026-06-04", to: "2026-06-09", days: 5, status: "Pending" },
  { id: "LV-442", staff: "Sis. Hannah Boakye", type: "Compassionate", from: "2026-05-29", to: "2026-06-02", days: 4, status: "Pending" },
  { id: "LV-443", staff: "Mrs. Joyce Tetteh", type: "Study", from: "2026-07-01", to: "2026-07-12", days: 11, status: "Pending" },
];

// ============================================================
// FINANCE
// ============================================================
export type Collection = {
  id: string;
  date: string;
  branch: string;
  service: string;
  tithes: number;
  offerings: number;
  thanksgiving: number;
  designated: number;
  welfare: number;
  recorder: string;
  approver?: string;
  status: "Pending" | "Approved" | "Reversed";
};

export const collections: Collection[] = [
  { id: "COL-2026-219", date: "2026-05-25", branch: "Madina Central", service: "Sunday Main", tithes: 18400, offerings: 6200, thanksgiving: 1400, designated: 2200, welfare: 800, recorder: "Mr. K. Sarpong", approver: "Rev. Samuel Boateng", status: "Approved" },
  { id: "COL-2026-220", date: "2026-05-25", branch: "Kumasi Central", service: "Sunday Main", tithes: 8200, offerings: 2900, thanksgiving: 600, designated: 1100, welfare: 320, recorder: "Mr. F. Boakye", approver: "Rev. Daniel Owusu", status: "Approved" },
  { id: "COL-2026-221", date: "2026-05-25", branch: "Kasoa", service: "Sunday Main", tithes: 4900, offerings: 1840, thanksgiving: 320, designated: 540, welfare: 180, recorder: "Sis. M. Bediako", status: "Pending" },
  { id: "COL-2026-222", date: "2026-05-25", branch: "Tema Community 4", service: "Sunday Main", tithes: 6100, offerings: 2300, thanksgiving: 480, designated: 870, welfare: 240, recorder: "Bro. A. Nkrumah", approver: "Pastor Akua Nyamekye", status: "Approved" },
  { id: "COL-2026-223", date: "2026-05-25", branch: "Takoradi", service: "Sunday Main", tithes: 2100, offerings: 740, thanksgiving: 90, designated: 280, welfare: 80, recorder: "Bro. P. Aidoo", status: "Pending" },
  { id: "COL-2026-224", date: "2026-05-22", branch: "Madina Central", service: "Midweek", tithes: 2200, offerings: 1100, thanksgiving: 220, designated: 380, welfare: 140, recorder: "Mr. K. Sarpong", approver: "Rev. Samuel Boateng", status: "Approved" },
];

export const titheLedger = [
  { id: "T-101", date: "2026-05-25", member: "Kwame Owusu", branch: "Madina Central", amount: 820, mode: "Mobile Money" },
  { id: "T-102", date: "2026-05-25", member: "Akosua Mensah", branch: "Madina Central", amount: 540, mode: "Cash" },
  { id: "T-103", date: "2026-05-25", member: "Akua Sarpong", branch: "Madina Central", amount: 670, mode: "Bank Transfer" },
  { id: "T-104", date: "2026-05-25", member: "Yaw Boateng", branch: "Kumasi Central", amount: 610, mode: "Mobile Money" },
  { id: "T-105", date: "2026-05-25", member: "Adwoa Quartey", branch: "Madina Central", amount: 480, mode: "Cash" },
  { id: "T-106", date: "2026-05-25", member: "Kofi Anane", branch: "Ho", amount: 560, mode: "Mobile Money" },
  { id: "T-107", date: "2026-05-25", member: "Nana Yaa Kuffour", branch: "Takoradi", amount: 320, mode: "Cash" },
];

export type Expense = {
  id: string;
  date: string;
  branch: string;
  category: string;
  description: string;
  amount: number;
  requestor: string;
  approver?: string;
  status: "Pending" | "Approved" | "Rejected" | "Disbursed";
};

export const expenses: Expense[] = [
  { id: "EXP-2026-088", date: "2026-05-23", branch: "Madina Central", category: "Utilities", description: "May electricity bill — ECG", amount: 4200, requestor: "Mr. Daniel Mensah", approver: "Rev. Samuel Boateng", status: "Approved" },
  { id: "EXP-2026-089", date: "2026-05-22", branch: "Madina Central", category: "Equipment", description: "Replacement mixer cable, 6m XLR", amount: 380, requestor: "Bro. Felix Dadzie", approver: "Rev. Samuel Boateng", status: "Approved" },
  { id: "EXP-2026-090", date: "2026-05-21", branch: "Kumasi Central", category: "Event", description: "Refreshments — Founders rehearsal", amount: 1240, requestor: "Sis. Mary Frempong", status: "Pending" },
  { id: "EXP-2026-091", date: "2026-05-20", branch: "Kasoa", category: "Rent", description: "May premises rent", amount: 3800, requestor: "Pastor Esther Mensah", approver: "Apostle K. Asamoah", status: "Approved" },
  { id: "EXP-2026-092", date: "2026-05-26", branch: "Madina Central", category: "Ministry", description: "Crusade banners (3) — Outreach team", amount: 920, requestor: "Sis. Hannah Boakye", status: "Pending" },
];

export const remittances = [
  { branch: "Madina Central", due: 18400, sent: 18400, status: "Settled" as const, lastSent: "2026-05-26" },
  { branch: "Kumasi Central", due: 8200, sent: 8200, status: "Settled" as const, lastSent: "2026-05-26" },
  { branch: "Tema Community 4", due: 6100, sent: 6100, status: "Settled" as const, lastSent: "2026-05-26" },
  { branch: "Kasoa", due: 4900, sent: 0, status: "Overdue" as const, lastSent: "—" },
  { branch: "Takoradi", due: 2100, sent: 0, status: "Overdue" as const, lastSent: "—" },
  { branch: "Ho", due: 1500, sent: 1500, status: "Settled" as const, lastSent: "2026-05-25" },
];

// ============================================================
// WELFARE
// ============================================================
export type WelfareCase = {
  id: string;
  member: string;
  branch: string;
  nature: "Medical" | "Financial Emergency" | "Bereavement" | "Food Support" | "Educational" | "Other";
  urgency: "Low" | "Medium" | "High" | "Critical";
  amountRequested: number;
  amountDisbursed: number;
  status: "Open" | "Under Review" | "Approved" | "Disbursed" | "Closed";
  officer: string;
  opened: string;
  lastVisit?: string;
};

export const welfareCasesList: WelfareCase[] = [
  { id: "WLF-2026-041", member: "[Redacted — Madina]", branch: "Madina Central", nature: "Medical", urgency: "Critical", amountRequested: 4800, amountDisbursed: 0, status: "Under Review", officer: "Sis. Adwoa Pokuaa", opened: "2026-05-24", lastVisit: "2026-05-25" },
  { id: "WLF-2026-042", member: "[Redacted — Kasoa]", branch: "Kasoa", nature: "Bereavement", urgency: "High", amountRequested: 2200, amountDisbursed: 2200, status: "Disbursed", officer: "Sis. Mercy Bediako", opened: "2026-05-20" },
  { id: "WLF-2026-043", member: "[Redacted — Madina]", branch: "Madina Central", nature: "Educational", urgency: "Medium", amountRequested: 1600, amountDisbursed: 0, status: "Open", officer: "Sis. Adwoa Pokuaa", opened: "2026-05-22", lastVisit: "2026-05-23" },
  { id: "WLF-2026-044", member: "[Redacted — Kumasi]", branch: "Kumasi Central", nature: "Food Support", urgency: "High", amountRequested: 800, amountDisbursed: 800, status: "Closed", officer: "Bro. Patrick Aidoo", opened: "2026-05-18" },
  { id: "WLF-2026-045", member: "[Redacted — Tema]", branch: "Tema Community 4", nature: "Financial Emergency", urgency: "Critical", amountRequested: 5400, amountDisbursed: 0, status: "Approved", officer: "Sis. Linda Aboagye", opened: "2026-05-25" },
  { id: "WLF-2026-046", member: "[Redacted — Madina]", branch: "Madina Central", nature: "Medical", urgency: "Medium", amountRequested: 1200, amountDisbursed: 1200, status: "Disbursed", officer: "Sis. Adwoa Pokuaa", opened: "2026-05-15" },
];

// ============================================================
// INVENTORY
// ============================================================
export type Asset = {
  id: string;
  name: string;
  category: "Musical" | "Sound" | "Video" | "Furniture" | "Power" | "Vehicle" | "IT" | "Fixture" | "Catering";
  branch: string;
  location: string;
  condition: "Excellent" | "Good" | "Fair" | "Poor" | "Decommissioned";
  purchased: string;
  cost: number;
  nextService?: string;
};

export const assets: Asset[] = [
  { id: "AST-001", name: "Yamaha PSR-A5000 Keyboard", category: "Musical", branch: "Madina Central", location: "Main Auditorium", condition: "Excellent", purchased: "2024-02-12", cost: 18400 },
  { id: "AST-002", name: "Behringer X32 Compact Mixer", category: "Sound", branch: "Madina Central", location: "Sound Booth", condition: "Good", purchased: "2022-09-05", cost: 22500, nextService: "2026-08-15" },
  { id: "AST-003", name: "Sony PXW-Z150 Camera", category: "Video", branch: "Madina Central", location: "Media Room", condition: "Good", purchased: "2023-04-18", cost: 31200 },
  { id: "AST-004", name: "10kVA Diesel Generator", category: "Power", branch: "Madina Central", location: "Generator Room", condition: "Fair", purchased: "2020-11-09", cost: 48000, nextService: "2026-05-15" },
  { id: "AST-005", name: "Toyota Hiace Bus (GR-2102-22)", category: "Vehicle", branch: "Madina Central", location: "Car Park", condition: "Good", purchased: "2022-01-20", cost: 165000, nextService: "2026-06-20" },
  { id: "AST-006", name: "HP LaserJet Pro Printer", category: "IT", branch: "Madina Central", location: "Office", condition: "Good", purchased: "2023-08-11", cost: 3200 },
  { id: "AST-007", name: "Sony PXW-Z150 Camera #2", category: "Video", branch: "Kumasi Central", location: "Media Room", condition: "Poor", purchased: "2022-07-14", cost: 28900 },
  { id: "AST-008", name: "150 Plastic Chairs", category: "Furniture", branch: "Kasoa", location: "Hall", condition: "Good", purchased: "2024-03-02", cost: 12000 },
  { id: "AST-009", name: "Drum Kit — Pearl Export", category: "Musical", branch: "Kumasi Central", location: "Main Hall", condition: "Excellent", purchased: "2025-01-30", cost: 14800 },
  { id: "AST-010", name: "Air Conditioning Units (3)", category: "Fixture", branch: "Tema Community 4", location: "Auditorium", condition: "Good", purchased: "2023-11-22", cost: 18000, nextService: "2026-07-10" },
];

export const supplies = [
  { item: "Offering envelopes", branch: "Madina Central", onHand: 1240, threshold: 500, status: "OK" },
  { item: "Offering envelopes", branch: "Kasoa", onHand: 280, threshold: 500, status: "LOW" },
  { item: "Offering envelopes", branch: "Kumasi Central", onHand: 110, threshold: 500, status: "LOW" },
  { item: "Communion wafers (box)", branch: "Madina Central", onHand: 14, threshold: 6, status: "OK" },
  { item: "A4 printing paper (reams)", branch: "Madina Central", onHand: 8, threshold: 4, status: "OK" },
  { item: "Cleaning supplies kit", branch: "Takoradi", onHand: 1, threshold: 2, status: "LOW" },
];

// ============================================================
// MEDIA
// ============================================================
export type Sermon = {
  id: string;
  title: string;
  preacher: string;
  date: string;
  branch: string;
  series?: string;
  scripture: string;
  duration: string;
  views: number;
  tags: string[];
  visibility: "Public" | "Members Only" | "Branch Only";
};

export const sermons: Sermon[] = [
  { id: "SER-2026-019", title: "The Sealing of the Sacred Flow", preacher: "Apostle K. Asamoah", date: "2026-05-25", branch: "Madina Central", series: "Pentecost 2026", scripture: "Eph. 1:13–14", duration: "48:12", views: 4820, tags: ["Holy Spirit", "Sealing", "Identity"], visibility: "Public" },
  { id: "SER-2026-018", title: "When the Wind Comes Through Madina", preacher: "Rev. Samuel Boateng", date: "2026-05-18", branch: "Madina Central", series: "Pentecost 2026", scripture: "Acts 2:1–4", duration: "41:08", views: 3210, tags: ["Pentecost", "Wind", "Outpouring"], visibility: "Public" },
  { id: "SER-2026-017", title: "What the Womb Remembers", preacher: "Pastor Esther Mensah", date: "2026-05-11", branch: "Kasoa", series: "Mother's Day 2026", scripture: "1 Sam. 1:9–18", duration: "36:44", views: 1880, tags: ["Mothers", "Hannah", "Prayer"], visibility: "Public" },
  { id: "SER-2026-016", title: "A Faithful Audit", preacher: "Rev. Daniel Owusu", date: "2026-05-04", branch: "Kumasi Central", scripture: "Lk. 16:10–12", duration: "44:21", views: 2140, tags: ["Stewardship", "Money", "Faithfulness"], visibility: "Public" },
  { id: "SER-2026-015", title: "The Cell Group and the Cloud", preacher: "Pastor Akua Nyamekye", date: "2026-04-27", branch: "Tema Community 4", scripture: "Ex. 13:21", duration: "38:55", views: 1620, tags: ["Cell Groups", "Guidance"], visibility: "Members Only" },
  { id: "SER-2026-014", title: "Bringing All People", preacher: "Apostle K. Asamoah", date: "2026-04-20", branch: "Madina Central", series: "The Mission, Restated", scripture: "Matt. 28:18–20", duration: "52:03", views: 5640, tags: ["Mission", "Great Commission"], visibility: "Public" },
];

export type Devotion = {
  id: string;
  date: string;
  title: string;
  scripture: string;
  reflection: string;
  author: string;
  published: boolean;
};

export const devotions: Devotion[] = [
  { id: "DEV-2026-146", date: "2026-05-26", title: "The Lord is your Keeper", scripture: "Ps. 121:5–8", reflection: "The keeping of God is not a watch from a distance but a presence at the gate — coming in and going out, He keeps you.", author: "Apostle K. Asamoah", published: true },
  { id: "DEV-2026-147", date: "2026-05-27", title: "Quiet enough to hear", scripture: "1 Kgs. 19:11–13", reflection: "Elijah did not find God in the wind or the fire, but in a whisper. There is a kind of quiet that the church must still learn.", author: "Rev. Samuel Boateng", published: true },
  { id: "DEV-2026-148", date: "2026-05-28", title: "The unfinished list", scripture: "Phil. 1:6", reflection: "There is no inbox in heaven. What He starts He completes — and the half-done parts of your life are not abandoned, only continued.", author: "Pastor Esther Mensah", published: false },
];

// ============================================================
// EVENTS
// ============================================================
export type Event = {
  id: string;
  name: string;
  type: "Regular Service" | "Special Program" | "Conference" | "Outreach" | "Concert" | "Youth Camp" | "Welfare Drive";
  branch: string;
  venue: string;
  start: string;
  end: string;
  expected: number;
  registered: number;
  coordinator: string;
  budget: number;
  registrationRequired: boolean;
  visibility: "Public" | "Internal";
};

export const events: Event[] = [
  { id: "EVT-2026-024", name: "Pentecost Sunday — Sealed", type: "Regular Service", branch: "All branches", venue: "Madina Central + livestream", start: "2026-05-28 08:00", end: "2026-05-28 12:00", expected: 3400, registered: 0, coordinator: "Rev. Samuel Boateng", budget: 4200, registrationRequired: false, visibility: "Public" },
  { id: "EVT-2026-025", name: "Founders' Day 2026", type: "Conference", branch: "Madina Central", venue: "Main Auditorium", start: "2026-06-17 09:00", end: "2026-06-17 17:00", expected: 1800, registered: 814, coordinator: "Mrs. Charity Adusei", budget: 28500, registrationRequired: true, visibility: "Public" },
  { id: "EVT-2026-026", name: "Youth Camp — Set Apart", type: "Youth Camp", branch: "Madina Central", venue: "Akosombo Retreat Centre", start: "2026-07-22 16:00", end: "2026-07-25 18:00", expected: 240, registered: 132, coordinator: "Pst. Caleb Anyetei", budget: 18000, registrationRequired: true, visibility: "Internal" },
  { id: "EVT-2026-027", name: "Welfare Home-Visit Round", type: "Welfare Drive", branch: "Kasoa", venue: "Kasoa zone", start: "2026-06-03 09:00", end: "2026-06-03 16:00", expected: 18, registered: 14, coordinator: "Sis. Mercy Bediako", budget: 1400, registrationRequired: true, visibility: "Internal" },
  { id: "EVT-2026-028", name: "Madina Carol Night", type: "Concert", branch: "Madina Central", venue: "Main Auditorium", start: "2026-12-21 18:30", end: "2026-12-21 21:30", expected: 2200, registered: 0, coordinator: "Bro. Daniel Asante", budget: 22000, registrationRequired: false, visibility: "Public" },
  { id: "EVT-2026-029", name: "Kumasi Outreach — Suame Market", type: "Outreach", branch: "Kumasi Central", venue: "Suame Market square", start: "2026-06-08 06:00", end: "2026-06-08 11:00", expected: 60, registered: 34, coordinator: "Sis. Hannah Boakye", budget: 1800, registrationRequired: true, visibility: "Internal" },
];

// ============================================================
// COMMUNICATIONS
// ============================================================
export const broadcasts = [
  { id: "BC-2026-077", when: "2026-05-26 09:42", sender: "National Admin", channels: ["Email", "SMS", "Push"], audience: "All branches · all members", subject: "Quarterly remittance window opens Monday", deliveries: 4203, opens: 3140 },
  { id: "BC-2026-076", when: "2026-05-25 17:10", sender: "Madina · Branch Pastor", channels: ["WhatsApp", "Push"], audience: "Madina · all departments", subject: "Pentecost dress code reminder", deliveries: 1820, opens: 1568 },
  { id: "BC-2026-075", when: "2026-05-24 11:30", sender: "Welfare Coordinator", channels: ["Email"], audience: "Welfare team · all branches", subject: "Case review cadence — June onwards", deliveries: 38, opens: 36 },
  { id: "BC-2026-074", when: "2026-05-22 08:00", sender: "Daily Devotion Bot", channels: ["Email", "Push"], audience: "Daily devotion subscribers", subject: "Quiet enough to hear", deliveries: 2840, opens: 1972 },
];

export const templates = [
  { id: "TPL-001", name: "New member welcome", channels: ["Email", "SMS"], lastUsed: "2026-05-25", variables: ["member_name", "branch_name", "pastor_name"] },
  { id: "TPL-002", name: "Birthday greeting", channels: ["SMS", "WhatsApp"], lastUsed: "2026-05-26", variables: ["member_name", "age"] },
  { id: "TPL-003", name: "Transfer letter", channels: ["Email"], lastUsed: "2026-05-19", variables: ["member_name", "from_branch", "to_branch", "reason"] },
  { id: "TPL-004", name: "Welfare disbursement notice", channels: ["Email", "SMS"], lastUsed: "2026-05-20", variables: ["member_name", "amount", "case_id"] },
  { id: "TPL-005", name: "Absentee follow-up", channels: ["SMS"], lastUsed: "2026-05-24", variables: ["member_name", "branch_name", "weeks_absent"] },
];

// ============================================================
// REPORTS / ROLES / AUDIT
// ============================================================
export const standardReports = [
  { title: "Weekly Attendance Report", frequency: "Weekly", audience: "Branch Pastor, HQ", lastRun: "2026-05-26", format: "PDF · Excel" },
  { title: "Monthly Finance Summary", frequency: "Monthly", audience: "Finance Officers, HQ", lastRun: "2026-05-01", format: "PDF · Excel" },
  { title: "Quarterly Membership Report", frequency: "Quarterly", audience: "HQ Leadership", lastRun: "2026-04-01", format: "PDF" },
  { title: "Annual Financial Report", frequency: "Yearly", audience: "All leaders, AGM", lastRun: "2026-01-15", format: "PDF" },
  { title: "Welfare Case Summary", frequency: "Monthly", audience: "Welfare Coordinators", lastRun: "2026-05-01", format: "PDF" },
  { title: "Department Activity Report", frequency: "Monthly", audience: "Department Heads", lastRun: "2026-05-01", format: "PDF" },
  { title: "Giving Statement (per member)", frequency: "On demand", audience: "Individual members", lastRun: "—", format: "PDF" },
  { title: "Asset Condition Report", frequency: "Quarterly", audience: "Branch Admin, HQ", lastRun: "2026-04-01", format: "Excel" },
  { title: "HR / Staffing Report", frequency: "Monthly", audience: "HR, National Admin", lastRun: "2026-05-01", format: "PDF" },
];

export const roles = [
  { name: "General Overseer", scope: "Apex — all data", users: 1, permissions: ["read:*", "write:*", "approve:*", "delete:restricted", "export:*"] },
  { name: "National Administrator", scope: "All branches", users: 2, permissions: ["read:*", "write:*", "approve:most", "export:*"] },
  { name: "National Finance Officer", scope: "Finance · all branches", users: 1, permissions: ["read:finance", "write:finance", "approve:finance", "export:finance"] },
  { name: "National Welfare Coordinator", scope: "Welfare · all branches", users: 1, permissions: ["read:welfare", "write:welfare", "approve:welfare"] },
  { name: "Branch Pastor", scope: "Own branch — all modules", users: 6, permissions: ["read:branch", "write:branch", "approve:branch"] },
  { name: "Branch Finance Officer", scope: "Finance · own branch", users: 6, permissions: ["read:finance@branch", "write:finance@branch"] },
  { name: "Branch Welfare Officer", scope: "Welfare · own branch", users: 6, permissions: ["read:welfare@branch", "write:welfare@branch"] },
  { name: "Department Head", scope: "Own department", users: 19, permissions: ["read:dept", "write:dept"] },
  { name: "Worker", scope: "Attendance · event check-in", users: 84, permissions: ["read:limited", "write:attendance"] },
  { name: "Member", scope: "Own profile", users: 4277, permissions: ["read:self", "write:self"] },
];

export const auditLog = [
  { when: "2026-05-26 14:18", who: "Rev. Samuel Boateng", what: "Approved collection COL-2026-219 (₵29,000)", where: "Madina Central · Finance", ip: "10.0.4.18" },
  { when: "2026-05-26 13:55", who: "Mrs. Joyce Tetteh", what: "Created leave request LV-441 for Mr. Felix Dadzie", where: "HQ · HR", ip: "10.0.1.4" },
  { when: "2026-05-26 12:30", who: "Sis. Adwoa Pokuaa", what: "Logged home-visit on WLF-2026-041", where: "Madina Central · Welfare", ip: "10.0.4.22" },
  { when: "2026-05-26 11:02", who: "Apostle K. Asamoah", what: "Sent broadcast BC-2026-077 to 4,203 recipients", where: "HQ · Communications", ip: "10.0.1.2" },
  { when: "2026-05-26 09:14", who: "Mr. K. Sarpong", what: "Submitted collection COL-2026-221 for approval", where: "Kasoa · Finance", ip: "10.0.5.7" },
  { when: "2026-05-25 22:08", who: "Apostle K. Asamoah", what: "Uploaded sermon SER-2026-019 (audio + transcript)", where: "HQ · Media", ip: "10.0.1.2" },
  { when: "2026-05-25 18:45", who: "Pastor Akua Nyamekye", what: "Approved expense EXP-2026-091 (₵3,800)", where: "Kasoa · Finance", ip: "10.0.2.11" },
  { when: "2026-05-25 17:22", who: "System", what: "Auto-archived 14 expired announcements", where: "Platform · Content", ip: "—" },
];

export const churchProfile = {
  name: "Christ Kingdom Salvation Pentecostal Church",
  short: "CKSPC",
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
};
