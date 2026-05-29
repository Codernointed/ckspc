import { Topbar } from "../../../components/Topbar";
import { PageHead } from "../../../components/PageHead";
import { DataTable } from "../../../components/DataTable";
import { Kpi } from "../../../components/dashboard/Kpi";
import { broadcasts, templates } from "../../../lib/mock-data";

export default function CommsPage() {
  const totalDeliveries = broadcasts.reduce((a, b) => a + b.deliveries, 0);
  const totalOpens = broadcasts.reduce((a, b) => a + b.opens, 0);
  const openRate = Math.round((totalOpens / totalDeliveries) * 100);

  return (
    <>
      <Topbar crumbs={["CKSPC", "Worship & Word", "Communications"]} />
      <main className="main">
        <PageHead
          eyebrow="Communications · the voice"
          title="Where the household"
          emphasis="speaks."
          lede="Email, SMS, WhatsApp, push — all routed through one queue, with templates, audience targeting, and a full delivery audit."
          actions={
            <>
              <button className="btn btn-secondary">Templates</button>
              <button className="btn btn-primary">New broadcast</button>
            </>
          }
        />

        <section className="kpi-grid">
          <Kpi label="Sent · last 7 days" value={broadcasts.length.toString()} foot="Broadcasts + automated" featured />
          <Kpi label="Deliveries" value={totalDeliveries.toLocaleString()} foot="Across all channels" />
          <Kpi label="Open rate" value={`${openRate}%`} delta="+4 pts WoW" trend="up" foot="Email + push tracked" />
          <Kpi label="Active templates" value={String(templates.length)} foot="Editable by admins" />
        </section>

        <section className="card">
          <div className="card-head">
            <h3>Compose <em>broadcast</em></h3>
            <span className="meta">Goes through queue · sent batched</span>
          </div>
          <form className="form" action="#">
            <div className="field">
              <label>Audience</label>
              <select>
                <option>All branches · all members</option>
                <option>Madina Central · all members</option>
                <option>All staff</option>
                <option>Welfare team · all branches</option>
                <option>Daily devotion subscribers</option>
              </select>
            </div>
            <div className="field">
              <label>Channels</label>
              <select>
                <option>Email + Push</option>
                <option>SMS</option>
                <option>WhatsApp</option>
                <option>Email + SMS + Push</option>
              </select>
            </div>
            <div className="field full"><label>Subject</label><input placeholder="e.g. Pentecost dress code reminder" /></div>
            <div className="field full"><label>Body</label><textarea rows={5} placeholder="Type your message. Use {{member_name}}, {{branch_name}} for personalisation." /></div>
            <div className="field">
              <label>Send when</label>
              <select><option>Now</option><option>Schedule…</option></select>
            </div>
            <div className="field">
              <label>From</label>
              <select><option>National Admin</option><option>General Overseer's office</option><option>This branch</option></select>
            </div>
            <div className="field full row" style={{ gap: 8, justifyContent: "flex-end" }}>
              <button type="button" className="btn btn-secondary">Save as template</button>
              <button type="submit" className="btn btn-primary">Send</button>
            </div>
          </form>
        </section>

        <section className="card mt-8">
          <div className="card-head">
            <h3>Recent <em>broadcasts</em></h3>
            <span className="meta">Last 7 days</span>
          </div>
          <DataTable
            rows={broadcasts}
            getKey={(b) => b.id}
            columns={[
              { header: "Ref", mono: true, render: (b) => b.id },
              { header: "When", mono: true, render: (b) => b.when },
              { header: "Sender", render: (b) => b.sender },
              { header: "Channels", render: (b) => (
                <div className="row" style={{ gap: 4 }}>{b.channels.map((c) => <span key={c} className="chip">{c}</span>)}</div>
              )},
              { header: "Subject", render: (b) => b.subject },
              { header: "Audience", render: (b) => b.audience },
              { header: "Delivered", align: "right", mono: true, render: (b) => b.deliveries.toLocaleString() },
              { header: "Opens", align: "right", mono: true, render: (b) => `${Math.round((b.opens / b.deliveries) * 100)}%` },
            ]}
          />
        </section>

        <section className="card mt-8">
          <div className="card-head">
            <h3><em>Templates</em></h3>
            <span className="meta">Reusable · variable substitution</span>
          </div>
          <DataTable
            rows={templates}
            getKey={(t) => t.id}
            columns={[
              { header: "Ref", mono: true, render: (t) => t.id },
              { header: "Name", render: (t) => <span className="serif">{t.name}</span> },
              { header: "Channels", render: (t) => (
                <div className="row" style={{ gap: 4 }}>{t.channels.map((c) => <span key={c} className="chip">{c}</span>)}</div>
              )},
              { header: "Variables", render: (t) => (
                <div className="mono" style={{ fontSize: 10, color: "var(--fg-subtle)" }}>
                  {t.variables.map((v) => `{{${v}}}`).join(" · ")}
                </div>
              )},
              { header: "Last used", mono: true, render: (t) => t.lastUsed },
              { header: "", align: "right", render: () => (
                <button className="btn btn-ghost" style={{ padding: "4px 10px", fontSize: 11 }}>Edit</button>
              )},
            ]}
          />
        </section>

        <div className="folio-foot"><span>· comms · the voice of the household ·</span><span>Folio 17</span></div>
      </main>
    </>
  );
}
