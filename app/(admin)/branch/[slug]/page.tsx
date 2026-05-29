import { Topbar } from "../../../../components/Topbar";
import { Kpi } from "../../../../components/dashboard/Kpi";
import { StackedBars } from "../../../../components/dashboard/BarChart";
import {
  branches,
  getBranch,
  branchAttendance,
  upcomingEvents,
  announcements,
  inventoryAlerts,
  formatGHS,
} from "../../../../lib/mock-data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return branches.map((b) => ({ slug: b.slug }));
}

export default async function BranchDashboardPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const branch = getBranch(slug);
  if (!branch) notFound();

  const branchEvents = upcomingEvents.filter((e) =>
    e.who.toLowerCase().includes(branch.name.toLowerCase()) ||
    e.who.toLowerCase().includes("all branches")
  );

  const chartRows = branchAttendance.map((w) => ({
    label: w.week,
    segments: [{ value: w.value, tone: "brand" as const }],
  }));

  return (
    <>
      <Topbar crumbs={["CKSPC", branch.region, branch.district, branch.name]} />
      <main className="main">
        <div className="page-head">
          <div>
            <span className="eyebrow">{branch.tier} · {branch.code}</span>
            <h1 style={{ marginTop: 8 }}>
              {branch.name} <em>at a glance</em>.
            </h1>
            <p className="lede">
              Pastor: {branch.pastor}. {branch.region} region, {branch.district} district.
              Everything below is scoped to this branch only — finance, welfare, attendance, inventory.
            </p>
          </div>
          <div className="row" style={{ gap: 8 }}>
            <button className="btn btn-secondary">Branch report</button>
            <button className="btn btn-primary">Record collection</button>
          </div>
        </div>

        <section className="kpi-grid">
          <Kpi
            label="Membership"
            value={branch.members.toLocaleString()}
            delta="+12 this month"
            trend="up"
            featured
            foot="Active members on the roll"
          />
          <Kpi
            label="Last Sunday"
            value={`${Math.round(branch.attendanceRate * 100)}%`}
            unit="attendance"
            delta="+2.4 pts"
            trend="up"
            foot={`~${Math.round(branch.members * branch.attendanceRate).toLocaleString()} present`}
          />
          <Kpi
            label="May giving"
            value={formatGHS(branch.giving)}
            delta="+8.1% MoM"
            trend="up"
            foot="Tithes + offerings + designated"
          />
          <Kpi
            label="Open welfare cases"
            value="4"
            foot="2 awaiting your approval"
          />
          <Kpi
            label="Departments"
            value="9"
            foot="6 ministry · 3 fellowship"
          />
        </section>

        <div className="two-col">
          <section className="card">
            <div className="card-head">
              <h3>Sunday attendance <em>— last 8 weeks</em></h3>
              <span className="meta">{branch.name}</span>
            </div>
            <StackedBars rows={chartRows} />
            <div className="legend">
              <span className="item"><span className="swatch" style={{ background: "var(--brand)" }} /> In-person</span>
            </div>
          </section>

          <section className="card">
            <div className="card-head">
              <h3>Upcoming <em>at this branch</em></h3>
              <span className="meta">Next 7 days</span>
            </div>
            <ol className="timeline">
              {branchEvents.length === 0 ? (
                <li><div className="who">No upcoming events scheduled.</div></li>
              ) : (
                branchEvents.map((e, i) => (
                  <li key={i} className={e.featured ? "featured" : ""}>
                    <div className="when">{e.when}</div>
                    <div className="what">{e.what}</div>
                    <div className="who">{e.who}</div>
                  </li>
                ))
              )}
            </ol>
          </section>
        </div>

        <div className="two-col mt-8">
          <section className="card">
            <div className="card-head">
              <h3>Finance <em>this month</em></h3>
              <span className="meta">{branch.code}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
              <FinanceLine label="Tithes" value={formatGHS(branch.giving * 0.62)} />
              <FinanceLine label="Offerings" value={formatGHS(branch.giving * 0.21)} />
              <FinanceLine label="Designated" value={formatGHS(branch.giving * 0.12)} />
              <FinanceLine label="Welfare fund" value={formatGHS(branch.giving * 0.05)} />
              <FinanceLine label="Expenses" value={formatGHS(branch.giving * 0.42)} muted />
              <FinanceLine label="To remit" value={formatGHS(branch.giving * 0.12)} muted />
            </div>
            <div className="row between mt-6" style={{ paddingTop: "var(--space-4)", borderTop: "1px solid var(--border)" }}>
              <span className="muted" style={{ fontSize: "var(--fs-sm)" }}>Awaiting branch pastor approval</span>
              <span className="chip warning">3 pending</span>
            </div>
          </section>

          <section className="card">
            <div className="card-head">
              <h3>Inventory <em>flags</em></h3>
              <span className="meta">Asset health</span>
            </div>
            <div className="alerts">
              {inventoryAlerts.map((a, i) => (
                <div key={i} className={`alert ${a.severity}`}>
                  <span className="badge">{a.severity === "danger" ? "REPAIR" : "ATTN"}</span>
                  <span>{a.label}</span>
                </div>
              ))}
            </div>

            <div className="card-head mt-8">
              <h3 style={{ fontSize: "var(--fs-lg)" }}>From <em>HQ</em></h3>
              <span className="meta">Announcements</span>
            </div>
            <ol className="timeline">
              {announcements.slice(0, 2).map((a, i) => (
                <li key={i}>
                  <div className="when">{a.when} · {a.who}</div>
                  <div className="what" style={{ fontSize: "var(--fs-sm)", fontFamily: "var(--font-sans)", lineHeight: 1.5 }}>
                    {a.what}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <footer style={{ marginTop: "var(--space-16)", paddingTop: "var(--space-6)", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", color: "var(--fg-subtle)", fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: "var(--tracking-wider)", textTransform: "uppercase" }}>
          <span>· branch view · {branch.code} ·</span>
          <span>Folio 02 · {branch.name}</span>
        </footer>
      </main>
    </>
  );
}

function FinanceLine({ label, value, muted = false }: { label: string; value: string; muted?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2, padding: "var(--space-3) 0", borderBottom: "1px solid var(--border)" }}>
      <span className="eyebrow" style={{ fontSize: 10 }}>{label}</span>
      <span className="mono" style={{ fontSize: "var(--fs-md)", color: muted ? "var(--fg-muted)" : "var(--fg)" }}>{value}</span>
    </div>
  );
}
