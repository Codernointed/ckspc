"use server";

import { revalidatePath } from "next/cache";
import { eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { collections, expenses } from "@/lib/db/schema";
import { auth } from "@/lib/auth/config";
import { canAccess } from "@/lib/auth/rbac";

export type FinResult = { ok: boolean; message: string };

async function guard(): Promise<FinResult | null> {
  const session = await auth();
  if (!session?.user || !canAccess(session.user.role, "finance")) {
    return { ok: false, message: "No permission." };
  }
  return null;
}

function str(fd: FormData, k: string) { return String(fd.get(k) ?? "").trim(); }
function num(fd: FormData, k: string) { return Number(fd.get(k) ?? 0); }

export async function recordCollection(_prev: FinResult | null, fd: FormData): Promise<FinResult> {
  const blocked = await guard();
  if (blocked) return blocked;
  const [{ count }] = await db.select({ count: sql<number>`count(*)::int` }).from(collections);
  const collectionId = `COL-2026-${String(count + 1).padStart(3, "0")}`;
  await db.insert(collections).values({
    collectionId,
    date: str(fd, "date"),
    branch: str(fd, "branch"),
    service: str(fd, "service") || "Sunday Service",
    tithes: num(fd, "tithes"),
    offerings: num(fd, "offerings"),
    thanksgiving: num(fd, "thanksgiving"),
    designated: num(fd, "designated"),
    welfareFund: num(fd, "welfareFund"),
    recorder: str(fd, "recorder") || "Admin",
    status: "Pending",
  });
  revalidatePath("/finance");
  return { ok: true, message: `Collection ${collectionId} recorded.` };
}

export async function approveCollection(fd: FormData): Promise<void> {
  const blocked = await guard();
  if (blocked) return;
  const id = Number(fd.get("id"));
  if (!id) return;
  const session = await auth();
  await db.update(collections).set({ status: "Approved", approver: session?.user?.name ?? "Admin" }).where(eq(collections.id, id));
  revalidatePath("/finance");
}

export async function recordExpense(_prev: FinResult | null, fd: FormData): Promise<FinResult> {
  const blocked = await guard();
  if (blocked) return blocked;
  const [{ count }] = await db.select({ count: sql<number>`count(*)::int` }).from(expenses);
  const expenseId = `EXP-2026-${String(count + 1).padStart(3, "0")}`;
  await db.insert(expenses).values({
    expenseId,
    date: str(fd, "date"),
    branch: str(fd, "branch"),
    category: str(fd, "category") || "Utilities",
    description: str(fd, "description"),
    amount: num(fd, "amount"),
    requestor: str(fd, "requestor") || "Admin",
    status: "Pending",
  });
  revalidatePath("/finance");
  return { ok: true, message: `Expense ${expenseId} recorded.` };
}

export async function approveExpense(fd: FormData): Promise<void> {
  const blocked = await guard();
  if (blocked) return;
  const id = Number(fd.get("id"));
  if (!id) return;
  const session = await auth();
  await db.update(expenses).set({ status: "Approved", approver: session?.user?.name ?? "Admin" }).where(eq(expenses.id, id));
  revalidatePath("/finance");
}
