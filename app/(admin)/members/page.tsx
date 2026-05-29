import Link from "next/link";
import { Topbar } from "../../../components/Topbar";
import { PageHead } from "../../../components/PageHead";
import { DataTable } from "../../../components/DataTable";
import { Kpi } from "../../../components/dashboard/Kpi";
import { members, formatGHS } from "../../../lib/mock-data";

export default function MembersPage() {
  const total = members.length;
  const fullMembers = members.filter((m) => m.status === "Full Member").length;
  const newThisMonth = members.filter((m) => m.joined.startsWith("2026-05")).length;
  const visitors = members.filter((m) => m.status === "Visitor").length;
  const minors = members.filter((m) => m.minor).length;

  return (
    <>
      <Topbar crumbs={["CKSPC", "People", "Members"]} />
      <main className="main">
        <PageHead
          eyebrow="People · Church CRM"
          title="The roll of"
          emphasis="the household."
          lede="Every person connected to the church — visitor, new convert, full member, minor — is here. Filter by branch, status, department, or attendance band."
          actions={
            <>
              <button className="btn btn-secondary">Export</button>
              <button className="btn btn-primary">Register member</button>
            </>
          }
        />

        <section className="kpi-grid">
          <Kpi label="Total on the roll" value={total.toLocaleString()} foot="Across all branches" featured />
          <Kpi label="Full members" value={fullMembers.toLocaleString()} foot="Confirmed + baptised" />
          <Kpi label="New this month" value={newThisMonth.toLocaleString()} foot="Visitors + new converts" />
          <Kpi label="Open visitors" value={visitors.toLocaleString()} foot="Awaiting follow-up" />
          <Kpi label="Minors" value={minors.toLocaleString()} foot="Under 18 · restricted" />
        </section>

        <div className="filter-bar">
          <input className="grow" placeholder="Search by name, member ID, phone…" />
          <select>
            <option>All branches</option>
            <option>Madina Central</option>
            <option>Kasoa</option>
            <option>Kumasi Central</option>
            <option>Tema Community 4</option>
            <option>Takoradi</option>
            <option>Ho</option>
          </select>
          <select>
            <option>Any status</option>
            <option>Full Member</option>
            <option>New Convert</option>
            <option>Visitor</option>
            <option>Inactive</option>
          </select>
          <select>
            <option>Any department</option>
            <option>Choir / Music</option>
            <option>Ushering</option>
            <option>Children's</option>
            <option>Youth</option>
          </select>
          <button className="btn btn-ghost">Reset</button>
        </div>

        <DataTable
          rows={members}
          getKey={(m) => m.id}
          columns={[
            { header: "Member", render: (m) => (
              <div>
                <Link href={`/members/${m.id}`} style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}>{m.name}</Link>
                {m.minor && <span className="chip warning" style={{ marginLeft: 8 }}>Minor</span>}
                <div className="mono" style={{ color: "var(--fg-subtle)" }}>{m.id}</div>
              </div>
            )},
            { header: "Branch", render: (m) => <span>{m.branch}</span> },
            { header: "Status", render: (m) => {
              const tone =
                m.status === "Full Member" ? "success" :
                m.status === "Inactive" ? "danger" :
                m.status === "Visitor" ? "info" : "anoint";
              return <span className={`chip ${tone}`}>{m.status}</span>;
            }},
            { header: "Department", render: (m) => m.department ?? <span className="subtle">—</span> },
            { header: "Attend.", align: "right", mono: true, render: (m) => `${m.attendance}%` },
            { header: "Giving (May)", align: "right", mono: true, render: (m) => formatGHS(m.giving) },
            { header: "Phone", mono: true, render: (m) => m.phone },
          ]}
        />

        <div className="folio-foot">
          <span>· members · roll of the household ·</span>
          <span>Folio 06 · {total} records</span>
        </div>
      </main>
    </>
  );
}
