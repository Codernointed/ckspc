import { Topbar } from "../../../components/Topbar";
import { PageHead } from "../../../components/PageHead";
import { SectionEditor } from "../../../components/website/SectionEditor";
import { HOME_SECTIONS, getHomeContent } from "../../../lib/content";
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
          lede="Changes here publish straight to ckspc.org. Edit the words your visitors read — no developer needed."
          actions={
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
            >
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
            <p
              className="muted"
              style={{ maxWidth: 640, marginBottom: "var(--space-5)", fontSize: "var(--fs-sm)" }}
            >
              The homepage is assembled from the editable sections below. The
              hero, branch directory, sermons and gallery are managed in their
              own modules and will appear here as those are wired in.
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

async function renderEditors() {
  const content = await getHomeContent();
  return (
    <div style={{ maxWidth: 760 }}>
      {HOME_SECTIONS.map((schema) => (
        <SectionEditor
          key={schema.key}
          schema={schema}
          values={content[schema.key] ?? {}}
        />
      ))}
    </div>
  );
}
