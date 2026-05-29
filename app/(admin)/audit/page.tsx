import { Topbar } from "../../../components/Topbar";
import { PageHead } from "../../../components/PageHead";
import { DataTable } from "../../../components/DataTable";
import { Kpi } from "../../../components/dashboard/Kpi";
import { auditLog } from "../../../lib/mock-data";

export default function AuditPage() {
  return (
    <>
      <Topbar crumbs={["CKSPC", "Administration", "Audit log"]} />
      <main className="main">
        <PageHead
          eyebrow="Administration · audit"
          title="A faithful"
          emphasis="record."
          lede="Every action that changes data — financial, welfare, member — is logged with who, when, from where, and what changed. Non-negotiable. Immutable."
          actions={
            <>
              <button className="btn btn-secondary">Export</button>
              <button className="btn btn-primary">Filter</button>
            </>
          }
        />

        <section className="kpi-grid">
          <Kpi label="Events · last 24h" value="284" foot="Across all modules" featured />
          <Kpi label="Financial events" value="48" foot="Collections + expenses + remittance" />
          <Kpi label="Welfare events" value="11" foot="Logged accesses · sensitive" />
          <Kpi label="Failed logins" value="3" foot="Auto-blocked after 5" />
        </section>

        <div className="filter-bar">
          <input className="grow" placeholder="Search by user, action, IP…" />
          <select><option>Any module</option><option>Finance</option><option>Welfare</option><option>HR</option><option>Members</option><option>Communications</option></select>
          <select><option>Any user</option><option>Apostle K. Asamoah</option><option>Rev. Samuel Boateng</option></select>
          <select><option>Last 24 hours</option><option>Last 7 days</option><option>Last 30 days</option></select>
        </div>

        <section className="card">
          <div className="card-head">
            <h3>Recent <em>events</em></h3>
            <span className="meta">Newest first · immutable</span>
          </div>
          <DataTable
            rows={auditLog}
            getKey={(a) => a.when + a.who}
            columns={[
              { header: "When", mono: true, render: (a) => a.when },
              { header: "Who", render: (a) => a.who },
              { header: "What", render: (a) => a.what },
              { header: "Where", render: (a) => <span className="chip">{a.where}</span> },
              { header: "IP", mono: true, render: (a) => a.ip },
            ]}
          />
        </section>

        <div className="folio-foot"><span>· audit · a faithful record ·</span><span>Folio 20</span></div>
      </main>
    </>
  );
}
