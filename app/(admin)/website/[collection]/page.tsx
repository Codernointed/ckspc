import Link from "next/link";
import { notFound } from "next/navigation";
import { Topbar } from "../../../../components/Topbar";
import { PageHead } from "../../../../components/PageHead";
import { CollectionManager } from "../../../../components/website/CollectionManager";
import { getCollectionDef, getCollectionRows } from "../../../../lib/collections";
import { auth } from "../../../../lib/auth/config";
import { canAccess } from "../../../../lib/auth/rbac";

export const dynamic = "force-dynamic";

export default async function CollectionAdminPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  const def = getCollectionDef(collection);
  if (!def) notFound();

  const session = await auth();
  const canManage = canAccess(session?.user?.role, "website");
  const rows = await getCollectionRows(collection);

  return (
    <>
      <Topbar crumbs={["CKSPC", "Public site", "Website content", def.title]} />
      <main className="main">
        <PageHead
          eyebrow="Public site · content"
          title={`Manage`}
          emphasis={def.title.toLowerCase() + "."}
          lede={def.description}
          actions={
            <Link href="/website" className="btn btn-secondary">← All content</Link>
          }
        />
        <CollectionManager
          def={{ key: def.key, title: def.title, description: def.description, fields: def.fields }}
          rows={rows.map((r) => ({ id: r.id, sort: r.sort, visible: r.visible, data: r.data }))}
          canManage={canManage}
        />
        <div className="folio-foot">
          <span>· public site · {def.key} ·</span>
          <span>Folio · web</span>
        </div>
      </main>
    </>
  );
}
