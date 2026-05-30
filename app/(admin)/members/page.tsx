import Link from "next/link";
import { Topbar } from "../../../components/Topbar";
import { PageHead } from "../../../components/PageHead";
import { DataTable } from "../../../components/DataTable";
import { Kpi } from "../../../components/dashboard/Kpi";
import { getMembers, getMemberStats } from "../../../lib/members";

export const dynamic = "force-dynamic";

export default async function MembersPage() {
  const [membersList, stats] = await Promise.all([getMembers(), getMemberStats()]);

  return (
    <>
      <Topbar crumbs={["CKSPC", "People", "Members"]} />
      <main className="main">
        <PageHead
          eyebrow="People · Church CRM"
          title="The roll of"
          emphasis="the household."
          lede="Every person connected to the church — visitor, new convert, full member, minor — is here."
          actions={
            <>
              <Link href="/members/new" className="btn btn-primary">+ Register member</Link>
            </>
          }
        />

        <section className="kpi-grid">
          <Kpi label="Total on the roll" value={stats.total.toLocaleString()} foot="Across all branches" featured />
          <Kpi label="Full members" value={stats.fullMembers.toLocaleString()} foot="Confirmed" />
          <Kpi label="New converts" value={stats.newConverts.toLocaleString()} foot="Awaiting discipleship" />
          <Kpi label="Visitors" value={stats.visitors.toLocaleString()} foot="Awaiting follow-up" />
          <Kpi label="Minors" value={stats.minors.toLocaleString()} foot="Under 18 · restricted" />
        </section>

        <DataTable
          rows={membersList}
          getKey={(m) => m.memberId}
          columns={[
            { header: "Member", render: (m) => (
              <div>
                <Link href={`/members/${m.memberId}`} style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}>
                  {m.firstName} {m.lastName}
                </Link>
                {m.isMinor && <span className="chip warning" style={{ marginLeft: 8 }}>Minor</span>}
                <div className="mono" style={{ color: "var(--fg-subtle)" }}>{m.memberId}</div>
              </div>
            )},
            { header: "Branch", render: (m) => <span>{m.branch ?? "—"}</span> },
            { header: "Status", render: (m) => {
              const tone =
                m.status === "Full Member" ? "success" :
                m.status === "Inactive" ? "danger" :
                m.status === "Visitor" ? "info" : "anoint";
              return <span className={`chip ${tone}`}>{m.status}</span>;
            }},
            { header: "Department", render: (m) => m.department ?? <span className="subtle">—</span> },
            { header: "Phone", mono: true, render: (m) => m.phone ?? "—" },
            { header: "Joined", mono: true, render: (m) => m.joinedDate ?? "—" },
          ]}
        />

        <div className="folio-foot">
          <span>· members · roll of the household ·</span>
          <span>Folio 06 · {stats.total} records</span>
        </div>
      </main>
    </>
  );
}
