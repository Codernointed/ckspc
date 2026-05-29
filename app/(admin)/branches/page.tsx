import { Topbar } from "../../../components/Topbar";
import { PageHead } from "../../../components/PageHead";
import { BranchManager } from "../../../components/branches/BranchManager";
import { getBranches } from "../../../lib/branches";
import { auth } from "../../../lib/auth/config";
import { canAccess } from "../../../lib/auth/rbac";

export const dynamic = "force-dynamic";

export default async function BranchesAdminPage() {
  const session = await auth();
  const canManage = canAccess(session?.user?.role, "branch");
  const branches = await getBranches();

  return (
    <>
      <Topbar crumbs={["CKSPC", "Overview", "Branches"]} />
      <main className="main">
        <PageHead
          eyebrow="Overview · branch directory"
          title="Branches &"
          emphasis="church plants."
          lede="Every location in one place. Edit details and photos, or add a new branch when the church is planted elsewhere — it appears on the public site immediately."
        />
        <BranchManager branches={branches} canManage={canManage} />
        <div className="folio-foot">
          <span>· branch directory · multi-branch ·</span>
          <span>Folio · branches</span>
        </div>
      </main>
    </>
  );
}
