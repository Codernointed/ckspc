import Link from "next/link";
import { Topbar } from "../../../components/Topbar";
import { PageHead } from "../../../components/PageHead";
import { SectionEditor } from "../../../components/website/SectionEditor";
import { HOME_SECTIONS, getHomeContent } from "../../../lib/content";
import { COLLECTIONS, getCollectionRows } from "../../../lib/collections";
import { auth } from "../../../lib/auth/config";
import { canAccess } from "../../../lib/auth/rbac";

export const dynamic = "force-dynamic";

export default async function WebsiteContentPage() {
  const session = await auth();
  const allowed = canAccess(session?.user?.role, "website");

  return (
    <>
      <Topbar crumbs={["CKSPC", "Public site", "Website content"]} />
      <main className="main">
        <PageHead
          eyebrow="Public site · content"
          title="Edit the"
          emphasis="public website."
          lede="Everything visitors read and see — managed here. Changes publish to the live site immediately."
          actions={
            <a href="/" target="_blank" rel="noreferrer" className="btn btn-secondary">
              View live site ↗
            </a>
          }
        />

        {!allowed ? (
          <div className="restricted-banner">
            <span className="seal">✦</span>
            <div>
              <div className="title">Restricted</div>
              <div className="body">
                Editing website content requires the Media Director, IT
                Administrator, or National Administrator role.
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Collections (lists you can add to / reorder) */}
            <h2 style={{ fontSize: "var(--fs-lg)", marginBottom: "var(--space-2)" }}>
              Pages &amp; lists
            </h2>
            <p className="muted" style={{ fontSize: "var(--fs-sm)", marginBottom: "var(--space-4)" }}>
              Add, edit, reorder or remove the people and cards shown across the site.
            </p>
            <div className="three-col" style={{ marginBottom: "var(--space-8)" }}>
              <Link href="/branches" className="card" style={cardLink}>
                <div className="card-head">
                  <h3 style={{ fontSize: "var(--fs-md)" }}>Branches</h3>
                  <span className="chip">manage →</span>
                </div>
                <p className="muted" style={{ fontSize: "var(--fs-sm)" }}>
                  Add church plants, edit locations, photos, service times.
                </p>
              </Link>
              {await Promise.all(
                COLLECTIONS.map(async (c) => {
                  const rows = await getCollectionRows(c.key);
                  return (
                    <Link key={c.key} href={`/website/${c.key}`} className="card" style={cardLink}>
                      <div className="card-head">
                        <h3 style={{ fontSize: "var(--fs-md)" }}>{c.title}</h3>
                        <span className="chip">{rows.length} · manage →</span>
                      </div>
                      <p className="muted" style={{ fontSize: "var(--fs-sm)" }}>{c.description}</p>
                    </Link>
                  );
                })
              )}
            </div>

            {/* Home text sections */}
            <h2 style={{ fontSize: "var(--fs-lg)", marginBottom: "var(--space-2)" }}>
              Homepage text
            </h2>
            <p className="muted" style={{ fontSize: "var(--fs-sm)", marginBottom: "var(--space-4)" }}>
              The wording of the main homepage sections.
            </p>
            {await renderEditors()}
          </>
        )}

        <div className="folio-foot">
          <span>· public site · content management ·</span>
          <span>Folio · web</span>
        </div>
      </main>
    </>
  );
}

const cardLink: React.CSSProperties = { textDecoration: "none", color: "inherit", display: "block" };

async function renderEditors() {
  const content = await getHomeContent();
  return (
    <div style={{ maxWidth: 760 }}>
      {HOME_SECTIONS.map((schema) => (
        <SectionEditor key={schema.key} schema={schema} values={content[schema.key] ?? {}} />
      ))}
    </div>
  );
}
