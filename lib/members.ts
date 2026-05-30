import { asc, desc, eq, sql, ilike, or } from "drizzle-orm";
import { db } from "./db";
import { members, type Member } from "./db/schema";

export type { Member };

export async function getMembers(opts?: { search?: string; branch?: string; limit?: number }): Promise<Member[]> {
  try {
    let q = db.select().from(members).$dynamic();
    if (opts?.search) {
      const term = `%${opts.search}%`;
      q = q.where(or(ilike(members.firstName, term), ilike(members.lastName, term), ilike(members.memberId, term), ilike(members.phone, term)));
    }
    if (opts?.branch) q = q.where(eq(members.branch, opts.branch));
    return await q.orderBy(asc(members.lastName), asc(members.firstName)).limit(opts?.limit ?? 200);
  } catch {
    return [];
  }
}

export async function getMemberById(memberId: string): Promise<Member | null> {
  try {
    const [row] = await db.select().from(members).where(eq(members.memberId, memberId));
    return row ?? null;
  } catch {
    return null;
  }
}

export async function getMemberStats() {
  try {
    const [r] = await db.select({
      total: sql<number>`count(*)::int`,
      fullMembers: sql<number>`count(*) filter (where status = 'Full Member')::int`,
      newConverts: sql<number>`count(*) filter (where status = 'New Convert')::int`,
      visitors: sql<number>`count(*) filter (where status = 'Visitor')::int`,
      minors: sql<number>`count(*) filter (where is_minor = true)::int`,
    }).from(members);
    return r;
  } catch {
    return { total: 0, fullMembers: 0, newConverts: 0, visitors: 0, minors: 0 };
  }
}

export function nextMemberId(current: number): string {
  return `CKSPC-M-${String(current + 1).padStart(4, "0")}`;
}
