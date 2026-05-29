import { Topbar } from "../../../components/Topbar";
import { PageHead } from "../../../components/PageHead";
import { DataTable } from "../../../components/DataTable";
import { Kpi } from "../../../components/dashboard/Kpi";
import { RestrictedBanner } from "../../../components/Restricted";
import { staff, pendingLeave, formatGHS } from "../../../lib/mock-data";

export default function HRPage() {
  const fullTime = staff.filter((s) => s.employmentType === "Full-time").length;
  const ordained = staff.filter((s) => s.category === "Ordained").length;
  const volunteers = staff.filter((s) => s.employmentType === "Volunteer").length;

  return (
    <>
      <Topbar crumbs={["CKSPC", "People", "Staff & HR"]} />
      <main className="main">
        <PageHead
          eyebrow="HR · personnel"
          title="Those who"
          emphasis="serve."
          lede="From the General Overseer to the volunteer usher, this is the roll of those who carry the work — full-time, part-time, ordained, lay."
          actions={
            <>
              <button className="btn btn-secondary">Run payroll</button>
              <button className="btn btn-primary">Onboard staff</button>
            </>
          }
        />

        <RestrictedBanner context="hr" />

        <section className="kpi-grid">
          <Kpi label="Total on payroll" value={String(staff.length)} foot="Including volunteers" featured />
          <Kpi label="Full-time" value={String(fullTime)} foot={`${ordained} ordained`} />
          <Kpi label="Volunteers" value={String(volunteers)} foot="Lay leaders + workers" />
          <Kpi label="Leave requests" value={String(pendingLeave.length)} foot="Awaiting approval" />
          <Kpi label="May payroll" value={formatGHS(staff.reduce((a, s) => a + (s.stipend ?? 0), 0))} foot="Stipends + allowances" />
        </section>

        <section className="card">
          <div className="card-head">
            <h3>Staff <em>roster</em></h3>
            <span className="meta">{staff.length} records</span>
          </div>
          <DataTable
            rows={staff}
            getKey={(s) => s.id}
            columns={[
              { header: "Name", render: (s) => (
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-md)" }}>{s.name}</div>
                  <div className="mono" style={{ color: "var(--fg-subtle)" }}>{s.id}</div>
                </div>
              )},
              { header: "Role", render: (s) => s.role },
              { header: "Category", render: (s) => <span className="chip">{s.category}</span> },
              { header: "Branch", render: (s) => s.branch },
              { header: "Type", render: (s) => {
                const tone = s.employmentType === "Full-time" ? "success" : s.employmentType === "Part-time" ? "info" : "warning";
                return <span className={`chip ${tone}`}>{s.employmentType}</span>;
              }},
              { header: "Since", mono: true, render: (s) => s.startDate },
              { header: "Stipend", align: "right", mono: true, render: (s) => s.stipend ? formatGHS(s.stipend) : <span className="subtle">—</span> },
              { header: "Leave", align: "right", mono: true, render: (s) => `${s.leaveBalance}d` },
            ]}
          />
        </section>

        <section className="card mt-8">
          <div className="card-head">
            <h3>Leave <em>requests · pending</em></h3>
            <span className="meta">Awaiting supervisor approval</span>
          </div>
          <DataTable
            rows={pendingLeave}
            getKey={(l) => l.id}
            columns={[
              { header: "Request", mono: true, render: (l) => l.id },
              { header: "Staff", render: (l) => l.staff },
              { header: "Type", render: (l) => <span className="chip info">{l.type}</span> },
              { header: "From", mono: true, render: (l) => l.from },
              { header: "To", mono: true, render: (l) => l.to },
              { header: "Days", align: "right", mono: true, render: (l) => String(l.days) },
              { header: "Status", render: (l) => <span className="chip warning">{l.status}</span> },
              { header: "", align: "right", render: () => (
                <div className="row" style={{ gap: 4, justifyContent: "flex-end" }}>
                  <button className="btn btn-ghost" style={{ padding: "4px 10px", fontSize: 11 }}>Reject</button>
                  <button className="btn btn-primary" style={{ padding: "4px 10px", fontSize: 11 }}>Approve</button>
                </div>
              )},
            ]}
          />
        </section>

        <div className="folio-foot"><span>· hr · staff & personnel ·</span><span>Folio 10</span></div>
      </main>
    </>
  );
}
