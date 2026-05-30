import { Topbar } from "../../../components/Topbar";
import { PageHead } from "../../../components/PageHead";
import { DataTable } from "../../../components/DataTable";
import { Kpi } from "../../../components/dashboard/Kpi";
import { getCollections, getTithes, getExpenses, getFinanceSummary, formatGHS } from "../../../lib/finance";
import { approveCollection, approveExpense } from "../../../lib/actions/finance";

export const dynamic = "force-dynamic";

export default async function FinancePage() {
  const [colls, titheList, expList, summary] = await Promise.all([
    getCollections(),
    getTithes(),
    getExpenses(),
    getFinanceSummary(),
  ]);

  const net = summary.totalIncome - summary.totalExpenses;

  return (
    <>
      <Topbar crumbs={["CKSPC", "Ledger", "Finance"]} />
      <main className="main">
        <PageHead
          eyebrow="Finance · National view"
          title="The"
          emphasis="ledger."
          lede="Tithes, offerings, expenses. Every entry has a recorder and an approver — never the same person."
        />

        <div className="restricted-banner" style={{ borderColor: "var(--vine-700)" }}>
          <span className="seal">✦</span>
          <div>
            <div className="title">Maker / Checker</div>
            <div className="body">Every collection has a recorder and a separate approver. No self-approval.</div>
          </div>
        </div>

        <section className="kpi-grid">
          <Kpi label="Month income" value={formatGHS(summary.totalIncome)} foot={`${summary.collectionCount} collections`} featured />
          <Kpi label="Month expenses" value={formatGHS(summary.totalExpenses)} foot={`${summary.pendingExpenses} pending`} />
          <Kpi label="Net surplus" value={formatGHS(net)} foot="Income − expenses" />
          <Kpi label="Tithes" value={formatGHS(summary.totalTithes)} foot="Tithe ledger total" />
        </section>

        {/* Collections */}
        <h2 style={{ fontSize: "var(--fs-lg)", margin: "var(--space-6) 0 var(--space-3)" }}>Collections</h2>
        <DataTable
          rows={colls}
          getKey={(c) => c.collectionId}
          columns={[
            { header: "ID", mono: true, render: (c) => c.collectionId },
            { header: "Date", mono: true, render: (c) => c.date },
            { header: "Branch", render: (c) => c.branch },
            { header: "Service", render: (c) => c.service },
            { header: "Tithes", align: "right", mono: true, render: (c) => formatGHS(c.tithes ?? 0) },
            { header: "Offerings", align: "right", mono: true, render: (c) => formatGHS(c.offerings ?? 0) },
            { header: "Recorder", render: (c) => c.recorder },
            { header: "Status", render: (c) => {
              if (c.status === "Approved") return <span className="chip success">Approved</span>;
              return (
                <form action={approveCollection} style={{ display: "inline" }}>
                  <input type="hidden" name="id" value={c.id} />
                  <button type="submit" className="chip warning" style={{ cursor: "pointer", border: "none" }}>Approve</button>
                </form>
              );
            }},
          ]}
        />

        {/* Tithe Ledger */}
        <h2 style={{ fontSize: "var(--fs-lg)", margin: "var(--space-6) 0 var(--space-3)" }}>Tithe Ledger</h2>
        <DataTable
          rows={titheList}
          getKey={(t) => String(t.id)}
          columns={[
            { header: "Date", mono: true, render: (t) => t.date },
            { header: "Member", render: (t) => t.memberName },
            { header: "Branch", render: (t) => t.branch },
            { header: "Amount", align: "right", mono: true, render: (t) => formatGHS(t.amount) },
            { header: "Mode", render: (t) => t.mode },
          ]}
        />

        {/* Expenses */}
        <h2 style={{ fontSize: "var(--fs-lg)", margin: "var(--space-6) 0 var(--space-3)" }}>Expenses</h2>
        <DataTable
          rows={expList}
          getKey={(e) => e.expenseId}
          columns={[
            { header: "ID", mono: true, render: (e) => e.expenseId },
            { header: "Date", mono: true, render: (e) => e.date },
            { header: "Branch", render: (e) => e.branch },
            { header: "Category", render: (e) => e.category },
            { header: "Description", render: (e) => e.description },
            { header: "Amount", align: "right", mono: true, render: (e) => formatGHS(e.amount) },
            { header: "Requestor", render: (e) => e.requestor },
            { header: "Status", render: (e) => {
              if (e.status === "Approved") return <span className="chip success">Approved</span>;
              return (
                <form action={approveExpense} style={{ display: "inline" }}>
                  <input type="hidden" name="id" value={e.id} />
                  <button type="submit" className="chip warning" style={{ cursor: "pointer", border: "none" }}>Approve</button>
                </form>
              );
            }},
          ]}
        />

        <div className="folio-foot">
          <span>· finance · the ledger ·</span>
          <span>Folio · finance</span>
        </div>
      </main>
    </>
  );
}
