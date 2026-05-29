import { Topbar } from "../../../components/Topbar";
import { PageHead } from "../../../components/PageHead";
import { DataTable } from "../../../components/DataTable";
import { Kpi } from "../../../components/dashboard/Kpi";
import { events, formatGHS } from "../../../lib/mock-data";

export default function EventsPage() {
  const upcomingCount = events.length;
  const totalRegistered = events.reduce((a, e) => a + e.registered, 0);
  const totalBudget = events.reduce((a, e) => a + e.budget, 0);

  return (
    <>
      <Topbar crumbs={["CKSPC", "Worship & Word", "Events"]} />
      <main className="main">
        <PageHead
          eyebrow="Events · calendar"
          title="What's"
          emphasis="ahead."
          lede="From the Sunday service to the carol night in December — every program, with its coordinator, venue, budget, and registration roll."
          actions={
            <>
              <button className="btn btn-secondary">Calendar view</button>
              <button className="btn btn-primary">Plan event</button>
            </>
          }
        />

        <section className="kpi-grid">
          <Kpi label="Upcoming events" value={String(upcomingCount)} foot="In the next 90 days" featured />
          <Kpi label="Registered" value={totalRegistered.toLocaleString()} foot="Across all events" />
          <Kpi label="Combined budget" value={formatGHS(totalBudget)} foot="Approved by branch pastors" />
          <Kpi label="Public events" value={String(events.filter((e) => e.visibility === "Public").length)} foot="Visible to the public site" />
        </section>

        <section className="card">
          <div className="card-head">
            <h3>The <em>diary</em></h3>
            <span className="meta">Soonest first</span>
          </div>
          <DataTable
            rows={events}
            getKey={(e) => e.id}
            columns={[
              { header: "Ref", mono: true, render: (e) => e.id },
              { header: "Event", render: (e) => (
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-md)" }}>{e.name}</div>
                  <div className="mono" style={{ color: "var(--fg-subtle)" }}>{e.venue}</div>
                </div>
              )},
              { header: "Type", render: (e) => <span className="chip">{e.type}</span> },
              { header: "Branch", render: (e) => e.branch },
              { header: "Start", mono: true, render: (e) => e.start },
              { header: "Coordinator", render: (e) => e.coordinator },
              { header: "Registered", align: "right", mono: true, render: (e) => (
                e.registrationRequired ? `${e.registered} / ${e.expected}` : <span className="subtle">—</span>
              )},
              { header: "Budget", align: "right", mono: true, render: (e) => formatGHS(e.budget) },
              { header: "Visibility", render: (e) => (
                <span className={`chip ${e.visibility === "Public" ? "success" : "anoint"}`}>{e.visibility}</span>
              )},
            ]}
          />
        </section>

        <div className="two-col mt-8">
          <section className="card">
            <div className="card-head">
              <h3>Service <em>order · this Sunday</em></h3>
              <span className="meta">Pentecost — Sealed</span>
            </div>
            <ol className="timeline">
              <li className="featured"><div className="when">08:00</div><div className="what">Welcome + Opening prayer</div><div className="who">Eld. Stephen Kufuor</div></li>
              <li><div className="when">08:10</div><div className="what">Praise & worship</div><div className="who">Choir · led by Bro. Daniel Asante</div></li>
              <li><div className="when">08:35</div><div className="what">Scripture reading · Acts 2:1–13</div><div className="who">Sis. Mary Frempong</div></li>
              <li><div className="when">08:45</div><div className="what">Tithes & offerings</div><div className="who">Ushering team</div></li>
              <li className="featured"><div className="when">09:00</div><div className="what">Sermon · "The Sealing of the Sacred Flow"</div><div className="who">Apostle K. Asamoah</div></li>
              <li><div className="when">10:00</div><div className="what">Altar call + benediction</div><div className="who">Rev. Samuel Boateng</div></li>
            </ol>
          </section>

          <section className="card">
            <div className="card-head">
              <h3>Planning <em>tasks · Founders' Day</em></h3>
              <span className="meta">22 days out</span>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                ["✓", "Venue booking confirmed · Main Auditorium"],
                ["✓", "Catering quotes received · 3 vendors"],
                ["○", "Programme draft sent to Editorial"],
                ["○", "Banners & flyers signed off"],
                ["○", "Choir rehearsal schedule locked"],
                ["○", "Guest list (VIPs + Founders' family) finalised"],
                ["○", "Live stream test · with media team"],
              ].map(([icon, label]) => (
                <li key={label} style={{ padding: "var(--space-3) 0", borderBottom: "1px solid var(--border)", display: "flex", gap: 12 }}>
                  <span style={{ color: icon === "✓" ? "var(--success)" : "var(--fg-subtle)", fontFamily: "var(--font-mono)" }}>{icon}</span>
                  <span style={{ fontSize: "var(--fs-sm)" }}>{label}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="folio-foot"><span>· events · the diary ·</span><span>Folio 16</span></div>
      </main>
    </>
  );
}
