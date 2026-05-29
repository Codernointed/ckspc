import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

type Db = ReturnType<typeof drizzle<typeof schema>>;

// Lazy initialisation — the singleton is created on first use, not at
// module load time. This lets Next.js compile and collect page metadata
// for all routes without needing DATABASE_URL available during the build
// step itself (it is only needed at request time on the server).
let _db: Db | null = null;

function getDb(): Db {
  if (_db) return _db;
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Add it to .env.local (local) or to Vercel Environment Variables (production)."
    );
  }
  // Disable Next.js fetch caching for DB queries — we never want the
  // framework to serve a stale database read from its fetch cache.
  const sql = neon(url, { fetchOptions: { cache: "no-store" } });
  _db = drizzle(sql, { schema });
  return _db;
}

// Proxy: every property access goes through getDb() so callers use
// `db.select()`, `db.insert()` etc. exactly as before — but the
// underlying connection is only opened on the first actual call.
export const db = new Proxy({} as Db, {
  get(_target, prop) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (getDb() as any)[prop];
  },
}) as Db;

export { schema };
