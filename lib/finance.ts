import { asc, desc, eq, sql } from "drizzle-orm";
import { db } from "./db";
import { collections, tithes, expenses, type Collection, type Tithe, type Expense } from "./db/schema";

export type { Collection, Tithe, Expense };

export async function getCollections(branch?: string): Promise<Collection[]> {
  try {
    let q = db.select().from(collections).$dynamic();
    if (branch) q = q.where(eq(collections.branch, branch));
    return await q.orderBy(desc(collections.date), asc(collections.id)).limit(100);
  } catch {
    return [];
  }
}

export async function getTithes(branch?: string): Promise<Tithe[]> {
  try {
    let q = db.select().from(tithes).$dynamic();
    if (branch) q = q.where(eq(tithes.branch, branch));
    return await q.orderBy(desc(tithes.date), asc(tithes.id)).limit(100);
  } catch {
    return [];
  }
}

export async function getExpenses(branch?: string): Promise<Expense[]> {
  try {
    let q = db.select().from(expenses).$dynamic();
    if (branch) q = q.where(eq(expenses.branch, branch));
    return await q.orderBy(desc(expenses.date), asc(expenses.id)).limit(100);
  } catch {
    return [];
  }
}

export async function getFinanceSummary() {
  try {
    const [c] = await db.select({
      totalIncome: sql<number>`coalesce(sum(tithes + offerings + thanksgiving + designated + welfare_fund), 0)::numeric`,
      totalTithes: sql<number>`coalesce(sum(tithes), 0)::numeric`,
      totalOfferings: sql<number>`coalesce(sum(offerings), 0)::numeric`,
      count: sql<number>`count(*)::int`,
    }).from(collections);
    const [e] = await db.select({
      totalExpenses: sql<number>`coalesce(sum(amount), 0)::numeric`,
      pending: sql<number>`count(*) filter (where status = 'Pending')::int`,
    }).from(expenses);
    return {
      totalIncome: Number(c.totalIncome),
      totalTithes: Number(c.totalTithes),
      totalOfferings: Number(c.totalOfferings),
      collectionCount: c.count,
      totalExpenses: Number(e.totalExpenses),
      pendingExpenses: e.pending,
    };
  } catch {
    return { totalIncome: 0, totalTithes: 0, totalOfferings: 0, collectionCount: 0, totalExpenses: 0, pendingExpenses: 0 };
  }
}

export function formatGHS(n: number): string {
  return `₵${n.toLocaleString("en-GH", { minimumFractionDigits: 0 })}`;
}
