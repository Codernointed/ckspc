"use server";

import { revalidatePath } from "next/cache";
import { eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { members } from "@/lib/db/schema";
import { auth } from "@/lib/auth/config";
import { canAccess } from "@/lib/auth/rbac";

export type MemberResult = { ok: boolean; message: string };

async function guard(): Promise<MemberResult | null> {
  const session = await auth();
  if (!session?.user || !canAccess(session.user.role, "members")) {
    return { ok: false, message: "No permission to manage members." };
  }
  return null;
}

function str(fd: FormData, k: string) { return String(fd.get(k) ?? "").trim(); }

export async function createMember(_prev: MemberResult | null, fd: FormData): Promise<MemberResult> {
  const blocked = await guard();
  if (blocked) return blocked;
  const firstName = str(fd, "firstName");
  const lastName = str(fd, "lastName");
  if (!firstName || !lastName) return { ok: false, message: "First and last name required." };

  const [{ count }] = await db.select({ count: sql<number>`count(*)::int` }).from(members);
  const memberId = `CKSPC-M-${String(count + 1).padStart(4, "0")}`;

  await db.insert(members).values({
    memberId,
    firstName,
    lastName,
    otherNames: str(fd, "otherNames") || null,
    gender: str(fd, "gender") || null,
    dateOfBirth: str(fd, "dateOfBirth") || null,
    phone: str(fd, "phone") || null,
    email: str(fd, "email") || null,
    address: str(fd, "address") || null,
    branch: str(fd, "branch") || null,
    status: str(fd, "status") || "Full Member",
    joinedDate: str(fd, "joinedDate") || null,
    baptised: fd.get("baptised") === "on",
    department: str(fd, "department") || null,
    cellGroup: str(fd, "cellGroup") || null,
    isMinor: fd.get("isMinor") === "on",
    imageUrl: str(fd, "imageUrl") || null,
  });
  revalidatePath("/members");
  return { ok: true, message: `Member ${memberId} created.` };
}

export async function updateMember(_prev: MemberResult | null, fd: FormData): Promise<MemberResult> {
  const blocked = await guard();
  if (blocked) return blocked;
  const id = Number(fd.get("id"));
  if (!id) return { ok: false, message: "Missing member." };
  const firstName = str(fd, "firstName");
  const lastName = str(fd, "lastName");
  if (!firstName || !lastName) return { ok: false, message: "First and last name required." };

  await db.update(members).set({
    firstName,
    lastName,
    otherNames: str(fd, "otherNames") || null,
    gender: str(fd, "gender") || null,
    dateOfBirth: str(fd, "dateOfBirth") || null,
    phone: str(fd, "phone") || null,
    email: str(fd, "email") || null,
    address: str(fd, "address") || null,
    branch: str(fd, "branch") || null,
    status: str(fd, "status") || "Full Member",
    joinedDate: str(fd, "joinedDate") || null,
    baptised: fd.get("baptised") === "on",
    department: str(fd, "department") || null,
    cellGroup: str(fd, "cellGroup") || null,
    isMinor: fd.get("isMinor") === "on",
    imageUrl: str(fd, "imageUrl") || null,
    updatedAt: sql`now()`,
  }).where(eq(members.id, id));
  revalidatePath("/members");
  return { ok: true, message: "Member saved." };
}

export async function deleteMemberForm(fd: FormData): Promise<void> {
  const blocked = await guard();
  if (blocked) return;
  const id = Number(fd.get("id"));
  if (!id) return;
  await db.delete(members).where(eq(members.id, id));
  revalidatePath("/members");
}
