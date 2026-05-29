import { Topbar } from "../../../components/Topbar";
import { PageHead } from "../../../components/PageHead";
import { DataTable } from "../../../components/DataTable";
import { Kpi } from "../../../components/dashboard/Kpi";
import { MakerChecker } from "../../../components/Restricted";
import {
  collections,
  titheLedger,
  expenses,
  remittances,
  finance,
  formatGHS,
} from "../../../lib/mock-data";

export default function FinancePage() {
  const pendingApprovals = collections.filter((c) => c.status === "Pending").length + expenses.filter((e) => e.status === "Pending").length;

  return (
    <>
      <Topbar crumbs={["CKSPC", "Ledger", "Finance"]} />
      <main className="main">
        <PageHead
          eyebrow="Finance · National view"
          title="The"
          emphasis="ledger."
          lede="Tithes, offerings, expenses, remittance. Every entry has a recorder and an approver — never the same person — and a permanent audit trail."
          actions={
            <>
              <button className="btn btn-secondary">Reports</button>
              <button className="btn btn-primary">Record collection</button>
            </>
          }
        />

        <section className="kpi-grid">
          <Kpi label="May income" value={formatGHS(finance.monthIncome)} delta="+12.4% MoM" trend="up" featured foot="Tithes + offerings + designated" />
          <Kpi label="May expenses" value={formatGHS(finance.monthExpense)} delta="−4.1% MoM" trend="down" foot="Operations + ministry + welfare" />
          <Kpi label="Net position" value={formatGHS(finance.monthIncome - finance.monthExpense)} foot="May surplus" />
          <Kpi label="YTD income" value={formatGHS(finance.ytdIncome)} foot="Five months of 2026" />
          <Kpi label="Awaiting approval" value={String(pendingApprovals)} foot="Across collections + expenses" />
        </section>

        <section className="card">
          <div className="card-head">
            <h3>Sunday <em>collections · 25 May</em></h3>
            <span className="meta">Across branches</span>
          </div>
          <DataTable
            rows={collections}
            getKey={(c) => c.id}
            columns={[
              { header: "Ref", mono: true, render: (c) => c.id },
              { header: "Branch", render: (c) => c.branch },
              { header: "Service", render: (c) => c.service },
              { header: "Tithes", align: "right", mono: true, render: (c) => formatGHS(c.tithes) },
              { header: "Offerings", align: "right", mono: true, render: (c) => formatGHS(c.offerings) },
              { header: "Designated", align: "right", mono: true, render: (c) => formatGHS(c.designated + c.thanksgiving) },
              { header: "Welfare", align: "right", mono: true, render: (c) => formatGHS(c.welfare) },
              { header: "Total", align: "right", mono: true, render: (c) => (
                <strong>{formatGHS(c.tithes + c.offerings + c.designated + c.thanksgiving + c.welfare)}</strong>
              )},
              { header: "Maker / Checker", render: (c) => (
                <MakerChecker recorder={c.recorder} approver={c.approver} status={c.status} />
              )},
            ]}
          />
        </section>

        <div className="two-col mt-8">
          <section className="card">
            <div className="card-head">
              <h3>Tithe <em>ledger · 25 May</em></h3>
              <span className="meta">Individual records</span>
            </div>
            <DataTable
              rows={titheLedger}
              getKey={(t) => t.id}
              columns={[
                { header: "Ref", mono: true, render: (t) => t.id },
                { header: "Member", render: (t) => t.member },
                { header: "Branch", render: (t) => t.branch },
                { header: "Mode", render: (t) => <span className="chip">{t.mode}</span> },
                { header: "Amount", align: "right", mono: true, render: (t) => formatGHS(t.amount) },
              ]}
            />
          </section>

          <section className="card">
            <div className="card-head">
              <h3>Branch <em>remittance · this week</em></h3>
              <span className="meta">To HQ</span>
            </div>
            <DataTable
              rows={remittances}
              getKey={(r) => r.branch}
              columns={[
                { header: "Branch", render: (r) => r.branch },
                { header: "Due", align: "right", mono: true, render: (r) => formatGHS(r.due) },
                { header: "Sent", align: "right", mono: true, render: (r) => formatGHS(r.sent) },
                { header: "Status", render: (r) => (
                  <span className={`chip ${r.status === "Settled" ? "success" : "danger"}`}>{r.status}</span>
                )},
                { header: "Last sent", mono: true, render: (r) => r.lastSent },
              ]}
            />
          </section>
        </div>

        <section className="card mt-8">
          <div className="card-head">
            <h3>Expense <em>requests</em></h3>
            <span className="meta">Maker / checker controls</span>
          </div>
          <DataTable
            rows={expenses}
            getKey={(e) => e.id}
            columns={[
              { header: "Ref", mono: true, render: (e) => e.id },
              { header: "Date", mono: true, render: (e) => e.date },
              { header: "Branch", render: (e) => e.branch },
              { header: "Category", render: (e) => <span className="chip">{e.category}</span> },
              { header: "Description", render: (e) => e.description },
              { header: "Amount", align: "right", mono: true, render: (e) => formatGHS(e.amount) },
              { header: "Maker / Checker", render: (e) => (
                <MakerChecker recorder={e.requestor} approver={e.approver} status={e.status} />
              )},
            ]}
          />
        </section>

        <section className="card mt-8">
          <div className="card-head">
            <h3>Record a <em>new collection</em></h3>
            <span className="meta">Pending approval after submit</span>
          </div>
          <form className="form" action="#">
            <div className="field">
              <label>Branch</label>
              <select><option>Madina Central</option><option>Kasoa</option><option>Kumasi Central</option></select>
            </div>
            <div className="field">
              <label>Service</label>
              <select><option>Sunday Main · 25 May</option><option>Midweek · 22 May</option></select>
            </div>
            <div className="field"><label>Tithes (₵)</label><input type="number" defaultValue={0} /></div>
            <div className="field"><label>Offerings (₵)</label><input type="number" defaultValue={0} /></div>
            <div className="field"><label>Thanksgiving (₵)</label><input type="number" defaultValue={0} /></div>
            <div className="field"><label>Welfare fund (₵)</label><input type="number" defaultValue={0} /></div>
            <div className="field full"><label>Counting sheet photo</label><input type="file" /></div>
            <div className="field full"><label>Notes</label><textarea placeholder="Anything unusual about today's collection…" /></div>
            <div className="field full row" style={{ gap: 8, justifyContent: "flex-end" }}>
              <button type="button" className="btn btn-secondary">Save draft</button>
              <button type="submit" className="btn btn-primary">Submit for approval</button>
            </div>
          </form>
        </section>

        <div className="folio-foot"><span>· finance · the ledger ·</span><span>Folio 11</span></div>
      </main>
    </>
  );
}
