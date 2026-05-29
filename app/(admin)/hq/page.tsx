import { Topbar } from "../../../components/Topbar";
import { Kpi } from "../../../components/dashboard/Kpi";
import { StackedBars } from "../../../components/dashboard/BarChart";
import {
  branches,
  attendanceLast8Weeks,
  upcomingEvents,
  announcements,
  alerts,
  welfareCases,
  finance,
  formatGHS,
} from "../../../lib/mock-data";

export default function HQDashboardPage() {
  const totalMembers = branches.reduce((a, b) => a + b.members, 0);
  const averageAttendance = Math.round(
    (branches.reduce((a, b) => a + b.attendanceRate, 0) / branches.length) * 100
  );
  const rankedByGiving = [...branches].sort((a, b) => b.giving - a.giving);
  const maxGiving = rankedByGiving[0].giving;

  const chartRows = attendanceLast8Weeks.map((w) => ({
    label: w.week,
    segments: [
      { value: w.physical, tone: "brand" as const },
      { value: w.online, tone: "accent" as const },
    ],
  }));

  return (
    <>
      <Topbar crumbs={["CKSPC", "Headquarters", "Overview"]} />
      <main className="main">
        <div className="page-head">
          <div>
            <span className="eyebrow">Headquarters · Edition I</span>
            <h1 style={{ marginTop: 8 }}>
              The state of the <em>flow</em>.
            </h1>
            <p className="lede">
              Six branches, one ledger. This is the view from headquarters — membership,
              giving, attendance and care, rolled up across every congregation.
            </p>
          </div>
          <div className="row" style={{ gap: 8 }}>
            <button className="btn btn-secondary">Export</button>
            <button className="btn btn-primary">Broadcast to branches</button>
          </div>
        </div>

        <section className="kpi-grid">
          <Kpi
            label="Total membership"
            value={totalMembers.toLocaleString()}
            delta="+184 this month"
            trend="up"
            featured
            foot="Across 6 branches · 1 main campus"
          />
          <Kpi
            label="Avg. attendance"
            value={`${averageAttendance}%`}
            delta="+3.1 pts WoW"
            trend="up"
            foot="Physical + online combined"
          />
          <Kpi
            label="May income"
            value={formatGHS(finance.monthIncome)}
            delta="+12.4% MoM"
            trend="up"
            foot={`Net ${formatGHS(finance.monthIncome - finance.monthExpense)} after expenses`}
          />
          <Kpi
            label="Welfare cases · open"
            value={String(welfareCases.open)}
            unit="active"
            foot={`Fund balance ${formatGHS(welfareCases.fundBalance)}`}
          />
          <Kpi
            label="Remittance pending"
            value={formatGHS(finance.remittancePending)}
            delta="2 branches overdue"
            trend="down"
            foot="Cut-off: Friday 17:00"
          />
        </section>

        {alerts.length > 0 && (
          <section className="alerts" style={{ marginBottom: "var(--space-10)" }}>
            {alerts.map((a, i) => (
              <div key={i} className={`alert ${a.severity}`}>
                <span className="badge">{a.badge}</span>
                <span>{a.text}</span>
              </div>
            ))}
          </section>
        )}

        <div className="two-col">
          <section className="card">
            <div className="card-head">
              <h3>Attendance <em>— last 8 weeks</em></h3>
              <span className="meta">Physical + online</span>
            </div>
            <StackedBars rows={chartRows} />
            <div className="legend">
              <span className="item"><span className="swatch" style={{ background: "var(--brand)" }} /> Physical</span>
              <span className="item"><span className="swatch" style={{ background: "var(--anoint-500)" }} /> Online stream</span>
            </div>
          </section>

          <section className="card">
            <div className="card-head">
              <h3>Branches by <em>giving</em></h3>
              <span className="meta">May · GHS</span>
            </div>
            <ol className="rank">
              {rankedByGiving.map((b, i) => (
                <li key={b.slug}>
                  <span className="pos">№ {String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <div className="name">{b.name}</div>
                    <div className="meta">{b.tier} · {b.region}</div>
                    <div className="bar">
                      <span style={{ width: `${(b.giving / maxGiving) * 100}%` }} />
                    </div>
                  </div>
                  <span className="meta">{formatGHS(b.giving)}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <div className="two-col mt-8">
          <section className="card">
            <div className="card-head">
              <h3>Upcoming <em>across all branches</em></h3>
              <span className="meta">Next 7 days</span>
            </div>
            <ol className="timeline">
              {upcomingEvents.map((e, i) => (
                <li key={i} className={e.featured ? "featured" : ""}>
                  <div className="when">{e.when}</div>
                  <div className="what">{e.what}</div>
                  <div className="who">{e.who}</div>
                </li>
              ))}
            </ol>
          </section>

          <section className="card">
            <div className="card-head">
              <h3>From the <em>desk</em></h3>
              <span className="meta">Announcements</span>
            </div>
            <ol className="timeline">
              {announcements.map((a, i) => (
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
          <span>· end of overview · sacred flow v0.1 ·</span>
          <span>Folio 01 · Headquarters</span>
        </footer>
      </main>
    </>
  );
}
