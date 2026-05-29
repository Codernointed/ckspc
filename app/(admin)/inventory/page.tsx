import { Topbar } from "../../../components/Topbar";
import { PageHead } from "../../../components/PageHead";
import { DataTable } from "../../../components/DataTable";
import { Kpi } from "../../../components/dashboard/Kpi";
import { assets, supplies, formatGHS } from "../../../lib/mock-data";

export default function InventoryPage() {
  const totalValue = assets.reduce((a, x) => a + x.cost, 0);
  const needsService = assets.filter((a) => a.nextService).length;
  const decommissioned = assets.filter((a) => a.condition === "Decommissioned").length;
  const lowStock = supplies.filter((s) => s.status === "LOW").length;

  return (
    <>
      <Topbar crumbs={["CKSPC", "Ledger", "Inventory"]} />
      <main className="main">
        <PageHead
          eyebrow="Inventory · assets & supplies"
          title="What the church"
          emphasis="holds."
          lede="From the keyboard in the auditorium to the bus in the car park — every fixed asset and consumable supply, with condition, location, and service schedule."
          actions={
            <>
              <button className="btn btn-secondary">Print register</button>
              <button className="btn btn-primary">Add asset</button>
            </>
          }
        />

        <section className="kpi-grid">
          <Kpi label="Fixed assets" value={String(assets.length)} foot="Across all branches" featured />
          <Kpi label="Asset value" value={formatGHS(totalValue)} foot="Purchase cost · undepreciated" />
          <Kpi label="Service due" value={String(needsService)} foot="In next 60 days" />
          <Kpi label="Decommissioned" value={String(decommissioned)} foot="This year" />
          <Kpi label="Supplies low" value={String(lowStock)} foot="Below threshold" />
        </section>

        <section className="card">
          <div className="card-head">
            <h3>Fixed <em>assets</em></h3>
            <span className="meta">Audit-tracked</span>
          </div>
          <DataTable
            rows={assets}
            getKey={(a) => a.id}
            columns={[
              { header: "Ref", mono: true, render: (a) => a.id },
              { header: "Asset", render: (a) => (
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-md)" }}>{a.name}</div>
                  <div className="mono" style={{ color: "var(--fg-subtle)" }}>{a.location}</div>
                </div>
              )},
              { header: "Category", render: (a) => <span className="chip">{a.category}</span> },
              { header: "Branch", render: (a) => a.branch },
              { header: "Condition", render: (a) => {
                const tone = a.condition === "Excellent" || a.condition === "Good" ? "success" : a.condition === "Fair" ? "warning" : "danger";
                return <span className={`chip ${tone}`}>{a.condition}</span>;
              }},
              { header: "Purchased", mono: true, render: (a) => a.purchased },
              { header: "Cost", align: "right", mono: true, render: (a) => formatGHS(a.cost) },
              { header: "Next service", mono: true, render: (a) => a.nextService ?? <span className="subtle">—</span> },
            ]}
          />
        </section>

        <section className="card mt-8">
          <div className="card-head">
            <h3>Consumable <em>supplies</em></h3>
            <span className="meta">Low-stock alerts trigger purchase requests</span>
          </div>
          <DataTable
            rows={supplies}
            getKey={(s) => s.item + s.branch}
            columns={[
              { header: "Item", render: (s) => s.item },
              { header: "Branch", render: (s) => s.branch },
              { header: "On hand", align: "right", mono: true, render: (s) => String(s.onHand) },
              { header: "Threshold", align: "right", mono: true, render: (s) => String(s.threshold) },
              { header: "Status", render: (s) => (
                <span className={`chip ${s.status === "LOW" ? "danger" : "success"}`}>{s.status}</span>
              )},
              { header: "", align: "right", render: () => (
                <button className="btn btn-ghost" style={{ padding: "4px 10px", fontSize: 11 }}>Request restock</button>
              )},
            ]}
          />
        </section>

        <div className="folio-foot"><span>· inventory · what the church holds ·</span><span>Folio 13</span></div>
      </main>
    </>
  );
}
