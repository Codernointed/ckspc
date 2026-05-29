import { Topbar } from "../../../components/Topbar";
import { PageHead } from "../../../components/PageHead";
import { DataTable } from "../../../components/DataTable";
import { Kpi } from "../../../components/dashboard/Kpi";
import { RestrictedBanner } from "../../../components/Restricted";
import { welfareCases, welfareCasesList, formatGHS } from "../../../lib/mock-data";

export default function WelfarePage() {
  return (
    <>
      <Topbar crumbs={["CKSPC", "Ledger", "Welfare"]} />
      <main className="main">
        <PageHead
          eyebrow="Welfare · pastoral care"
          title="The care"
          emphasis="of the household."
          lede="Medical, bereavement, food, education, financial emergency — every request becomes a case with a named officer, a visit log, and a faithful close-out."
          actions={
            <>
              <button className="btn btn-secondary">Reports</button>
              <button className="btn btn-primary">New request</button>
            </>
          }
        />

        <RestrictedBanner context="welfare" />

        <section className="kpi-grid">
          <Kpi label="Open cases" value={String(welfareCases.open)} foot="Including under review" featured />
          <Kpi label="Under review" value={String(welfareCases.underReview)} foot="Pending verification visit" />
          <Kpi label="Approved this month" value={String(welfareCases.approvedThisMonth)} foot="Awaiting disbursement" />
          <Kpi label="Disbursed this month" value={String(welfareCases.disbursedThisMonth)} foot={formatGHS(13800) + " released"} />
          <Kpi label="Welfare fund balance" value={formatGHS(welfareCases.fundBalance)} foot="After May disbursements" />
        </section>

        <div className="filter-bar">
          <input className="grow" placeholder="Search by case ID, officer, branch…" />
          <select><option>Any urgency</option><option>Critical</option><option>High</option><option>Medium</option><option>Low</option></select>
          <select><option>Any status</option><option>Open</option><option>Under Review</option><option>Approved</option><option>Disbursed</option><option>Closed</option></select>
          <select><option>Any nature</option><option>Medical</option><option>Bereavement</option><option>Educational</option><option>Food Support</option></select>
        </div>

        <section className="card">
          <div className="card-head">
            <h3>Active <em>cases</em></h3>
            <span className="meta">Member names redacted in list view · open case for full detail</span>
          </div>
          <DataTable
            rows={welfareCasesList}
            getKey={(c) => c.id}
            columns={[
              { header: "Case", mono: true, render: (c) => c.id },
              { header: "Subject", render: (c) => <span className="serif-italic">{c.member}</span> },
              { header: "Branch", render: (c) => c.branch },
              { header: "Nature", render: (c) => <span className="chip">{c.nature}</span> },
              { header: "Urgency", render: (c) => {
                const tone = c.urgency === "Critical" ? "danger" : c.urgency === "High" ? "warning" : c.urgency === "Medium" ? "info" : "success";
                return <span className={`chip ${tone}`}>{c.urgency}</span>;
              }},
              { header: "Requested", align: "right", mono: true, render: (c) => formatGHS(c.amountRequested) },
              { header: "Disbursed", align: "right", mono: true, render: (c) => c.amountDisbursed ? formatGHS(c.amountDisbursed) : <span className="subtle">—</span> },
              { header: "Status", render: (c) => {
                const tone = c.status === "Disbursed" || c.status === "Closed" ? "success" : c.status === "Approved" ? "info" : "warning";
                return <span className={`chip ${tone}`}>{c.status}</span>;
              }},
              { header: "Officer", render: (c) => c.officer },
              { header: "Opened", mono: true, render: (c) => c.opened },
            ]}
          />
        </section>

        <section className="card mt-8">
          <div className="card-head">
            <h3>Case <em>workflow</em></h3>
            <span className="meta">For every request</span>
          </div>
          <ol className="timeline">
            <li className="featured">
              <div className="when">Step 01</div>
              <div className="what">Request submitted · by member or worker on their behalf</div>
              <div className="who">Captures nature, amount, supporting documents, urgency.</div>
            </li>
            <li>
              <div className="when">Step 02</div>
              <div className="what">Welfare officer review</div>
              <div className="who">Officer is assigned, makes contact, schedules home visit if needed.</div>
            </li>
            <li>
              <div className="when">Step 03</div>
              <div className="what">Verification / home visit</div>
              <div className="who">Findings logged. Photos optional. Recommendation drafted.</div>
            </li>
            <li>
              <div className="when">Step 04</div>
              <div className="what">Branch pastor approval</div>
              <div className="who">Above a threshold, national welfare coordinator also signs.</div>
            </li>
            <li>
              <div className="when">Step 05</div>
              <div className="what">Disbursement</div>
              <div className="who">Mode (cash, mobile money, direct payment to hospital/school). Receipt uploaded.</div>
            </li>
            <li>
              <div className="when">Step 06</div>
              <div className="what">Case closed · follow-up</div>
              <div className="who">Officer follows up at 1 week, 1 month. Outcome recorded.</div>
            </li>
          </ol>
        </section>

        <div className="folio-foot"><span>· welfare · the care of the household ·</span><span>Folio 12</span></div>
      </main>
    </>
  );
}
