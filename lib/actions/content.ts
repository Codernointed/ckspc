"use server";

import { revalidatePath } from "next/cache";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { siteContent } from "@/lib/db/schema";
import { auth } from "@/lib/auth/config";
import { canAccess } from "@/lib/auth/rbac";
import { HOME_SECTIONS } from "@/lib/content";

export type SaveResult = { ok: boolean; message: string };

/**
 * Persist edits to a single home-page section.
 * Guarded by the "website" module permission.
 */
export async function saveHomeSection(
  _prev: SaveResult | null,
  formData: FormData
): Promise<SaveResult> {
  const session = await auth();
  if (!session?.user || !canAccess(session.user.role, "website")) {
    return { ok: false, message: "You don't have permission to edit website content." };
  }

  const section = String(formData.get("__section") ?? "");
  const schema = HOME_SECTIONS.find((s) => s.key === section);
  if (!schema) {
    return { ok: false, message: "Unknown section." };
  }

  // Collect only the declared fields for this section.
  const data: Record<string, string> = {};
  for (const field of schema.fields) {
    data[field.name] = String(formData.get(field.name) ?? "").trim();
  }

  await db
    .insert(siteContent)
    .values({
      page: "home",
      section,
      data,
      updatedBy: session.user.email ?? session.user.name ?? "admin",
    })
    .onConflictDoUpdate({
      target: [siteContent.page, siteContent.section],
      set: { data, updatedAt: sql`now()`, updatedBy: session.user.email ?? "admin" },
    });

  // Refresh the public home page so the change is visible immediately.
  revalidatePath("/");
  revalidatePath("/website");

  return { ok: true, message: `Saved "${schema.title}".` };
}
