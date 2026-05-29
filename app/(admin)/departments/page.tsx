import { Topbar } from "../../../components/Topbar";
import { PageHead } from "../../../components/PageHead";
import { departments } from "../../../lib/mock-data";

export default function DepartmentsPage() {
  const ministry = departments.filter((d) => d.type === "Ministry");
  const admin = departments.filter((d) => d.type === "Administrative");

  return (
    <>
      <Topbar crumbs={["CKSPC", "People", "Departments"]} />
      <main className="main">
        <PageHead
          eyebrow="People · Ministry departments"
          title="Where the work"
          emphasis="gets done."
          lede="Departments are the mini-organisations inside the church — choir, ushering, prayer, evangelism, children's, youth, media. Each has a head, a meeting cadence, and a roll."
          actions={<button className="btn btn-primary">New department</button>}
        />

        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-xl)", marginBottom: "var(--space-4)" }}>
          Ministry <em style={{ color: "var(--brand)" }}>departments</em>
        </h2>
        <div className="module-grid">
          {ministry.map((d) => (
            <a key={d.slug} href="#" className="module-card">
              <div className="head">
                <div>
                  <div className="name">{d.name}</div>
                  <div className="meta">{d.scope === "HQ" ? "HQ-wide" : d.branch} · {d.type}</div>
                </div>
                <span className={`chip ${d.active ? "success" : "danger"}`}>{d.active ? "Active" : "Inactive"}</span>
              </div>
              <div className="body">
                <strong>Head:</strong> {d.head}<br />
                <strong>Meeting:</strong> {d.meeting}
              </div>
              <div className="foot">
                <span className="mono">{d.members} members</span>
                <span className="serif-italic" style={{ color: "var(--brand)" }}>View →</span>
              </div>
            </a>
          ))}
        </div>

        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-xl)", margin: "var(--space-10) 0 var(--space-4)" }}>
          Administrative <em style={{ color: "var(--brand)" }}>departments</em>
        </h2>
        <div className="module-grid">
          {admin.map((d) => (
            <a key={d.slug} href="#" className="module-card">
              <div className="head">
                <div>
                  <div className="name">{d.name}</div>
                  <div className="meta">{d.scope === "HQ" ? "HQ-wide" : d.branch} · {d.type}</div>
                </div>
                <span className="chip brand">HQ</span>
              </div>
              <div className="body">
                <strong>Head:</strong> {d.head}<br />
                <strong>Meeting:</strong> {d.meeting}
              </div>
              <div className="foot">
                <span className="mono">{d.members} members</span>
                <span className="serif-italic" style={{ color: "var(--brand)" }}>View →</span>
              </div>
            </a>
          ))}
        </div>

        <div className="folio-foot"><span>· departments · the work of the church ·</span><span>Folio 08</span></div>
      </main>
    </>
  );
}
