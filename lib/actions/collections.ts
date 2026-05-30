"use server";

import { revalidatePath } from "next/cache";
import { and, asc, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { contentItems } from "@/lib/db/schema";
import { auth } from "@/lib/auth/config";
import { canAccess } from "@/lib/auth/rbac";
import { getCollectionDef } from "@/lib/collections";

export type ItemResult = { ok: boolean; message: string };

async function guard(): Promise<{ email: string } | ItemResult> {
  const session = await auth();
  if (!session?.user || !canAccess(session.user.role, "website")) {
    return { ok: false, message: "You don't have permission to edit website content." };
  }
  return { email: session.user.email ?? "admin" };
}

function revalidateFor(collection: string) {
  revalidatePath("/"); // hero, stats, services, founder, gallery on home
  revalidatePath("/leadership");
  revalidatePath("/ministries");
  revalidatePath("/media");
  revalidatePath(`/website/${collection}`);
}

function readItem(collection: string, formData: FormData) {
  const def = getCollectionDef(collection);
  const data: Record<string, string> = {};
  if (def) {
    for (const f of def.fields) data[f.name] = String(formData.get(f.name) ?? "").trim();
  }
  return data;
}

export async function createItem(_prev: ItemResult | null, formData: FormData): Promise<ItemResult> {
  const g = await guard();
  if ("ok" in g) return g;

  const collection = String(formData.get("__collection") ?? "");
  if (!getCollectionDef(collection)) return { ok: false, message: "Unknown collection." };

  const data = readItem(collection, formData);
  const [{ max }] = await db
    .select({ max: sql<number>`coalesce(max(${contentItems.sort}), -1)::int` })
    .from(contentItems)
    .where(eq(contentItems.collection, collection));

  await db.insert(contentItems).values({
    collection,
    sort: (max ?? -1) + 1,
    data,
    updatedBy: g.email,
  });
  revalidateFor(collection);
  return { ok: true, message: "Item added." };
}

export async function updateItem(_prev: ItemResult | null, formData: FormData): Promise<ItemResult> {
  const g = await guard();
  if ("ok" in g) return g;

  const id = Number(formData.get("id"));
  const collection = String(formData.get("__collection") ?? "");
  if (!id || !getCollectionDef(collection)) return { ok: false, message: "Bad request." };

  const data = readItem(collection, formData);
  const visible = formData.get("visible") === "on"; // unchecked checkbox sends nothing
  await db
    .update(contentItems)
    .set({ data, visible, updatedAt: sql`now()`, updatedBy: g.email })
    .where(eq(contentItems.id, id));
  revalidateFor(collection);
  return { ok: true, message: "Saved." };
}

/** Void wrappers for direct <form action> use (delete + reorder). */
export async function deleteItemForm(formData: FormData): Promise<void> {
  const g = await guard();
  if ("ok" in g) return;
  const id = Number(formData.get("id"));
  const collection = String(formData.get("__collection") ?? "");
  if (!id) return;
  await db.delete(contentItems).where(eq(contentItems.id, id));
  revalidateFor(collection);
}

export async function moveItemForm(formData: FormData): Promise<void> {
  const g = await guard();
  if ("ok" in g) return;
  const id = Number(formData.get("id"));
  const dir = String(formData.get("dir"));
  const collection = String(formData.get("__collection") ?? "");
  if (!id || !getCollectionDef(collection)) return;

  const rows = await db
    .select({ id: contentItems.id, sort: contentItems.sort })
    .from(contentItems)
    .where(eq(contentItems.collection, collection))
    .orderBy(asc(contentItems.sort), asc(contentItems.id));

  const idx = rows.findIndex((r) => r.id === id);
  if (idx === -1) return;
  const swapWith = dir === "up" ? idx - 1 : idx + 1;
  if (swapWith < 0 || swapWith >= rows.length) return;

  const a = rows[idx];
  const b = rows[swapWith];
  // Swap sort values.
  await db.update(contentItems).set({ sort: b.sort }).where(eq(contentItems.id, a.id));
  await db.update(contentItems).set({ sort: a.sort }).where(eq(contentItems.id, b.id));
  revalidateFor(collection);
}
