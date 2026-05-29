import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set. Add it to .env.local.");
}

// Disable Next.js fetch caching for DB queries — we never want the
// framework to serve a stale database read from its fetch cache.
const sql = neon(connectionString, { fetchOptions: { cache: "no-store" } });
export const db = drizzle(sql, { schema });
export { schema };
