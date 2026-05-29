"use server";

import { revalidatePath } from "next/cache";
import { eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { branches } from "@/lib/db/schema";
import { auth } from "@/lib/auth/config";
import { canAccess } from "@/lib/auth/rbac";
import { slugify } from "@/lib/branches";

export type BranchResult = { ok: boolean; message: string };

async function guard(): Promise<BranchResult | null> {
  const session = await auth();
  if (!session?.user || !canAccess(session.user.role, "branch")) {
    return { ok: false, message: "You don't have permission to manage branches." };
  }
  return null;
}

function readForm(formData: FormData) {
  const str = (k: string) => String(formData.get(k) ?? "").trim();
  return {
    name: str("name"),
    code: str("code"),
    region: str("region") || null,
    district: str("district") || null,
    tier: str("tier") || "Full Branch",
    pastor: str("pastor") || null,
    address: str("address") || null,
    area: str("area") || null,
    serviceTimes: str("serviceTimes") || null,
    phone: str("phone") || null,
    email: str("email") || null,
    imageUrl: str("imageUrl") || null,
    isHq: formData.get("isHq") === "on" || formData.get("isHq") === "true",
  };
}

function revalidate() {
  revalidatePath("/"); // public homepage branch grid
  revalidatePath("/branches"); // admin list
}

/** Create a new branch (e.g. a new church plant). */
export async function createBranch(formData: FormData): Promise<BranchResult> {
  const blocked = await guard();
  if (blocked) return blocked;

  const data = readForm(formData);
  if (!data.name) return { ok: false, message: "Branch name is required." };

  // Unique slug.
  let base = slugify(data.name) || "branch";
  let slug = base;
  let n = 2;
  while ((await db.select({ id: branches.id }).from(branches).where(eq(branches.slug, slug))).length) {
    slug = `${base}-${n++}`;
  }

  // Auto-assign a code if none given (CKSPC-00N).
  let code = data.code;
  if (!code) {
    const [{ count }] = await db.select({ count: sql<number>`count(*)::int` }).from(branches);
    code = `CKSPC-${String(count + 1).padStart(3, "0")}`;
  }

  await db.insert(branches).values({ ...data, code, slug });
  revalidate();
  return { ok: true, message: `Branch "${data.name}" created.` };
}

/** Update an existing branch. */
export async function updateBranch(formData: FormData): Promise<BranchResult> {
  const blocked = await guard();
  if (blocked) return blocked;

  const id = Number(formData.get("id"));
  if (!id) return { ok: false, message: "Missing branch id." };

  const data = readForm(formData);
  if (!data.name) return { ok: false, message: "Branch name is required." };

  await db.update(branches).set(data).where(eq(branches.id, id));
  revalidate();
  return { ok: true, message: `Branch "${data.name}" saved.` };
}

/** Remove a branch. */
export async function deleteBranch(formData: FormData): Promise<BranchResult> {
  const blocked = await guard();
  if (blocked) return blocked;

  const id = Number(formData.get("id"));
  if (!id) return { ok: false, message: "Missing branch id." };

  await db.delete(branches).where(eq(branches.id, id));
  revalidate();
  return { ok: true, message: "Branch removed." };
}

/** Void-returning wrapper for use directly as a <form action>. */
export async function deleteBranchForm(formData: FormData): Promise<void> {
  await deleteBranch(formData);
}
