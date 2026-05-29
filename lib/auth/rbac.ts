// ============================================================
// Role-Based Access Control (MD §17)
// Single source of truth for roles and what modules each can reach.
// Used for nav filtering (client) and route guards (server).
// ============================================================

export type ModuleKey =
  | "hq"
  | "branch"
  | "members"
  | "departments"
  | "fellowships"
  | "hr"
  | "finance"
  | "welfare"
  | "inventory"
  | "sermons"
  | "devotions"
  | "events"
  | "comms"
  | "website" // editable public-site CMS
  | "reports"
  | "roles"
  | "audit"
  | "settings";

export type RoleKey =
  | "general_overseer"
  | "national_admin"
  | "national_finance"
  | "national_welfare"
  | "national_media"
  | "national_hr"
  | "national_it"
  | "branch_pastor"
  | "branch_finance"
  | "branch_welfare"
  | "branch_secretary"
  | "department_head"
  | "worker"
  | "member";

type RoleDef = {
  label: string;
  scope: string;
  /** "*" = every module; otherwise the explicit allow-list. */
  modules: "*" | ModuleKey[];
};

export const ROLES: Record<RoleKey, RoleDef> = {
  general_overseer: { label: "General Overseer", scope: "Apex — all data", modules: "*" },
  national_admin: { label: "National Administrator", scope: "All branches", modules: "*" },
  national_finance: {
    label: "National Finance Officer",
    scope: "Finance · all branches",
    modules: ["hq", "finance", "reports"],
  },
  national_welfare: {
    label: "National Welfare Coordinator",
    scope: "Welfare · all branches",
    modules: ["hq", "welfare", "reports"],
  },
  national_media: {
    label: "National Media Director",
    scope: "Media & content · all branches",
    modules: ["hq", "sermons", "devotions", "events", "comms", "website"],
  },
  national_hr: {
    label: "National HR Officer",
    scope: "HR · all branches",
    modules: ["hq", "hr", "reports"],
  },
  national_it: {
    label: "National IT Administrator",
    scope: "Platform configuration",
    modules: ["hq", "roles", "audit", "settings", "website"],
  },
  branch_pastor: {
    label: "Branch Pastor",
    scope: "Own branch — all modules",
    modules: [
      "hq",
      "branch",
      "members",
      "departments",
      "fellowships",
      "hr",
      "finance",
      "welfare",
      "inventory",
      "sermons",
      "devotions",
      "events",
      "comms",
      "reports",
    ],
  },
  branch_finance: {
    label: "Branch Finance Officer",
    scope: "Finance · own branch",
    modules: ["branch", "finance"],
  },
  branch_welfare: {
    label: "Branch Welfare Officer",
    scope: "Welfare · own branch",
    modules: ["branch", "welfare"],
  },
  branch_secretary: {
    label: "Branch Secretary",
    scope: "Members, events, comms · own branch",
    modules: ["branch", "members", "events", "comms"],
  },
  department_head: {
    label: "Department Head",
    scope: "Own department",
    modules: ["branch", "departments", "fellowships"],
  },
  worker: {
    label: "Worker",
    scope: "Attendance · event check-in",
    modules: ["branch", "events"],
  },
  member: {
    label: "Member",
    scope: "Own profile",
    modules: [],
  },
};

export function isRoleKey(value: string | undefined | null): value is RoleKey {
  return !!value && value in ROLES;
}

export function roleLabel(role: string | undefined | null): string {
  return isRoleKey(role) ? ROLES[role].label : "Member";
}

/** Can a role reach a given module? */
export function canAccess(role: string | undefined | null, module: ModuleKey): boolean {
  if (!isRoleKey(role)) return false;
  const def = ROLES[role];
  return def.modules === "*" || def.modules.includes(module);
}
